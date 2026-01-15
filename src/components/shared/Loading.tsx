import { Loader2 } from 'lucide-react'

export function Loading() {
  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
      <Loader2 className='animate-spin' />
      Cargando...
    </div>
  )
}
