# Fase inicial del proyecto: inventario técnico y migración de React a Next.js

## 1. Propósito del documento

Este documento define las instrucciones que debe seguir la inteligencia artificial responsable de analizar el proyecto existente, generar el código y verificar la migración inicial del storefront de Zul Luz.

La fase está limitada a dos objetivos:

1. Realizar el inventario técnico del boceto actual desarrollado con React.
2. Migrar el boceto a Next.js conservando su comportamiento y apariencia.

La auditoría integral del storefront, la integración con Shopify y las optimizaciones comerciales se realizarán en fases posteriores. Durante esta fase solo se permiten las verificaciones necesarias para conocer el estado inicial y demostrar que la migración es correcta.

---

## 2. Rol de la inteligencia artificial

La inteligencia artificial actuará como:

- Arquitecto de software especializado en React y Next.js.
- Desarrollador frontend senior.
- Analista de requerimientos.
- Auditor técnico de migraciones frontend.
- Especialista en accesibilidad, rendimiento y calidad de software.

Debe inspeccionar el código existente antes de modificarlo, basar sus decisiones en evidencia obtenida del repositorio y mantener trazabilidad entre cada hallazgo, decisión y cambio implementado.

No debe asumir que el proyecto utiliza Vite, Create React App, React Router, Redux, Tailwind u otra tecnología hasta haberlo verificado.

---

## 3. Objetivo general

Obtener una aplicación Next.js funcional, mantenible y preparada para una auditoría posterior y para la futura integración con Shopify Headless, reutilizando el mayor porcentaje razonable del boceto React existente.

La migración no debe modificar deliberadamente el diseño, los textos, la identidad visual ni los flujos funcionales aprobados. Los defectos encontrados deben documentarse; solo se corregirán durante esta fase cuando impidan la migración, el build, la navegación o la ejecución estable.

---

## 4. Principios obligatorios

La inteligencia artificial debe cumplir estas reglas durante toda la fase:

1. Inspeccionar antes de editar.
2. No borrar ni sobrescribir trabajo existente sin comprender su función.
3. Preservar cambios del usuario que no pertenezcan a la migración.
4. Reutilizar componentes y estilos siempre que sea técnicamente razonable.
5. Evitar reescrituras completas si una migración incremental es posible.
6. Mantener el gestor de paquetes actual, salvo incompatibilidad demostrada.
7. No introducir dependencias sin justificar su necesidad.
8. No instalar simultáneamente librerías que resuelvan el mismo problema.
9. Mantener TypeScript si el proyecto ya lo utiliza; si usa JavaScript, proponer y ejecutar una migración gradual a TypeScript sin bloquear el avance.
10. No añadir `use client` de forma indiscriminada.
11. Mantener como Server Components todos los componentes que no necesiten estado, efectos, eventos o APIs del navegador.
12. No exponer secretos mediante variables con prefijo `NEXT_PUBLIC_`.
13. No integrar Shopify, pagos, cuentas, base de datos o servicios de imágenes durante esta fase.
14. No crear un backend NestJS. El destino es Next.js. NestJS solo podrá evaluarse en una fase futura si aparece una necesidad de backend independiente.
15. No ejecutar cambios de DNS, despliegues de producción ni operaciones sobre la tienda real.
16. No realizar rediseños encubiertos durante la migración.
17. Ejecutar verificaciones después de cada bloque relevante de cambios.
18. Documentar problemas que queden pendientes, sin ocultarlos mediante soluciones temporales silenciosas.

---

## 5. Alcance

### Incluido

- Inspección del repositorio React existente.
- Identificación de tecnologías, dependencias y arquitectura actual.
- Mapa de rutas, componentes, estados, estilos, datos y activos.
- Ejecución de una línea base del proyecto actual.
- Identificación de riesgos de migración.
- Creación o adaptación de la aplicación Next.js.
- Migración de rutas, layouts, componentes, estilos y activos.
- Separación entre Server Components y Client Components.
- Conservación temporal de mocks o datos locales.
- Metadatos técnicos mínimos para que las páginas sean válidas.
- Estados básicos de carga, error, vacío y página no encontrada cuando sean necesarios para la migración.
- Verificación funcional, visual y técnica de la migración.
- Medición preliminar del rendimiento frontend migrado.
- Documentación de resultados y pendientes.

