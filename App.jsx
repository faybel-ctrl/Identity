import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import { Toast } from './components/UI'
import { useToast } from './hooks/useToast'
import Nav from './components/Nav'
import Today from './screens/Today'
import Pillars from './screens/Pillars'
import Content from './screens/Content'
import Schedule from './screens/Schedule'
import Setup from './screens/Setup'
import userConfig from './data/user.config'

function AppInner() {
  const [screen, setScreen] = useState('today')
  const { toast, showToast } = useToast()

  const screens = {
    today:    <Today    showToast={showToast} />,
    pillars:  <Pillars  />,
    content:  <Content  showToast={showToast} />,
    schedule: <Schedule />,
    setup:    <Setup    showToast={showToast} />,
  }

  return (
    <>
      <Nav activeScreen={screen} onNavigate={setScreen} />
      <main key={screen} className="animate-fadeIn">
        {screens[screen]}
      </main>
      <Toast visible={toast.visible} message={toast.message} />
    </>
  )
}

export default function App() {
  return (
    <AppProvider config={userConfig}>
      <AppInner />
    </AppProvider>
  )
}
