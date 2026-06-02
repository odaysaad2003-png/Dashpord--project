import { tasks } from "./database";
import { fakeRequest } from "./ApiClint";

export async function getTasks() {
  return fakeRequest(tasks);
}

export async function getTaskById(taskId) {
  const task = tasks.find((item) => item.id === Number(taskId));

  if (!task) {
    throw new Error("Task not found.");
  }

  return fakeRequest(task);
}
