# Frontend - Video Game Big Data

Resumen rápido

- Proyecto frontend React + Vite + TypeScript para un dashboard de análisis de reseñas/productos.
- Usa Zustand para estado global, Tailwind/Componentes UI, y consumo de un backend REST que expone estadísticas y listados.

Requisitos

- Node.js >= 18 (recomendado 18/20)
- pnpm (recomendado) o npm/yarn
- El backend de datos disponible (por defecto en `http://localhost:8000`) con los endpoints documentados más abajo.

Instalación (local)

1. Clonar el repositorio

   git clone <repo>
   cd frontend-video-game-bigdata

2. Instalar dependencias

   pnpm install

   # o

   npm install

3. Variables de entorno

- Se recomienda crear un archivo `.env.local` en la raíz con las variables siguientes:

```
# URL base del backend (sin slash final)
VITE_API_BASE=http://localhost:8000

# (Opcional) API key para Easyparser si usas la funcionalidad de detalles en `productDetails`.
# Reemplaza por tu clave real o deja vacío si no usas Easyparser.
VITE_EASYPARSER_API_KEY=your-easyparser-api-key
```

Nota: El código actualmente usa `API_BASE` dentro de `src/store/apiStore.ts`. Si prefieres usar las variables de entorno, reemplaza la constante `API_BASE` por `import.meta.env.VITE_API_BASE`.

Scripts útiles

- pnpm dev # arranca el servidor de desarrollo (Vite)
- pnpm build # compila production
- pnpm preview # servir build localmente
- pnpm lint # lanzar eslint

(Usa `npm run ...` si no usas pnpm.)

## Dependencias principales

A continuación las dependencias utilizadas en el proyecto con enlaces a sus páginas en npm (puedes hacer click para ver documentación y versiones):

- @radix-ui/react-dialog — https://www.npmjs.com/package/@radix-ui/react-dialog
- @radix-ui/react-separator — https://www.npmjs.com/package/@radix-ui/react-separator
- @radix-ui/react-slot — https://www.npmjs.com/package/@radix-ui/react-slot
- @radix-ui/react-tabs — https://www.npmjs.com/package/@radix-ui/react-tabs
- @radix-ui/react-tooltip — https://www.npmjs.com/package/@radix-ui/react-tooltip
- @tailwindcss/vite — https://www.npmjs.com/package/@tailwindcss/vite
- class-variance-authority — https://www.npmjs.com/package/class-variance-authority
- clsx — https://www.npmjs.com/package/clsx
- lucide-react — https://www.npmjs.com/package/lucide-react
- react — https://www.npmjs.com/package/react
- react-dom — https://www.npmjs.com/package/react-dom
- react-router-dom — https://www.npmjs.com/package/react-router-dom
- recharts — https://www.npmjs.com/package/recharts
- tailwind-merge — https://www.npmjs.com/package/tailwind-merge
- tailwindcss — https://www.npmjs.com/package/tailwindcss
- zustand — https://www.npmjs.com/package/zustand

## Dependencias de desarrollo

- @eslint/js — https://www.npmjs.com/package/@eslint/js
- @types/node — https://www.npmjs.com/package/@types/node
- @types/react — https://www.npmjs.com/package/@types/react
- @types/react-dom — https://www.npmjs.com/package/@types/react-dom
- @types/react-router-dom — https://www.npmjs.com/package/@types/react-router-dom
- @vitejs/plugin-react-swc — https://www.npmjs.com/package/@vitejs/plugin-react-swc
- eslint — https://www.npmjs.com/package/eslint
- eslint-plugin-react-hooks — https://www.npmjs.com/package/eslint-plugin-react-hooks
- eslint-plugin-react-refresh — https://www.npmjs.com/package/eslint-plugin-react-refresh
- globals — https://www.npmjs.com/package/globals
- tw-animate-css — https://www.npmjs.com/package/tw-animate-css
- typescript — https://www.npmjs.com/package/typescript
- typescript-eslint — https://www.npmjs.com/package/typescript-eslint
- vite — https://www.npmjs.com/package/vite

Puntos importantes del backend (endpoints esperados)
El frontend espera que el backend ofrezca estos endpoints (método GET) y formatos JSON:

- GET / -> estado/info general (cualquier JSON)
- GET /statistics/global -> objeto con campos tipo `mean_rating`, `total_reviews`, `unique_products`, etc.
- GET /statistics/rating-distribution -> array [{ overall | rating | value, count | review_count, percentage | percent | pct }]
- GET /statistics/verified -> array [{ verified, review_count | count }]

Temporales

- GET /temporal/yearly
- GET /temporal/monthly
- GET /temporal/day-of-week

Juegos / Productos (estadísticas)

- GET /games/top-reviewed -> array [{ asin, review_count, avg_rating, rating, ... }]
- GET /games/top-rated -> array [{ asin, avg_rating, rating, ... }]
- GET /games/worst-rated -> array similar

Nombres de producto (nuevo)

- GET /products/top-reviewed-names?limit=5 -> respuesta esperada:
  {
  total: 5,
  products: [
  { asin: 'B00104UBY0', product_name: 'Título del producto', url: 'https://www.amazon.com/dp/B00104UBY0', status: 'success' },
  ...
  ],
  cached: true
  }

- GET /products/top-rated-names?limit=5 -> mismo formato

Notas sobre combinación de datos

- El frontend combina los arrays de `games*` (estadísticas) con `products*Names` (nombres) mediante el `asin`.
- Resultado combinado (lo que renderiza `ProductList`) tiene campos: `asin`, `product_name`, `review_count`, `avg_rating`, `rating`.
- Si el endpoint de nombres no está presente, el frontend usa solo los datos de `games*` (sin nombre) y mostrará `ASIN` como fallback.

Detalles técnicos y seguridad

- Actualmente `src/store/apiStore.ts` contiene una llamada a Easyparser para `fetchProductDetail`. Si no quieres usar Easyparser, elimina o sustituye esa llamada y usa `VITE_EASYPARSER_API_KEY` si es necesario.
- No expongas claves en el repositorio. Usa variables de entorno y `.env.local` (no subir al repo).

Persistencia y cache

- Zustand `persist` está configurado con la key `api-product-details-storage` y actualmente persiste `productDetails` (detalles por ASIN) en `localStorage`.
- La lógica de nombres top ahora usa la respuesta del backend y evita llamadas externas repetidas.

Despliegue

1. Configurar `VITE_API_BASE` en el entorno de producción.
2. Ejecutar `pnpm build` y servir la carpeta `dist` con un servidor estático.

Depuración

- Usa la consola del navegador para ver `console.log` existentes (se usan en desarrollo en `StatisticsPage` durante cambios).
- Si el frontend muestra `No hay datos disponibles`, verifica que el backend responda con arrays válidos (200 OK) para los endpoints mencionados.

Contribuir

- Formato y lint: usar `eslint` antes de abrir PR.
- TypeScript: seguir tipos ya definidos en `src/store/apiStore.ts`.

Contacto

- Mantener documentación del backend (contrato JSON) en sincronía con el frontend para evitar incompatibilidades.

---

Archivo principal del proyecto: `src/store/apiStore.ts` — revisar `API_BASE` y la lógica de `fetchProductsTopReviewedNames` / `fetchProductsTopRatedNames` si cambias la URL o el formato del backend.

Si quieres, puedo:

- Añadir ejemplos curl para cada endpoint
- Convertir `API_BASE` a usar `import.meta.env.VITE_API_BASE` automáticamente
- Añadir script para validar contract-response (mock)
