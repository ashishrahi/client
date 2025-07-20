import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LogEntry } from "../types/logs";
import { API_ENDPOINTS } from "../lib/api";

export interface LogsResponse {
  logs: LogEntry[];
  totalPages: number;
  currentPage: number;
}

const fetchImportLogs = async (page = 1, limit = 8): Promise<LogsResponse> => {
  const res = await axios.get(`${API_ENDPOINTS.IMPORT_LOGS}?page=${page}&limit=${limit}`);
  return res.data;
};

export const useImportLogsQuery = (page: number, limit = 10) =>
  useQuery<LogsResponse, Error>({
    queryKey: ["import-logs", page],
    queryFn: () => fetchImportLogs(page, limit),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
