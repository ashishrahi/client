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
  _id:string
};

export type FormData = {
  feedUrl: string;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  timestamp: string;
  failedJobs: { reason: string }[];
};

export interface ErrorResponse {
  message?: string;
}

export type AddLogModalProps = {
  onClose: () => void;
};


export interface AddLogResponse {
  message: string;
}