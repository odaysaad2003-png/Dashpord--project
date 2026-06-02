import { getEmployees } from "../services/api/employeesApi";
import { useAsyncData } from "./useAsyncData";

export function useEmployees() {
  const {
    data: employees,
    isLoading,
    error,
    reload,
  } = useAsyncData(getEmployees, []);

  return {
    employees,
    isLoading,
    error,
    reloadEmployees: reload,
  };
}
