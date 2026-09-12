# Componentes

| Componente | Clasificación y destino |
|---|---|
| App | Sustituir RouterProvider por layout servidor + proveedores cliente que reciben children |
| Layout | Interactivo/global/router; conservar inicialmente como shell cliente, recibiendo children y productos del servidor |
| MegaMenu | Cliente: estado, eventos, medición de viewport, Framer Motion; navegación Next |
| SplashScreen | Cliente: temporizadores y animación; preservar |
| HeartIcon | Presentacional: extraer de Layout para evitar dependencia del shell |
| Home | Interactiva: animaciones, favoritos, newsletter y carrusel; vista cliente con datos por props, página servidor |
| CategoryPage | Interactiva: orden, hover y favoritos; slug/productos por props, validación servidor |
| ProductDetail | Interactiva: variantes, galería, carrito; producto y relacionados por props |
| GiftIdeas | Interactiva: filtro y favoritos; regalos por props |
| AboutUs | Editorial: servidor, extraer envolturas animadas a cliente |
| SizeGuide | Cliente por tabs |
| Profile | Cliente por tabs y contexto; no cuenta real |
| NotFound | Servidor: enlaces y texto |
| StoreContext | Cliente: carrito/favoritos globales en memoria |
| useScrollAnimation | Hook cliente: IntersectionObserver; revisar limpieza de temporizadores |

No marcar todo `app` como cliente. La extracción posterior de más bloques editoriales de Home/Layout es una oportunidad de optimización, no requisito para alterar el diseño ahora.