### Excluido

- Integración con Storefront API, Admin API o Customer Account API.
- Configuración del canal Headless de Shopify.
- Carrito real de Shopify.
- Checkout y pasarelas de pago.
- Cuentas de clientes.
- Webhooks.
- Caché conectada a datos reales de Shopify.
- Migración o edición definitiva de imágenes de producto.
- Cloudinary, ImageKit u otro DAM externo.
- Configuración del dominio o DNS.
- Analítica y píxeles publicitarios.
- CMP o banner definitivo de cookies.
- Auditoría comercial completa.
- Reescritura final de textos o políticas.
- Lanzamiento a producción.

---

# Punto 1: inventario técnico del proyecto React

## 6. Objetivo del inventario

Construir una descripción verificable del estado actual del proyecto antes de iniciar la migración. El inventario debe permitir responder:

- Qué tecnologías usa realmente el proyecto.
- Qué partes pueden reutilizarse sin cambios.
- Qué partes requieren adaptación para Next.js.
- Qué partes deben reemplazarse.
- Qué comportamientos y rutas deben preservarse.
- Qué problemas podrían bloquear o encarecer la migración.

El inventario debe realizarse inicialmente en modo de solo lectura. No se modificará código hasta haber presentado el diagnóstico y el plan de migración.

## 7. Comprobaciones iniciales

La inteligencia artificial debe:

1. Confirmar la ruta exacta del repositorio.
2. Leer las instrucciones locales del proyecto, incluyendo archivos como `AGENTS.md`, `README.md` y documentación equivalente.
3. Revisar el estado del control de versiones y detectar cambios sin confirmar.
4. Identificar el gestor de paquetes mediante el lockfile.
5. Identificar las versiones de Node.js, React y herramientas de build.
6. Instalar dependencias únicamente si es necesario y está permitido por el entorno.
7. Ejecutar los comandos existentes de desarrollo, lint, test, typecheck y build sin modificarlos previamente.
8. Registrar los resultados de la línea base, incluyendo errores que ya existían antes de la migración.

Si el repositorio no está disponible, está vacío o no puede ejecutarse por falta de archivos esenciales, la inteligencia artificial debe detener la implementación, describir exactamente qué falta y solicitar la ubicación o los archivos correctos.

## 8. Inventario obligatorio

### 8.1 Estructura y herramientas

Registrar:

- Estructura de directorios.
- Punto de entrada de la aplicación.
- Sistema de build.
- Alias de importación.
- Configuración de TypeScript o JavaScript.
- Variables de entorno conocidas, sin revelar sus valores.
- Scripts disponibles.
- Herramientas de lint y formato.
- Framework de pruebas.
- Configuración de CI/CD, si existe.
- Configuración de despliegue, si existe.

### 8.2 Dependencias

Clasificar las dependencias en:

- Esenciales y reutilizables.
- Compatibles con Next.js, pero requieren configuración.
- Exclusivas del entorno navegador.
- Obsoletas o duplicadas.
- Incompatibles con el destino.
- No utilizadas aparentemente.

No eliminar dependencias en esta etapa. Las eliminaciones se propondrán con evidencia y se ejecutarán durante la migración cuando sean seguras.

### 8.3 Rutas y navegación

Para cada ruta existente, documentar:

- URL.
- Componente principal.
- Layout utilizado.
- Parámetros y query strings.
- Fuente de datos.
- Estados de carga, vacío y error.
- Dependencias del navegador.
- Enlaces entrantes relevantes.
- Ruta equivalente prevista en Next.js.

Siempre que sea posible, deben conservarse las rutas públicas existentes para evitar una futura pérdida de SEO.

### 8.4 Componentes

Clasificar cada componente relevante como:

