const timeEl = document.getElementById('time');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

const modePomodoro = document.getElementById('modePomodoro');
const modeShort = document.getElementById('modeShort');
const modeLong = document.getElementById('modeLong');

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let timerId = null;
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;

const LS_KEY = 'pomodoro_tasks_v1';

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function renderTime() {
  timeEl.textContent = formatTime(remainingSeconds);
}

function setMode(workMin, breakMin) {
  totalSeconds = workMin * 60;
  remainingSeconds = totalSeconds;
  stopTimer();
  renderTime();
}

function tick() {
  if (remainingSeconds <= 0) {
    stopTimer();
    remainingSeconds = 0;
    renderTime();
    return;
  }
  remainingSeconds -= 1;
  renderTime();
}

function startTimer() {
  if (timerId) return;
  timerId = setInterval(tick, 1000);
}

function stopTimer() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = totalSeconds;
  renderTime();
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(LS_KEY, JSON.stringify(tasks));
}

let tasks = loadTasks();

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'taskItem';

    const span = document.createElement('span');
    span.textContent = t;

    const del = document.createElement('button');
    del.className = 'btn';
    del.type = 'button';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      tasks = tasks.filter((_, i) => i !== idx);
      saveTasks(tasks);
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  });
}

modePomodoro.addEventListener('click', () => setMode(25, 5));
modeShort.addEventListener('click', () => setMode(15, 3));
modeLong.addEventListener('click', () => setMode(50, 10));

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (!value) return;
  tasks = [value, ...tasks];
  taskInput.value = '';
  saveTasks(tasks);
  renderTasks();
});

renderTime();
renderTasks();
