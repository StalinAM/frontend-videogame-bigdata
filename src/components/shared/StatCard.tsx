import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  iconColor?: string
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = 'text-cyan-500'
}: StatCardProps) {
  return (
    <Card className='p-4 sm:p-6 bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <p className='text-xs sm:text-sm text-muted-foreground font-medium mb-1'>
            {title}
          </p>
          <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2'>
            {value}
          </h3>
          {subtitle && (
            <p className='text-xs sm:text-sm text-muted-foreground'>
              {subtitle}
            </p>
          )}
          {trend && (
            <p
              className={cn(
                'text-xs sm:text-sm font-medium mt-2',
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {trend.value}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-lg bg-background/50', iconColor)}>
          <Icon className='h-5 w-5 sm:h-6 sm:w-6' />
        </div>
      </div>
    </Card>
  )
}