- Presentacional y reutilizable.
- Layout.
- Interactivo.
- Conectado a estado global.
- Dependiente del router.
- Dependiente de datos simulados.
- Dependiente de `window`, `document`, almacenamiento local u otra API del navegador.
- Candidato a Server Component.
- Obligatoriamente Client Component.
- Obsoleto, duplicado o aparentemente sin uso.

### 8.5 Estado y flujo de datos

Identificar:

- Context API, Redux, Zustand u otra solución.
- Estado local de componentes.
- Carrito simulado.
- Favoritos simulados.
- Filtros y búsqueda.
- Datos persistidos en `localStorage` o `sessionStorage`.
- Peticiones HTTP existentes.
- Fixtures, mocks, JSON o arrays locales.
- Transformaciones y validaciones realizadas en el frontend.

El inventario debe indicar qué estado realmente necesita ser global y qué estado puede permanecer local o derivarse de la URL.

### 8.6 Estilos y diseño

Registrar:

- CSS global.
- CSS Modules.
- Sass.
- Tailwind u otro framework.
- CSS-in-JS.
- Tokens de diseño.
- Breakpoints.
- Tipografías.
- Iconos.
- Animaciones.
- Estrategia responsive.
- Posibles conflictos de estilos globales.

### 8.7 Activos

Inventariar:

- Imágenes locales.
- Imágenes remotas.
- Logos.
- Iconos.
- Fuentes.
- Videos.
- Archivos duplicados o aparentemente sin uso.
- Dimensiones y peso aproximado de activos importantes.
- Componentes que dependan de rutas relativas de activos.

No editar ni recomprimir imágenes en esta fase inicial del inventario.

### 8.8 Formularios e interacciones

Documentar:

- Formularios.
- Validaciones.
- Modales y drawers.
- Menús.
- Carruseles.
- Selectores de variante.
- Botones de compra simulados.
- Manejo de teclado y foco.
- Estados deshabilitados.
- Mensajes de error.

### 8.9 Línea base de calidad

Registrar sin convertir todavía esta revisión en una auditoría integral:

- Resultado del build actual.
- Errores de TypeScript.
- Errores de lint.
- Pruebas existentes y resultado.
- Errores y advertencias de consola.
- Problemas evidentes de hidratación potencial.
- Dependencias grandes.
- Problemas responsive que puedan dificultar la migración.
- Problemas de accesibilidad que impidan operar los flujos principales.
- Métricas preliminares de rendimiento si el proyecto puede ejecutarse.

Estos hallazgos forman la línea base. No deben mezclarse con defectos introducidos durante la migración.

## 9. Entregables del punto 1

Crear, dentro del repositorio, una carpeta documental equivalente a:

```text
docs/migration/
├── 01-technical-inventory.md
├── 02-route-map.md
├── 03-component-map.md
├── 04-dependency-assessment.md
├── 05-baseline-results.md
├── 06-risk-register.md
└── 07-migration-plan.md
```

Si el proyecto ya tiene una convención documental, utilizarla en lugar de imponer esta ruta.

El registro de riesgos debe utilizar como mínimo estas columnas:

| ID | Riesgo | Evidencia | Probabilidad | Impacto | Mitigación | Estado |
|---|---|---|---|---|---|---|

El plan de migración debe indicar el orden de cambios, archivos afectados, dependencias involucradas y verificación prevista después de cada bloque.

## 10. Criterio de salida del punto 1

El inventario se considera completo cuando:

- El proyecto y sus instrucciones han sido inspeccionados.
- La línea base ha sido ejecutada o el impedimento está documentado.
- Todas las rutas relevantes están mapeadas.
- Los componentes están clasificados.
- Las dependencias están evaluadas.
- Los datos simulados y el estado global están identificados.
- Los riesgos tienen mitigación propuesta.
- Existe un plan de migración ejecutable.
- No se ha iniciado una reescritura prematura.

---

# Punto 2: migración de React a Next.js

## 11. Objetivo de la migración

Trasladar el boceto React a una aplicación Next.js estable, manteniendo paridad funcional y visual, y dejando una base adecuada para la auditoría posterior y la integración futura con Shopify.

