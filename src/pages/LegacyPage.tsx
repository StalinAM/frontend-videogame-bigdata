import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function LegacyPage() {
  const { statsLegacy, fetchStatsLegacy } = useApiStore()

  useEffect(() => {
    fetchStatsLegacy()
  }, [fetchStatsLegacy])

  const legacyIsObject =
    statsLegacy.data &&
    typeof statsLegacy.data === 'object' &&
    !Array.isArray(statsLegacy.data)

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          Legacy
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Fallback con resultados legacy (CSV o top-reviewed 1000).
        </p>
      </header>

      <EndpointCard
        id='statsLegacy'
        title='GET /stats'
        description='Devuelve CSV legacy o redirige a top-reviewed.'
        state={statsLegacy}
      >
        {legacyIsObject ? (
          <pre className='bg-muted p-3 rounded-md overflow-x-auto text-xs sm:text-sm'>
            {JSON.stringify(statsLegacy.data, null, 2)}
          </pre>
        ) : (
          <Skeleton className='h-24 w-full' />
        )}
      </EndpointCard>
    </div>
  )
}
