import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { SectionHeader, ProgressBar, Modal } from '../components/UI'
import styles from './Pillars.module.css'

export default function Pillars() {
  const { state, config } = useApp()
  const [selected, setSelected] = useState(null)

  const pillarMap = Object.fromEntries(config.pillars.map(p => [p.id, p]))

  return (
    <div className={styles.screen}>
      <SectionHeader
        eyebrow="YOUR IDENTITY"
        title="Four pillars, one life"
        sub="Your identities don't compete — they compound. Tap any pillar to go deeper."
      />

      <div className={styles.pillarGrid}>
        {config.pillars.map((p, i) => {
          const xp = state.pillarXP[p.id] || 0
          const pct = Math.min(100, Math.round((xp / p.maxXP) * 100))
          return (
            <div
              key={p.id}
              className={`${styles.pillarCard} ${styles['pillar_' + p.color]} animate-fadeUp`}
              style={{ animationDelay: `${i * .06}s` }}
              onClick={() => setSelected(p)}
            >
              <div className={styles.pillarIcon}>{p.icon}</div>
              <div className={styles.pillarName}>{p.name}</div>
              <div className={styles.pillarSubs}>
                {p.subIdentities.map((s, j) => (
                  <span key={j} className={styles.pillarSub}>{s}</span>
                ))}
              </div>
              <p className={styles.pillarDesc}>{p.description}</p>
              <div className={styles.pillarFooter}>
                <ProgressBar value={xp} max={p.maxXP} color={p.color} />
                <div className={styles.pillarXP}>{xp} / {p.maxXP} XP — {pct}%</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tiers */}
      <div className={`${styles.tiersSection} animate-fadeUp`} style={{ animationDelay: '.3s' }}>
        <div className={styles.tiersTitle}>The Tier System — your growth sequence</div>
        {[1, 2, 3].map(n => {
          const tier = config.tiers[n]
          if (!tier) return null
          const colors = { 1: 'gold', 2: 'teal', 3: 'rust' }
          const col = colors[n]
          return (
            <div key={n} className={styles.tierRow}>
              <div className={styles.tierNum} style={{ color: `var(--${col})` }}>0{n}</div>
              <div className={styles.tierContent}>
                <div className={styles.tierLabel} style={{ color: `var(--${col})` }}>
                  TIER {n} — {tier.label.toUpperCase()}
                </div>
                <div className={styles.tierPillars}>
                  {(tier.pillars || []).map(pid => {
                    const p = pillarMap[pid]
                    return p ? (
                      <span key={pid} className={styles.tierChip} style={{ borderColor: `var(--${p.color})`, color: `var(--${p.color})` }}>
                        {p.icon} {p.name}
                      </span>
                    ) : null
                  })}
                </div>
                <div className={styles.tierItems}>
                  {tier.items.map((item, i) => (
                    <span key={i} className={styles.tierItem}>— {item}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''}>
        {selected && (
          <>
            <div className={styles.modalSubs}>
              {selected.subIdentities.map((s, i) => (
                <span key={i} className={styles.modalSubBadge}>{s}</span>
              ))}
            </div>
            <p style={{ fontSize: '.88rem', lineHeight: '1.7', color: 'var(--ink-soft)', marginTop: '.75rem' }}>
              {selected.description}
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--muted)', letterSpacing: '.06em', marginBottom: '.75rem' }}>XP PROGRESS</div>
              <ProgressBar value={state.pillarXP[selected.id] || 0} max={selected.maxXP} color={selected.color} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--muted)', marginTop: '.4rem' }}>
                {state.pillarXP[selected.id] || 0} / {selected.maxXP} XP earned
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
