const timeDisplay = document.getElementById('timeDisplay');
const DateDayDisplay = document.getElementById('DateDayDisplay');
const minutesInp = document.getElementById('minutes');
const secondsInp = document.getElementById('seconds');
const displayTimer = document.getElementById('displayTimer'); // Fixed variable name match
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

let countdown;
let totalSeconds = 0;
let isRunning = false;

// --- CLOCK LOGIC ---
const autoUpdateTime = () => {
  const now = new Date();
  timeDisplay.textContent = now.toLocaleTimeString(); // Browser handles formatting

  // Update date inside here so it flips at midnight automatically
  DateDayDisplay.textContent = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
// Run once immediately so we don't wait 1 second for the first show
autoUpdateTime();
setInterval(autoUpdateTime, 1000);

// --- TIMER LOGIC ---

// Helper: Formats seconds into MM:SS
const formatTime = (sec) => {
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  // .toString().padStart(2, '0') is the professional way to add leading zeros
  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};

const displayTime = () => {
  displayTimer.textContent = formatTime(totalSeconds);
};

// 1. Start Button
startBtn.addEventListener('click', () => {
  if (isRunning) return;

  // Only read inputs if we are starting fresh (not resuming)
  if (totalSeconds === 0) {
    const mins = Number(minutesInp.value) || 0;
    const secs = Number(secondsInp.value) || 0;
    totalSeconds = mins * 60 + secs;

    if (totalSeconds === 0) {
      alert('Please enter Time!');
      return;
    }
  }

  isRunning = true;
  displayTime(); // Show start time immediately

  countdown = setInterval(() => {
    totalSeconds--;
    displayTime();

    if (totalSeconds <= 0) {
      clearInterval(countdown);
      isRunning = false;
      totalSeconds = 0;
      minutesInp.value = '';
      secondsInp.value = '';
      alert("Time's up!");
    }
  }, 1000);
});

// 2. Pause Button (MOVED OUTSIDE)
pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(countdown);
    isRunning = false;
  }
});

// 3. Reset Button (MOVED OUTSIDE)
resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  isRunning = false;
  totalSeconds = 0;
  minutesInp.value = '';
  secondsInp.value = '';
  displayTimer.textContent = '00:00'; // Reset text manually
});
