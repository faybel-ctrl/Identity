import { useApp } from '../context/AppContext'
import { SectionHeader } from '../components/UI'
import styles from './Schedule.module.css'

const TYPE_LABELS = {
  creative:   { label: 'Creative',   color: 'gold'   },
  work:       { label: 'Career',     color: 'slate'  },
  research:   { label: 'Research',   color: 'teal'   },
  startup:    { label: 'Startup',    color: 'rust'   },
  rest:       { label: 'Rest',       color: 'pale'   },
  poetry:     { label: 'Poetry',     color: 'purple' },
}

export default function Schedule() {
  const { config } = useApp()

  return (
    <div className={styles.screen}>
      <SectionHeader
        eyebrow="YOUR REAL HOURS"
        title="The week in full"
        sub="Every block has a purpose. Every slot protects your energy."
      />

      {/* Legend */}
      <div className={`${styles.legend} animate-fadeUp`}>
        {Object.entries(TYPE_LABELS).map(([key, val]) => (
          <div key={key} className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles['dot_' + val.color]}`} />
            <span>{val.label}</span>
          </div>
        ))}
      </div>

      {config.schedule.map((day, di) => (
        <div key={di} className={`${styles.daySection} animate-fadeUp`} style={{ animationDelay: `${di * .08}s` }}>
          <div className={styles.dayLabel}>{day.day}</div>
          {day.blocks.map((block, bi) => {
            const meta = TYPE_LABELS[block.type] || TYPE_LABELS.rest
            return (
              <div key={bi} className={styles.blockRow}>
                <div className={styles.blockTime}>{block.time}</div>
                <div className={`${styles.block} ${styles['block_' + block.type]}`}>
                  <div className={styles.blockLabel}>{block.label}</div>
                  {block.note && <div className={styles.blockNote}>{block.note}</div>}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
