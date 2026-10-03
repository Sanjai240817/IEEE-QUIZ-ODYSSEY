(() => {
  const STORE_KEY = 'ieee-quiz-odyssey-v1';
  const channel =
    typeof BroadcastChannel !== 'undefined'
      ? new BroadcastChannel('ieee-quiz-odyssey-live')
      : null;

  const isScreenOnly =
    new URLSearchParams(location.search).get('screen') === 'display';

  // =========================================================
  // ROUNDS
  // =========================================================

 const rounds = [
  'Boot Sequence',
  'Tech or Trash',
  'Guess the Logo',
  'Tech Tune-Up',
  'Name 3 Products',
  'Tech Connections',
  'Tech in Disguise',
  'Binary, Bytes & Beyond',
  'Tech Rapid Fire',
  'Round 10'
];

  // =========================================================
  // 6 TEAMS
  // =========================================================

  const teams = [
    ['Code Warriors', '⌬'],
    ['Binary Beasts', '♙'],
    ['Tech Titans', '△'],
    ['Neural Ninjas', '◈'],
    ['Debuggers', '♧'],
    ['Pixel Pioneers', '▧']
  ];

  // =========================================================
  // QUESTIONS
  // =========================================================

  const questionBank = [

  // =========================================================
  // ROUND 1 — BOOT SEQUENCE
  // 1 POINT
  // =========================================================

  [
    {
      type: 'normal',
      question: 'Which unit is used to measure the speed of a processor?',
      choices: [
        'GB',
        'dpi',
        'GHz',
        'Mbps'
      ],
      answer: 2,
      points: 1
    },

    {
      type: 'normal',
      question: 'Which of these is an open-source operating system?',
      choices: [
        'Windows',
        'Linux',
        'macOS',
        'iOS'
      ],
      answer: 1,
      points: 1
    },

    {
      type: 'normal',
      question: 'Which shortcut opens Task Manager directly in Windows?',
      choices: [
        'Ctrl + Shift + Esc',
        'Ctrl + Alt + T',
        'Alt + F4',
        'Win + D'
      ],
      answer: 0,
      points: 1
    },

    {
      type: 'normal',
      question: 'In "5G", what does the "G" stand for?',
      choices: [
        'Gigabit',
        'Global',
        'Gateway',
        'Generation'
      ],
      answer: 3,
      points: 1
    },

    {
      type: 'normal',
      question: 'Which of these storage devices usually gives the fastest read and write speeds?',
      choices: [
        'SSD',
        'Hard disk',
        'DVD',
        'Floppy disk'
      ],
      answer: 0,
      points: 1
    },

    {
      type: 'normal',
      question: 'Which file type keeps its layout the same on every device?',
      choices: [
        '.exe',
        '.mp3',
        '.pdf',
        '.zip'
      ],
      answer: 2,
      points: 1
    }
  ],


  // =========================================================
  // ROUND 2 — TECH OR TRASH
  // TRUE / FALSE
  // 1 POINT
  // =========================================================

  [
    {
      type: 'normal',
      question: 'The first computer mouse was made of wood.',
      choices: [
        'True',
        'False'
      ],
      answer: 0,
      points: 1
    },

    {
      type: 'normal',
      question: 'Bluetooth needs a SIM card to work.',
      choices: [
        'True',
        'False'
      ],
      answer: 1,
      points: 1
    },

    {
      type: 'normal',
      question: 'Emojis were first created in Japan.',
      choices: [
        'True',
        'False'
      ],
      answer: 0,
      points: 1
    },

    {
      type: 'normal',
      question: 'YouTube is owned by Meta.',
      choices: [
        'True',
        'False'
      ],
      answer: 1,
      points: 1
    },

    {
      type: 'normal',
      question: 'A smartphone can work as a Wi-Fi hotspot for other devices.',
      choices: [
        'True',
        'False'
      ],
      answer: 0,
      points: 1
    },

    {
      type: 'normal',
      question: 'Incognito mode hides your browsing from your internet service provider.',
      choices: [
        'True',
        'False'
      ],
      answer: 1,
      points: 1
    }
  ],


  // =========================================================
  // ROUND 3 — GUESS THE LOGO
  // 1 POINT
  // =========================================================

  [
    {
      type: 'logo',

      // Show LeetCode logo
      image: './assets/logos/round3/leetcode.png',

      question: 'Which platform is this?',

      choices: [
        'HackerRank',
        'LeetCode',
        'CodeChef',
        'GeeksforGeeks'
      ],

      answer: 1,
      points: 1
    },

    {
      type: 'logo',

      // Show Google Colab logo
      image: './assets/logos/round3/collab.png',

      question: 'Which platform is this?',

      choices: [
        'Jupyter Notebook',
        'Kaggle',
        'Google Colab',
        'Replit'
      ],

      answer: 2,
      points: 1
    },

    {
      type: 'logo',

      // Show Zoom logo
      image: './assets/logos/round3/meeting.png',

      question: 'Which platform is this?',

      choices: [
        'Zoom',
        'Skype',
        'Google Meet',
        'Microsoft Teams'
      ],

      answer: 0,
      points: 1
    },

    {
      type: 'logo',

      // Show Visual Studio Code logo
      image: './assets/logos/round3/vsc.png',

      question: 'Which platform is this?',

      choices: [
        'Sublime Text',
        'Notepad++',
        'PyCharm',
        'Visual Studio Code'
      ],

      answer: 3,
      points: 1
    },

    {
      type: 'logo',

      // Show GitHub logo
      image: './assets/logos/round3/github.png',

      question: 'Which platform is this?',

      choices: [
        'GitLab',
        'GitHub',
        'Bitbucket',
        'SourceForge'
      ],

      answer: 1,
      points: 1
    },

    {
      type: 'logo',

      // Show Stack Overflow logo
      image: './assets/logos/round3/stackoverflow.png',

      question: 'Which platform is this?',

      choices: [
        'Quora',
        'Reddit',
        'Stack Overflow',
        'GeeksforGeeks'
      ],

      answer: 2,
      points: 1
    }
  ],


  // =========================================================
  // ROUND 4 — TECH TUNE-UP
  // 5 SECOND AUDIO
  // 2 POINTS
  // =========================================================

  [
    {
      type: 'audio',
      audio: './assets/audio/round4/team1.mp3',

      question: 'Play the classic ringtone. Which brand?',

      choices: [
        'Motorola',
        'Nokia',
        'Sony',
        'Samsung'
      ],

      answer: 1,
      points: 2
    },

    {
      type: 'audio',
      audio: './assets/audio/round4/team2.mp3',

      question: 'Play the "ta-dum" intro. Which streaming service?',

      choices: [
        'Hotstar',
        'Prime Video',
        'Netflix',
        'Disney+'
      ],

      answer: 2,
      points: 2
    },

    {
      type: 'audio',
      audio: './assets/audio/round4/team3.mp3',

      question: 'Play the "bong" jingle from the chip ads. Which brand?',

      choices: [
        'AMD',
        'NVIDIA',
        'Qualcomm',
        'Intel'
      ],

      answer: 3,
      points: 2
    },

    {
      type: 'audio',
      audio: './assets/audio/round4/team4.mp3',

      question: 'Play the startup sound. Which operating system?',

      choices: [
        'Windows',
        'macOS',
        'Linux',
        'Android'
      ],

      answer: 0,
      points: 2
    },

    {
      type: 'audio',
      audio: './assets/audio/round4/team5.mp3',

      question: 'Play the startup sound. Which gaming console?',

      choices: [
        'Xbox',
        'PlayStation',
        'Nintendo',
        'Sega'
      ],

      answer: 1,
      points: 2
    },

    {
      type: 'audio',
      audio: './assets/audio/round4/team6.mp3',

      question: 'Play the sound heard when this app opens on a smart TV. Which app?',

      choices: [
        'YouTube',
        'Prime Video',
        'Hotstar',
        'Spotify'
      ],

      answer: 0,
      points: 2
    }
  ],


  // =========================================================
  // ROUND 5 — NAME 3 PRODUCTS
  // SPOKEN ROUND
  // 20 SECONDS
  // 2 POINTS
  // =========================================================

  [
    {
      type: 'spoken',
      question: 'Name any 3 products of Google.',
      choices: [],
      acceptedAnswers: [
        'Maps',
        'Gmail',
        'Photos',
        'Drive',
        'YouTube',
        'Chrome',
        'Search',
        'Android',
        'Meet',
        'Docs',
        'Translate',
        'Pixel'
      ],
      answer: null,
      points: 2
    },

    {
      type: 'spoken',
      question: 'Name any 3 products of Microsoft.',
      choices: [],
      acceptedAnswers: [
        'Word',
        'Excel',
        'PowerPoint',
        'Outlook',
        'Teams',
        'Windows',
        'Azure',
        'Xbox',
        'OneDrive',
        'Edge',
        'Surface',
        'LinkedIn'
      ],
      answer: null,
      points: 2
    },

    {
      type: 'spoken',
      question: 'Name any 3 IDEs or code editors.',
      choices: [],
      acceptedAnswers: [
        'VS Code',
        'IntelliJ IDEA',
        'PyCharm',
        'Eclipse',
        'NetBeans',
        'Android Studio',
        'Visual Studio',
        'Xcode',
        'Sublime Text',
        'Atom',
        'Spyder',
        'Jupyter Notebook'
      ],
      answer: null,
      points: 2
    },

    {
      type: 'spoken',
      question: 'Name any 3 AI tools.',
      choices: [],
      acceptedAnswers: [
        'ChatGPT',
        'Claude',
        'Gemini',
        'Copilot',
        'Perplexity',
        'DeepSeek',
        'Grok',
        'Midjourney',
        'DALL-E',
        'Cursor',
        'Meta AI'
      ],
      answer: null,
      points: 2
    },

    {
      type: 'spoken',
      question: 'Name any 3 products of Meta.',
      choices: [],
      acceptedAnswers: [
        'Facebook',
        'Instagram',
        'WhatsApp',
        'Messenger',
        'Threads',
        'Quest',
        'Ray-Ban Meta glasses'
      ],
      answer: null,
      points: 2
    },

    {
      type: 'spoken',
      question: 'Name any 3 coding or learning platforms.',
      choices: [],
      acceptedAnswers: [
        'LeetCode',
        'HackerRank',
        'CodeChef',
        'Codeforces',
        'GeeksforGeeks',
        'Coursera',
        'Udemy',
        'NPTEL',
        'freeCodeCamp',
        'W3Schools',
        'Codecademy',
        'Kaggle'
      ],
      answer: null,
      points: 2
    }
  ],


  // =========================================================
  // ROUND 6 — TECH CONNECTIONS
  // 2 POINTS
  // =========================================================

  [
    {
      type: 'normal',
      question: 'Chrome, Firefox, Safari, Edge',
      choices: [
        'Search engines',
        'Operating systems',
        'Web browsers',
        'Email apps'
      ],
      answer: 2,
      points: 2
    },

    {
      type: 'normal',
      question: 'Photoshop, Illustrator, Premiere Pro, Lightroom',
      choices: [
        'Adobe creative software',
        'Microsoft Office apps',
        'Google apps',
        'Autodesk tools'
      ],
      answer: 0,
      points: 2
    },

    {
      type: 'normal',
      question: 'Tesla, Ather, Ola Electric, BYD',
      choices: [
        'Fuel brands',
        'Phone brands',
        'Airlines',
        'Electric vehicle makers'
      ],
      answer: 3,
      points: 2
    },

    {
      type: 'normal',
      question: 'Alexa, Siri, Cortana, Bixby',
      choices: [
        'Search engines',
        'Voice assistants',
        'Social apps',
        'Smart TVs'
      ],
      answer: 1,
      points: 2
    },

    {
      type: 'normal',
      question: 'Jio, Airtel, Vi, BSNL',
      choices: [
        'Mobile network providers',
        'Banks',
        'Phone brands',
        'Streaming apps'
      ],
      answer: 0,
      points: 2
    },

    {
      type: 'normal',
      question: 'Zoom, Google Meet, Microsoft Teams, Skype',
      choices: [
        'Music apps',
        'Photo editors',
        'Video calling apps',
        'Payment apps'
      ],
      answer: 2,
      points: 2
    }
  ],


  // =========================================================
  // ROUND 7 — TECH IN DISGUISE
  // 3 POINTS
  // =========================================================

  [
    {
      type: 'normal',
      question:
        'I build a private tunnel through the internet, and people use me to appear as if they are in another country. What am I?',

      choices: [
        'VPN',
        'Firewall',
        'Hotspot',
        'Router'
      ],

      answer: 0,
      points: 3
    },

    {
      type: 'normal',
      question:
        "I'm your browser's short-term memory. I save pieces of websites so they load faster next time. What am I?",

      choices: [
        'Cookie',
        'History',
        'Bookmark',
        'Cache'
      ],

      answer: 3,
      points: 3
    },

    {
      type: 'normal',
      question:
        'I lock your files and demand money to unlock them. What am I?',

      choices: [
        'Adware',
        'Ransomware',
        'Spyware',
        'Phishing'
      ],

      answer: 1,
      points: 3
    },

    {
      type: 'normal',
      question:
        "I'm a chain of linked blocks that is very hard to tamper with, and I'm the technology behind Bitcoin. What am I?",

      choices: [
        'Spreadsheet',
        'Torrent',
        'Blockchain',
        'Cloud storage'
      ],

      answer: 2,
      points: 3
    },

    {
      type: 'normal',
      question:
        "I'm a bouncer who decides which traffic gets into your network. What am I?",

      choices: [
        'Firewall',
        'Cookie',
        'Hotspot',
        'Router'
      ],

      answer: 0,
      points: 3
    },

    {
      type: 'normal',
      question:
        "I send fake messages dressed up as your bank, hoping you'll hand over your password. What am I?",

      choices: [
        'Ransomware',
        'Worm',
        'Phishing',
        'Adware'
      ],

      answer: 2,
      points: 3
    }
  ],


  // =========================================================
  // ROUND 8 — BINARY, BYTES & BEYOND
  // 3 POINTS
  // =========================================================

  [
    {
      type: 'normal',
      question: 'Convert binary 10101 to decimal.',
      choices: [
        '19',
        '23',
        '21',
        '25'
      ],
      answer: 2,
      points: 3
    },

    {
      type: 'normal',
      question: 'Convert binary 11001 to decimal.',
      choices: [
        '25',
        '27',
        '23',
        '21'
      ],
      answer: 0,
      points: 3
    },

    {
      type: 'normal',
      question: 'Convert binary 10110 to decimal.',
      choices: [
        '20',
        '22',
        '26',
        '18'
      ],
      answer: 1,
      points: 3
    },

    {
      type: 'normal',
      question: 'Convert binary 11010 to decimal.',
      choices: [
        '24',
        '28',
        '22',
        '26'
      ],
      answer: 3,
      points: 3
    },

    {
      type: 'normal',
      question: 'Convert binary 10011 to decimal.',
      choices: [
        '19',
        '17',
        '21',
        '15'
      ],
      answer: 0,
      points: 3
    },

    {
      type: 'normal',
      question: 'Convert binary 11100 to decimal.',
      choices: [
        '26',
        '30',
        '28',
        '24'
      ],
      answer: 2,
      points: 3
    }
  ],


  // =========================================================
  // ROUND 9 — TECH RAPID FIRE
  // ABOUT 15 SECONDS PER QUESTION
  // 3 POINTS
  // =========================================================

  [
    {
      type: 'normal',
      question:
        "Which AI system, built by Google's DeepMind, beat the world champion of the board game Go in 2016?",

      choices: [
        'OpenAI Five',
        'IBM Watson',
        'AlphaGo',
        'Siri'
      ],

      answer: 2,
      points: 3
    },

    {
      type: 'normal',
      question:
        "Which company launched the world's first commercial microprocessor, the 4004, in 1971?",

      choices: [
        'Intel',
        'IBM',
        'Texas Instruments',
        'Motorola'
      ],

      answer: 0,
      points: 3
    },

    {
      type: 'normal',
      question:
        "What was India's first satellite, launched in 1975?",

      choices: [
        'INSAT-1A',
        'Bhaskara',
        'Rohini',
        'Aryabhata'
      ],

      answer: 3,
      points: 3
    },

    {
      type: 'normal',
      question:
        "Which Taiwanese company is the world's largest contract maker of computer chips?",

      choices: [
        'Samsung',
        'Foxconn',
        'TSMC',
        'Intel'
      ],

      answer: 2,
      points: 3
    },

    {
      type: 'normal',
      question:
        "Which organisation developed UPI, India's instant payment system?",

      choices: [
        'RBI',
        'NPCI',
        'SEBI',
        'NABARD'
      ],

      answer: 1,
      points: 3
    },

    {
      type: 'normal',
      question:
        'Which company became the first US company to reach a $1 trillion market value, in 2018?',

      choices: [
        'Amazon',
        'Apple',
        'Microsoft',
        'Google'
      ],

      answer: 1,
      points: 3
    }

  ]

];

  // =========================================================
  // DEFAULT STATE
  // =========================================================

  const defaultState = () => ({
  round: 2,
  team: 1,

  timer: 20,
  limit: 20,

  phase: 'question',
  running: false,

  scores: [30, 10, 10, 20, 0, 0],

  // Prevents duplicate scoring logic
  awarded: false,

  // Forces CORRECT / WRONG animation to restart
  animationId: 0,

  version: 1
});

  // =========================================================
  // LOAD STATE
  // =========================================================

  let state;

  try {
    state = {
      ...defaultState(),
      ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}')
    };
  } catch {
    state = defaultState();
  }

  // Safety checks
  state.team = Math.max(
    0,
    Math.min(teams.length - 1, Number(state.team) || 0)
  );

  state.round = Math.max(
    0,
    Math.min(rounds.length - 1, Number(state.round) || 0)
  );

  state.scores = teams.map((_, index) =>
    Math.max(0, Number(state.scores?.[index]) || 0)
  );

let interval = null;
let introTimeout = null;
let previouslyRenderedKey = null;

// Round intro stays on screen for 30 seconds
const ROUND_INTRO_DURATION = 30000;

const app = document.getElementById('app');

  // =========================================================
  // HELPERS
  // =========================================================
  // =========================================================
// HTML SAFETY HELPERS
// =========================================================

function escaped(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlighted(value) {
  return String(value ?? '');
}

 const getQuestion = () => {
  const roundQuestions = questionBank[state.round];

  if (!roundQuestions || !roundQuestions[state.team]) {
    return {
      type: 'empty',
      question: 'QUESTION NOT AVAILABLE',
      choices: [],
      answer: null,
      points: 0
    };
  }

  return roundQuestions[state.team];
};

// Round-specific timer
function getRoundTimer(roundIndex) {
  switch (roundIndex) {
    case 3:
      return 5;   // Round 4 - Audio
    case 4:
      return 20;  // Round 5 - Name 3 Products
    case 8:
      return 15;  // Round 9 - Rapid Fire
    default:
      return 20;
  }
}
// =========================================================
// TIME WARNING SOUND (last 5 seconds + buzzer)
// =========================================================

const WARNING_AT = 5;
const SILENT_TIMER_ROUNDS = [3];
// true  = organizer window also plays the sound (good for testing)
// false = only the auditorium display window (?screen=display) plays it
const PLAY_WARNING_ON_ORGANIZER = true;

let audioCtx = null;
let lastTickKey = null;
let lastPhaseSeen = null;

function unlockAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (e) {}
}

// Browsers block sound until the page gets one click/key press
['click', 'keydown', 'touchstart'].forEach(evt =>
  document.addEventListener(evt, unlockAudio)
);

function beep(freq, duration, volume = 0.25, type = 'sine', delay = 0) {
  if (!audioCtx || audioCtx.state !== 'running') return;

  const start = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function handleWarningSound() {
  if (isScreenOnly === false && !PLAY_WARNING_ON_ORGANIZER) return;

  // No timer sounds in silent rounds (Round 4 audio round)
  if (SILENT_TIMER_ROUNDS.includes(state.round)) {
    lastPhaseSeen = state.phase;   // keep phase tracking in sync
    return;
  }

  // Countdown ticks: 5, 4, 3, 2, 1
  if (
    state.phase === 'question' &&
    state.running &&
    state.limit > WARNING_AT &&          // skip very short timers (Round 4 = 5s)
    state.timer > 0 &&
    state.timer <= WARNING_AT
  ) {
    const key = `${state.round}:${state.team}:${state.timer}`;

    if (key !== lastTickKey) {
      lastTickKey = key;

      // Pitch rises as time runs out
      const freq = 700 + (WARNING_AT - state.timer) * 120;
      beep(freq, 0.18, 0.3, 'square');
    }
  }

  // Final buzzer when the timer reaches 0
  if (
    state.phase === 'timeUp' &&
    lastPhaseSeen === 'question'
  ) {
    beep(220, 0.9, 0.35, 'sawtooth');
    beep(180, 0.9, 0.35, 'sawtooth', 0.05);
  }

  lastPhaseSeen = state.phase;
}

// =========================================================
// PERSISTENT QUIZ AUDIO (survives re-renders)
// =========================================================

let quizAudio = null;
let quizAudioSrc = null;

function getQuizAudio(src) {
  if (!quizAudio || quizAudioSrc !== src) {
    if (quizAudio) quizAudio.pause();

    quizAudio = new Audio(src);
    quizAudio.preload = 'auto';
    quizAudioSrc = src;

    quizAudio.addEventListener('ended', () => {
      const btn = document.getElementById('play-audio');
      if (btn) btn.textContent = '▶ PLAY AUDIO';
    });
  }
  return quizAudio;
}

function stopQuizAudio() {
  if (quizAudio) {
    quizAudio.pause();
    quizAudio.currentTime = 0;
  }
}

// =========================================================
// ROUND INTRO SOUND
// =========================================================

const INTRO_SOUND_SRC = './assets/audio/intro/kbc_break.mp3';
const INTRO_SOUND_LOOP = false;          // true = repeat for the full 30 s
const PLAY_INTRO_ON_ORGANIZER = true;    // set false at the real event

let introAudio = null;
let introKey = null;

function getIntroAudio() {
  if (!introAudio) {
    introAudio = new Audio(INTRO_SOUND_SRC);
    introAudio.preload = 'auto';
    introAudio.addEventListener('error', () =>
      console.error('Intro sound file not found:', INTRO_SOUND_SRC)
    );
  }
  return introAudio;
}

// First click anywhere: silently unlock audio for this window
function primeIntroAudio() {
  const a = getIntroAudio();
  if (!a.paused) return;                 // don't interrupt a playing intro
  a.muted = true;
  a.play()
    .then(() => { a.pause(); a.currentTime = 0; a.muted = false; })
    .catch(() => { a.muted = false; });
}
['click', 'keydown', 'touchstart'].forEach(evt =>
  document.addEventListener(evt, primeIntroAudio, { once: true })
);

function handleIntroSound() {
  const isIntro = state.phase === 'intro';
  const canPlayHere = isScreenOnly || PLAY_INTRO_ON_ORGANIZER;
  const key = isIntro ? `${state.round}:${state.animationId}` : null;

  // New intro shown -> play from the start
  if (isIntro && canPlayHere && key !== introKey) {
    introKey = key;
    const a = getIntroAudio();
    a.muted = false;
    a.loop = INTRO_SOUND_LOOP;
    a.currentTime = 0;
    a.play().catch(err =>
      console.warn('Intro sound blocked or missing:', err)
    );
  }

  // Left the intro -> stop and reset
  if (!isIntro && introKey) {
    introKey = null;
    if (introAudio) {
      introAudio.pause();
      introAudio.currentTime = 0;
    }
  }
}
  // =========================================================
  // SAVE / SYNC
  // =========================================================

  function persist() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));

    if (channel) {
      channel.postMessage(state);
    }
  }

