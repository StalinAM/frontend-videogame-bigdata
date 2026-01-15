# Frontend - Video Game Big Data

[![Vite](https://img.shields.io/badge/Vite-frontend-blue?logo=vite)](https://vitejs.dev/) [![React](https://img.shields.io/badge/React-19.x-blue?logo=react)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/) [![Zustand](https://img.shields.io/badge/Zustand-state-yellow)](https://docs.pmnd.rs/zustand/getting-started/introduction)

## Resumen rápido

- Dashboard profesional para análisis de reseñas y productos de videojuegos.
- Stack: [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction), [TailwindCSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Recharts](https://recharts.org/).
- Consumo de backend RESTful para estadísticas, rankings y detalles de productos.

## Requisitos

- [Node.js](https://nodejs.org/) >= 18 (recomendado 18/20)
- [pnpm](https://pnpm.io/) (recomendado) o npm/yarn
- Backend disponible en `http://localhost:8000` (o la URL que configures)

## Instalación rápida

1. Clona el repositorio:

   ```bash
   git clone <repo>
   cd frontend-video-game-bigdata
   ```

2. Instala dependencias:

   ```bash
   pnpm install
   # o
   npm install
   ```

3. Crea `.env.local` en la raíz:

   ```env
   VITE_API_BASE=http://localhost:8000
   # Opcional: solo si usas Easyparser
   VITE_EASYPARSER_API_KEY=your-easyparser-api-key
   ```

4. Arranca el servidor de desarrollo:

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

## Scripts útiles

- `pnpm dev` — servidor de desarrollo
- `pnpm build` — build de producción
- `pnpm preview` — servir build local
- `pnpm lint` — linting con eslint

## Documentación y recursos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/guide/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Recharts](https://recharts.org/en-US/)

## Endpoints esperados del backend

El frontend espera los siguientes endpoints (GET, JSON):

- `/` — info general
- `/statistics/global` — stats globales
- `/statistics/rating-distribution` — distribución ratings
- `/statistics/verified` — ratings verificadas
- `/temporal/yearly`, `/temporal/monthly`, `/temporal/day-of-week` — series temporales
- `/games/top-reviewed`, `/games/top-rated`, `/games/worst-rated` — rankings
- `/products/top-reviewed-names?limit=5` y `/products/top-rated-names?limit=5` — nombres de productos

### Ejemplo de respuesta `/products/top-reviewed-names?limit=5`

```json
{
  "total": 5,
  "products": [
    { "asin": "B00104UBY0", "product_name": "Título del producto", "url": "https://www.amazon.com/dp/B00104UBY0", "status": "success" },
    ...
  ],
  "cached": true
}
```

### Ejemplo de combinación de datos

El frontend une los arrays de `/games/top-reviewed` y `/products/top-reviewed-names` por `asin` para mostrar nombre, reseñas y rating.

## Ejemplos curl para probar endpoints

```bash
curl http://localhost:8000/statistics/global
curl http://localhost:8000/games/top-reviewed
curl http://localhost:8000/products/top-reviewed-names?limit=5
```

## Seguridad y buenas prácticas

- No subas `.env.local` ni claves al repo.
- Si no usas Easyparser, elimina la clave y la lógica asociada en el store.
- Mantén sincronizados los contratos de backend y frontend.

## Despliegue

1. Configura `VITE_API_BASE` en producción.
2. Ejecuta `pnpm build` y sirve la carpeta `dist`.

---

¿Dudas? Consulta el archivo principal [`src/store/apiStore.ts`](src/store/apiStore.ts) y la documentación de cada dependencia.
