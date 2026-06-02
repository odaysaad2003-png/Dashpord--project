import { getProjects } from "../services/api/projectsApi";
import { useAsyncData } from "./useAsyncData";

export function useProjects() {
  const {
    data: projects,
    isLoading,
    error,
    reload,
  } = useAsyncData(getProjects, []);

  return {
    projects,
    isLoading,
    error,
    reloadProjects: reload,
  };
}
