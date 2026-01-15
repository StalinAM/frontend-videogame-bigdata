import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { StatCard } from '@/components/shared/StatCard'
import { ProductList } from '@/components/shared/ProductList'
import { BarChart } from '@/components/ui/chart'
import { Gamepad2, TrendingUp, TrendingDown, Medal } from 'lucide-react'

const sliceData = <T,>(data: T[], max = 5) => data.slice(0, max)

export default function GamesPage() {
  const {
    gamesTopReviewed,
    fetchGamesTopReviewed,
    gamesTopRated,
    fetchGamesTopRated,
    gamesWorstRated,
    fetchGamesWorstRated,
    productsTopReviewedNames,
    productsTopRatedNames,
    fetchProductsTopReviewedNames,
    fetchProductsTopRatedNames
  } = useApiStore()

  useEffect(() => {
    fetchGamesTopReviewed()
    fetchGamesTopRated()
    fetchGamesWorstRated()
    fetchProductsTopReviewedNames(5)
    fetchProductsTopRatedNames(5)
  }, [
    fetchGamesTopReviewed,
    fetchGamesTopRated,
    fetchGamesWorstRated,
    fetchProductsTopReviewedNames,
    fetchProductsTopRatedNames
  ])

  const topReviewedData = Array.isArray(gamesTopReviewed.data)
    ? sliceData(
        gamesTopReviewed.data.map((d: any) => ({
          game: d.asin ?? d.game ?? 'N/D',
          reviews: d.review_count ?? d.count ?? 0
        })),
        5
      )
    : []

  const topRatedData = Array.isArray(gamesTopRated.data)
    ? sliceData(
        gamesTopRated.data.map((d: any) => ({
          game: d.asin ?? d.game ?? 'N/D',
          rating: d.avg_rating ?? d.rating ?? d.overall ?? 0
        })),
        5
      )
    : []

  const worstRatedData = Array.isArray(gamesWorstRated.data)
    ? sliceData(
        gamesWorstRated.data.map((d: any) => ({
          game: d.asin ?? d.game ?? 'N/D',
          rating: d.avg_rating ?? d.rating ?? d.overall ?? 0
        })),
        5
      )
    : []

  // Combinar datos de games (estadísticas) con products (nombres)
  const combineProductData = (statsData: unknown, namesData: unknown) => {
    if (!Array.isArray(statsData)) return null

    // Crear un mapa de nombres por ASIN
    const namesMap = new Map()
    if (Array.isArray(namesData)) {
      namesData.forEach((item) => {
        if (item.asin && item.product_name) {
          namesMap.set(item.asin, item.product_name)
        }
      })
    }

    // Combinar estadísticas con nombres
    return statsData.map((stat) => ({
      asin: stat.asin,
      product_name: namesMap.get(stat.asin) || stat.name,
      review_count: stat.review_count ?? stat.reviews,
      avg_rating: stat.avg_rating ?? stat.rating,
      rating: stat.rating ?? stat.avg_rating
    }))
  }

  const topReviewedProducts = combineProductData(
    gamesTopReviewed.data,
    productsTopReviewedNames.data
  )

  const topRatedProducts = combineProductData(
    gamesTopRated.data,
    productsTopRatedNames.data
  )

  const topReviewedLoading =
    productsTopReviewedNames.loading || gamesTopReviewed.loading
  const topRatedLoading = productsTopRatedNames.loading || gamesTopRated.loading

  const topReviewedError =
    productsTopReviewedNames.error || gamesTopReviewed.error
  const topRatedError = productsTopRatedNames.error || gamesTopRated.error

  // Calcular estadísticas
  const totalGames = Array.isArray(gamesTopReviewed.data)
    ? gamesTopReviewed.data.length
    : 0
  const mostReviewed = topReviewedData[0] || { game: '—', reviews: 0 }
  const bestRated = topRatedData[0] || { game: '—', rating: 0 }
  const avgRating =
    topRatedData.length > 0
      ? (
          topRatedData.reduce((sum, d) => sum + Number(d.rating), 0) /
          topRatedData.length
        ).toFixed(1)
      : 0

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>
          Análisis de Juegos
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Ranking de juegos más reseñados y mejor/peor valorados
        </p>
      </header>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
        <StatCard
          title='Total Juegos'
          value={totalGames}
          subtitle='Productos analizados'
          icon={Gamepad2}
          iconColor='text-cyan-500'
        />
        <StatCard
          title='Más Reseñado'
          value={mostReviewed.reviews}
          subtitle={`ASIN: ${mostReviewed.game.substring(0, 8)}`}
          icon={TrendingUp}
          iconColor='text-blue-500'
        />
        <StatCard
          title='Mejor Valorado'
          value={Number(bestRated.rating).toFixed(1)}
          subtitle={`ASIN: ${bestRated.game.substring(0, 8)}`}
          icon={Medal}
          iconColor='text-yellow-500'
        />
        <StatCard
          title='Rating Promedio Top'
          value={avgRating}
          subtitle='De los mejor valorados'
          icon={TrendingDown}
          iconColor='text-purple-500'
        />
      </div>

      <header className='space-y-2 mt-4'>
        <h2 className='text-xl sm:text-2xl font-bold tracking-tight'>
          Rankings de Juegos
        </h2>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Visualización de productos destacados y tendencias
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
        <EndpointCard
          id='gamesTopReviewed'
          title='Top 5 Juegos Más Reseñados'
          description='Productos con mayor cantidad de reseñas'
          state={gamesTopReviewed}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={topReviewedData}
              keys={['reviews']}
              indexBy='game'
              colors={['hsl(280, 70%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>
        <EndpointCard
          id='gamesTopRated'
          title='Top 5 Juegos Mejor Valorados'
          description='Productos con las mejores calificaciones'
          state={gamesTopRated}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={topRatedData}
              keys={['rating']}
              indexBy='game'
              colors={['hsl(160, 70%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:gap-6'>
        <EndpointCard
          id='gamesWorstRated'
          title='Juegos Peor Valorados'
          description='Productos con las calificaciones más bajas'
          state={gamesWorstRated}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={worstRatedData}
              keys={['rating']}
              indexBy='game'
              colors={['hsl(0, 70%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>
      </div>

      {/* Sección de listados */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6'>
        <ProductList
          title='Juegos Más Reseñados'
          description='Listado completo ordenado por reseñas'
          data={topReviewedProducts}
          loading={topReviewedLoading}
          error={topReviewedError}
          limit={5}
        />
        <ProductList
          title='Juegos Mejor Valorados'
          description='Listado completo ordenado por rating'
          data={topRatedProducts}
          loading={topRatedLoading}
          error={topRatedError}
          limit={5}
        />
      </div>
    </div>
  )
}
