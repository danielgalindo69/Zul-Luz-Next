# Plan de acción: carrito y checkout de Shopify

## 1. Decisión de arquitectura

- Next.js seguirá siendo el storefront y Shopify será el motor de comercio.
- Shopify Admin será únicamente el back office para personal autorizado. No se creará una ruta `/admin` en Next.js ni se incrustará el panel dentro del storefront.
- El cliente podrá comprar como invitado. Las cuentas de cliente serán una mejora posterior y opcional.
- El carrito utilizará Storefront Cart API y el pago terminará en Shopify Web Checkout mediante `checkoutUrl`.
- El frontend nunca recibirá el token privado de Storefront API, credenciales de Admin API ni datos de pago.

## 2. Fronteras de seguridad

| Superficie | Usuario | Datos permitidos | Protección |
|---|---|---|---|
| Storefront Next.js | Público | Catálogo y estado visual | HTTPS, validación de entradas y CSP |
| Route Handlers de Next.js | Storefront | ID de variante, cantidad y cart ID | Ejecución servidor, validación de origen y sin caché |
| Storefront API | Next.js | Productos y carrito | Token privado solo en Vercel |
| Shopify Checkout | Comprador | Dirección y datos de pago | Checkout alojado por Shopify |
| Shopify Admin | Propietario y personal | Pedidos, clientes, inventario y configuración | Dominio oficial, roles y autenticación reforzada |

Reglas obligatorias:

1. No publicar enlaces administrativos en el menú del storefront.
2. Acceder al panel mediante un marcador directo a `https://admin.shopify.com/`.
3. No reutilizar ni compartir cuentas de personal.
4. Exigir passkey o autenticación en dos pasos a cada usuario administrativo.
5. Conceder a cada usuario solamente los permisos necesarios.
6. Mantener `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` como secreto de Vercel, sin prefijo `NEXT_PUBLIC_`.
7. No añadir Admin API para el carrito o checkout. Si se necesita en el futuro, deberá ser una integración exclusivamente de servidor con scopes mínimos.
8. No guardar precios, direcciones, correos ni datos de pago en cookies o `localStorage`.

## 3. Estado actual comprobado

- `lib/catalog-server.ts` ya consulta productos, opciones y variantes reales de Shopify.
- Cada variante ya contiene `id`, disponibilidad, precio y opciones seleccionadas.
- `views/ProductDetail.tsx` ya resuelve la variante elegida por talla y color.
- `context/StoreContext.tsx` mantiene el carrito solo en memoria y lo pierde al recargar.
- El carrito actual identifica líneas por producto, color y talla, no por el ID de línea de Shopify.
- El botón `Proceed to Checkout` todavía ejecuta una alerta de demostración.

## 4. Fase A: cliente compartido de Storefront API

### Archivos previstos

```text
lib/shopify/storefront-client.ts
lib/shopify/cart.ts
lib/shopify/cart-types.ts
```

### Trabajo

1. Extraer la llamada GraphQL común sin romper `catalog-server.ts`.
2. Mantener dominio, versión y token en variables de servidor.
3. Configurar las operaciones de carrito con `cache: 'no-store'`.
4. Normalizar errores HTTP, errores GraphQL, `userErrors` y `warnings`.
5. No confiar en nombre, precio o imagen enviados por el navegador; aceptar únicamente IDs de variantes y cantidades validadas.

### Criterio de aceptación

- Ningún secreto aparece en el bundle del navegador.
- Las respuestas con errores de Shopify no se convierten en falsos estados de éxito.

## 5. Fase B: sesión anónima del carrito

### Cookie

```text
Nombre: __Host-zulluz_cart
HttpOnly: true
Secure: true en producción
SameSite: Lax
Path: /
Max-Age: 30 días
```

### Trabajo

1. En la primera adición, ejecutar `cartCreate` con el ID real de variante.
2. Guardar el ID completo del carrito, incluida su clave, en la cookie `HttpOnly`.
3. Recuperar el carrito con la consulta `cart` en visitas posteriores.
4. Eliminar o sustituir la cookie si Shopify informa que el carrito ya no existe o ya fue completado.
5. No exponer el cart ID en HTML, parámetros de URL, logs ni respuestas públicas.

### Criterio de aceptación

- El carrito sobrevive a recargas y navegación.
- Dos navegadores diferentes mantienen carritos separados.
- Un carrito inválido se recupera sin bloquear la tienda.

## 6. Fase C: endpoints internos de Next.js

### Rutas previstas

```text
app/api/cart/route.ts
app/api/cart/checkout/route.ts
```

`/api/cart` atenderá:

- `GET`: recuperar el carrito.
- `POST`: crear carrito o añadir una variante.
- `PATCH`: actualizar cantidad usando el ID de línea de Shopify.
- `DELETE`: eliminar una línea.

`/api/cart/checkout` atenderá:

