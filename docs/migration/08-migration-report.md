# Informe de migración

El boceto React/Vite se trasladó al proyecto Next.js existente con App Router. Se reutilizaron páginas, componentes, contexto, hooks y CSS; el origen `zulluz` no se modificó. No se integraron Shopify, checkout, pagos, DNS, imágenes definitivas ni backend.

- React Router fue sustituido por `next/link`, `next/navigation` y `ActiveLink` para estilos de enlace activo.
- `StorefrontShell` conserva splash, carrito y favoritos entre navegaciones.
- Se crearon rutas de Next para catálogo, subcategorías, productos, regalos, historia, guía de tallas, perfil y 404; también `error` y `loading`.
- `lib/catalog.ts` conserva `MockCatalog` detrás de `CatalogRepository`: Shopify debe sustituir esa implementación, no las vistas.
- Metadatos mínimos quedan en noindex y `NEXT_PUBLIC_SITE_URL` configura la base de URLs.

Las vistas siguen siendo Client Components cuando requieren carrito, búsqueda, tabs, filtros, hover o animaciones. No se usó `next/image` para conservar la composición de las URLs remotas existentes; esa decisión se revisará con los activos definitivos.