function setState(change) {

  const oldPhase = state.phase;
  const oldRound = state.round;

  state = {
    ...state,
    ...change
  };

  persist();
  render();

  // Start automatic intro ONLY when entering a NEW ROUND
  if (
    !isScreenOnly &&
    state.phase === 'intro' &&
    oldPhase !== 'intro' &&
    state.round !== oldRound
  ) {
    startRoundIntro();
  }
}
  // =========================================================
  // TEAM RANKING
  // =========================================================

  function teamRankings() {
    return teams
      .map((team, index) => ({
        index,
        name: team[0],
        icon: team[1],
        score: state.scores[index]
      }))
      .sort(
        (a, b) =>
          b.score - a.score ||
          a.index - b.index
      )
      .map((team, index) => ({
        ...team,
        rank: index + 1
      }));
  }

  // =========================================================
  // PHASE LABEL
  // =========================================================

  function phaseLabel() {
    return (
      {
        welcome: 'EVENT WELCOME',
        intro: 'ROUND INTRODUCTION',
        question: 'QUESTION IN PLAY',
        timeUp: "TIME'S UP",
        correct: 'TEAM ANSWER: CORRECT',
        wrong: 'TEAM ANSWER: WRONG',
        audience: 'AUDIENCE CHALLENGE',
        reveal: 'ANSWER REVEALED',
        leaderboard: 'LIVE LEADERBOARD',
        nextTeam: 'NEXT TEAM',
        results: 'FINAL RESULTS'
      }[state.phase] || 'QUESTION IN PLAY'
    );
  }

  // =========================================================
  // TIMER
  // =========================================================

  function timeStyle() {
    return `${Math.max(
      0,
      Math.min(
        100,
        (state.timer / state.limit) * 100
      )
    )}%`;
  }

  // =========================================================
  // QUESTION DISPLAY
  // =========================================================

  function questionMarkup() {
  const question = getQuestion();

  // =========================================================
  // ROUND 3 — LOGO
  // =========================================================
  if (question.type === 'logo') {
    return `
      <div class="question-box logo-round">
        <div class="question-live-blink">
          <i></i> GUESS THE LOGO
        </div>

        <div class="logo-display">
          <img
            src="${question.image}"
            alt="Guess the logo"
            class="quiz-logo"
          />
        </div>
      </div>

      <div
        class="timer ${state.timer <= 5 ? 'low' : ''}"
        style="--ring:${timeStyle()}"
      >
        <div class="timer-copy">
          <b>${String(state.timer).padStart(2, '0')}</b>
          <span>SECONDS</span>
        </div>
      </div>

      <div class="answer-grid">
        ${question.choices.map((choice, i) => `
          <div class="option-card">
            <span class="choice-letter">
              ${'ABCD'[i]}
            </span>

            <span>
              ${escaped(choice)}
            </span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================
  // ROUND 4 — AUDIO + FOUR OPTIONS
  // =========================================================
  if (question.type === 'audio') {
    return `
      <div class="question-box audio-round">

        <div class="question-live-blink">
          <i></i> TECH TUNE-UP
        </div>

        <div class="audio-title">
          🎵 LISTEN CAREFULLY
        </div>

      

        <button
          class="audio-play-button"
          id="play-audio"
          type="button"
        >
          ▶ PLAY AUDIO
        </button>

        

      </div>

      <div
        class="timer ${state.timer <= 5 ? 'low' : ''}"
        style="--ring:${timeStyle()}"
      >
        <div class="timer-copy">
          <b>${String(state.timer).padStart(2, '0')}</b>
          <span>SECONDS</span>
        </div>
      </div>

      <div class="answer-grid">
        ${question.choices.map((choice, i) => `
          <div class="option-card">
            <span class="choice-letter">
              ${'ABCD'[i]}
            </span>

            <span>
              ${escaped(choice)}
            </span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================
  // ROUND 5 — TIMER ONLY
  // =========================================================
 if (question.type === 'spoken') {
  return `
    <div class="spoken-round">

      

      <div
        class="timer spoken-timer ${state.timer <= 5 ? 'low' : ''}"
        style="--ring:${timeStyle()}"
      >
        <div class="timer-copy">
          <b>${String(state.timer).padStart(2, '0')}</b>
          <span>SECONDS</span>
        </div>
      </div>

      

    </div>
  `;
}
  // =========================================================
  // ROUND 10 PLACEHOLDER
  // =========================================================
  if (question.type === 'empty') {
    return `
      <div class="question-box">
        <div class="question-text">
          ROUND 10 QUESTIONS NOT ADDED YET
        </div>
      </div>
    `;
  }

  // =========================================================
  // NORMAL QUESTION
  // =========================================================
  return `
    <div class="question-box ${state.running ? 'timer-running' : ''}">

      ${
        state.running
          ? '<div class="question-live-blink"><i></i>TIMER RUNNING</div>'
          : ''
      }

      <div class="question-text">
        ${question.question}
      </div>

    </div>

    <div
      class="timer ${state.timer <= 5 ? 'low' : ''}"
      style="--ring:${timeStyle()}"
    >
      <div class="timer-copy">
        <b>${String(state.timer).padStart(2, '0')}</b>
        <span>SECONDS</span>
      </div>
    </div>

    <div class="answer-grid">
      ${question.choices.map((choice, i) => `
        <div class="option-card">
          <span class="choice-letter">
            ${'ABCD'[i]}
          </span>

          <span>
            ${escaped(choice)}
          </span>
        </div>
      `).join('')}
    </div>
  `;
}

  // =========================================================
  // ANNOUNCEMENTS
  // =========================================================

  function announcementMarkup(type) {
    const question = getQuestion();

    const nextTeam =
      (state.team + 1) % teams.length;

    if (type === 'welcome') {
      return `
        <div class="announcement welcome">
          <div class="announcement-content">

            <div class="symbol">
           <img
            src="./assets/logos/ieee.png"
            alt="IEEE"
            class="welcome-logo"/>
            </div>

            <p>
              RMKEC STUDENT BRANCH PRESENTS
            </p>

            <h1>
              IEEE QUIZ<br>
              ODYSSEY
            </h1>

            <div class="award">
              THINK • ANALYZE • SOLVE
            </div>

          </div>
        </div>
      `;
    }

    if (type === 'intro') {
      return `
        <div class="announcement intro">
          <div class="announcement-content">

            <p>GET READY FOR</p>

            <h1>
              ROUND
              ${String(state.round + 1).padStart(2, '0')}
            </h1>

            <div class="answer-reveal">
              ${rounds[state.round]}
            </div>

            <p>
              TEAM
              ${String(state.team + 1).padStart(2, '0')}
              •
              ${teams[state.team][0]}
            </p>

          </div>
        </div>
      `;
    }

    if (type === 'nextTeam') {
      return `
        <div class="announcement next-team">
          <div class="announcement-content">

            <p>NEXT UP</p>

            <div class="symbol">
              ${teams[nextTeam][1]}
            </div>

            <h1>
              TEAM
              ${String(nextTeam + 1).padStart(2, '0')}
            </h1>

            <div class="answer-reveal">
              ${teams[nextTeam][0]}
            </div>

          </div>
        </div>
      `;
    }

    if (type === 'timeUp') {
      return `
        <div class="announcement time-up">
          <div class="announcement-content">

            <div class="symbol">⌛</div>

            <h1>TIME'S UP!</h1>

            <p>
              ${state.limit}
              SECONDS HAVE ELAPSED
            </p>

          </div>
        </div>
      `;
    }

    // =======================================================
    // CORRECT
    // =======================================================

    if (type === 'correct') {
      return `
        <div class="announcement correct">

          <div class="correct-flash"></div>

          <div class="announcement-content">

            <div
              class="symbol correct-symbol"
              aria-hidden="true"
            >
              <svg viewBox="0 0 160 130">
                <path d="M18 66 L58 108 L143 18" />
              </svg>
            </div>

            <h1>CORRECT!</h1>

            <p>
              ${teams[state.team][0]}
              answered correctly
            </p>

            <div class="award">
              +10 POINTS
            </div>

          </div>
        </div>
      `;
    }

    // =======================================================
    // WRONG
    // =======================================================

    if (type === 'wrong') {
      return `
        <div class="announcement wrong">

          <div
            class="wrong-shards"
            aria-hidden="true"
          >
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>

          <div class="announcement-content">

            <div
              class="symbol wrong-symbol"
              aria-hidden="true"
            >
              <i></i>
              <i></i>
            </div>

            <h1>WRONG!</h1>

            <p>
              TEAM
              ${String(state.team + 1).padStart(2, '0')}
              — INCORRECT ANSWER
            </p>

            <div class="award">
              QUESTION GOES TO THE AUDIENCE
            </div>

          </div>
        </div>
      `;
    }

    // =======================================================
    // AUDIENCE
    // =======================================================

    if (type === 'audience') {
      return `
        <div class="announcement audience">

          <div
            class="audience-lights"
            aria-hidden="true"
          >
            <i></i>
            <i></i>
            <i></i>
          </div>

          <div class="announcement-content">

            <div
              class="symbol audience-symbol"
              aria-hidden="true"
            >
              <i></i>
              <i></i>
              <i></i>
            </div>

            <h1>
              AUDIENCE CHALLENGE!
            </h1>

            <p>
              ${question.question.replace(
                /<[^>]*>/g,
                ''
              )}
            </p>

            <div class="award">
              CAN YOU ANSWER IT?
            </div>

          </div>
        </div>
      `;
    }

      // =======================================================
  // REVEAL
  // =======================================================

  const hasChoices =
    Array.isArray(question.choices) &&
    question.choices.length > 0 &&
    question.answer !== null &&
    question.choices[question.answer] !== undefined;

  return `
    <div class="announcement reveal">

      <div class="announcement-content">

        <div class="symbol">
          ✦
        </div>

        <h1>
          CORRECT ANSWER
        </h1>

        ${
          hasChoices
            ? `
              <div class="answer-reveal">
                ${'ABCD'[question.answer]}.
                ${escaped(question.choices[question.answer])}
              </div>
            `
            : ''
        }

      </div>
    </div>
  `;
}

  // =========================================================
  // LEADERBOARD
  // =========================================================

  function boardMarkup() {
    const title =
      state.phase === 'results'
        ? '♛ FINAL RESULTS'
        : '♛ LIVE LEADERBOARD';

    return `
      <div class="board-view">

        <h1>${title}</h1>

        <div class="board-rows">

          ${teamRankings()
            .map(
              team => `
                <div class="board-row">

                  <span>
                    ${
                      team.rank <= 3
                        ? ['🥇', '🥈', '🥉'][
                            team.rank - 1
                          ]
                        : team.rank
                    }
                  </span>

                  <span>
                    TEAM
                    ${String(
                      team.index + 1
                    ).padStart(2, '0')}
                    &nbsp;
                    ${team.name}
                  </span>

                  <b>
                    ${team.score}
                  </b>

                </div>
              `
            )
            .join('')}

        </div>
      </div>
    `;
  }

  // =========================================================
  // SHOW AREA
  // =========================================================

  function showMarkup() {
    if (state.phase === 'question')
      return questionMarkup();

    if (
      state.phase === 'leaderboard' ||
      state.phase === 'results'
    )
      return boardMarkup();

    return announcementMarkup(
      state.phase
    );
  }
// =========================================================
// ANNOUNCEMENT COLOUR THEMES (set directly on the element)
// =========================================================
const ANNOUNCE_THEMES = {
  welcome: {            // EVENT WELCOME = GOLD
    edge: '#ffd94d',
    glow: 'rgba(150,95,5,.90)',
    ray:  'rgba(255,217,77,.38)',
    text: '#fff4a5',
    bar:  null
  },
  intro: {              // ROUND INTRO = BLUE
    edge: '#3c8cff',
    glow: 'rgba(10,40,150,.92)',
    ray:  'rgba(90,165,255,.45)',
    text: '#e4f0ff',
    bar:  'linear-gradient(90deg,#1c5fe0,#6fb0ff,#1c5fe0)'
  },
  'next-team': {        // NEXT TEAM = GREEN
    edge: '#33f0a0',
    glow: 'rgba(5,110,70,.92)',
    ray:  'rgba(51,240,160,.40)',
    text: '#eafff6',
    bar:  'linear-gradient(90deg,#0a8f6b,#5dffc0,#0a8f6b)'
  },
  reveal: {             // CORRECT ANSWER = HOT PINK
    edge: '#ff4fd8',
    glow: 'rgba(130,10,110,.92)',
    ray:  'rgba(255,100,225,.45)',
    text: '#fff0fb',
    bar:  'linear-gradient(90deg,#c01a9c,#ff7ee8,#c01a9c)'
  }
};

function applyAnnouncementTheme(root) {
     const el = root.querySelector(
    '.announcement.welcome, .announcement.intro, .announcement.next-team, .announcement.reveal'
  );
  if (!el) return;

   const key =
    el.classList.contains('welcome') ? 'welcome' :
    el.classList.contains('intro')   ? 'intro'   :
    el.classList.contains('reveal')  ? 'reveal'  : 'next-team';
  const t = ANNOUNCE_THEMES[key];

  const imp = (node, prop, val) => node.style.setProperty(prop, val, 'important');

  // Border + glow
  imp(el, 'border-color', t.edge);
  imp(el, 'box-shadow', `inset 0 0 90px ${t.glow}, 0 0 42px ${t.edge}`);

  // Own background + rotating rays layer (covers the old purple rays)
  const layer = document.createElement('div');
  layer.style.cssText =
    'position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none;' +
    `background:radial-gradient(ellipse at 50% 50%, ${t.glow} 0%, rgba(2,12,25,.98) 85%);`;

  const rays = document.createElement('div');
rays.style.cssText =
  'position:absolute;left:50%;top:50%;width:200vmax;height:200vmax;' +
  'margin:-100vmax 0 0 -100vmax;' +
  `background:repeating-conic-gradient(from 0deg at 50% 50%, ${t.ray} 0deg 6deg, transparent 6deg 15deg);`;

layer.appendChild(rays);
el.insertBefore(layer, el.firstChild);

// Clockwise rotation driven by JavaScript
rays.animate(
  [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(360deg)' }
  ],
  {
    duration: 14000,
    iterations: Infinity,
    easing: 'linear'
  }
);

  // Text colours
  const h1 = el.querySelector('h1');
  if (h1) {
    imp(h1, 'color', t.text);
    imp(h1, 'text-shadow', `0 0 18px ${t.edge}`);
  }

  // The coloured bar (round name / team name)
  if (t.bar) {
    el.querySelectorAll('.answer-reveal').forEach(bar => {
      imp(bar, 'background', t.bar);
      imp(bar, 'color', '#ffffff');
      imp(bar, 'box-shadow', `0 0 35px ${t.edge}`);
    });
  }

  // Symbol (◇ / team icon)
  const sym = el.querySelector('.symbol');
  if (sym) {
    imp(sym, 'color', t.edge);
    imp(sym, 'filter', `drop-shadow(0 0 24px ${t.edge})`);
  }
}
  // =========================================================
  // DISPLAY SCREEN
  // =========================================================

  function renderDisplay(
    target,
    shouldAnimate = true
  ) {
    target.innerHTML =
      document.getElementById(
        'display-template'
      ).innerHTML;

    const display =
      target.querySelector(
        '.display-shell'
      );

    display.classList.add(
      `phase-${state.phase}`
    );

    target.querySelector(
      '#round-label'
    ).textContent =
      `ROUND ${state.round + 1}`;

    target.querySelector(
      '#round-topic'
    ).textContent =
      rounds[state.round];

    target.querySelector(
      '#question-count'
    ).textContent =
      `QUESTION ${state.team + 1} / ${teams.length}`;

    target.querySelector(
      '#team-label'
    ).textContent =
      `TEAM ${String(
        state.team + 1
      ).padStart(2, '0')}`;

    target.querySelector(
      '#team-name'
    ).textContent =
      teams[state.team][0];

    target.querySelector(
      '#footer-round'
    ).textContent =
      `ROUND ${state.round + 1} / 10`;

    target.querySelector(
      '#footer-question'
    ).textContent =
      `QUESTION ${state.team + 1} / ${teams.length}`;

    target.querySelector(
      '#footer-state'
    ).textContent =
      phaseLabel();

    target.querySelector(
      '#progress-dots'
    ).innerHTML =
      Array.from(
        {
          length: teams.length
        },
        (_, index) =>
          `<i class="${
            index < state.team
              ? 'complete'
              : index === state.team
              ? 'active'
              : ''
          }"></i>`
      ).join('');

   const showArea =
  target.querySelector(
    '#show-area'
  );

showArea.innerHTML =
  showMarkup();
applyAnnouncementTheme(showArea);

// =====================================================
// ROUND 4 — AUDIO PLAY CONTROL
// =====================================================

const playButton = target.querySelector('#play-audio');
const currentQ = getQuestion();

if (playButton && currentQ.type === 'audio') {

  const audio = getQuizAudio(currentQ.audio);

  // Redrawn button must show the real state
  playButton.textContent = audio.paused
    ? '▶ PLAY AUDIO'
    : '⏸ PAUSE AUDIO';

    playButton.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playButton.textContent = '⏸ PAUSE AUDIO';

        // Start the timer automatically when the audio starts
        if (state.phase === 'question' && !state.running) {
          if (isScreenOnly) {
            // Display window: ask the organizer window to start it
            channel?.postMessage({ command: 'start-timer' });
          } else {
            // Organizer window: start it directly
            beginTimer();
          }
        }
      } else {
        audio.pause();
        playButton.textContent = '▶ PLAY AUDIO';
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      playButton.textContent = '⚠ AUDIO ERROR';
    }
  });

} else {
  // Not on an audio question: make sure nothing keeps playing
  stopQuizAudio();
}
showArea.classList.remove('spoken-stage');

