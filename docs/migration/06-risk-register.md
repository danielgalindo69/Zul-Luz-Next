# Registro de riesgos

| ID | Riesgo | Evidencia | Probabilidad | Impacto | Mitigación | Estado |
|---|---|---|---|---|---|---|
| R1 | Regresión de navegación | React Router en 10 módulos | Alta | Alto | App Router, preservar URLs, pruebas directas e internas | Abierto |
| R2 | Hidratación/estado | efectos de viewport y splash | Media | Alto | límites cliente, estado inicial determinista, consola | Abierto |
| R3 | Dependencia remota de activos | Unsplash/Google Fonts | Alta | Medio | preservar URLs y documentar fallos; no rediseñar | Preexistente |
| R4 | Falsa búsqueda comercial | query q/type no consumida | Alta | Medio | documentar sin inventar filtros | Preexistente |
| R5 | JS amplio | shell 40 KB fuente, Home 21 KB | Alta | Medio | páginas servidor y datos por props; medir producción | Abierto |
| R6 | Demo confundida con tienda real | alert checkout, perfil/newsletter simulados | Alta | Alto | no publicar; README y preview noindex | Preexistente |
| R7 | Accesibilidad incompleta | iconos y overlays, animaciones | Media | Medio | probar teclado; auditoría posterior sin rediseño | Abierto |
| R8 | Pérdida de estado entre rutas | carrito en Context | Media | Alto | provider en layout persistente | Abierto |
