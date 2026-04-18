import styles from './UI.module.css'

// ── BADGE ────────────────────────────────────────────────────────────────────
export function Badge({ color = 'gold', children }) {
  return <span className={`${styles.badge} ${styles['badge_' + color]}`}>{children}</span>
}

// ── PILL BUTTON ───────────────────────────────────────────────────────────────
export function PillBtn({ onClick, children, active, variant = 'default', small }) {
  return (
    <button
      className={[styles.pillBtn, active ? styles.pillBtnActive : '', styles['pillBtn_' + variant], small ? styles.pillBtnSmall : ''].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ── CARD ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', onClick, accent }) {
  return (
    <div
      className={[styles.card, accent ? styles['card_' + accent] : '', className, onClick ? styles.cardClickable : ''].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className={styles.sectionHeader}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {sub && <p className={styles.sectionSub}>{sub}</p>}
    </div>
  )
}

// ── PROGRESS BAR ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, max, color = 'gold' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={styles.progressWrap}>
      <div
        className={`${styles.progressBar} ${styles['progressBar_' + color]}`}
        style={{ width: pct + '%' }}
      />
    </div>
  )
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${styles.modal} animate-pop`}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  )
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
export function Toast({ visible, message }) {
  return (
    <div className={`${styles.toast} ${visible ? styles.toastVisible : ''}`}>
      {message}
    </div>
  )
}

// ── INPUT ─────────────────────────────────────────────────────────────────────
export function Input({ label, value, onChange, placeholder, type = 'text', multiline }) {
  return (
    <div className={styles.inputWrap}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      {multiline
        ? <textarea className={styles.textarea} value={value} onChange={onChange} placeholder={placeholder} rows={3} />
        : <input className={styles.input} type={type} value={value} onChange={onChange} placeholder={placeholder} />
      }
    </div>
  )
}

// ── DIVIDER ───────────────────────────────────────────────────────────────────
export function Divider() {
  return <div className={styles.divider} />
}
