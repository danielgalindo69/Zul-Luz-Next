# Zul Luz SEO: inventario inicial y mapa de páginas

Fecha de revisión: 8 de octubre de 2026  
Mercado prioritario: Estados Unidos  
Idioma actual del storefront: inglés

Este documento es una primera hipótesis de trabajo. Los términos propuestos todavía no tienen validación de volumen, dificultad ni conversión; deben revisarse con datos de búsqueda y de ventas antes de tratarlos como objetivos definitivos.

## Estado técnico observado

- `https://www.zulluz.shop/robots.txt`, `https://www.zulluz.shop/sitemap.xml` y las páginas principales de categorías respondieron HTTP 200 durante la revisión.
- El sitemap público contenía 32 URLs de producto antes de esta actualización.
- La Storefront API devolvió 33 productos; uno, `Pao Hipster`, tiene precio de USD 0 y ya queda fuera del catálogo servido por el storefront.
- El producto `Pijama` (`/product/pijama`) tenía precio de USD 60, pero estaba publicado con descripción vacía, sin imagen real y sin colección. La página respondía 200, tenía canonical y aparecía en el sitemap. Hasta que Shopify tenga contenido e imagen adecuados, la página llevará `noindex` y se omitirá del sitemap.
- La ruta `/lingerie/sets` no tiene productos según la clasificación actual del catálogo. Se excluye del sitemap y se marca `noindex` mientras esté vacía; al asignarle productos en Shopify, volverá a ser elegible al regenerarse los metadatos y el sitemap.
- 10 de los 33 productos consultados no tienen un `productType` consistente en Shopify. Varios productos tampoco tienen ALT para todas las imágenes; el storefront ahora usa el ALT de Shopify y genera una alternativa descriptiva cuando falte.
- Los metadatos, canonicales, `robots.txt`, sitemap y datos estructurados de organización/producto ya existen en el proyecto. Esta revisión los afina; no reemplaza la arquitectura SEO previa.

## Mapa preliminar de intención y páginas

| Prioridad | URL actual | Intención | Grupo de consultas por validar | Enfoque de contenido |
|---|---|---|---|---|
| P0 | `/` | Descubrimiento de marca y tienda | `luxury lingerie`, `women's sleepwear`, `Zul Luz` | Explicar en el primer bloque que la tienda ofrece lingerie y sleepwear; describir la conexión colombiana sin atribuir origen colombiano a cada producto. |
| P0 | `/lingerie` | Compra de categoría | `women's lingerie`, `lace lingerie`, `bras and panties` | Introducir la colección y enlazar claramente a bras, panties y sets cuando haya inventario. |
| P0 | `/sleepwear` | Compra de categoría | `women's sleepwear`, `women's pajama sets`, `sleepwear` | Cubrir conjuntos, robes y nightgowns. No presentar toda la categoría como seda: hay distintos materiales. |
| P0 | `/lingerie/bras` | Compra de subcategoría | `lace bras`, `bralettes`, `wireless bra`, `underwire bra` | Mencionar solo las características presentes en los productos disponibles; distinguir bralette y bra cuando corresponda. |
| P0 | `/lingerie/panties` | Compra de subcategoría | `Brazilian panties`, `women's underwear`, `thong`, `hipster panties` | Usar terminología natural en inglés estadounidense y especificar corte/cobertura por producto. |
| P1 | `/lingerie/sets` | Compra de subcategoría | `lingerie sets`, `matching bra and panty set` | Actualmente vacía; no indexar hasta que haya productos disponibles y contenido útil. |
| P1 | `/sleepwear/pajama-sets` | Compra de subcategoría | `women's pajama sets`, `short pajama set`, `cotton pajamas` | Hablar de cada material solo en los productos que lo confirmen. |
| P1 | `/sleepwear/robes` | Compra de subcategoría | `women's robe`, `satin robe`, `bathrobe` | Diferenciar robe de bathrobe; usar materiales y ocasiones según el producto. |
| P1 | `/sleepwear/nightgowns` | Compra de subcategoría | `women's nightgowns`, `slip nightgown`, `slip dress sleepwear` | Describir largo, silueta y material cuando estén confirmados. |
| P1 | `/lifestyle/home-fragrance` | Compra de producto para hogar | `botanical wax air freshener`, `scented wax tablet` | Describir con claridad su uso y espacios apropiados; validar afirmaciones sobre ingredientes/duración. |
| P1 | `/lifestyle/scrunchies` | Compra de accesorio | `crochet scrunchie`, `silk scrunchie`, `hair scrunchie` | Identificar crochet o seda solo en los modelos correspondientes. |
| P1 | `/lifestyle/bags` | Compra y descubrimiento artesanal | `Wayuu bag`, `handwoven Colombian bag` | Explicar el tejido y la procedencia con precisión y respeto; evitar generalizar la historia de una comunidad a cada artículo sin confirmar su origen. |
| P1 | `/about` | Investigación de marca | `Colombian lingerie brand`, `lingerie made in Colombia` | Usar la historia real del atelier, diseño y origen; distinguir producto fabricado en Colombia de accesorios hechos en otros lugares. |
| P2 | `/size-guide` | Ayuda antes de comprar | `bra size guide`, `how to choose lingerie size` | Priorizar equivalencias de tallas que correspondan realmente al catálogo y al mercado estadounidense. |
| P2 | `/gift-ideas` | Investigación/comercial | `lingerie gift`, `sleepwear gifts`, `gift card for her` | Mostrar artículos y tarjetas disponibles, con enlaces a producto y políticas de regalo reales. |

