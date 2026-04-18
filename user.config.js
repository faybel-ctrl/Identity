/**
 * identity-os · user.config.js
 *
 * This is YOUR configuration file. Everything here is about you.
 * Edit any section to match your own identity, pillars, tasks, and goals.
 *
 * HOW TO CUSTOMISE:
 *  1. Update `profile` with your name, handle, and tagline.
 *  2. Edit `pillars` — add, remove, or rename your core identities (max 6 recommended).
 *  3. Edit `tiers` — assign each pillar to Tier 1 / 2 / 3.
 *  4. Edit `tasks` — add tasks per energy level that match YOUR day.
 *  5. Edit `contentCalendar` — your weekly content themes.
 *  6. Edit `schedule` — your actual daily time blocks.
 *  7. Edit `burnoutSignals` — how YOU know you're burning out.
 */

const userConfig = {

  // ── PROFILE ────────────────────────────────────────────────────────────────
  profile: {
    name: 'Your Name',
    handle: '@yourhandle',
    tagline: 'Your one-line identity statement',
    // What you want to be known for — shown on the Today screen
    vision: 'Write your vision statement here — what does your life look like in 2 years?',
  },

  // ── PILLARS ────────────────────────────────────────────────────────────────
  // Your core identity buckets. Each one is a category of who you are.
  // color options: 'gold' | 'teal' | 'rust' | 'purple' | 'slate' | 'green'
  // icon: any single emoji or symbol
  pillars: [
    {
      id: 'creator',
      icon: '✦',
      name: 'The Creator',
      subIdentities: ['Writer', 'Filmmaker', 'Animator', 'Poet'],
      description: 'Your most visible identity. Everything you create publicly lives here.',
      color: 'gold',
      maxXP: 500,
    },
    {
      id: 'researcher',
      icon: '◈',
      name: 'The Researcher',
      subIdentities: ['TCM', 'Bioinformatics', 'Molecular Docking'],
      description: 'Your intellectual differentiator. A rare intersection that nobody else occupies.',
      color: 'teal',
      maxXP: 400,
    },
    {
      id: 'professional',
      icon: '◇',
      name: 'The Professional',
      subIdentities: ['DAM Career', 'Asset Management', 'Canva Workflows'],
      description: 'Your financial foundation. Funds every other identity.',
      color: 'slate',
      maxXP: 300,
    },
    {
      id: 'entrepreneur',
      icon: '◉',
      name: 'The Entrepreneur',
      subIdentities: ['Loop Creative', 'Client Outreach', 'SEO'],
      description: 'Your startup. Currently in seed phase — grows slowly but intentionally.',
      color: 'rust',
      maxXP: 400,
    },
  ],

  // ── TIERS ──────────────────────────────────────────────────────────────────
  // Assign each pillar ID to a tier. This tells you where to focus first.
  // Tier 1 = grow publicly now   Tier 2 = grow steadily   Tier 3 = long game
  tiers: {
    1: {
      label: 'Public identity — grow first',
      pillars: ['creator'],
      items: ['Daily @yourhandle posts', 'Core craft practice', 'Audience building'],
    },
    2: {
      label: 'Craft engine — grow steadily',
      pillars: ['researcher', 'professional'],
      items: ['Deep skill building', 'Research consistency', 'Career performance'],
    },
    3: {
      label: 'Long game — plant seeds',
      pillars: ['entrepreneur'],
      items: ['Startup development', 'Client pipeline', 'Launch target: late 2026'],
    },
  },

  // ── TASKS ──────────────────────────────────────────────────────────────────
  // Tasks shown on the Today screen based on energy level.
  // pilliarId must match a pillar id above. xp is earned on completion.
  tasks: {
    high: [
      {
        id: 'morning-creative',
        title: 'Morning creative sprint',
        description: 'Deep work session — your primary creative block. No phone first.',
        pillarId: 'creator',
        time: '06:30 – 08:30',
        xp: 20,
      },
      {
        id: 'capture-content',
        title: 'Capture today\'s content',
        description: 'Take a screenshot or 30-sec screen record for your daily post.',
        pillarId: 'creator',
        time: 'During morning session',
        xp: 10,
      },
      {
        id: 'work-block',
        title: 'Career block',
        description: 'Full focus at work. Everything you build here funds your creative life.',
        pillarId: 'professional',
        time: '09:00 – 18:00',
        xp: 10,
      },
      {
        id: 'portfolio-shot',
        title: 'Portfolio Raw screenshot',
        description: 'One screenshot before leaving — save to /Portfolio Raw/ folder.',
        pillarId: 'creator',
        time: '18:00',
        xp: 15,
      },
    ],
    med: [
      {
        id: 'research-session',
        title: 'Research session',
        description: 'Focused 90 minutes. End with a 3-sentence log: tested · result · next step.',
        pillarId: 'researcher',
        time: '20:30 – 22:00',
        xp: 20,
      },
      {
        id: 'light-review',
        title: 'Light creative review',
        description: 'Review today\'s work — no new heavy output. Observe what you built.',
        pillarId: 'creator',
        time: '20:30 – 22:00',
        xp: 10,
      },
      {
        id: 'work-medium',
        title: 'Career block',
        description: 'Office. Commute. Decompress on the way home.',
        pillarId: 'professional',
        time: '09:00 – 20:30',
        xp: 10,
      },
    ],
    low: [
      {
        id: 'poetry-journal',
        title: 'Poetry or journaling',
        description: 'Write freely. No goal, no output pressure. The poet in you needs space.',
        pillarId: 'creator',
        time: '20:30 – 22:00',
        xp: 15,
      },
      {
        id: 'design-study',
        title: 'Design inspiration study',
        description: 'Browse references. Feed your visual eye. Low intensity only.',
        pillarId: 'researcher',
        time: '20:30 – 22:00',
        xp: 10,
      },
      {
        id: 'work-low',
        title: 'Career block',
        description: 'Just show up. Be present. Rest your creative self for tomorrow.',
        pillarId: 'professional',
        time: '09:00 – 20:30',
        xp: 10,
      },
    ],
  },

  // ── CONTENT CALENDAR ───────────────────────────────────────────────────────
  // Your weekly content posting rhythm. Shown in the Content screen.
  contentCalendar: [
    {
      id: 'mon',
      day: 'Monday',
      theme: 'The Observer\'s Frame',
      format: 'Photo + poetry overlay',
      description: 'One street photo from your commute. One poetic line as text overlay. Your daily surroundings are your film set.',
      timeCost: '8 min',
      color: 'gold',
    },
    {
      id: 'tue',
      day: 'Tuesday',
      theme: 'A Slow Sentence',
      format: 'Typography text post',
      description: 'One sentence from your journal or a research insight translated into feeling. Bold serif, dark background.',
      timeCost: '10 min',
      color: 'purple',
    },
    {
      id: 'wed',
      day: 'Wednesday',
      theme: 'Colour World',
      format: 'Cinematic still or Reel',
      description: 'A frame with a strong colour identity. Every Wednesday is a colour essay.',
      timeCost: '10 min',
      color: 'teal',
    },
    {
      id: 'thu',
      day: 'Thursday',
      theme: 'Time as a Character',
      format: 'Date / chapter post',
      description: 'Time is a character in your work. Let a date, a month, or a transition become the subject.',
      timeCost: '12 min',
      color: 'rust',
    },
    {
      id: 'fri',
      day: 'Friday',
      theme: 'The Poet Surfaces',
      format: 'Poem fragment',
      description: 'From your Friday journaling. A poem line, a story fragment. This is the purest expression of your voice.',
      timeCost: '10 min',
      color: 'purple',
    },
    {
      id: 'sat',
      day: 'Saturday',
      theme: 'The Cinematic Piece',
      format: 'Reel or short film clip',
      description: 'Your anchor post of the week. Your best visual. Your filmmaker identity is most visible here.',
      timeCost: '30 min',
      color: 'rust',
    },
    {
      id: 'sun',
      day: 'Sunday',
      theme: 'Chapter Closing',
      format: 'Reflective caption post',
      description: 'What chapter did this week feel like? Write it as a short story. 100–150 words. The post people save and return to.',
      timeCost: '15 min',
      color: 'gold',
    },
  ],

  // ── SCHEDULE ───────────────────────────────────────────────────────────────
  // Your real weekly time blocks.
  // type options: 'creative' | 'work' | 'research' | 'startup' | 'rest' | 'poetry'
  schedule: [
    {
      day: 'Weekdays (Mon – Fri)',
      blocks: [
        { time: '06:00', label: 'Wake up — no phone', note: 'Protect the morning.', type: 'rest' },
        { time: '06:30 – 08:30', label: 'Morning creative sprint', note: 'Your only deep creative window on weekdays.', type: 'creative' },
        { time: '08:30 – 09:00', label: 'Ready · Breakfast · Commute', note: '', type: 'rest' },
        { time: '09:00 – 18:00', label: 'Career block', note: 'Full focus. This funds everything.', type: 'work' },
        { time: '18:00 – 20:30', label: 'Commute home — decompress', note: 'Podcast / audiobook only. No creative work.', type: 'rest' },
        { time: '20:30 – 22:00', label: 'Tue + Thu: Research  |  Mon + Wed: Light review  |  Fri: Poetry', note: '90 minutes. Low-to-medium intensity only.', type: 'research' },
        { time: '22:00 – 22:45', label: 'Wind down — no screens', note: 'Sleep by 22:45 to protect the 06:30 wake.', type: 'rest' },
      ],
    },
    {
      day: 'Saturday',
      blocks: [
        { time: '09:00 – 11:00', label: 'Startup — outreach + SEO', note: 'Sharpest energy. Startup work first.', type: 'startup' },
        { time: '11:00 – 17:30', label: 'Cinematic project — deep dive', note: 'Scene building, lighting, texturing.', type: 'creative' },
        { time: '17:30 – 19:00', label: 'Physical activity', note: '', type: 'rest' },
        { time: '20:30 – 22:00', label: 'Post-production — DaVinci Resolve', note: 'Colour grade, film grain, camera shake.', type: 'creative' },
        { time: '22:00', label: 'Start big render', note: 'Check results Sunday 10:00.', type: 'creative' },
      ],
    },
    {
      day: 'Sunday',
      blocks: [
        { time: '09:00 – 11:00', label: 'Startup — website + tech', note: '', type: 'startup' },
        { time: '13:00 – 17:30', label: 'Family · social · relax — no screens', note: 'True recovery. Not optional.', type: 'rest' },
        { time: '19:00 – 21:00', label: 'Weekly planning + assign next phase', note: 'Write next week\'s focus on your calendar.', type: 'creative' },
      ],
    },
  ],

  // ── BURNOUT SIGNALS ────────────────────────────────────────────────────────
  // Signs that YOU personally are heading toward burnout.
  burnoutSignals: [
    'Skipped the morning creative block 3+ days in a row',
    'Feeling resentful of tasks you normally enjoy',
    'No creative output for 5+ days',
    'Sleeping less than 6 hours consistently',
    'Everything feels urgent and nothing feels meaningful',
  ],

  // ── BURNOUT RECOVERY ───────────────────────────────────────────────────────
  // What to do when burned out. Shown in the burnout modal.
  burnoutRecovery: [
    'Drop everything to Tier 3 today — just show up at work and rest.',
    'Protect sleep. 22:30 maximum. No exceptions tonight.',
    'Do one tiny creative thing — even 5 minutes. Keep the thread alive.',
    'No social media. No creating. No consuming. Walk instead.',
    'Write one sentence in your journal about what drained you.',
  ],
};

export default userConfig;