## 12. Arquitectura de destino

La arquitectura preferida es:

```text
Next.js App Router
TypeScript
Server Components por defecto
Client Components solo cuando sean necesarios
Route Handlers para futuras integraciones servidor
Datos simulados detrás de una capa de acceso sustituible
Despliegue de preview compatible con Vercel
```

No se debe incorporar una arquitectura de microservicios ni un backend separado.

## 13. Estrategia de migración

La inteligencia artificial debe preferir una migración incremental:

1. Preparar o crear la estructura Next.js sin destruir la aplicación original.
2. Migrar configuración base.
3. Migrar estilos, fuentes y activos compartidos.
4. Migrar layouts globales.
5. Migrar las rutas una por una.
6. Migrar componentes presentacionales.
7. Adaptar componentes interactivos.
8. Encapsular los mocks detrás de una capa de datos.
9. Verificar navegación y paridad visual.
10. Eliminar configuración anterior solamente cuando ya no sea utilizada y la aplicación Next.js haya sido validada.

Si una migración incremental dentro del mismo repositorio no es segura, documentar la razón antes de proponer una estructura alternativa.

## 14. Requisitos de implementación

### 14.1 App Router

- Utilizar `app/` para las rutas.
- Definir un `layout` raíz.
- Utilizar segmentos dinámicos para productos y colecciones simuladas.
- Incorporar `not-found`, `error` y `loading` donde aporten comportamiento real.
- Evitar layouts duplicados.
- Mantener las URLs públicas definidas en el mapa de rutas.

### 14.2 Server y Client Components

Serán Server Components por defecto:

- Páginas.
- Layouts.
- Bloques editoriales.
- Listados que no requieran interacción local.
- Componentes que solo reciban props y rendericen contenido.

Podrán ser Client Components:

- Menús interactivos.
- Modales.
- Carruseles.
- Filtros ejecutados en el navegador.
- Selectores de variante.
- Componentes con estado o efectos.
- Componentes que utilicen APIs del navegador.

Cada uso de `use client` debe aparecer en el límite más pequeño razonable del árbol de componentes.

### 14.3 Enrutamiento

- Sustituir el router anterior por las APIs de Next.js.
- Utilizar `Link` para navegación interna.
- Utilizar parámetros y search params de forma compatible con App Router.
- Evitar navegación mediante `window.location` salvo redirecciones externas justificadas.
- Conservar handles y rutas existentes siempre que sea posible.

### 14.4 Datos simulados

Los datos locales deben mantenerse temporalmente, pero quedar detrás de una interfaz sustituible:

```ts
interface CatalogRepository {
  getProducts(): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollectionByHandle(handle: string): Promise<Collection | null>;
}
```

La implementación inicial puede leer mocks. Una fase posterior reemplazará esa implementación por Shopify Storefront API sin reescribir los componentes visuales.

No diseñar una abstracción excesiva ni imitar toda la Storefront API antes de integrarla.

### 14.5 Estilos

- Preservar la apariencia aprobada.
- Mantener la solución de estilos existente si es compatible.
- Evitar mezclar varios sistemas de estilos durante la migración.
- Mantener tokens y breakpoints existentes.
- Corregir solo incompatibilidades que impidan renderizar correctamente.
- Documentar problemas visuales preexistentes para la auditoría posterior.

### 14.6 Imágenes y fuentes

- Mantener temporalmente los activos del boceto.
- Utilizar `next/image` donde no altere la apariencia o el comportamiento.
- Proporcionar dimensiones o proporciones para evitar layout shift.
- Utilizar `next/font` cuando sea compatible con las fuentes existentes.
- No ejecutar todavía el rediseño, recompresión ni carga definitiva a Shopify.
- Registrar imágenes problemáticas para la fase específica de activos.

### 14.7 Metadatos mínimos

Configurar únicamente lo necesario para que la aplicación migrada sea técnicamente válida:

- Título base.
- Descripción base provisional.
- `metadataBase` configurable por entorno.
- Favicon existente, si está disponible.
- `noindex` para previews o staging cuando corresponda.