## Reglas de contenido y catálogo

1. No usar `silk`, `handmade`, `made in Colombia`, `organic`, `hypoallergenic` ni afirmaciones de duración si no están respaldadas por la ficha y la operación real del producto.
2. Dar a cada URL un propósito principal. Evitar repetir el mismo término exacto en todos los títulos, encabezados y ALT.
3. Mantener las URLs actuales. Si un cambio se vuelve necesario, definir primero redirecciones permanentes, canonicales y enlaces internos antes de publicarlo.
4. En Shopify, normalizar `Product type`, colecciones y etiquetas. Evitar productos de prueba o borradores comerciales publicados sin descripción, imágenes, categoría ni precio válido.
5. Añadir ALT específico por imagen: describir el producto, color o vista solo cuando eso aparezca en la imagen. No copiar el mismo ALT a todas las fotos de una galería.
6. No publicar testimonios, calificaciones o cifras de clientes sin fuente verificable. Las cifras y citas que estaban codificadas directamente en el home se reemplazaron por información de marca presente en el sitio.
7. Escribir inglés estadounidense natural y verificar las medidas (inches, cup/band sizing), políticas de envío/retorno y disponibilidad para clientes de EE. UU.

## Orden de trabajo

### Hecho en esta actualización

- Se ajustaron los títulos y descripciones de home, categorías y subcategorías para reflejar el catálogo observado sin llamar “silk” a todo el sleepwear.
- Se dejaron temporalmente fuera de indexación las fichas sin descripción o sin imagen real, y las subcategorías vacías.
- Se usa ALT por imagen desde Shopify cuando existe; si falta, se genera un fallback con el nombre del producto y número de vista.
- Se retiraron de la portada métricas y reseñas codificadas localmente que no están vinculadas a una fuente verificable; en su lugar se presentan hechos de marca ya descritos en About Us.

### Siguiente paso: limpiar los datos de Shopify

Revisar los productos sin `Product type`, corregir los ALT y descripciones de cada producto, y decidir si `Pijama` es un producto real que debe completarse o un artículo de prueba que se debe despublicar. También revisar que el producto de USD 0 siga archivado/no disponible y no tenga una variante comprable a ese precio.

### Después: validar términos y mejorar páginas

Validar cada grupo con Google Keyword Planner/Trends y, con el tiempo, Search Console. Optimizar primero las cinco páginas P0 y sus fichas de producto. Redactar guías solo si podemos aportar información útil y precisa basada en el catálogo y la experiencia de la marca.

### Medición

En Search Console revisar por página y consulta: impresiones, clics, CTR, posición media, estado de indexación y páginas descubiertas del sitemap. Complementar con analítica de ecommerce para ver sesiones de búsqueda orgánica, visitas de producto, add-to-cart y compras. No evaluar cambios por una sola métrica ni esperar resultados inmediatos.
