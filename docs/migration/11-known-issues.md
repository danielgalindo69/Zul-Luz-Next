# Problemas conocidos

| Prioridad | Hallazgo | Próximo paso |
|---|---|---|
| P1 | Build sin resultado final verificable mientras `.next` está en uso. | Detener dev cuando sea oportuno y ejecutar `npm run build`. |
| P1 | Paridad visual responsive no comprobada. | Comparar React y Next en los seis anchos definidos. |
| P2 | Carrito, favoritos, perfil, newsletter y checkout siguen simulados. | Integrar Shopify y cuentas en la fase autorizada. |
| P2 | `?type` y `?q` se preservan pero no filtraban el boceto. | Definir búsqueda/filtros reales antes de Shopify. |
| P2 | Imágenes y fuentes remotas. | Hacer fase de activos: CDN, dimensiones y formatos. |
| P3 | Algunas vistas permanecen completamente cliente. | Reducir límites cliente tras auditoría visual. |
