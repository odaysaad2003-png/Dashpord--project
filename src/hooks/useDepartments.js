import { getDepartments } from "../services/api/departmentsApi";
import { useAsyncData } from "./useAsyncData";

export function useDepartments() {
  const {
    data: departments,
    isLoading,
    error,
    reload,
  } = useAsyncData(getDepartments, []);

  return {
    departments,
    isLoading,
    error,
    reloadDepartments: reload,
  };
}
