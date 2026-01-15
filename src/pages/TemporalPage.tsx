import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { StatCard } from '@/components/shared/StatCard'
import { BarChart, LineChart } from '@/components/ui/chart'
import { Calendar, TrendingUp, Clock, Activity } from 'lucide-react'

const formatDay = (value: number | string) => {
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const idx = Number(value) - 1
  return dayNames[idx] ?? String(value)
}

export default function TemporalPage() {
  const {
    temporalYearly,
    fetchTemporalYearly,
    temporalMonthly,
    fetchTemporalMonthly,
    temporalDayOfWeek,
    fetchTemporalDayOfWeek
  } = useApiStore()

  useEffect(() => {
    fetchTemporalYearly()
    fetchTemporalMonthly()
    fetchTemporalDayOfWeek()
  }, [fetchTemporalYearly, fetchTemporalMonthly, fetchTemporalDayOfWeek])

  const yearlyData = Array.isArray(temporalYearly.data)
    ? temporalYearly.data.map((d: any) => ({
        year: d.year ?? d.period ?? '',
        count: d.review_count ?? d.count ?? 0
      }))
    : []

  const monthlyData = Array.isArray(temporalMonthly.data)
    ? temporalMonthly.data.map((d: any) => ({
        month: d.month ?? d.period ?? '',
        count: d.review_count ?? d.count ?? 0
      }))
    : []

  const weekdayData = Array.isArray(temporalDayOfWeek.data)
    ? temporalDayOfWeek.data.map((d: any) => ({
        day: formatDay(d.day_of_week ?? d.day ?? d.period ?? ''),
        count: d.review_count ?? d.count ?? 0
      }))
    : []

  // Calcular estadísticas
  const totalYears = yearlyData.length
  const totalMonths = monthlyData.length
  const peakDay = weekdayData.reduce(
    (max, curr) => (curr.count > max.count ? curr : max),
    { day: '—', count: 0 }
  )
  const avgReviewsPerYear =
    yearlyData.length > 0
      ? Math.round(
          yearlyData.reduce((sum, d) => sum + d.count, 0) / yearlyData.length
        )
      : 0

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>
          Análisis Temporal
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Tendencias de actividad por año, mes y día de la semana
        </p>
      </header>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
        <StatCard
          title='Años Registrados'
          value={totalYears}
          subtitle='Años con actividad'
          icon={Calendar}
          iconColor='text-cyan-500'
        />
        <StatCard
          title='Meses Analizados'
          value={totalMonths}
          subtitle='Períodos mensuales'
          icon={Clock}
          iconColor='text-blue-500'
        />
        <StatCard
          title='Día Más Activo'
          value={peakDay.day}
          subtitle={`${peakDay.count} reseñas`}
          icon={Activity}
          iconColor='text-purple-500'
        />
        <StatCard
          title='Promedio Anual'
          value={avgReviewsPerYear}
          subtitle='Reseñas por año'
          icon={TrendingUp}
          iconColor='text-green-500'
        />
      </div>

      <header className='space-y-2 mt-4'>
        <h2 className='text-xl sm:text-2xl font-bold tracking-tight'>
          Tendencias Temporales
        </h2>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Visualización de patrones de actividad en diferentes períodos
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
        <EndpointCard
          id='temporalYearly'
          title='Actividad Anual'
          description='Evolución de reseñas por año'
          state={temporalYearly}
        >
          <div className='w-full overflow-x-auto'>
            <LineChart
              data={yearlyData}
              keys={['count']}
              indexBy='year'
              colors={['hsl(180, 100%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>
        <EndpointCard
          id='temporalMonthly'
          title='Actividad Mensual'
          description='Distribución de reseñas por mes'
          state={temporalMonthly}
        >
          <div className='w-full overflow-x-auto'>
            <LineChart
              data={monthlyData}
              keys={['count']}
              indexBy='month'
              colors={['hsl(200, 100%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:gap-6'>
        <EndpointCard
          id='temporalDayOfWeek'
          title='Actividad por Día de la Semana'
          description='Patrón semanal de publicación de reseñas'
          state={temporalDayOfWeek}
        >
          <div className='w-full overflow-x-auto'>
            <BarChart
              data={weekdayData}
              keys={['count']}
              indexBy='day'
              colors={['hsl(280, 70%, 50%)']}
              height={300}
            />
          </div>
        </EndpointCard>
      </div>
    </div>
  )
}
