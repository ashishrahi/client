import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LogEntry } from "../types/logs";
import { API_ENDPOINTS } from "../lib/api";

export const useCreateLogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (logData: Omit<LogEntry, "_id">) => {
      const response = await axios.post(API_ENDPOINTS.CREATE_LOG, logData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["import-logs"] });
    },
    onError: (error) => {
      console.error("Error creating log:", error);
    },
  });
};
