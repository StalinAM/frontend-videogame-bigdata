import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Home,
  BarChart3,
  Calendar,
  Gamepad2,
  Monitor,
  FileText,
  Users,
  AlertTriangle,
  Archive,
  Menu
} from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

export type SidebarSection = {
  id: string
  label: string
  path: string
  icon?: React.ComponentType<{ className?: string }>
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  general: Home,
  statistics: BarChart3,
  temporal: Calendar,
  games: Gamepad2,
  platforms: Monitor,
  text: FileText,
  users: Users,
  outliers: AlertTriangle,
  legacy: Archive
}

interface SidebarContentProps {
  sections: SidebarSection[]
  onNavigate?: () => void
}

function SidebarContent({ sections, onNavigate }: SidebarContentProps) {
  const location = useLocation()

  return (
    <>
      <div className='pb-4 border-b border-sidebar-border'>
        <h2 className='text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>
          Video Game BigData
        </h2>
        <p className='text-xs text-sidebar-foreground/60 mt-1'>
          Análisis de reseñas
        </p>
      </div>
      <nav className='flex-1 flex flex-col gap-1 overflow-y-auto'>
        {sections.map((section) => {
          const isActive = location.pathname === section.path
          const Icon = iconMap[section.id] || Home
          return (
            <Link
              key={section.id}
              to={section.path}
              className='block'
              onClick={onNavigate}
            >
              <Button
                variant='ghost'
                className={cn(
                  'justify-start w-full text-left h-10 px-3 transition-all',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold border-l-2 border-cyan-500'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground border-l-2 border-transparent'
                )}
              >
                <Icon className='mr-3 h-4 w-4 shrink-0' />
                <span className='truncate text-sm'>{section.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

interface SidebarProps {
  sections: SidebarSection[]
}

export function Sidebar({ sections }: SidebarProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='fixed top-4 left-4 z-50 lg:hidden'
            aria-label='Abrir menú'
          >
            <Menu className='h-5 w-5' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-72 p-0'>
          <div className='p-4 flex flex-col gap-6 h-full'>
            <SidebarContent
              sections={sections}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside className='hidden lg:flex w-64 xl:w-72 bg-sidebar border-r border-sidebar-border p-4 flex-col gap-6 h-screen sticky top-0'>
      <SidebarContent sections={sections} />
    </aside>
  )
}
