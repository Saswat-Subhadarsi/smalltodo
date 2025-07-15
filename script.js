const calendarEl = document.getElementById('calendar');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function populateMonthYear() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  // Set current month/year as default
  monthSelect.value = new Date().getMonth();
  yearSelect.value = currentYear;
}

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function renderCalendar() {
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);
  const daysInMonth = getDaysInMonth(month, year);

  calendarEl.innerHTML = '';

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');

    const date = new Date(year, month, day);
    const dayName = weekDays[date.getDay()];

    dayEl.innerHTML = `
      <h3>${dayName} ${day}</h3>
      <input type="text" placeholder="Add task..." class="task-input" onkeypress="addTask(event, '${month}-${year}-${day}')">
      <ul id="tasks-${month}-${year}-${day}" class="task-list"></ul>
    `;

    calendarEl.appendChild(dayEl);
  }
}

function addTask(event, dayKey) {
  if (event.key === 'Enter') {
    const input = event.target;
    const taskText = input.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById(`tasks-${dayKey}`);
    const li = document.createElement('li');
    li.textContent = taskText;
    li.onclick = () => li.remove();

    taskList.appendChild(li);
    input.value = '';
  }
}
function playMusic() {
  const music = document.getElementById('bgMusic');
  music.play();
  document.getElementById('musicBtn').style.display = 'none';  // hide button after click
}


populateMonthYear();
renderCalendar();
