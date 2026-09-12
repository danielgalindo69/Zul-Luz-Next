# Dependencias

- Conservar React/ReactDOM, TypeScript y tipos compatibles; pnpm con lockfile.
- Conservar Tailwind, sustituir plugin Vite por `@tailwindcss/postcss` y PostCSS.
- Conservar clsx (MegaMenu), lucide-react (iconos), framer-motion (menús/drawers).
- Sustituir react-router por next/link y next/navigation; pequeño NavLink propio para estilos activos, sin router paralelo.
- No trasladar Vite, plugin React Vite ni herramientas `.figma`, exclusivas del build anterior.
- Añadir Next estable verificado en registro; no usar canary. Añadir ESLint/config Next para diagnóstico explícito y test runner de Node para pruebas básicas.
- oxfmt original no es un linter; no tratar formato como prueba de calidad. No hace falta para ejecutar Next.

Referencia consultada: [instalación oficial Next.js](https://nextjs.org/docs/app/getting-started/installation). Versiones finalmente resueltas deben consultarse en package.json y pnpm-lock.yaml, no depender de latest al reinstalar.
