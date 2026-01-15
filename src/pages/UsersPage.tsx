import { useEffect } from 'react'
import { useApiStore } from '@/store/apiStore'
import { EndpointCard } from '@/components/shared/EndpointCard'
import { BarChart } from '@/components/ui/chart'

const sliceData = <T,>(data: T[], max = 15) => data.slice(0, max)

export default function UsersPage() {
  const { usersTopReviewers, fetchUsersTopReviewers } = useApiStore()

  useEffect(() => {
    fetchUsersTopReviewers()
  }, [fetchUsersTopReviewers])

  const topReviewersData = Array.isArray(usersTopReviewers.data)
    ? sliceData(
        usersTopReviewers.data.map((d: any) => ({
          user: d.reviewerID ?? d.user ?? 'N/D',
          reviews: d.review_count ?? d.count ?? 0
        })),
        12
      )
    : []

  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 w-full'>
      <header className='space-y-2'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          User Analysis
        </h1>
        <p className='text-sm sm:text-base text-muted-foreground'>
          Reviewers más activos y su volumen de reseñas.
        </p>
      </header>

      <EndpointCard
        id='usersTopReviewers'
        title='GET /users/top-reviewers'
        description='Top reviewers y promedio de rating dado.'
        state={usersTopReviewers}
      >
        <div className='w-full overflow-x-auto'>
          <BarChart
            data={topReviewersData}
            keys={['reviews']}
            indexBy='user'
            colors={['var(--chart-2)']}
            height={260}
          />
        </div>
      </EndpointCard>
    </div>
  )
}
