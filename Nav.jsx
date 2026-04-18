import { useApp } from '../context/AppContext'
import styles from './Nav.module.css'

const TABS = [
  { id: 'today',     label: 'Today'     },
  { id: 'pillars',   label: 'Pillars'   },
  { id: 'content',   label: 'Content'   },
  { id: 'schedule',  label: 'Schedule'  },
  { id: 'setup',     label: 'Setup'     },
]

export default function Nav({ activeScreen, onNavigate }) {
  const { state, config } = useApp()

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.brandWord}>Identity</span>
        <span className={styles.brandAccent}> OS</span>
      </div>

      <div className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeScreen === tab.id ? styles.tabActive : ''}`}
            onClick={() => onNavigate(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.right}>
        <div className={styles.handle}>{config.profile.handle}</div>
        <div className={styles.xpWrap}>
          <span className={styles.xpLabel}>XP</span>
          <span className={styles.xpPill}>{state.xp}</span>
        </div>
      </div>
    </nav>
  )
}