El SEO completo, datos estructurados, sitemap definitivo y estrategia canonical pertenecen a una fase posterior.

### 14.8 Variables de entorno

Crear un archivo de ejemplo, sin secretos reales:

```text
.env.example
```

Como mínimo puede contemplar:

```text
NEXT_PUBLIC_SITE_URL=
```

Las variables futuras de Shopify pueden documentarse, pero no deben configurarse ni utilizarse todavía.

### 14.9 Seguridad básica

- No insertar secretos en el código.
- No incluir valores reales en `.env.example`.
- No renderizar HTML no confiable sin una estrategia documentada.
- Revisar usos de `dangerouslySetInnerHTML`.
- Validar parámetros dinámicos.
- No confiar en datos procedentes de query strings.
- No trasladar información sensible a Client Components.

### 14.10 Manejo de errores

La aplicación debe presentar estados comprensibles para:

- Ruta inexistente.
- Producto simulado inexistente.
- Colección inexistente.
- Array vacío.
- Error inesperado de renderizado.
- Imagen ausente, cuando sea viable sin rediseñar.

No ocultar errores con bloques `catch` vacíos.

## 15. Secuencia de verificación

Después de cada bloque de migración, ejecutar las verificaciones pertinentes:

1. Instalación reproducible.
2. Lint.
3. Typecheck.
4. Pruebas automatizadas existentes.
5. Build de producción.
6. Inicio del servidor de preview.
7. Navegación por todas las rutas migradas.
8. Revisión de consola.
9. Comparación visual con el boceto.

No declarar terminada la migración basándose únicamente en que el servidor de desarrollo inicia.

## 16. Verificación visual y responsive

Comparar la versión React original y la versión Next.js, como mínimo, en:

```text
320 px
375 px
390 px
768 px
1024 px
1440 px
```

Revisar:

- Header y navegación.
- Home.
- Listados.
- Cards.
- Ficha de producto.
- Footer.
- Menús y modales.
- Formularios.
- Tipografía.
- Espaciado.
- Estados hover, focus, active y disabled.

Las diferencias intencionadas deben estar justificadas. Las diferencias no intencionadas se consideran regresiones.

## 17. Auditoría técnica posterior a la migración

Al finalizar el código, realizar una auditoría limitada a la calidad de la migración. Esta no sustituye la auditoría integral del storefront prevista para la siguiente fase.

Debe revisar:

- Uso correcto de App Router.
- Límites Server/Client Components.
- Cantidad de JavaScript enviado al navegador.
- Errores de hidratación.
- Imports y dependencias sin uso.
- Duplicación de componentes.
- Acceso accidental a APIs del navegador desde el servidor.
- Calidad de tipos.
- Manejo de errores.
- Navegación y rutas.
- Paridad funcional y visual.
- Accesibilidad operativa básica.
- Métricas frontend preliminares.
- Preparación para reemplazar mocks por Shopify.

Clasificar hallazgos como:

```text
P0: bloquea build, ejecución o migración
P1: regresión funcional, visual o técnica importante
P2: afecta mantenibilidad, rendimiento o accesibilidad
P3: mejora menor
```

## 18. Pruebas mínimas de rendimiento frontend

Las mediciones deben ejecutarse sobre un build de producción, no únicamente sobre el servidor de desarrollo.

Registrar cuando las herramientas estén disponibles:

- Tamaño del JavaScript inicial.
- Cantidad de Client Components.
- LCP.
- CLS.
- INP o una aproximación de interacción.
- TTFB del entorno de preview.
- Imágenes responsables del LCP.
- Errores de consola.
- Advertencias de hidratación.

Estas cifras son una línea base. Todavía no representan el rendimiento final porque Shopify, imágenes definitivas, analítica y scripts de terceros no están integrados.

## 19. Entregables del punto 2

La inteligencia artificial debe entregar:

1. Aplicación Next.js funcional.
2. Código migrado y organizado.
3. Datos simulados desacoplados de la presentación.
4. Scripts de lint, typecheck, test y build.
5. `.env.example` sin secretos.
6. Documentación de ejecución local.
7. Informe de migración.
8. Informe de verificación.
9. Registro actualizado de riesgos y pendientes.

