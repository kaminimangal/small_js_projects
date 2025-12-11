const newTask = document.querySelector('#newTask');
const addTaskBtn = document.querySelector('#addTask');
const numTasks = document.getElementById('numTasks');
let numTask = 0;
const taskList = document.getElementById('taskList');
const completedTasks = document.getElementById('completeTasks');
const filterBtns = document.querySelectorAll('.filters button');
let tasks = [];
let filteredTasks;
let currentFilter = 'all'; // Can be 'all', 'active', or 'done'
// 1. Make a reusable function so both Button and Enter key use it
const addTask = () => {
  const text = newTask.value; // Read the input RIGHT NOW

  if (text === '') return; // Don't add empty tasks!

  // Create the Object
  const taskObj = {
    id: Date.now(), // Unique ID based on time
    text: text,
    completed: false, // New tasks are never done yet
  };

  tasks.push(taskObj); // Add object to array
  newTask.value = ''; // Clear the input box

  displayTasks(); // Update the screen
  updateStats(); // Update the counters (we will write this next)
  // saveTasksToStorage();
};

// 2. Connect the button
addTaskBtn.addEventListener('click', addTask);

// 3. Connect the Enter key
newTask.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

const displayTasks = () => {
  saveTasksToStorage();
  taskList.innerHTML = ''; // <--- CRITICAL FIX: Wipe the list clean first!

  // 1. FILTER the list based on the variable
  const tasksToShow = tasks.filter((task) => {
    if (currentFilter === 'all') return true; // Show everything
    if (currentFilter === 'active') return !task.completed; // Show only unchecked
    if (currentFilter === 'done') return task.completed; // Show only checked
  });

  tasksToShow.forEach((task) => {
    const li = document.createElement('li');
    li.id = task.id;

    // We add the class 'completed' if the task is done
    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <div class="task-content">
          <input type="checkbox" class="checkbox">
          <span class="task-text">${task.text}</span>
      </div>
      <button class="delete-btn">✕</button>
    `;

    // --- NEW: Add Event Listeners here (The Pro Way) ---

    // A. The Checkbox
    const checkbox = li.querySelector('.checkbox');
    checkbox.checked = task.completed; // Sync visual state
    checkbox.addEventListener('change', () => {
      toggleTask(task.id);
    });

    // B. The Delete Button
    const delBtn = li.querySelector('.delete-btn');
    delBtn.addEventListener('click', () => {
      deleteTask(task.id);
    });

    taskList.appendChild(li);
  });
};

const toggleTask = (id) => {
  // Find the task and flip its 'completed' status
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  displayTasks();
  updateStats();
};

const deleteTask = (id) => {
  // Keep everything EXCEPT the one we want to delete
  tasks = tasks.filter((task) => task.id !== id);
  displayTasks();
  updateStats();
  // saveTasksToStorage();
};

const updateStats = () => {
  // Update the (3) count
  numTasks.textContent = tasks.length;

  // Update the "1 / 3" count
  const completedCount = tasks.filter((t) => t.completed).length;
  completedTasks.textContent = `${completedCount} / ${tasks.length}`;
};

// Select the buttons
const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterDone = document.getElementById('filterDone');

// Helper function to update the blue text color
const setActiveButton = (btn) => {
  // Remove 'active-filter' class from all buttons
  document
    .querySelectorAll('.filters button')
    .forEach((b) => b.classList.remove('active-filter'));
  // Add it to the clicked button
  btn.classList.add('active-filter');
};

// Event Listeners
filterAll.addEventListener('click', () => {
  currentFilter = 'all';
  setActiveButton(filterAll);
  displayTasks();
});

filterActive.addEventListener('click', () => {
  currentFilter = 'active';
  setActiveButton(filterActive);
  displayTasks();
});

filterDone.addEventListener('click', () => {
  currentFilter = 'done';
  setActiveButton(filterDone);
  displayTasks();
});

function saveTasksToStorage() {
  let jsonString = JSON.stringify(tasks); // Converts [1,2,3] to "[1,2,3]"
  localStorage.setItem('allTasks', jsonString);
}

function loadTasksFromStorage() {
  // Reading data
  let storedString = localStorage.getItem('allTasks');

  // CHECK: Only parse if we actually found something
  if (storedString) {
    const myArray = JSON.parse(storedString);
    tasks = myArray;
    displayTasks();
    updateStats();
  }
}

loadTasksFromStorage();
