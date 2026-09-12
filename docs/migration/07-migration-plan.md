# Plan de implementación

1. Crear configuración Next/App Router/TypeScript/PostCSS y scripts en destino vacío. Verificar instalación.
2. Reutilizar src/components, context, hooks, vistas y CSS, sin editar origen. Extraer HeartIcon y navegación activa. Preservar splash y layout persistente. Verificar tipos.
3. Crear repositorio de catálogo mock, invocado desde páginas/layout servidor; pasar datos serializables. Migrar cada ruta, validar slugs, añadir 404/error/loading. Verificar build y rutas.
4. Mantener AboutUs y NotFound servidor; extraer animación editorial. Documentar límites cliente restantes.
5. Metadatos mínimos, noindex por defecto y .env.example sin secretos; README local. No Shopify, NestJS, DNS ni producción.
6. Verificar producción, pruebas de datos/rutas, consola y comparación responsive con original (320/375/390/768/1024/1440). Documentar mediciones y limitaciones sin inventar resultados.

El diagnóstico y esta secuencia se comunicaron antes de editar código. Solo se modificará el destino. No se harán commits ni push sin solicitud.