/* =====================================================
   ROUND 5
   ===================================================== */

if (
  state.phase === 'question' &&
  currentQ.type === 'spoken'
) {

  /* FORCE THE WHOLE SHOW AREA TO ONE COLUMN */
  showArea.classList.add('spoken-stage');

  showArea.style.display = 'grid';

  showArea.style.gridTemplateColumns = '1fr';

  showArea.style.gridTemplateRows = '1fr';

  showArea.style.gap = '0';

  showArea.style.padding = '0';

  showArea.style.alignItems = 'center';

  showArea.style.justifyItems = 'center';

  showArea.style.justifyContent = 'center';

  showArea.style.alignContent = 'center';
}

if (shouldAnimate) {
  showArea.classList.add('stage-enter');
}

    const ranks =
      teamRankings();

    target.querySelector(
      '#team-list'
    ).innerHTML =
      ranks
        .map(
          team => `
            <div
              class="team-tile ${
                team.index === state.team
                  ? 'current'
                  : ''
              }"
            >

              <span class="rank-badge">
                ${team.rank}
              </span>

              <span class="team-icon">
                ${team.icon}
              </span>

              <b>
                TEAM
                ${String(
                  team.index + 1
                ).padStart(2, '0')}
              </b>

              <small>
                ${team.name}
              </small>

              <strong>
                ${team.score}
              </strong>

            </div>
          `
        )
        .join('');
  }

  // =========================================================
  // ORGANIZER CONTROL PANEL
  // =========================================================

  function controlMarkup() {
    const question =
      getQuestion();

    return `
      <aside class="control-panel">

        <header class="control-header">

          <div class="control-title">
            <i>⚙</i>
            <span>
              IEEE QUIZ ODYSSEY –
              CONTROL PANEL
            </span>
          </div>

          <span class="live-pill">
            LIVE
          </span>

        </header>

        <nav class="control-nav">

          <button
            class="active"
            data-view="live"
          >
            LIVE CONTROL
          </button>

          <button data-view="edit">
            EDIT QUESTION
          </button>

          <button data-view="setup">
            EVENT SETUP
          </button>

          <button data-view="screen">
            OPEN DISPLAY
          </button>

        </nav>

        <div class="control-body">

          <!-- TEAM / ROUND -->

          <div class="selection-grid">

            <div class="field">

              <label for="round-select">
                Round
              </label>

              <select id="round-select">

                ${rounds
                  .map(
                    (round, i) => `
                      <option
                        value="${i}"
                        ${
                          i === state.round
                            ? 'selected'
                            : ''
                        }
                      >
                        ${i + 1} –
                        ${round}
                      </option>
                    `
                  )
                  .join('')}

              </select>

            </div>

            <div class="field">

              <label for="team-select">
                Team
              </label>

              <select id="team-select">

                ${teams
                  .map(
                    (team, i) => `
                      <option
                        value="${i}"
                        ${
                          i === state.team
                            ? 'selected'
                            : ''
                        }
                      >
                        Team
                        ${String(
                          i + 1
                        ).padStart(2, '0')}
                        –
                        ${team[0]}
                      </option>
                    `
                  )
                  .join('')}

              </select>

            </div>

          </div>

          <!-- QUESTION -->

          <section class="control-card">

            <div class="question-nav">

              <button
                class="nav-btn"
                data-action="previous"
              >
                ‹
              </button>

              <strong>
                QUESTION
                ${state.team + 1}
                /
                ${teams.length}
              </strong>

              <button
                class="nav-btn"
                data-action="next"
              >
                ›
              </button>

            </div>

            <div class="card-top">

              <b>Question</b>

              <button
                class="tiny-button"
                data-action="toggle-edit"
              >
                ✎ Edit
              </button>

            </div>

            <p class="control-question">
              ${question.question}
            </p>

            <div class="mini-options">

              ${question.choices
                .map(
                  (choice, i) => `
                    <div
                      class="mini-option ${
                        i === question.answer
                          ? 'correct-answer'
                          : ''
                      }"
                    >

                      <span class="mini-letter">
                        ${'ABCD'[i]}
                      </span>

                      <span>
                        ${escaped(choice)}
                      </span>

                      ${
                        i === question.answer
                          ? '<b class="answer-mark">✓</b>'
                          : ''
                      }

                    </div>
                  `
                )
                .join('')}

            </div>

          </section>

          <!-- TIMER -->

          <section class="control-card">

            <div class="timer-row">

              <div class="field">

                <label for="timer-input">
                  Timer (seconds)
                </label>

                <input
                  id="timer-input"
                  type="number"
                  min="5"
                  max="120"
                  value="${state.limit}"
                />

              </div>

              <button
                class="tiny-button"
                data-action="reset-timer"
              >
                Reset Timer
              </button>

            </div>

            <div class="timer-preset">

              <button
                class="preset ${
                  state.limit === 10
                    ? 'selected'
                    : ''
                }"
                data-limit="10"
              >
                10s
              </button>

              <button
                class="preset ${
                  state.limit === 20
                    ? 'selected'
                    : ''
                }"
                data-limit="20"
              >
                20s
              </button>

              <button
                class="preset ${
                  state.limit === 30
                    ? 'selected'
                    : ''
                }"
                data-limit="30"
              >
                30s
              </button>

              <button
                class="preset ${
                  state.limit === 45
                    ? 'selected'
                    : ''
                }"
                data-limit="45"
              >
                45s
              </button>

            </div>

            <div class="action-row two">

              <button
                class="action start"
                data-action="start"
              >
                ▶
                ${
                  state.running
                    ? 'RUNNING'
                    : 'START TIMER'
                }
              </button>

              <button
                class="action pause"
                data-action="pause"
              >
                Ⅱ PAUSE
              </button>

            </div>

            <button
              class="action stop"
              data-action="stop"
            >
              ■ STOP TIMER
            </button>

            <div class="status-line">

              <span class="status-dot"></span>

              <span>
                ${
                  state.running
                    ? `Timer is live — ${state.timer} seconds remaining`
                    : `${phaseLabel()} — ready for organizer`
                }
              </span>

            </div>

          </section>

          <!-- =================================================
               NEW A/B/C/D ANSWER SELECTION
               ================================================= -->

          <section class="control-card answer-control">

            <div class="card-top">

              <b>
                SELECT TEAM ANSWER
              </b>

              <span class="live-pill">
                VERBAL
              </span>

            </div>

            <p class="answer-instruction">
              Participant answers verbally.
              Click the option they gave.
            </p>

            <div class="answer-select-grid">

              ${question.choices
                .map(
                  (choice, i) => `
                    <button
                      class="answer-select-btn answer-${'abcd'[i]}"
                      data-answer-index="${i}"
                    >

                      <span class="answer-letter">
                        ${'ABCD'[i]}
                      </span>

                      <span>
                        ${escaped(choice)}
                      </span>

                    </button>
                  `
                )
                .join('')}

            </div>

            <div class="answer-result-note">

              ${
                state.awarded
                  ? state.phase === 'correct'
                    ? '✓ Answer already marked CORRECT'
                    : state.phase === 'wrong' ||
                      state.phase === 'audience' ||
                      state.phase === 'reveal'
                    ? '✕ Answer already marked WRONG'
                    : 'Answer already evaluated'
                  : 'Choose A, B, C, or D to evaluate the verbal answer.'
              }

            </div>

            <!-- ORGANIZER ONLY -->

            <div class="secondary-actions">

              <button
                class="action audience"
                data-action="audience"
              >
                ♩
                &nbsp;
                Audience Challenge
              </button>

              <button
                class="action reveal"
                data-action="reveal"
              >
                ◉
                &nbsp;
                Reveal Answer
              </button>

            </div>

            <div class="secondary-actions">

              <button
                class="action secondary"
                data-action="leaderboard"
              >
                ♛ Show Leaderboard
              </button>

              <button
                class="action secondary"
                data-action="question"
              >
                ↺ Return to Question
              </button>

            </div>

          </section>

          <!-- =================================================
               STAGE CUES
               ================================================= -->

          <section class="control-card">

            <div class="card-top">

              <b>
                Stage Cue
              </b>

              <span class="tiny-button">
                AUDITORIUM
              </span>

            </div>

            <div class="secondary-actions">

              <button
                class="action secondary"
                data-action="welcome"
              >
                ◇ Event Welcome
              </button>

              <button
                class="action secondary"
                data-action="intro"
              >
                ✦ Round Intro
              </button>

            </div>

            <div class="secondary-actions">

              <button
                class="action secondary"
                data-action="next-team"
              >
                ⇢ Next Team
              </button>

              <button
                class="action secondary"
                data-action="results"
              >
                ♛ Final Results
              </button>

            </div>

            <button
              class="action reset-scores"
              data-action="reset-scores"
            >
              ↻ RESET ALL SCORES
            </button>

          </section>

          <!-- =================================================
               PER TEAM SCORE ADJUSTMENT
               ================================================= -->

          <section class="control-card score-adjustment">

            <div class="card-top">

              <b>
                MANUAL SCORE ADJUSTMENT
              </b>

              <span class="tiny-button">
                ALL 6 TEAMS
              </span>

            </div>

            <div class="score-adjust-list">

              ${teams
                .map(
                  (team, i) => `
                    <div class="score-adjust-row">

                      <div class="score-adjust-team">

                        <b>
                          TEAM
                          ${String(
                            i + 1
                          ).padStart(2, '0')}
                        </b>

                        <span>
                          ${team[0]}
                        </span>

                        <strong>
                          ${state.scores[i]}
                        </strong>

                      </div>

                      <div class="score-adjust-buttons">

                        <button
                          class="score-minus"
                          data-score-team="${i}"
                          data-score-amount="-10"
                        >
                          −10
                        </button>

                        <button
                          class="score-minus"
                          data-score-team="${i}"
                          data-score-amount="-5"
                        >
                          −5
                        </button>

                        <button
                          class="score-plus"
                          data-score-team="${i}"
                          data-score-amount="5"
                        >
                          +5
                        </button>

                        <button
                          class="score-plus"
                          data-score-team="${i}"
                          data-score-amount="10"
                        >
                          +10
                        </button>

                      </div>

                    </div>
                  `
                )
                .join('')}

            </div>

          </section>

          <!-- QUESTION EDITOR -->

          <section
            class="question-editor"
            id="question-editor"
          >

            <div class="card-top">

              <b>
                Quick question editor
              </b>

              <button
                class="tiny-button"
                data-action="save-question"
              >
                Save
              </button>

            </div>

            <label>

              Question

              <textarea
                id="edit-question"
              >${question.question.replace(
                /<[^>]*>/g,
                ''
              )}</textarea>

            </label>

            <div class="option-inputs">

              ${question.choices
                .map(
                  (choice, i) => `
                    <input
                      id="choice-${i}"
                      value="${escaped(choice)}"
                      aria-label="Choice ${'ABCD'[i]}"
                    />
                  `
                )
                .join('')}

            </div>

            <label>

              Correct choice

              <select id="correct-choice">

                ${['A', 'B', 'C', 'D']
                  .map(
                    (letter, i) => `
                      <option
                        value="${i}"
                        ${
                          i === question.answer
                            ? 'selected'
                            : ''
                        }
                      >
                        ${letter}
                      </option>
                    `
                  )
                  .join('')}

              </select>

            </label>

          </section>

          <!-- SETUP -->

          <div
            class="configuration-note"
            id="setup-note"
          >
            Pre-event setup is ready:
            10 round slots,
            6 assigned team questions per round,
            configurable timer limits,
            automatic A/B/C/D answer evaluation,
            manual score adjustment,
            and audience challenge controls.
          </div>

        </div>

      </aside>
    `;
  }

  // =========================================================
  // RENDER
  // =========================================================

  function render() {
    handleWarningSound();
     handleIntroSound();
    const renderKey =
  `${state.phase}:${state.round}:${state.team}:${state.awarded}:${state.animationId}`;

    const shouldAnimate =
      renderKey !== previouslyRenderedKey;

    previouslyRenderedKey =
      renderKey;

    // AUDITORIUM SCREEN
    if (isScreenOnly) {
      app.className =
        'solo-display';

      renderDisplay(
        app,
        shouldAnimate
      );

      return;
    }

    // ORGANIZER SCREEN
    app.className =
      'app-shell';

    app.innerHTML =
      '<section id="main-display"></section>' +
      controlMarkup();

    renderDisplay(
      app.querySelector(
        '#main-display'
      ),
      shouldAnimate
    );

    bindControls();
  }

  // =========================================================
  // TIMER
  // =========================================================

  function stopTimer() {
    if (interval)
      clearInterval(interval);

    interval = null;
  }
  // =========================================================
