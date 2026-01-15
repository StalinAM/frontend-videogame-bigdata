import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './pages/DashboardLayout'
import { type SidebarSection } from './components/ui/sidebar'
import GeneralPage from './pages/GeneralPage'
import StatisticsPage from './pages/StatisticsPage'
import TemporalPage from './pages/TemporalPage'
import GamesPage from './pages/GamesPage'
import PlatformsPage from './pages/PlatformsPage'
import TextPage from './pages/TextPage'
import UsersPage from './pages/UsersPage'
import OutliersPage from './pages/OutliersPage'
import LegacyPage from './pages/LegacyPage'

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: 'general',
    label: 'General',
    path: '/general'
  },
  {
    id: 'statistics',
    label: 'Statistics',
    path: '/statistics'
  },
  {
    id: 'temporal',
    label: 'Temporal Analysis',
    path: '/temporal'
  },
  {
    id: 'games',
    label: 'Game Analysis',
    path: '/games'
  },
  // {
  //   id: 'platforms',
  //   label: 'Platform Analysis',
  //   path: '/platforms'
  // },
  {
    id: 'text',
    label: 'Text Analysis',
    path: '/text'
  },
  {
    id: 'users',
    label: 'User Analysis',
    path: '/users'
  },
  {
    id: 'outliers',
    label: 'Outliers',
    path: '/outliers'
  }
  // {
  //   id: 'legacy',
  //   label: 'Legacy',
  //   path: '/legacy'
  // }
]

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout sections={SIDEBAR_SECTIONS}>
        <Routes>
          <Route path='/' element={<Navigate to='/general' replace />} />
          <Route path='/general' element={<GeneralPage />} />
          <Route path='/statistics' element={<StatisticsPage />} />
          <Route path='/temporal' element={<TemporalPage />} />
          <Route path='/games' element={<GamesPage />} />
          {/* <Route path='/platforms' element={<PlatformsPage />} /> */}
          <Route path='/text' element={<TextPage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/outliers' element={<OutliersPage />} />
          <Route path='/legacy' element={<LegacyPage />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}

export default App
