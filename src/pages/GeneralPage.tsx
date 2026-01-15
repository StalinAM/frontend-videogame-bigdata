import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { Skeleton } from '@/components/ui/skeleton'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { StatCard } from '@/components/shared/StatCard'
import { Info, Activity, List, Package } from 'lucide-react'

export default function GeneralPage() {
  const { info, fetchInfo } = useApiStore()

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  const apiInfo =
    info.data && typeof info.data === 'object' ? (info.data as any) : null

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
      {apiInfo && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
          <StatCard
            title='Total Endpoints'
            value={apiInfo.total_endpoints ?? '—'}
            subtitle='APIs disponibles'
            icon={List}
            iconColor='text-cyan-500'
          />
          <StatCard
            title='Versión API'
            value={apiInfo.version ?? '—'}
            subtitle='Última actualización'
            icon={Info}
            iconColor='text-blue-500'
          />
          <StatCard
            title='Análisis Disponibles'
            value={apiInfo.available_analyses?.length ?? '—'}
            subtitle='Categorías activas'
            icon={Activity}
            iconColor='text-purple-500'
          />
          <StatCard
            title='Estado'
            value='Activo'
            subtitle='Sistema operativo'
            icon={Package}
            iconColor='text-green-500'
          />
        </div>
      )}

      <header className='space-y-2 mt-4'>
        <h2 className='text-xl sm:text-2xl font-bold tracking-tight'>
          Información de la API
        </h2>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Detalles técnicos y endpoints disponibles
        </p>
      </header>

      <EndpointCard
        id='info'
        title='GET /'
        description='Información de la API y análisis disponibles.'
        state={info}
      >
        {apiInfo ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div className='rounded-lg border border-border/70 p-3'>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Mensaje
              </p>
              <p className='font-medium text-sm sm:text-base break-words'>
                {apiInfo.message}
              </p>
            </div>
            <div className='rounded-lg border border-border/70 p-3'>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Versión
              </p>
              <p className='font-medium text-sm sm:text-base'>
                {apiInfo.version}
              </p>
            </div>
            <div className='rounded-lg border border-border/70 p-3 sm:col-span-2'>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Análisis disponibles
              </p>
              <p className='font-medium text-xs sm:text-sm break-words'>
                {apiInfo.available_analyses?.join(', ')}
              </p>
            </div>
            <div className='rounded-lg border border-border/70 p-3'>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Total endpoints
              </p>
              <p className='font-medium text-sm sm:text-base'>
                {apiInfo.total_endpoints}
              </p>
            </div>
            <div className='rounded-lg border border-border/70 p-3'>
              <p className='text-xs sm:text-sm text-muted-foreground'>
                Documentación
              </p>
              <p className='font-medium text-xs sm:text-sm break-words'>
                {apiInfo.documentation}
              </p>
            </div>
          </div>
        ) : (
          <Skeleton className='h-32 w-full' />
        )}
      </EndpointCard>
    </div>
  )
}
