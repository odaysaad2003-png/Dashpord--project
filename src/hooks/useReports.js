import { getReports } from "../services/api/reportsApi";
import { useAsyncData } from "./useAsyncData";

export function useReports() {
  const {
    data: reports,
    isLoading,
    error,
    reload,
  } = useAsyncData(getReports, []);

  return {
    reports,
    isLoading,
    error,
    reloadReports: reload,
  };
}
