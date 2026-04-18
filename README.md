# Identity OS

> A personal growth operating system for multi-hyphenate creators — manage multiple identities, track energy, build habits, and avoid burnout.

Built by [@faybel.ling](https://www.instagram.com/faybel.ling) · Open source · Fully customisable

---

## What it does

Most productivity apps assume you have one job, one goal, one identity. Identity OS is built for people who are many things at once — a writer who also researches, a filmmaker who also runs a startup, a professional who also creates art.

It helps you:

- **Understand your energy** — routes you to the right task based on how you feel today
- **Track multiple pillars** — each identity has its own XP progress
- **Prevent burnout** — a built-in burnout check with your personal signals and recovery protocol
- **Build a content habit** — a 7-day posting rhythm with themes that match your aesthetic
- **See your full week** — your real schedule with every block colour-coded by identity
- **Personalise everything** — your name, pillars, tasks, burnout signals, content calendar, and schedule

---

## Screenshots

| Today | Pillars | Content | Setup |
|-------|---------|---------|-------|
| Energy selector + tasks | XP progress per identity | Streak + daily themes | Edit everything |

---

## Getting started

### 1. Clone

```bash
git clone https://github.com/yourusername/identity-os.git
cd identity-os
```

### 2. Install

```bash
npm install
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
```

---

## Personalising your Identity OS

Everything about you lives in one file:

```
src/data/user.config.js
```

Open it and edit:

### Profile
```js
profile: {
  name: 'Your Name',
  handle: '@yourhandle',
  tagline: 'Writer · Filmmaker · Researcher',
  vision: 'What your life looks like in 2 years',
}
```

### Pillars
Add, remove, or rename your core identities:
```js
pillars: [
  {
    id: 'creator',
    icon: '✦',
    name: 'The Creator',
    subIdentities: ['Writer', 'Filmmaker', 'Poet'],
    description: 'Your public creative identity.',
    color: 'gold',   // gold | teal | rust | purple | slate | green
    maxXP: 500,
  },
  // add as many as you need (4–6 recommended)
]
```

### Tasks per energy level
```js
tasks: {
  high: [ /* tasks for high energy days */ ],
  med:  [ /* tasks for medium energy days */ ],
  low:  [ /* tasks for low energy days */ ],
}
```

### Content calendar
```js
contentCalendar: [
  {
    id: 'mon',
    day: 'Monday',
    theme: 'Your Monday theme',
    format: 'Photo / Reel / Text post',
    description: 'What to create and why.',
    timeCost: '10 min',
    color: 'gold',
  },
  // one entry per day of the week
]
```

### Tiers
Assign each pillar to a priority tier:
```js
tiers: {
  1: { label: 'Public identity — grow first', pillars: ['creator'] },
  2: { label: 'Craft engine — grow steadily', pillars: ['researcher'] },
  3: { label: 'Long game — plant seeds',      pillars: ['entrepreneur'] },
}
```

### Burnout signals & recovery
```js
burnoutSignals: [
  'Skipped morning block 3+ days in a row',
  'Feeling resentful of tasks I normally enjoy',
],
burnoutRecovery: [
  'Drop everything to Tier 3 today.',
  'Protect sleep. No exceptions.',
],
```

You can also edit everything from inside the app using the **Setup** screen — no code required.

---

## Tech stack

| What | Why |
|------|-----|
| React 18 | Component-based UI |
| Vite | Fast dev + build |
| CSS Modules | Scoped styles, no conflicts |
| localStorage | Zero-backend persistence |
| No UI library | Custom design system |

Zero external runtime dependencies beyond React.

---

## Project structure

```
identity-os/
├── src/
│   ├── data/
│   │   └── user.config.js      ← YOUR personalisation file
│   ├── context/
│   │   └── AppContext.jsx       ← Global state + localStorage
│   ├── hooks/
│   │   └── useToast.js
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Nav.module.css
│   │   ├── UI.jsx               ← Shared components
│   │   └── UI.module.css
│   ├── screens/
│   │   ├── Today.jsx            ← Energy + tasks
│   │   ├── Pillars.jsx          ← Identity tracking
│   │   ├── Content.jsx          ← Posting streak
│   │   ├── Schedule.jsx         ← Weekly timetable
│   │   └── Setup.jsx            ← User customisation
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                ← Design tokens
└── index.html
```

---

## Deploying to Vercel / Netlify

```bash
npm run build
# Upload the /dist folder to Netlify
# or connect your GitHub repo to Vercel — it auto-detects Vite
```

---

## Philosophy

> You are not managing separate lives. You are building one interconnected creative and intellectual identity. Nothing is siloed. Everything compounds.

The three rules this app is built on:

1. **Tier 1 first** — your public identity grows through consistency, not perfection
2. **Energy before tasks** — match your work to how you actually feel, not an ideal schedule
3. **Burnout is a system failure, not a personal one** — recognise signals early, recover fast

---

## Contributing

This app was built as a personal tool and open-sourced so others can use it. If you have a different identity setup — musician + therapist + parent, developer + artist + entrepreneur — edit `user.config.js` and it becomes yours.

PRs welcome for:
- New colour themes
- Additional screen types (e.g. Research log, Portfolio tracker)
- Mobile app wrapper (Capacitor / Expo)

---

## Licence

MIT — use it, fork it, build on it.

---

Made with intention · Not with burnout
