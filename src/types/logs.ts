// types/logs.ts

export type FailedJob = {
  reason: string;
};

export type LogEntry = {
  feedUrl: string;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  timestamp: string;
  failedJobs: FailedJob[];
};
