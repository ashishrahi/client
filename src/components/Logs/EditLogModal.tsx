"use client";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogEntry } from "../../types/logs";
import { useState } from "react";
import { useUpdateLogMutation } from "@/hooks/useUpdateLogMutation";
import { toast } from "sonner";

type EditLogModalProps = {
  log: LogEntry;
  onClose: () => void;
};

const EditLogModal = ({ log, onClose }: EditLogModalProps) => {
  const [totalFetched, setTotalFetched] = useState(log.totalFetched);
  const [totalImported, setTotalImported] = useState(log.totalImported);
  const [newJobs, setNewJobs] = useState(log.newJobs);
  const [updatedJobs, setUpdatedJobs] = useState(log.updatedJobs);
  const [failedJobs, setFailedJobs] = useState(log.failedJobs.map(f => f.reason));
  const [timestamp, setTimestamp] = useState(
    new Date(log.timestamp).toISOString().slice(0, 16)
  );

  const updateLogMutation = useUpdateLogMutation();

  const handleFailedJobChange = (index: number, value: string) => {
    const updated = [...failedJobs];
    updated[index] = value;
    setFailedJobs(updated);
  };

  const handleSave = () => {
    const payload: Partial<LogEntry> = {
      totalFetched,
      totalImported,
      newJobs,
      updatedJobs,
      failedJobs: failedJobs.map(reason => ({ reason })),
      timestamp: new Date(timestamp).toISOString(),
    };

    updateLogMutation.mutate(
      { id: log._id, payload },
      {
        onSuccess: (response) => {
          toast.success("Log updated successfully!", { position: "top-center" });
          onClose();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update log",
            { position: "top-center" }
          );
        },
      }
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Log Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Fetched</label>
            <Input
              type="number"
              value={totalFetched}
              onChange={(e) => setTotalFetched(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Imported</label>
            <Input
              type="number"
              value={totalImported}
              onChange={(e) => setTotalImported(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">New</label>
            <Input
              type="number"
              value={newJobs}
              onChange={(e) => setNewJobs(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Updated</label>
            <Input
              type="number"
              value={updatedJobs}
              onChange={(e) => setUpdatedJobs(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Failure Reasons</label>
            <div className="space-y-2">
              {failedJobs.map((reason, index) => (
                <Input
                  key={index}
                  value={reason}
                  onChange={(e) => handleFailedJobChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Timestamp</label>
            <Input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={updateLogMutation.isLoading}>
            {updateLogMutation.isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditLogModal;
