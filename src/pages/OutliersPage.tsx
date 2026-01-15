import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { BarChart } from '@/components/ui/chart'

const sliceData = <T,>(data: T[], max = 15) => data.slice(0, max)

export default function OutliersPage() {
  const { outliersRatings, fetchOutliersRatings } = useApiStore()

  useEffect(() => {
    fetchOutliersRatings()
  }, [fetchOutliersRatings])

  const outliersData = Array.isArray(outliersRatings.data)
    ? sliceData(
        outliersRatings.data.map((d: any) => ({
          game: d.asin ?? d.game ?? 'N/D',
          rating: d.overall ?? d.rating ?? 0
        })),
        12
      )
    : []

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          Outliers
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Ratings muy alejados del promedio por juego.
        </p>
      </header>

      <EndpointCard
        id='outliersRatings'
        title='GET /outliers/ratings'
        description='Diferencia vs promedio del juego.'
        state={outliersRatings}
      >
        <div className='w-full overflow-x-auto'>
          <BarChart
            data={outliersData}
            keys={['rating']}
            indexBy='game'
            colors={['var(--chart-3)']}
            height={260}
          />
        </div>
      </EndpointCard>
    </div>
  )
}
