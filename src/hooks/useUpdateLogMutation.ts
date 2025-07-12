import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LogEntry } from "../types/logs";
import { API_ENDPOINTS } from "../lib/api";

export const useUpdateLogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: Partial<LogEntry> }) =>
      axios.put(API_ENDPOINTS.UPDATE_LOG.replace(":id", data.id), data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["import-logs"]);
    },
  });
};