- `POST`: recuperar un `checkoutUrl` reciente y devolver una redirección controlada.

### Controles

1. Aceptar solamente `Content-Type: application/json` en mutaciones.
2. Validar `Origin` para operaciones de escritura.
3. Limitar cantidades a enteros dentro de un rango comercial definido.
4. Comprobar que los IDs tengan el formato esperado de Shopify.
5. Enviar el IP del comprador a Shopify cuando corresponda, sin confiar ciegamente en cabeceras arbitrarias.
6. Responder con estados HTTP coherentes y mensajes seguros.

## 7. Fase D: conectar el drawer existente

### Archivos principales

```text
context/StoreContext.tsx
views/ProductDetail.tsx
components/Layout.tsx
```

### Trabajo

1. Sustituir `CartItem` local por líneas normalizadas de Shopify.
2. Añadir al carrito usando `selectedVariant.id`.
3. Guardar el ID de línea devuelto por Shopify para actualizar y eliminar.
4. Mostrar precios, moneda, disponibilidad y subtotal devueltos por Shopify.
5. Incorporar estados `loading`, `error` y bloqueo temporal por operación.
6. Evitar dobles clics y duplicación accidental de cantidades.
7. Mantener el drawer y su comportamiento responsive ya corregido.
8. Rehidratar el carrito al iniciar la aplicación.

### Criterio de aceptación

- Agregar, incrementar, reducir y eliminar actualiza Shopify y la interfaz.
- El subtotal visible coincide con Shopify.
- Una variante agotada muestra un error recuperable.
- Las acciones funcionan con teclado y lector de pantalla.

## 8. Fase E: checkout real

1. Sustituir la alerta actual del botón por una llamada a `/api/cart/checkout`.
2. Solicitar `checkoutUrl` únicamente cuando el comprador decida pagar.
3. Redirigir al dominio de checkout devuelto por Shopify.
4. Conservar el botón deshabilitado mientras se genera la URL.
5. Mostrar un mensaje recuperable si Shopify no devuelve una URL válida.
6. Probar descuentos, impuestos, mercados, moneda, dirección y método de envío en Shopify Checkout.
7. Confirmar que las pasarelas activadas en Shopify aparecen sin exponer datos financieros al storefront.

## 9. Fase F: cuentas de clientes, después del checkout invitado

1. Activar Shopify Customer Accounts.
2. Configurar Customer Account API como cliente confidencial para Next.js.
3. Registrar callbacks HTTPS de producción y preview autorizados.
4. Implementar OAuth 2.0, renovación y cierre de sesión con cookies seguras.
5. Asociar la identidad autenticada al carrito para precargar checkout.
6. Activar Google desde Shopify Customer Accounts si el negocio lo requiere.

Esta fase no bloqueará el carrito ni el checkout invitado.

## 10. Verificación

### Automatizada

- TypeScript sin errores.
- Build de producción correcto.
- Pruebas unitarias del mapeo de errores y validaciones.
- Pruebas de integración de los Route Handlers con respuestas Shopify simuladas.

### Manual

- Añadir dos variantes distintas.
- Añadir dos veces la misma variante.
- Cambiar cantidades rápidamente.
- Eliminar líneas.
- Recargar y abrir una URL directa.
- Abrir otro navegador sin compartir carrito.
- Simular variante agotada y carrito expirado.
- Completar un checkout de prueba en Shopify.
- Probar 320, 390, 768, 1024 y 1440 px.

## 11. Orden de ejecución recomendado

1. Auditoría corta de permisos y autenticación del Shopify Admin.
2. Fase A: cliente GraphQL compartido.
3. Fase B: cookie y ciclo de vida del carrito.
4. Fase C: Route Handlers.
5. Fase D: conexión del drawer y ficha de producto.
6. Fase E: checkout real y pruebas de compra.
7. Fase F: cuentas de cliente y Google.

La primera entrega funcional termina al completar las fases A-E. Las cuentas de cliente constituyen una entrega separada para reducir riesgo y facilitar las pruebas.

## 12. Estado de implementación

Actualizado el 22 de septiembre de 2026:

- Fase A completada: cliente Storefront compartido y exclusivo de servidor.
- Fase B completada: carrito anónimo persistido con cookie `HttpOnly`.
- Fase C completada: endpoints `GET`, `POST`, `PATCH` y `DELETE` para carrito, más endpoint de checkout.
- Fase D completada: ficha de producto y drawer conectados con IDs reales de variantes y líneas.
- Fase E completada: redirección verificada hacia Shopify Web Checkout.
- Fase F aplazada: cuentas de cliente e inicio de sesión con Google.

La prueba integral creó un carrito real, recuperó el carrito después de recargar, actualizó una cantidad y abrió el checkout alojado en `zulluz.shop`. No se creó ningún pedido ni se ejecutó un pago.
