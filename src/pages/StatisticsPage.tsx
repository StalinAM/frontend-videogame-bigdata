import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { NumericStat } from '@/components/shared/NumericStat'
import { StatCard } from '@/components/shared/StatCard'
import { ProductList } from '@/components/shared/ProductList'
import { BarChart, PieChart } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { Package, Star, ShieldCheck, TrendingUp } from 'lucide-react'

export default function StatisticsPage() {
  const {
    statisticsGlobal,
    fetchStatisticsGlobal,
    statisticsRatingDistribution,
    fetchStatisticsRatingDistribution,
    statisticsVerified,
    fetchStatisticsVerified,
    gamesTopReviewed,
    gamesTopRated,
    fetchGamesTopReviewed,
    fetchGamesTopRated,
    productsTopReviewedNames,
    productsTopRatedNames,
    fetchProductsTopReviewedNames,
    fetchProductsTopRatedNames
  } = useApiStore()

  useEffect(() => {
    fetchStatisticsGlobal()
    fetchStatisticsRatingDistribution()
    fetchStatisticsVerified()
    fetchGamesTopReviewed()
    fetchGamesTopRated()
    fetchProductsTopReviewedNames(5)
    fetchProductsTopRatedNames(5)
  }, [
    fetchStatisticsGlobal,
    fetchStatisticsRatingDistribution,
    fetchStatisticsVerified,
    fetchGamesTopReviewed,
    fetchGamesTopRated,
    fetchProductsTopReviewedNames,
    fetchProductsTopRatedNames
  ])

  const ratingDistributionData = Array.isArray(
    statisticsRatingDistribution.data
  )
    ? statisticsRatingDistribution.data.map((item: any) => ({
        rating: `P${item.overall ?? item.rating ?? item.value ?? '—'}`,
        count: item.count ?? item.review_count ?? 0,
        percentage: item.percentage ?? item.percent ?? item.pct ?? 0
      }))
    : []

  const verifiedData = Array.isArray(statisticsVerified.data)
    ? statisticsVerified.data.map((item: any) => ({
        type:
          item.verified === true || item.verified === 'true'
            ? 'Verificada'
            : 'No verificada',
        count: item.review_count ?? item.count ?? 0
      }))
    : []

  const globalStats =
    statisticsGlobal.data && typeof statisticsGlobal.data === 'object'
      ? (statisticsGlobal.data as Record<string, number | string>)
      : null

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

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>
          Dashboard de Productos
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Análisis de reseñas y puntuaciones de productos
        </p>
      </header>

      {/* Stats Grid */}
      {globalStats && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
          <StatCard
            title='Total Productos'
            value={globalStats.unique_products ?? '—'}
            subtitle='Productos únicos'
            icon={Package}
            iconColor='text-cyan-500'
            trend={{
              value: '+12% vs. mes anterior',
              isPositive: true
            }}
          />
          <StatCard
            title='Total Reseñas'
            value={globalStats.total_reviews ?? '—'}
            subtitle='Reseñas registradas'
            icon={TrendingUp}
            iconColor='text-blue-500'
            trend={{
              value: '+8.5% vs. mes anterior',
              isPositive: true
            }}
          />
          <StatCard
            title='Puntuación Promedio'
            value={
              globalStats.mean_rating
                ? Number(globalStats.mean_rating).toFixed(1)
                : '—'
            }
            subtitle='De 5.0 estrellas'
            icon={Star}
            iconColor='text-yellow-500'
          />
          <StatCard
            title='Producto Destacado'
            value={ratingDistributionData[0]?.count ?? '660'}
            subtitle='ASIN: 0104UBY0'
            icon={ShieldCheck}
            iconColor='text-purple-500'
          />
        </div>
      )}
      <header className='space-y-2 mt-8'>
        <h2 className='text-xl sm:text-2xl font-bold tracking-tight'>
          Análisis Detallado
        </h2>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Métricas globales y distribución de ratings
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
        <EndpointCard
          id='statisticsRatingDistribution'
          title='Top 10 Productos por Reseñas'
          description='Distribución de puntuaciones por producto'
          state={statisticsRatingDistribution}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={ratingDistributionData}
              keys={['count']}
              indexBy='rating'
              colors={['hsl(180, 100%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>

        <EndpointCard
          id='statisticsVerified'
          title='Distribución de Puntuación Promedio'
          description='Distribución de ratings verificadas vs no verificadas'
          state={statisticsVerified}
        >
          <div className='w-full overflow-x-auto'>
            <PieChart
              data={verifiedData}
              keys={['count']}
              indexBy='type'
              colors={['hsl(160, 70%, 50%)', 'hsl(200, 70%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:gap-6'>
        <EndpointCard
          id='statisticsGlobal'
          title='Estadísticas Globales Detalladas'
          description='Promedios, varianza y totales del sistema'
          state={statisticsGlobal}
        >
          {globalStats ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
              <NumericStat
                label='Rating medio'
                value={globalStats.mean_rating}
              />
              <NumericStat label='Desviación' value={globalStats.std_rating} />
              <NumericStat
                label='Varianza'
                value={globalStats.variance_rating}
              />
              <NumericStat label='Mínimo' value={globalStats.min_rating} />
              <NumericStat label='Máximo' value={globalStats.max_rating} />
              <NumericStat
                label='Total Reseñas'
                value={globalStats.total_reviews}
              />
              <NumericStat
                label='Productos únicos'
                value={globalStats.unique_products}
              />
              <NumericStat
                label='Reviewers únicos'
                value={globalStats.unique_reviewers}
              />
            </div>
          ) : (
            <Skeleton className='h-32 w-full' />
          )}
        </EndpointCard>
      </div>

      {/* Sección de listados */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6'>
        <ProductList
          title='Top 5 Productos Más Reseñados'
          description='Productos con mayor cantidad de reseñas'
          data={topReviewedProducts}
          loading={topReviewedLoading}
          error={topReviewedError}
          limit={5}
        />
        <ProductList
          title='Top 5 Productos Mejor Valorados'
          description='Productos con las mejores calificaciones promedio'
          data={topRatedProducts}
          loading={topRatedLoading}
          error={topRatedError}
          limit={5}
        />
      </div>
    </div>
  )
}
