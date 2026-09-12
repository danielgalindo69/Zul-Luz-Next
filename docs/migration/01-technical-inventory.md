# Inventario técnico — 11 septiembre 2026

Origen: `C:/Users/jonns/OneDrive/Escritorio/zulluz`. Destino: `C:/Users/jonns/OneDrive/Escritorio/Zulluz next`.
Leídos `Instructions.md`, `AGENTS.md` y `CLAUDE.md` del origen. Destino inicialmente sin cambios en Git y con las instrucciones como único documento de proyecto. El origen se conserva sin editar; las verificaciones usan una copia en la carpeta de esta conversación.

- React 19.2.4 según lockfile, Vite 8.0.5, TypeScript 5.9.3, pnpm; Node local 24.14.1.
- Entrada `src/main.tsx` → `App.tsx` → React Router; layout compartido con header, búsqueda, carrito y footer.
- `src/index.css`: Tailwind 4.2.2, tokens crema/vino, Fraunces y Jost de Google Fonts. Breakpoints Tailwind y tamaños fluidos; no CSS Modules ni Sass.
- Datos: 11 productos en `src/data/products.ts`, sin peticiones de negocio. Imágenes Unsplash con dimensiones en query string; no archivos de producto locales. No se han medido sus pesos reales ni verificado todas las URLs.
- Estado global Context: carrito, favoritos, apertura del drawer. Estado local: orden, selección de talla/color/cantidad, tabs, búsqueda, newsletter, carrusel y menús. No persistencia local ni cookies implementadas.
- `window`, `IntersectionObserver` y temporizadores se usan dentro de efectos/eventos; entrada Vite usa `document`.
- Formularios newsletter con validación HTML de email; confirmación simulada. Checkout muestra alert de demo. Perfil no autentica. Detalle exige talla salvo One Size.
- Scripts originales: dev, build, preview, format. Sin scripts lint, typecheck o test; TypeScript puede comprobarse directamente. Sin suite de pruebas de aplicación ni CI observada.
- Configuración `.figma` aporta herramientas de preview, no necesarias en Next. Variables detectadas: PORT y FIGMA_PUBLIC_URL; no se trasladan scripts de inyección HTML a Next.
- Alias original `@/*` apunta a `src/*`.

Límites: este inventario no verifica afirmaciones comerciales, seguridad del backend, tienda Shopify ni rendimiento con datos reales.