Documentos sugeridos:

```text
docs/migration/
├── 08-migration-report.md
├── 09-verification-report.md
├── 10-performance-baseline.md
└── 11-known-issues.md
```

El informe de migración debe listar:

- Archivos principales creados o modificados.
- Decisiones arquitectónicas.
- Componentes reutilizados.
- Componentes adaptados.
- Dependencias agregadas, reemplazadas o eliminadas.
- Rutas migradas.
- Desviaciones respecto al plan inicial.

El informe de verificación debe incluir los comandos ejecutados, su resultado y cualquier comprobación que no haya podido realizarse.

## 20. Criterios de aceptación

La migración solo se considera aceptada cuando:

- La instalación es reproducible desde el lockfile.
- El build de producción finaliza correctamente.
- TypeScript no presenta errores, si aplica.
- El lint no presenta errores bloqueantes.
- Las pruebas existentes pasan o los fallos preexistentes están diferenciados y documentados.
- Las rutas principales funcionan directamente y mediante navegación interna.
- Recargar una ruta dinámica no produce error.
- No existen errores de hidratación conocidos.
- No se han expuesto secretos.
- No se ha introducido Shopify prematuramente.
- No se ha creado un backend NestJS.
- La apariencia conserva paridad razonable con el boceto.
- Los flujos interactivos principales siguen funcionando.
- Los estados vacío, error y no encontrado están contemplados.
- La aplicación funciona en los anchos definidos.
- Los problemas pendientes están registrados y priorizados.
- La capa de datos puede sustituirse posteriormente por Shopify sin reescribir toda la interfaz.

## 21. Definición de terminado

La fase inicial está terminada cuando existe una aplicación Next.js verificable que reproduce el boceto React y cuando otra persona puede:

1. Instalarla.
2. Ejecutarla localmente.
3. Generar un build de producción.
4. Navegar por sus rutas principales.
5. Comprender su arquitectura mediante la documentación.
6. Consultar los riesgos y problemas pendientes.
7. Comenzar la auditoría integral del storefront sin rehacer la migración.
8. Preparar la futura integración con Shopify sobre una base estable.

---

## 22. Protocolo de comunicación y entrega de la inteligencia artificial

Durante la ejecución, la inteligencia artificial debe:

- Informar brevemente al iniciar el inventario.
- Comunicar hallazgos que cambien materialmente el plan.
- No detenerse por detalles menores cuando pueda tomar una decisión conservadora.
- Detenerse y solicitar información cuando falte el repositorio, exista riesgo de pérdida de trabajo o una decisión cambie el alcance aprobado.
- Diferenciar claramente hechos observados, inferencias y recomendaciones.
- No afirmar que una prueba pasó si no fue ejecutada.
- No afirmar paridad visual sin haber comparado ambas versiones.

La respuesta final debe resumir:

- Resultado alcanzado.
- Archivos principales modificados.
- Pruebas ejecutadas y resultado.
- Hallazgos P0 y P1 pendientes.
- Limitaciones de la verificación.
- Próximo paso recomendado: auditoría integral del storefront migrado.

---

## 23. Instrucción de inicio para la inteligencia artificial

Al recibir este documento, la inteligencia artificial debe comenzar así:

1. Localizar el repositorio y leer sus instrucciones locales.
2. Confirmar que corresponde al boceto React de Zul Luz.
3. Ejecutar el punto 1 completo en modo de inspección.
4. Crear los entregables del inventario.
5. Elaborar el plan de migración basado en evidencia.
6. Implementar el punto 2 de forma incremental.
7. Verificar cada bloque de cambios.
8. Ejecutar la auditoría técnica limitada de la migración.
9. Entregar el código, los informes y los problemas pendientes.

No debe avanzar a integración Shopify, rediseño de imágenes, checkout, DNS o lanzamiento hasta recibir una instrucción explícita para iniciar la siguiente fase.
