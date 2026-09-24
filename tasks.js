export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

export function calculateStatiscs() {
  let completedTasks = 0;
  let totalMinutes = 0;
  tasks.forEach((task) => {
    if (task.status === true) {
      completedTasks++;
    } else totalMinutes += task.time;
  });
  return [completedTasks, tasks.length - completedTasks, totalMinutes];
}
