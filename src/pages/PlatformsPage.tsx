import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { BarChart } from '@/components/ui/chart'

export default function PlatformsPage() {
  const { platformsStatistics, fetchPlatformsStatistics } = useApiStore()

  useEffect(() => {
    fetchPlatformsStatistics()
  }, [fetchPlatformsStatistics])

  const platformData = Array.isArray(platformsStatistics.data)
    ? platformsStatistics.data.map((d: any) => ({
        platform: d.platform ?? d.name ?? 'N/D',
        count: d.review_count ?? d.count ?? 0
      }))
    : []

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          Platform Analysis
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Comparativa de reseñas por plataforma.
        </p>
      </header>

      <EndpointCard
        id='platformsStatistics'
        title='GET /platforms/statistics'
        description='Puede devolver fallback si no hay CSV.'
        state={platformsStatistics}
      >
        <div className='w-full overflow-x-auto'>
          <BarChart
            data={platformData}
            keys={['count']}
            indexBy='platform'
            colors={['var(--chart-1)']}
            height={260}
          />
        </div>
      </EndpointCard>
    </div>
  )
}
