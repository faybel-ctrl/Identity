import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, Badge, PillBtn, Modal } from '../components/UI'
import styles from './Today.module.css'

const COLOR_MAP = { gold: 'gold', teal: 'teal', rust: 'rust', purple: 'purple', slate: 'slate', green: 'green' }

export default function Today({ showToast }) {
  const { state, update, completeTask, config } = useApp()
  const [burnoutModal, setBurnoutModal] = useState(false)

  const pillarMap = Object.fromEntries(config.pillars.map(p => [p.id, p]))

  const tasks = config.tasks[state.energy || 'high'] || []

  function handleEnergy(level) {
    update({ energy: level })
  }

  function handleTask(task) {
    const xp = completeTask(task)
    const isDone = !state.doneTasks.includes(task.id)
    if (isDone) showToast(`+${task.xp} XP — ${pillarMap[task.pillarId]?.name || task.pillarId}`)
  }

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).toUpperCase()

  const completedCount = tasks.filter(t => state.doneTasks.includes(t.id)).length
  const totalCount = tasks.length

  return (
    <div className={styles.screen}>
      <div className={`${styles.header} animate-fadeUp`}>
        <div className={styles.date}>{today}</div>
        <h1 className={styles.title}>
          What does today ask of <em>you?</em>
        </h1>
        {config.profile.vision && (
          <p className={styles.vision}>{config.profile.vision}</p>
        )}
      </div>

      {/* Progress */}
      {totalCount > 0 && (
        <div className={`${styles.progressRow} animate-fadeUp`} style={{ animationDelay: '.05s' }}>
          <span className={styles.progressText}>{completedCount} of {totalCount} tasks done today</span>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${(completedCount / totalCount) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Energy Selector */}
      <div className={`${styles.energyCard} animate-fadeUp`} style={{ animationDelay: '.1s' }}>
        <div className={styles.energyLabel}>HOW IS YOUR ENERGY RIGHT NOW?</div>
        <div className={styles.energyOptions}>
          {[
            { id: 'high', icon: '◈', label: 'High', sub: 'Deep creative work' },
            { id: 'med',  icon: '◇', label: 'Medium', sub: 'Research + light review' },
            { id: 'low',  icon: '○', label: 'Low', sub: 'Poetry + rest' },
          ].map(e => (
            <button
              key={e.id}
              className={`${styles.energyBtn} ${styles['energy_' + e.id]} ${state.energy === e.id ? styles.energySelected : ''}`}
              onClick={() => handleEnergy(e.id)}
            >
              <span className={styles.energyIcon}>{e.icon}</span>
              <span className={styles.energyName}>{e.label}</span>
              <span className={styles.energySub}>{e.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Burnout check */}
      <button className={`${styles.burnoutBtn} animate-fadeUp`} style={{ animationDelay: '.15s' }} onClick={() => setBurnoutModal(true)}>
        <span className={styles.burnoutIcon}>⚠</span>
        <span className={styles.burnoutText}>Feeling burned out? <span>Read this →</span></span>
      </button>

      {/* Tasks */}
      <div className={`${styles.taskGrid} animate-fadeUp`} style={{ animationDelay: '.2s' }}>
        {tasks.map((task, i) => {
          const done = state.doneTasks.includes(task.id)
          const pillar = pillarMap[task.pillarId]
          const color = pillar ? COLOR_MAP[pillar.color] || 'gold' : 'gold'
          return (
            <Card
              key={task.id}
              accent={color}
              className={`${styles.taskCard} ${done ? styles.taskDone : ''}`}
              onClick={() => handleTask(task)}
            >
              <div className={styles.taskTop}>
                <Badge color={color}>{pillar?.name || task.pillarId}</Badge>
                <div className={`${styles.taskCheck} ${done ? styles.taskCheckDone : ''}`}>
                  {done && '✓'}
                </div>
              </div>
              <div className={styles.taskTitle}>{task.title}</div>
              <div className={styles.taskSub}>{task.description}</div>
              <div className={styles.taskMeta}>
                <span>{task.time}</span>
                <span className={styles.taskXP}>+{task.xp} XP</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Burnout Modal */}
      <Modal open={burnoutModal} onClose={() => setBurnoutModal(false)} title="When you're burning out">
        <p style={{ color: 'var(--muted)', fontSize: '.82rem', marginBottom: '1rem' }}>
          Recognise the signal. Then follow the protocol.
        </p>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--muted)', letterSpacing: '.06em', marginBottom: '.6rem' }}>SIGNALS</div>
          {config.burnoutSignals.map((s, i) => (
            <div key={i} style={{ fontSize: '.85rem', padding: '.45rem 0', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: '.6rem' }}>
              <span style={{ color: 'var(--rust)', flexShrink: 0 }}>—</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--muted)', letterSpacing: '.06em', marginBottom: '.6rem' }}>RECOVERY PROTOCOL</div>
          {config.burnoutRecovery.map((r, i) => (
            <div key={i} style={{ fontSize: '.85rem', padding: '.45rem 0', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: '.6rem' }}>
              <span style={{ color: 'var(--teal)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '.75rem' }}>{i + 1}.</span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