// AUTOMATIC ROUND INTRO
// =========================================================

function startRoundIntro() {

  // Auditorium only displays the intro.
  // Organizer controls the state.
  if (isScreenOnly) {
    return;
  }

  // Clear previous intro timer
  if (introTimeout) {
    clearTimeout(introTimeout);
    introTimeout = null;
  }

  // Only start when current phase is intro
  if (state.phase !== 'intro') {
    return;
  }

  introTimeout = setTimeout(() => {

    introTimeout = null;

    // Make sure the phase wasn't changed manually
    if (state.phase !== 'intro') {
      return;
    }

    stopTimer();

    setState({

      // Start questions again
      phase: 'question',

      // Always start with Team 01
      team: 0,

      // Reset timer
      // Reset timer based on the current round
timer: getRoundTimer(state.round),
limit: getRoundTimer(state.round),

      running: false,

      // New question should not be marked
      awarded: false,

      // Restart screen animation
      animationId: Date.now()

    });

  }, ROUND_INTRO_DURATION);
}

  function beginTimer() {
    if (state.running)
      return;

    if (
      state.phase !== 'question'
    ) {
      state.phase =
        'question';
    }

    if (state.timer <= 0) {
      state.timer =
        state.limit;
    }

    state.running =
      true;

    persist();
    render();

    stopTimer();

    interval =
      setInterval(() => {

        state.timer =
          Math.max(
            0,
            state.timer - 1
          );

        if (
          state.timer === 0
        ) {

          state.running =
            false;

          state.phase =
            'timeUp';

          stopTimer();
        }

        persist();
        render();

      }, 1000);
  }

