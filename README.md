# Zul Luz storefront

Migración inicial del boceto React/Vite a Next.js App Router. Usa un catálogo mock local y no se conecta todavía a Shopify, pagos, clientes ni analítica.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Si ese puerto está ocupado, usa `npm run dev -- -p 3100`.

## Verificar

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Si un servidor de desarrollo está usando `.next`, ejecuta el build aislado:

```powershell
$env:NEXT_DIST_DIR = '.next-build-verification'
npm run build
```

`NEXT_PUBLIC_SITE_URL` es opcional y solo construye la base de metadatos. Copia `.env.example` a `.env.local` si debes definirla; no incluyas secretos.

## Arquitectura

- `app/`: rutas y manejo de errores de Next.js.
- `pages/`: vistas migradas que necesitan interacción del navegador.
- `components/`: shell, navegación y elementos compartidos.
- `context/`: carrito y favoritos simulados, en memoria.
- `lib/catalog.ts`: mock sustituible por Shopify Storefront API.

Consulta `docs/migration/` para alcance, riesgos y verificación.
