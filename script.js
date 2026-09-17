import { tasks, calculateStatiscs } from "./tasks.js";
// ------------------------------------
const nameInput = document.querySelector("#name-input");
const levelInput = document.querySelector("#level-input");
const timeInput = document.querySelector("#time-input");
const submitBtn = document.querySelector(".submit-btn");
const tasksContainer = document.querySelector(".tasks-container");
const statisticsContainer = document.querySelector(".statistics");
// ------------------------------------

function updateTasksContainer() {
  let html = "";
  tasks.forEach((task) => {
    html += `
      <div class="task">
        <p class="task-name">${task.name}</p>
        <span class="task-time">${task.time}</span>
        <span class="task-status">${task.status}</span>
        <button data-task-id="${task.id}" class="complete-task-btn">complete</button>
        <button data-task-id="${task.id}" class="delete-task-btn">delete</button>
      <div/>`;
  });
  tasksContainer.innerHTML = html;
  addEListeners();
}

function updateStatistics() {
  const [completedTasks, remainingTasks, totalMinutes] = calculateStatiscs();
  statisticsContainer.innerHTML = `
      <p>total tasks: ${tasks.length}</p>
      <p>completed tasks:${completedTasks}</p>
      <p>remaining tasks:${remainingTasks}</p>
      <p>total planned minutes:${totalMinutes}</p>
    `;
}

function addEListeners() {
  document.querySelectorAll(".complete-task-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { taskId } = btn.dataset;
      tasks.forEach((task) => {
        if (task.id === taskId) {
          task.status = true;
        }
      });
      updateStatistics();
    });
  });
  document.querySelectorAll(".delete-task-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { taskId } = btn.dataset;
      tasks.forEach((task, index) => {
        if (task.id === taskId) {
          tasks.splice(index, 1);
        }
      });
      updateTasksContainer();
      updateStatistics();
    });
  });
  document.querySelector(".reset-all").addEventListener('click', () => {
    tasks.length = 0;
    updateTasksContainer()
    updateStatistics();
  })
}

function loadPage() {
  // -------------------------------------------------------
  updateTasksContainer();
  updateStatistics();

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const time = Number(timeInput.value);
    if (!name || time <= 0) {
      alert("The task name or the estimated time is invalid.");
      return;
    }
    const level = levelInput.value;
    const taskId = crypto.randomUUID();
    tasks.push({
      name,
      level,
      time,
      status: false,
      id: taskId,
    });
    nameInput.value = "";
    timeInput.value = "";

    updateTasksContainer();
    updateStatistics();
  });
}
loadPage();
