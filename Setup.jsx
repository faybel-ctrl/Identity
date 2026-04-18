import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { SectionHeader, Input, PillBtn, Divider } from '../components/UI'
import styles from './Setup.module.css'

const COLOR_OPTIONS = ['gold', 'teal', 'rust', 'purple', 'slate', 'green']

export default function Setup({ showToast }) {
  const { state, config, saveCustomConfig, resetAll } = useApp()

  const [profile, setProfile] = useState({
    name:    config.profile.name,
    handle:  config.profile.handle,
    tagline: config.profile.tagline,
    vision:  config.profile.vision,
  })

  const [pillars, setPillars] = useState(
    config.pillars.map(p => ({ ...p, subIdentities: p.subIdentities.join(', ') }))
  )

  const [burnoutSignals, setBurnoutSignals] = useState(config.burnoutSignals.join('\n'))
  const [burnoutRecovery, setBurnoutRecovery] = useState(config.burnoutRecovery.join('\n'))
  const [activeTab, setActiveTab] = useState('profile')
  const [confirmReset, setConfirmReset] = useState(false)

  function updatePillar(idx, field, value) {
    setPillars(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p))
  }

  function addPillar() {
    setPillars(prev => [...prev, {
      id: 'new_' + Date.now(),
      icon: '◆',
      name: 'New Pillar',
      subIdentities: 'Identity 1, Identity 2',
      description: 'Describe this pillar.',
      color: 'teal',
      maxXP: 400,
    }])
  }

  function removePillar(idx) {
    setPillars(prev => prev.filter((_, i) => i !== idx))
  }

  function handleSave() {
    const customConfig = {
      profile,
      pillars: pillars.map(p => ({
        ...p,
        subIdentities: p.subIdentities.split(',').map(s => s.trim()).filter(Boolean),
        maxXP: parseInt(p.maxXP) || 400,
      })),
      burnoutSignals: burnoutSignals.split('\n').map(s => s.trim()).filter(Boolean),
      burnoutRecovery: burnoutRecovery.split('\n').map(s => s.trim()).filter(Boolean),
    }
    saveCustomConfig(customConfig)
    showToast('Setup saved — your Identity OS is personalised')
  }

  function handleReset() {
    if (confirmReset) {
      resetAll()
      showToast('All data reset. Fresh start.')
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 4000)
    }
  }

  const TABS = [
    { id: 'profile',  label: 'Profile'  },
    { id: 'pillars',  label: 'Pillars'  },
    { id: 'burnout',  label: 'Burnout'  },
    { id: 'danger',   label: 'Reset'    },
  ]

  return (
    <div className={styles.screen}>
      <SectionHeader
        eyebrow="PERSONALISE YOUR OS"
        title="Make it yours"
        sub="Edit your identity, pillars, and burnout signals. All changes are saved locally in your browser."
      />

      {/* Tabs */}
      <div className={`${styles.tabs} animate-fadeUp`}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''} ${t.id === 'danger' ? styles.tabDanger : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── PROFILE TAB ── */}
      {activeTab === 'profile' && (
        <div className={`${styles.section} animate-fadeUp`}>
          <div className={styles.sectionTitle}>Your Profile</div>
          <div className={styles.fieldGrid}>
            <Input label="YOUR NAME" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Faybel" />
            <Input label="INSTAGRAM HANDLE" value={profile.handle} onChange={e => setProfile(p => ({ ...p, handle: e.target.value }))} placeholder="@yourhandle" />
          </div>
          <Input label="TAGLINE — ONE LINE IDENTITY" value={profile.tagline} onChange={e => setProfile(p => ({ ...p, tagline: e.target.value }))} placeholder="e.g. Filmmaker · Researcher · Poet" />
          <div style={{ marginTop: '1rem' }}>
            <Input label="VISION STATEMENT — WHERE ARE YOU GOING?" value={profile.vision} onChange={e => setProfile(p => ({ ...p, vision: e.target.value }))} placeholder="What does your life look like in 2 years?" multiline />
          </div>
          <div className={styles.preview}>
            <div className={styles.previewHandle}>{profile.handle || '@yourhandle'}</div>
            <div className={styles.previewTagline}>{profile.tagline || 'Your tagline here'}</div>
          </div>
        </div>
      )}

      {/* ── PILLARS TAB ── */}
      {activeTab === 'pillars' && (
        <div className={`${styles.section} animate-fadeUp`}>
          <div className={styles.sectionTitle}>Your Pillars</div>
          <p className={styles.sectionNote}>Each pillar is a core identity bucket. 4–6 pillars is ideal. Too many = no focus.</p>
          <div className={styles.pillarList}>
            {pillars.map((p, idx) => (
              <div key={p.id} className={`${styles.pillarEditor} ${styles['pillarEditor_' + p.color]}`}>
                <div className={styles.pillarEditorTop}>
                  <div className={styles.pillarEditorIcon}>{p.icon}</div>
                  <div className={styles.pillarEditorName}>{p.name}</div>
                  <button className={styles.removeBtn} onClick={() => removePillar(idx)}>Remove</button>
                </div>
                <div className={styles.pillarEditorFields}>
                  <div className={styles.fieldRow}>
                    <Input label="ICON (single emoji)" value={p.icon} onChange={e => updatePillar(idx, 'icon', e.target.value)} placeholder="✦" />
                    <Input label="PILLAR NAME" value={p.name} onChange={e => updatePillar(idx, 'name', e.target.value)} placeholder="The Creator" />
                  </div>
                  <Input label="SUB-IDENTITIES (comma separated)" value={p.subIdentities} onChange={e => updatePillar(idx, 'subIdentities', e.target.value)} placeholder="Writer, Filmmaker, Poet" />
                  <Input label="DESCRIPTION" value={p.description} onChange={e => updatePillar(idx, 'description', e.target.value)} placeholder="What this identity means to you." multiline />
                  <div className={styles.fieldRow}>
                    <div>
                      <div className={styles.colorLabel}>COLOUR</div>
                      <div className={styles.colorOptions}>
                        {COLOR_OPTIONS.map(c => (
                          <button key={c} className={`${styles.colorBtn} ${styles['colorBtn_' + c]} ${p.color === c ? styles.colorBtnActive : ''}`} onClick={() => updatePillar(idx, 'color', c)} />
                        ))}
                      </div>
                    </div>
                    <Input label="MAX XP" value={p.maxXP} onChange={e => updatePillar(idx, 'maxXP', e.target.value)} placeholder="400" type="number" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addPillarBtn} onClick={addPillar}>+ Add pillar</button>
        </div>
      )}

      {/* ── BURNOUT TAB ── */}
      {activeTab === 'burnout' && (
        <div className={`${styles.section} animate-fadeUp`}>
          <div className={styles.sectionTitle}>Burnout System</div>
          <p className={styles.sectionNote}>These are shown in the Today screen when you tap the burnout check. Be honest with yourself here.</p>
          <Input
            label="BURNOUT SIGNALS — one per line"
            value={burnoutSignals}
            onChange={e => setBurnoutSignals(e.target.value)}
            placeholder={"Skipped morning block 3+ days\nFeeling resentful of tasks I enjoy"}
            multiline
          />
          <div style={{ marginTop: '1.25rem' }}>
            <Input
              label="RECOVERY PROTOCOL — one per line"
              value={burnoutRecovery}
              onChange={e => setBurnoutRecovery(e.target.value)}
              placeholder={"Drop everything to Tier 3 today\nProtect sleep — no exceptions"}
              multiline
            />
          </div>
        </div>
      )}

      {/* ── DANGER TAB ── */}
      {activeTab === 'danger' && (
        <div className={`${styles.section} animate-fadeUp`}>
          <div className={styles.sectionTitle}>Reset</div>
          <p className={styles.sectionNote}>This will wipe all your XP, streaks, completed tasks, and posted days. Your config edits will also be reset. This cannot be undone.</p>
          <div className={styles.dangerBox}>
            <div className={styles.dangerStats}>
              <div className={styles.dangerStat}><span>{state.xp}</span><span>XP to lose</span></div>
              <div className={styles.dangerStat}><span>{state.streak}</span><span>streak days</span></div>
              <div className={styles.dangerStat}><span>{state.doneTasks.length}</span><span>tasks done</span></div>
            </div>
            <button className={`${styles.resetBtn} ${confirmReset ? styles.resetBtnConfirm : ''}`} onClick={handleReset}>
              {confirmReset ? 'Tap again to confirm reset' : 'Reset all data'}
            </button>
          </div>
        </div>
      )}

      {/* Save button */}
      {activeTab !== 'danger' && (
        <div className={styles.saveRow}>
          <button className={styles.saveBtn} onClick={handleSave}>Save changes</button>
          <span className={styles.saveNote}>Saved locally in your browser</span>
        </div>
      )}
    </div>
  )
}
