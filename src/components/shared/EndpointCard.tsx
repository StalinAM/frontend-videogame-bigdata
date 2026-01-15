import { type MutableRefObject } from 'react'
import { Card } from '@/components/ui/card'
import { Loading } from './Loading'
import { ErrorMsg } from './ErrorMsg'

type EndpointState = {
  data: unknown
  loading: boolean
  error: string | null
}

export function EndpointCard({
  id,
  title,
  description,
  state,
  children,
  sectionRef
}: {
  id: string
  title: string
  description?: string
  state: EndpointState
  children: React.ReactNode
  sectionRef?: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <Card
      id={id}
      ref={sectionRef}
      className='p-3 sm:p-4 flex flex-col gap-3 border-border/70 shadow-sm'
    >
      <div className='flex items-start justify-between gap-2 sm:gap-3'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-base sm:text-lg font-semibold break-words'>
            {title}
          </h3>
          {description && (
            <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
              {description}
            </p>
          )}
        </div>
        <div className='text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0'>
          GET
        </div>
      </div>
      {state.loading && <Loading />}
      {state.error && <ErrorMsg error={state.error} />}
      {!state.loading && !state.error && children}
    </Card>
  )
}
