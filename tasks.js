export let tasks = [];

export function calculateStatiscs() {
  let completedTasks = 0;
  let totalMinutes = 0;
  tasks.forEach((task) => {
    if (task.status === true) completedTasks++;
    totalMinutes += task.time;
  });
  return [completedTasks, tasks.length - completedTasks, totalMinutes];
}
