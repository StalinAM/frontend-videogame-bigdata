import { type ReactNode } from 'react'
import { Sidebar, type SidebarSection } from '@/components/ui/sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  sections: SidebarSection[]
}

export default function DashboardLayout({
  children,
  sections
}: DashboardLayoutProps) {
  return (
    <div className='flex min-h-screen bg-background'>
      <Sidebar sections={sections} />
      <main className='flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 lg:pl-8 overflow-y-auto'>
        <div className='max-w-[1600px] mx-auto'>{children}</div>
      </main>
    </div>
  )
}
