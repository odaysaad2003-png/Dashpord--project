import { getTasks } from "../services/api/tasksApi";
import { useAsyncData } from "./useAsyncData";

export function useTasks() {
  const { data: tasks, isLoading, error, reload } = useAsyncData(getTasks, []);

  return {
    tasks,
    isLoading,
    error,
    reloadTasks: reload,
  };
}