// =========================================================
// NEXT / PREVIOUS
// =========================================================
// Start the countdown automatically on a new question
function autoStartTimer() {
  if (isScreenOnly) return;                 // only the organizer window runs the timer
  if (state.phase !== 'question') return;   // not on intro / welcome screens

  const q = getQuestion();
  if (q.type === 'audio' || q.type === 'empty') return;  // Round 4 starts when audio plays

  beginTimer();
}

function move(direction) {
  stopTimer();

  const currentPosition =
    state.round * teams.length +
    state.team;

  const newPosition =
    currentPosition + direction;

  const totalQuestions =
    rounds.length * teams.length;

  // Prevent going before the first question
  // or after the last question
  if (
    newPosition < 0 ||
    newPosition >= totalQuestions
  ) {
    return;
  }

  const newRound =
    Math.floor(
      newPosition / teams.length
    );

  const newTeam =
    newPosition % teams.length;

  // =====================================================
  // MOVING TO A NEW ROUND
  // SHOW ROUND INTRO FIRST
  // =====================================================

  if (newRound !== state.round) {
    return setState({
      round: newRound,
      team: 0,

      // IMPORTANT:
      // Do NOT directly show the question
      phase: 'intro',

      timer: state.limit,
      running: false,
      awarded: false,
      animationId: Date.now()
    });
  }

  // =====================================================
  // NORMAL NEXT / PREVIOUS TEAM
  // =====================================================

  setState({
  round: newRound,
  team: newTeam,
  phase: 'question',
  timer: state.limit,
  running: false,
  awarded: false,
  animationId: Date.now()
});

autoStartTimer();
return;
}
  // =========================================================
  // QUESTION EDITOR
  // =========================================================

  function updateQuestionFromEditor() {

    const q =
      getQuestion();

    q.question =
      highlighted(
        document
          .getElementById(
            'edit-question'
          )
          .value
          .trim() ||
          q.question
      );

    q.choices =
      [0, 1, 2, 3].map(
        i =>
          document
            .getElementById(
              `choice-${i}`
            )
            .value
            .trim() ||
          q.choices[i]
      );

    q.answer =
      Number(
        document.getElementById(
          'correct-choice'
        ).value
      );

    render();
  }

  // =========================================================
  // CONTROLS
  // =========================================================

  function bindControls() {

    // ROUND
    app
      .querySelector(
        '#round-select'
      )
      .addEventListener(
        'change',
        event => {

          stopTimer();

          setState({

            round:
              Number(
                event.target.value
              ),

            phase:
              'question',

            timer:
              state.limit,

            running:
              false,

            awarded:
              false
          });
        }
      );

    // TEAM
    app
      .querySelector(
        '#team-select'
      )
      .addEventListener(
        'change',
        event => {

          stopTimer();

          setState({

            team:
              Number(
                event.target.value
              ),

            phase:
              'question',

            timer:
              state.limit,

            running:
              false,

            awarded:
              false
          });
        }
      );

    // TIMER INPUT
    app
      .querySelector(
        '#timer-input'
      )
      .addEventListener(
        'change',
        event => {

          const limit =
            Math.max(
              5,
              Math.min(
                120,
                Number(
                  event.target.value
                ) || 20
              )
            );

          setState({
            limit,
            timer: limit
          });
        }
      );

    // TIMER PRESETS
    app
      .querySelectorAll(
        '[data-limit]'
      )
      .forEach(
        button => {

          button.addEventListener(
            'click',
            () => {

              const limit =
                Number(
                  button.dataset
                    .limit
                );

              setState({
                limit,
                timer: limit
              });

            }
          );

        }
      );

    // NAVIGATION
    app
      .querySelectorAll(
        '[data-view]'
      )
      .forEach(
        button => {

          button.addEventListener(
            'click',
            () => {

              const view =
                button.dataset
                  .view;

              if (
                view === 'screen'
              ) {

                const displayUrl =
                  `${window.location.origin}${window.location.pathname}?screen=display`;

                const auditoriumWindow =
                  window.open(
                    displayUrl,
                    'IEEEQuizAuditorium',
                    'popup=yes,width=1920,height=1080'
                  );

                if (
                  auditoriumWindow
                ) {
                  auditoriumWindow.focus();
                } else {
                  alert(
                    'Please allow pop-ups for this localhost site.'
                  );
                }

                return;
              }

              if (
                view === 'edit'
              ) {
                document
                  .getElementById(
                    'question-editor'
                  )
                  .classList
                  .toggle('open');
              }

              if (
                view === 'setup'
              ) {
                document
                  .getElementById(
                    'setup-note'
                  )
                  .classList
                  .toggle('open');
              }

              app
                .querySelectorAll(
                  '.control-nav button'
                )
                .forEach(
                  item =>
                    item.classList.remove(
                      'active'
                    )
                );

              button.classList.add(
                'active'
              );
            }
          );

        }
      );

    // =======================================================
    // GENERAL ACTIONS
    // =======================================================

    app
      .querySelectorAll(
        '[data-action]'
      )
      .forEach(
        button => {

          button.addEventListener(
            'click',
            () => {

              const action =
                button.dataset
                  .action;

              // START
              if (
                action === 'start'
              ) {
                return beginTimer();
              }

              // PAUSE
              if (
                action === 'pause'
              ) {

                stopTimer();

                return setState({
                  running: false
                });
              }

              // STOP
              if (
                action === 'stop'
              ) {

                stopTimer();

                return setState({
                  running: false,
                  timer: 0
                });
              }

              // RESET TIMER
              if (
                action ===
                'reset-timer'
              ) {

                stopTimer();

                return setState({
                  running: false,
                  timer:
                    state.limit
                });
              }

              // PREVIOUS
              if (
                action ===
                'previous'
              ) {
                return move(-1);
              }

              // NEXT
              if (
                action === 'next'
              ) {
                return move(1);
              }

              // =================================================
              // RESET ALL SCORES
              // =================================================

              if (
                action ===
                'reset-scores'
              ) {

                const confirmed =
                  confirm(
                    'RESET ALL TEAM SCORES?\n\n' +
                    'All 6 teams will be set to 0 points.\n\n' +
                    'This action cannot be undone.'
                  );

                if (
                  !confirmed
                ) {
                  return;
                }

                stopTimer();

                return setState({

                  scores:
                    teams.map(
                      () => 0
                    ),

                  awarded:
                    false,

                  running:
                    false
                });
              }

              // =================================================
              // AUDIENCE CHALLENGE
              // =================================================

              if (
                action ===
                'audience'
              ) {

                stopTimer();

                return setState({
                  phase:
                    'audience',

                  running:
                    false
                });
              }

              // =================================================
              // REVEAL ANSWER
              // =================================================

              if (
                action ===
                'reveal'
              ) {

                stopTimer();

                return setState({
                  phase:
                    'reveal',

                  running:
                    false
                });
              }

              // =================================================
              // LEADERBOARD
              // =================================================

              if (
                action ===
                'leaderboard'
              ) {

                stopTimer();

                return setState({
                  phase:
                    'leaderboard',

                  running:
                    false
                });
              }

              
// RETURN TO QUESTION
// ENABLE A/B/C/D AGAIN
// =================================================

if (action === 'question') {

  stopTimer();

  return setState({

    phase: 'question',

    running: false,

    timer: state.limit,

    // IMPORTANT:
    // New answer can be selected now
    awarded: false
  });
}

              // WELCOME
              if (
                action ===
                'welcome'
              ) {

                stopTimer();

                return setState({
                  phase:
                    'welcome',

                  running:
                    false
                });
              }

              // INTRO
              if (
                action === 'intro'
              ) {

                stopTimer();

                return setState({
                  phase:
                    'intro',

                  running:
                    false
                });
              }

              // =======================================================
// NEXT TEAM / AUTOMATIC ROUND TRANSITION
// =======================================================

if (action === 'next-team') {

  stopTimer();

  // -----------------------------------------------
  // LAST TEAM OF CURRENT ROUND
  // -----------------------------------------------

  if (state.team === teams.length - 1) {

    // ---------------------------------------------
    // LAST ROUND FINISHED
    // ---------------------------------------------

    if (state.round === rounds.length - 1) {

      return setState({
        phase: 'results',
        running: false,
        awarded: false,
        animationId: Date.now()
      });

    }

    // ---------------------------------------------
    // MOVE TO NEXT ROUND
    // ---------------------------------------------

    return setState({

      // Next round
      round: state.round + 1,

      // Start with Team 01
      team: 0,

      // First question
      question: 0,

      // IMPORTANT:
      // Automatically show Round Intro
      phase: 'intro',

      running: false,

      timer: state.limit,

      awarded: false,

      animationId: Date.now()

    });
  }

  // -----------------------------------------------
  // MOVE TO NEXT TEAM
  // -----------------------------------------------

  // MOVE TO NEXT TEAM
  setState({
    team: state.team + 1,
    question: state.question + 1,
    phase: 'question',
    running: false,
    timer: state.limit,
    awarded: false,
    animationId: Date.now()
  });

  autoStartTimer();
  return;
}
              // EDIT
              if (
                action ===
                'toggle-edit'
              ) {

                return document
                  .getElementById(
                    'question-editor'
                  )
                  .classList
                  .toggle('open');
              }

              // SAVE QUESTION
              if (
                action ===
                'save-question'
              ) {

                return updateQuestionFromEditor();
              }

            }
          );

        }
      );



// =======================================================
// A / B / C / D ANSWER BUTTONS
// =======================================================

app
  .querySelectorAll('[data-answer-index]')
  .forEach(button => {

    button.addEventListener('click', () => {

      const selected =
        Number(button.dataset.answerIndex);

      const correctAnswer =
        getQuestion().answer;

      stopTimer();

      // ================================
      // CORRECT
      // ================================

      if (selected === correctAnswer) {

        const scores = [...state.scores];

        // Add points only when changing to CORRECT
        if (state.phase !== 'correct') {
          scores[state.team] += 10;
        }

        return setState({
          scores,
          phase: 'correct',
          running: false,
          awarded: true,

          // FORCE NEW ANIMATION
          animationId: Date.now()
        });
      }

      // ================================
      // WRONG
      // ================================

      const scores = [...state.scores];

      // Remove +10 if it was previously correct
      if (state.phase === 'correct') {
        scores[state.team] =
          Math.max(0, scores[state.team] - 10);
      }

      return setState({
        scores,
        phase: 'wrong',
        running: false,
        awarded: true,

        // FORCE NEW ANIMATION
        animationId: Date.now()
      });

    });

  });
    // =======================================================
    // PER-TEAM SCORE +/- BUTTONS
    // =======================================================

    app
      .querySelectorAll(
        '[data-score-team]'
      )
      .forEach(
        button => {

          button.addEventListener(
            'click',
            () => {

              const teamIndex =
                Number(
                  button.dataset
                    .scoreTeam
                );

              const amount =
                Number(
                  button.dataset
                    .scoreAmount
                );

              const scores =
                [
                  ...state.scores
                ];

              // Prevent score below 0
              scores[
                teamIndex
              ] = Math.max(
                0,
                scores[
                  teamIndex
                ] + amount
              );

              setState({
                scores
              });

            }
          );

        }
      );
  }

  // =========================================================
  // LIVE DISPLAY SYNC
  // =========================================================

    channel?.addEventListener(
    'message',
    event => {

      // Command from the display window -> organizer starts the timer
      if (event.data && event.data.command === 'start-timer') {
        if (
          !isScreenOnly &&
          state.phase === 'question' &&
          !state.running
        ) {
          beginTimer();
        }
        return;
      }

      // Normal state sync for the display window
      if (isScreenOnly) {

        state = {
          ...state,
          ...event.data
        };

        render();
      }

    }
  );

  window.addEventListener(
    'storage',
    event => {

      if (
        isScreenOnly &&
        event.key ===
          STORE_KEY
      ) {

        try {

          state = {
            ...state,
            ...JSON.parse(
              event.newValue
            )
          };

          render();

        } catch {}

      }

    }
  );

  // =========================================================
  // INITIAL RENDER
  // =========================================================

  render();

})();