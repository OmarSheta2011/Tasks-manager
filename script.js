import { tasks, calculateStatiscs } from "./tasks.js";
// ------------------------------------
const nameInput = document.querySelector("#name-input");
const levelInput = document.querySelector("#level-input");
const timeInput = document.querySelector("#time-input");
const submitBtn = document.querySelector(".submit-btn");
const tasksContainer = document.querySelector(".tasks-container");
const statisticsContainer = document.querySelector(".statistics");
const filter = document.querySelector(".filter");
// ------------------------------------
let section = "all";

function updateTasksContainer() {
  let html = "";
  let arr;
  switch (section) {
    case "all":
      arr = [...tasks];
      break;
    case "completed":
      arr = tasks.filter((task) => task.status === true);
      break;
    case "pending":
      arr = tasks.filter((task) => task.status === false);
      break;
  }
  if (arr.length === 0) {
    tasksContainer.innerHTML = `No ${section !== "all" ? section : ""} Tasks Here.`;
    tasksContainer.classList.add("empty");
    return;
  }
  tasksContainer.classList.remove("empty");
  arr.forEach((task) => {
    html += `
      <div class="task">
        <p class="task-name">${task.name}</p>
        <span class="task-time">${task.time} min/s</span>
        <span class="task-status ${task.status ? "completed" : "pending"}">${task.status ? "Completed" : "Pending"}</span>
        <span class="task-level"> ${task.level}</span>
        <button data-task-id="${task.id}" class="complete-task-btn">Complete</button>
        <button data-task-id="${task.id}" class="delete-task-btn">Delete</button>
      </div>`;
  });
  tasksContainer.innerHTML = html;
  addEListeners();
}

function updateStatistics() {
  const [completedTasks, remainingTasks, totalMinutes] = calculateStatiscs();
  statisticsContainer.innerHTML = `
        <div>
          <p>Total</p>
          <span>${tasks.length}</span>
        </div>
        <div>
          <p>Completed</p>
          <span>${completedTasks}</span>
        </div>
        <div>
          <p>Pending</p>
          <span>${remainingTasks}</span>
        </div>
        <div>
          <p>Minutes</p>
          <span>${totalMinutes}</span>
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
      updateTasksContainer();
      updateStatistics();
      localStorage.setItem("tasks", JSON.stringify(tasks));
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
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  });
}

function loadPage() {
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  filter.addEventListener("click", (event) => {
    switch (event.target.dataset.filter) {
      case "all":
        section = "all";
        break;
      case "completed":
        section = "completed";
        break;
      case "pending":
        section = "pending";
        break;
    }
    document.querySelector(".selected").classList.remove("selected");
    document.querySelector(`.${section}`).classList.add("selected");
    updateTasksContainer();
  });

  document.querySelector(".reset-all").addEventListener("click", () => {
    tasks.length = 0;
    nameInput.value = "";
    timeInput.value = "";
    updateTasksContainer();
    updateStatistics();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

loadPage();
