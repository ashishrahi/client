import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LogEntry } from "../types/logs";
import { API_ENDPOINTS } from "../lib/api";

const fetchImportLogs = async (): Promise<LogEntry[]> => {
  const res = await axios.get(API_ENDPOINTS.IMPORT_LOGS);
  return res?.data?.logs;
};

export const useImportLogsQuery = () =>
  useQuery<LogEntry[], Error>({
    queryKey: ["import-logs"],
    queryFn: fetchImportLogs,
    staleTime: 0, // always refetch
    refetchOnWindowFocus: true,
  });
