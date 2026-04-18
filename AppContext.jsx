import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

const STORAGE_KEY = 'identity_os_state'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function defaultState() {
  return {
    xp: 0,
    energy: null,
    doneTasks: [],       // task ids completed today
    postedDays: [],      // content calendar day ids posted
    streak: 0,
    pillarXP: {},        // { [pillarId]: number }
    lastActiveDate: null,
    setupDone: false,
    customConfig: null,  // user overrides stored here
    burnoutDismissed: false,
    skippedMornings: 0,
    achievements: [],
  }
}

export function AppProvider({ children, config }) {
  const [state, setState] = useState(() => {
    const saved = loadState()
    const def = defaultState()
    if (!saved) return def
    // Reset daily tasks if new day
    const today = new Date().toDateString()
    if (saved.lastActiveDate !== today) {
      return { ...saved, doneTasks: [], burnoutDismissed: false, lastActiveDate: today }
    }
    return { ...def, ...saved }
  })

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const update = useCallback((patch) => {
    setState(prev => ({ ...prev, ...patch }))
  }, [])

  const completeTask = useCallback((task) => {
    setState(prev => {
      if (prev.doneTasks.includes(task.id)) {
        // Undo
        return {
          ...prev,
          doneTasks: prev.doneTasks.filter(id => id !== task.id),
          xp: Math.max(0, prev.xp - task.xp),
          pillarXP: {
            ...prev.pillarXP,
            [task.pillarId]: Math.max(0, (prev.pillarXP[task.pillarId] || 0) - task.xp),
          },
        }
      }
      // Complete
      const newPillarXP = {
        ...prev.pillarXP,
        [task.pillarId]: (prev.pillarXP[task.pillarId] || 0) + task.xp,
      }
      return {
        ...prev,
        doneTasks: [...prev.doneTasks, task.id],
        xp: prev.xp + task.xp,
        pillarXP: newPillarXP,
      }
    })
    return task.xp
  }, [])

  const markPosted = useCallback((dayId) => {
    setState(prev => {
      if (prev.postedDays.includes(dayId)) return prev
      return {
        ...prev,
        postedDays: [...prev.postedDays, dayId],
        streak: prev.streak + 1,
        xp: prev.xp + 15,
        pillarXP: {
          ...prev.pillarXP,
          creator: (prev.pillarXP.creator || 0) + 15,
        },
      }
    })
  }, [])

  const saveCustomConfig = useCallback((cfg) => {
    setState(prev => ({ ...prev, customConfig: cfg, setupDone: true }))
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(defaultState())
  }, [])

  const activeConfig = state.customConfig
    ? { ...config, ...state.customConfig }
    : config

  return (
    <AppContext.Provider value={{
      state,
      update,
      completeTask,
      markPosted,
      saveCustomConfig,
      resetAll,
      config: activeConfig,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
