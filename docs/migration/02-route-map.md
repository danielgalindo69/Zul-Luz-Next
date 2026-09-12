# Mapa de rutas

Todas comparten Layout; entradas desde header/footer/cards. No se cambia el idioma inglés del boceto.

| URL original y destino | Vista | Datos / estado | Next.js |
|---|---|---|---|
| `/` | Home | best sellers, newsletter, carrusel | `app/page.tsx` |
| `/lingerie`, `/sleepwear`, `/lifestyle`, `/best-sellers` | CategoryPage | catálogo, orden y favoritos | `app/[category]/page.tsx` validado |
| `/lingerie/:sub`, `/lifestyle/:sub` | CategoryPage | subcategoría, orden | `app/[category]/[sub]/page.tsx` validado |
| `/gift-ideas` | GiftIdeas | regalos, filtro de precio | `app/gift-ideas/page.tsx` |
| `/about` | AboutUs | editorial y animación al scroll | `app/about/page.tsx` |
| `/size-guide` | SizeGuide | tablas, pestañas | `app/size-guide/page.tsx` |
| `/profile` | Profile | favoritos y cuenta simulada | `app/profile/page.tsx` |
| `/product/:id` | ProductDetail | producto, variantes y relacionados | `app/product/[id]/page.tsx` |
| cualquier otra | NotFound | sin datos | `app/not-found.tsx` |

Subcategorías navegables válidas: lingerie/bras, lingerie/panties, lingerie/sets, lifestyle/home-fragrance, lifestyle/scrunchies. Sleepwear no tenía ruta de subcategoría.
Productos: ale-lace-bra, luna-soft-bra, ale-hipster-panty, ale-brazilian-thong, ale-lace-set, pajama-short-set, silk-robe, silk-nightgown, long-pajama-set, botanical-wax-freshener, scrunchies-set.

`?type=` del megamenú y `?q=` del formulario se preservan, pero no filtraban el catálogo original. No se inventa comportamiento comercial nuevo. No había carga asíncrona; lista vacía y producto inexistente se tratan en las vistas. Next añadirá 404 HTTP para recursos desconocidos, frente al fallback SPA anterior.
