import { useApp } from '../context/AppContext'
import { SectionHeader } from '../components/UI'
import styles from './Content.module.css'

export default function Content({ showToast }) {
  const { state, markPosted, config } = useApp()

  const streak = state.streak
  const postedThisWeek = state.postedDays.length

  function handlePost(dayId) {
    if (!state.postedDays.includes(dayId)) {
      markPosted(dayId)
      showToast(`+15 XP — posted today 🔥 Day ${state.streak + 1}`)
    }
  }

  return (
    <div className={styles.screen}>
      <SectionHeader
        eyebrow={`${config.profile.handle} — DAILY CHALLENGE`}
        title="The visual literary diary"
        sub="Every post comes from work you are already doing. Nothing is created from scratch."
      />

      {/* Streak bar */}
      <div className={`${styles.streakCard} animate-fadeUp`}>
        <div className={styles.streakLeft}>
          <div className={styles.streakNum}>{streak}</div>
          <div>
            <div className={styles.streakTitle}>Day streak</div>
            <div className={styles.streakSub}>Consistency is the creative practice</div>
          </div>
        </div>
        <div className={styles.streakDots}>
          {Array.from({ length: 31 }, (_, i) => (
            <div key={i} className={`${styles.dot} ${i < streak ? styles.dotDone : ''}`}>
              {i < streak ? '✓' : ''}
            </div>
          ))}
        </div>
      </div>

      {/* Week summary */}
      <div className={`${styles.weekSummary} animate-fadeUp`} style={{ animationDelay: '.08s' }}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryNum}>{postedThisWeek}</span>
          <span className={styles.summarySub}>posted this week</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryNum}>{7 - postedThisWeek}</span>
          <span className={styles.summarySub}>remaining</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryNum} style={{ color: 'var(--gold)' }}>{streak * 15}</span>
          <span className={styles.summarySub}>XP from posting</span>
        </div>
      </div>

      {/* Day cards */}
      <div className={styles.dayList}>
        {config.contentCalendar.map((day, i) => {
          const posted = state.postedDays.includes(day.id)
          return (
            <div
              key={day.id}
              className={`${styles.dayCard} ${styles['day_' + day.color]} ${posted ? styles.dayPosted : ''} animate-fadeUp`}
              style={{ animationDelay: `${.1 + i * .05}s` }}
            >
              <div className={styles.dayLeft}>
                <div className={styles.dayName}>{day.day.toUpperCase()}</div>
                <div className={styles.dayTimeCost}>{day.timeCost}</div>
              </div>
              <div className={styles.dayContent}>
                <div className={styles.dayTheme}>{day.theme}</div>
                <div className={styles.dayFormat}>{day.format}</div>
                <div className={styles.dayDesc}>{day.description}</div>
              </div>
              <button
                className={`${styles.postBtn} ${posted ? styles.postBtnDone : ''}`}
                onClick={() => handlePost(day.id)}
                disabled={posted}
              >
                {posted ? 'Posted ✓' : 'Mark posted'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
