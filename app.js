(() => {
  const STORE_KEY = 'ieee-quiz-odyssey-v1';
  const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ieee-quiz-odyssey-live') : null;
  const isScreenOnly = new URLSearchParams(location.search).get('screen') === 'display';
  const rounds = [
    'Innovation & Engineering', 'Science & Technology', 'AI & Machine Learning', 'IEEE & Electronics', 'Robotics & Automation',
    'Space & Astronomy', 'Sustainability', 'Cybersecurity', 'General Engineering', 'Grand Finale'
  ];
  const teams = [
    ['Code Warriors', '⌬'], ['Binary Beasts', '♙'], ['Tech Titans', '△'], ['Neural Ninjas', '◈'],
    ['Debuggers', '♧'], ['Pixel Pioneers', '▧']
  ];
  const questionBank = [
    { question: 'Which algorithm is commonly used for <mark>clustering</mark> in machine learning?', choices: ['Decision Tree', 'K-Means', 'Linear Regression', 'Apriori'], answer: 1 },
    { question: 'Which technique helps a model avoid <mark>overfitting</mark>?', choices: ['Regularization', 'Increasing noise', 'Removing all data', 'Gradient ascent'], answer: 0 },
    { question: 'A neural network learns by adjusting its…', choices: ['Colours', 'Weights', 'Screens', 'Files'], answer: 1 },
    { question: 'Which type of learning uses <mark>labelled data</mark>?', choices: ['Unsupervised', 'Reinforcement', 'Supervised', 'Transfer'], answer: 2 },
    { question: 'What does NLP stand for in AI?', choices: ['Neural Logic Program', 'Natural Language Processing', 'Network Learning Protocol', 'Number Link Processing'], answer: 1 },
    { question: 'Which metric represents classification accuracy?', choices: ['Correct predictions / total predictions', 'Model size', 'Training time', 'Number of layers'], answer: 0 },
    { question: 'Which model is ideal for image recognition?', choices: ['CNN', 'SQL', 'BFS', 'KNN only'], answer: 0 },
    { question: 'The process of training a model on data is called?', choices: ['Compilation', 'Inference', 'Learning', 'Rendering'], answer: 2 }
  ];
  const defaultState = () => ({
    round: 2, team: 1, timer: 20, limit: 20, phase: 'question', running: false,
    scores: [30, 10, 10, 20, 0, 0], awarded: false, version: 1
  });
  let state;
  try { state = { ...defaultState(), ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}') }; } catch { state = defaultState(); }
  state.team = Math.max(0, Math.min(teams.length - 1, Number(state.team) || 0));
  state.round = Math.max(0, Math.min(rounds.length - 1, Number(state.round) || 0));
  state.scores = teams.map((_, index) => Math.max(0, Number(state.scores?.[index]) || 0));
  let interval = null;
  let previouslyRenderedKey = null;
  const app = document.getElementById('app');
  const getQuestion = () => questionBank[state.team % questionBank.length];
  const escaped = (text) => text.replace(/[&<>"']/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[char]);
  const highlighted = (text) => text.replace(/(clustering|overfitting|labelled data)/g, '<mark>$1</mark>');

  function persist() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    channel?.postMessage(state);
  }
  function setState(change) {
    state = { ...state, ...change };
    persist(); render();
  }
  function teamRankings() {
    return teams.map((team, index) => ({ index, name: team[0], icon: team[1], score: state.scores[index] }))
      .sort((a,b) => b.score - a.score || a.index - b.index).map((team, index) => ({...team, rank:index + 1}));
  }
  function phaseLabel() {
    return ({ welcome: 'EVENT WELCOME', intro: 'ROUND INTRODUCTION', question: 'QUESTION IN PLAY', timeUp: "TIME'S UP", correct: 'TEAM ANSWER: CORRECT', wrong: 'TEAM ANSWER: WRONG', audience: 'AUDIENCE CHALLENGE', reveal: 'ANSWER REVEALED', leaderboard: 'LIVE LEADERBOARD', nextTeam: 'NEXT TEAM', results: 'FINAL RESULTS' })[state.phase] || 'QUESTION IN PLAY';
  }
  function timeStyle() { return `${Math.max(0, Math.min(100, (state.timer / state.limit) * 100))}%`; }
  function questionMarkup() {
    const question = getQuestion();
    return `<div class="question-box ${state.running ? 'timer-running' : ''}">${state.running ? '<div class="question-live-blink"><i></i>TIMER RUNNING</div>' : ''}<div class="question-text">${question.question}</div></div>
      <div class="timer ${state.timer <= 5 ? 'low' : ''}" style="--ring:${timeStyle()}"><div class="timer-copy"><b>${String(state.timer).padStart(2, '0')}</b><span>SECONDS</span></div></div>
      <div class="answer-grid">${question.choices.map((choice, i) => `<div class="option-card"><span class="choice-letter">${'ABCD'[i]}</span><span>${escaped(choice)}</span></div>`).join('')}</div>`;
  }
  function announcementMarkup(type) {
    const question = getQuestion();
    const nextTeam = (state.team + 1) % teams.length;
    if (type === 'welcome') return `<div class="announcement welcome"><div class="announcement-content"><div class="symbol">◇</div><p>RMKEC STUDENT BRANCH PRESENTS</p><h1>IEEE QUIZ<br>ODYSSEY</h1><div class="award">THINK • ANALYZE • SOLVE</div></div></div>`;
    if (type === 'intro') return `<div class="announcement intro"><div class="announcement-content"><p>GET READY FOR</p><h1>ROUND ${String(state.round + 1).padStart(2, '0')}</h1><div class="answer-reveal">${rounds[state.round]}</div><p>TEAM ${String(state.team + 1).padStart(2, '0')} • ${teams[state.team][0]}</p></div></div>`;
    if (type === 'nextTeam') return `<div class="announcement next-team"><div class="announcement-content"><p>NEXT UP</p><div class="symbol">${teams[nextTeam][1]}</div><h1>TEAM ${String(nextTeam + 1).padStart(2, '0')}</h1><div class="answer-reveal">${teams[nextTeam][0]}</div></div></div>`;
    if (type === 'timeUp') return `<div class="announcement time-up"><div class="announcement-content"><div class="symbol">⌛</div><h1>TIME'S UP!</h1><p>${state.limit} SECONDS HAVE ELAPSED</p></div></div>`;
    if (type === 'correct') return `<div class="announcement correct"><div class="correct-flash"></div><div class="announcement-content"><div class="symbol correct-symbol" aria-hidden="true"><svg viewBox="0 0 160 130"><path d="M18 66 L58 108 L143 18" /></svg></div><h1>CORRECT!</h1><p>${teams[state.team][0]} answered correctly</p><div class="award">+10 POINTS</div></div></div>`;
    if (type === 'wrong') return `<div class="announcement wrong"><div class="wrong-shards" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="announcement-content"><div class="symbol wrong-symbol" aria-hidden="true"><i></i><i></i></div><h1>WRONG!</h1><p>TEAM ${String(state.team + 1).padStart(2,'0')} — INCORRECT ANSWER</p><div class="award">QUESTION GOES TO THE AUDIENCE</div></div></div>`;
    if (type === 'audience') return `<div class="announcement audience"><div class="audience-lights" aria-hidden="true"><i></i><i></i><i></i></div><div class="announcement-content"><div class="symbol audience-symbol" aria-hidden="true"><i></i><i></i><i></i></div><h1>AUDIENCE CHALLENGE!</h1><p>${question.question.replace(/<[^>]*>/g,'')}</p><div class="award">CAN YOU ANSWER IT?</div></div></div>`;
    return `<div class="announcement reveal"><div class="announcement-content"><div class="symbol">✦</div><h1>CORRECT ANSWER</h1><div class="answer-reveal">${'ABCD'[question.answer]}. ${escaped(question.choices[question.answer])}</div></div></div>`;
  }
  function boardMarkup() {
    const title = state.phase === 'results' ? '♛ FINAL RESULTS' : '♛ LIVE LEADERBOARD';
    return `<div class="board-view"><h1>${title}</h1><div class="board-rows">${teamRankings().map(team => `<div class="board-row"><span>${team.rank <= 3 ? ['🥇','🥈','🥉'][team.rank-1] : team.rank}</span><span>TEAM ${String(team.index + 1).padStart(2,'0')} &nbsp; ${team.name}</span><b>${team.score}</b></div>`).join('')}</div></div>`;
  }
  function showMarkup() {
    if (state.phase === 'question') return questionMarkup();
    if (state.phase === 'leaderboard' || state.phase === 'results') return boardMarkup();
    return announcementMarkup(state.phase);
  }
  function renderDisplay(target, shouldAnimate = true) {
    target.innerHTML = document.getElementById('display-template').innerHTML;
    const display = target.querySelector('.display-shell');
    display.classList.add(`phase-${state.phase}`);
    target.querySelector('#round-label').textContent = `ROUND ${state.round + 1}`;
    target.querySelector('#round-topic').textContent = rounds[state.round];
    target.querySelector('#question-count').textContent = `QUESTION ${state.team + 1} / ${teams.length}`;
    target.querySelector('#team-label').textContent = `TEAM ${String(state.team + 1).padStart(2,'0')}`;
    target.querySelector('#team-name').textContent = teams[state.team][0];
    target.querySelector('#footer-round').textContent = `ROUND ${state.round + 1} / 10`;
    target.querySelector('#footer-question').textContent = `QUESTION ${state.team + 1} / ${teams.length}`;
    target.querySelector('#footer-state').textContent = phaseLabel();
    target.querySelector('#progress-dots').innerHTML = Array.from({length:teams.length}, (_, index) => `<i class="${index < state.team ? 'complete' : index === state.team ? 'active' : ''}"></i>`).join('');
    const showArea = target.querySelector('#show-area');
    showArea.innerHTML = showMarkup();
    if (shouldAnimate) showArea.classList.add('stage-enter');
    const ranks = teamRankings();
    target.querySelector('#team-list').innerHTML = ranks.map(team => `<div class="team-tile ${team.index === state.team ? 'current' : ''}"><span class="rank-badge">${team.rank}</span><span class="team-icon">${team.icon}</span><b>TEAM ${String(team.index + 1).padStart(2, '0')}</b><small>${team.name}</small><strong>${team.score}</strong></div>`).join('');
  }
  function controlMarkup() {
    const question = getQuestion();
    return `<aside class="control-panel">
      <header class="control-header"><div class="control-title"><i>⚙</i><span>IEEE QUIZ ODYSSEY – CONTROL PANEL</span></div><span class="live-pill">LIVE</span></header>
      <nav class="control-nav"><button class="active" data-view="live">LIVE CONTROL</button><button data-view="edit">EDIT QUESTION</button><button data-view="setup">EVENT SETUP</button><button data-view="screen">OPEN DISPLAY</button></nav>
      <div class="control-body">
        <div class="selection-grid"><div class="field"><label for="round-select">Round</label><select id="round-select">${rounds.map((round, i) => `<option value="${i}" ${i === state.round ? 'selected':''}>${i + 1} – ${round}</option>`).join('')}</select></div><div class="field"><label for="team-select">Team</label><select id="team-select">${teams.map((team, i) => `<option value="${i}" ${i === state.team ? 'selected':''}>Team ${String(i+1).padStart(2,'0')} – ${team[0]}</option>`).join('')}</select></div></div>
        <section class="control-card"><div class="question-nav"><button class="nav-btn" data-action="previous" aria-label="Previous question">‹</button><strong>QUESTION ${state.team + 1} / ${teams.length}</strong><button class="nav-btn" data-action="next" aria-label="Next question">›</button></div><div class="card-top"><b>Question</b><button class="tiny-button" data-action="toggle-edit">✎ Edit</button></div><p class="control-question">${question.question}</p><div class="mini-options">${question.choices.map((choice,i)=>`<div class="mini-option ${i === question.answer ? 'correct-answer':''}"><span class="mini-letter">${'ABCD'[i]}</span><span>${escaped(choice)}</span>${i === question.answer ? '<b class="answer-mark">✓</b>':''}</div>`).join('')}</div></section>
        <section class="control-card"><div class="timer-row"><div class="field"><label for="timer-input">Timer (seconds)</label><input id="timer-input" type="number" min="5" max="120" value="${state.limit}" /></div><button class="tiny-button" data-action="reset-timer">Reset Timer</button></div><div class="timer-preset"><button class="preset ${state.limit===10?'selected':''}" data-limit="10">10s</button><button class="preset ${state.limit===20?'selected':''}" data-limit="20">20s</button><button class="preset ${state.limit===30?'selected':''}" data-limit="30">30s</button><button class="preset ${state.limit===45?'selected':''}" data-limit="45">45s</button></div><div class="action-row two"><button class="action start" data-action="start">▶ ${state.running ? 'RUNNING' : 'START TIMER'}</button><button class="action pause" data-action="pause">Ⅱ PAUSE</button></div><button class="action stop" data-action="stop">■ STOP TIMER</button><div class="status-line"><span class="status-dot"></span><span>${state.running ? `Timer is live — ${state.timer} seconds remaining` : `${phaseLabel()} — ready for organizer`}</span></div></section>
        <section class="control-card"><div class="card-top"><b>Mark Team Answer</b><span class="live-pill">VERBAL</span></div><div class="action-row two"><button class="action correct" data-action="correct">✓ &nbsp; CORRECT<br><small>(+10 Points)</small></button><button class="action wrong" data-action="wrong">✕ &nbsp; WRONG<br><small>(Throw to Audience)</small></button></div><div class="secondary-actions"><button class="action audience" data-action="audience">♩ &nbsp; Audience Challenge</button><button class="action reveal" data-action="reveal">◉ &nbsp; Reveal Answer</button></div><div class="secondary-actions"><button class="action secondary" data-action="leaderboard">♛ Show Leaderboard</button><button class="action secondary" data-action="question">↺ Return to Question</button></div></section>
        <section class="control-card"><div class="card-top"><b>Stage Cue</b><span class="tiny-button">AUDITORIUM</span></div><div class="secondary-actions"><button class="action secondary" data-action="welcome">◇ Event Welcome</button><button class="action secondary" data-action="intro">✦ Round Intro</button></div><div class="secondary-actions"><button class="action secondary" data-action="next-team">⇢ Next Team</button><button class="action secondary" data-action="results">♛ Final Results</button></div></section>
        <section class="question-editor" id="question-editor"><div class="card-top"><b>Quick question editor</b><button class="tiny-button" data-action="save-question">Save</button></div><label>Question<textarea id="edit-question">${question.question.replace(/<[^>]*>/g,'')}</textarea></label><div class="option-inputs">${question.choices.map((choice,i)=>`<input id="choice-${i}" value="${escaped(choice)}" aria-label="Choice ${'ABCD'[i]}" />`).join('')}</div><label>Correct choice<select id="correct-choice">${['A','B','C','D'].map((letter,i)=>`<option value="${i}" ${i === question.answer ? 'selected':''}>${letter}</option>`).join('')}</select></label></section>
        <div class="configuration-note" id="setup-note">Pre-event setup is ready: this demo includes 10 round slots, 8 assigned team questions per round, configurable timer limits, and manually controlled scoring. The current browser stores the event state locally; use “Open Display” from the same browser to drive a projector screen in real time.</div>
      </div>
    </aside>`;
  }
  function render() {
    const renderKey = `${state.phase}:${state.round}:${state.team}:${state.awarded}`;
    const shouldAnimate = renderKey !== previouslyRenderedKey;
    previouslyRenderedKey = renderKey;
    if (isScreenOnly) { app.className = 'solo-display'; renderDisplay(app, shouldAnimate); return; }
    app.className = 'app-shell';
    app.innerHTML = '<section id="main-display"></section>' + controlMarkup();
    renderDisplay(app.querySelector('#main-display'), shouldAnimate);
    bindControls();
  }
  function stopTimer() { if (interval) clearInterval(interval); interval = null; }
  function beginTimer() {
    if (state.running) return;
    if (state.phase !== 'question') state.phase = 'question';
    if (state.timer <= 0) state.timer = state.limit;
    state.running = true; persist(); render();
    stopTimer();
    interval = setInterval(() => {
      state.timer = Math.max(0, state.timer - 1);
      if (state.timer === 0) { state.running = false; state.phase = 'timeUp'; stopTimer(); }
      persist(); render();
    }, 1000);
  }
  function move(direction) {
    stopTimer();
    const total = state.round * teams.length + state.team + direction;
    if (total < 0 || total >= rounds.length * teams.length) return;
    setState({ round: Math.floor(total / teams.length), team: total % teams.length, phase: 'question', timer: state.limit, running: false, awarded: false });
  }
  function updateQuestionFromEditor() {
    const q = getQuestion();
    q.question = highlighted(document.getElementById('edit-question').value.trim() || q.question);
    q.choices = [0,1,2,3].map(i => document.getElementById(`choice-${i}`).value.trim() || q.choices[i]);
    q.answer = Number(document.getElementById('correct-choice').value);
    render();
  }
  function bindControls() {
    app.querySelector('#round-select').addEventListener('change', event => { stopTimer(); setState({round:Number(event.target.value), phase:'question', timer:state.limit, running:false, awarded:false}); });
    app.querySelector('#team-select').addEventListener('change', event => { stopTimer(); setState({team:Number(event.target.value), phase:'question', timer:state.limit, running:false, awarded:false}); });
    app.querySelector('#timer-input').addEventListener('change', event => { const limit=Math.max(5,Math.min(120,Number(event.target.value)||20)); setState({limit,timer:limit}); });
    app.querySelectorAll('[data-limit]').forEach(button => button.addEventListener('click', () => { const limit=Number(button.dataset.limit); setState({limit,timer:limit}); }));
    app.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
      const view=button.dataset.view;
      if(view==='screen') { window.open(`${location.pathname}?screen=display`, 'IEEEQuizAuditorium', 'noopener'); return; }
      if(view==='edit') document.getElementById('question-editor').classList.toggle('open');
      if(view==='setup') document.getElementById('setup-note').classList.toggle('open');
      app.querySelectorAll('.control-nav button').forEach(item => item.classList.remove('active')); button.classList.add('active');
    }));
    app.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
      const action=button.dataset.action;
      if(action==='start') return beginTimer();
      if(action==='pause') { stopTimer(); return setState({running:false}); }
      if(action==='stop') { stopTimer(); return setState({running:false,timer:0}); }
      if(action==='reset-timer') { stopTimer(); return setState({running:false,timer:state.limit}); }
      if(action==='previous') return move(-1);
      if(action==='next') return move(1);
      if(action==='correct') { stopTimer(); if(!state.awarded) { const scores=[...state.scores]; scores[state.team]+=10; return setState({scores,awarded:true,phase:'correct',running:false,timer:state.timer}); } return setState({phase:'correct',running:false}); }
      if(action==='wrong') { stopTimer(); return setState({phase:'wrong',running:false}); }
      if(action==='audience') { stopTimer(); return setState({phase:'audience',running:false}); }
      if(action==='reveal') { stopTimer(); return setState({phase:'reveal',running:false}); }
      if(action==='leaderboard') { stopTimer(); return setState({phase:'leaderboard',running:false}); }
      if(action==='question') { stopTimer(); return setState({phase:'question',running:false}); }
      if(action==='welcome') { stopTimer(); return setState({phase:'welcome',running:false}); }
      if(action==='intro') { stopTimer(); return setState({phase:'intro',running:false}); }
      if(action==='next-team') { stopTimer(); return setState({phase:'nextTeam',running:false}); }
      if(action==='results') { stopTimer(); return setState({phase:'results',running:false}); }
      if(action==='toggle-edit') return document.getElementById('question-editor').classList.toggle('open');
      if(action==='save-question') return updateQuestionFromEditor();
    }));
  }
  channel?.addEventListener('message', event => { if (isScreenOnly) { state = {...state, ...event.data}; render(); } });
  window.addEventListener('storage', event => { if (isScreenOnly && event.key === STORE_KEY) { try { state={...state,...JSON.parse(event.newValue)}; render(); } catch {} } });
  render();
})();
