"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { useCreateLogMutation } from "../../hooks/useCreateLogMutation";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

type AddLogModalProps = {
  onClose: () => void;
};

type FormData = {
  feedUrl: string;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  timestamp: string;
  failedJobs: { reason: string }[];
};
interface AddLogResponse {
  message: string;
}

const AddLogModal = ({ onClose }: AddLogModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {  },
  } = useForm<FormData>({
    defaultValues: {
      feedUrl: "",
      totalFetched: 0,
      totalImported: 0,
      newJobs: 0,
      updatedJobs: 0,
      timestamp: new Date().toISOString().slice(0, 16),
      failedJobs: [{ reason: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "failedJobs",
  });

  const createLogMutation = useCreateLogMutation();

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      timestamp: new Date(data.timestamp).toISOString(),
    };

   toast.promise(
  createLogMutation.mutateAsync(payload, {
    onSuccess: () => {
      onClose();
    },
  }),
  {
    loading: "Adding log...",
   success: (response: AddLogResponse) => {
  return response.message || "Log added successfully!";
},
    error: (err: unknown) => {
  let backendMessage = "Something went wrong.";

  if (err instanceof AxiosError) {
    backendMessage = (err.response?.data as ErrorResponse)?.message || err.message || backendMessage;
  } else if (err instanceof Error) {
    backendMessage = err.message;
  }

  return backendMessage;
},
  }
);

  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Log</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Feed URL</label>
            <Input {...register("feedUrl", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Fetched</label>
            <Input type="number" {...register("totalFetched", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Imported</label>
            <Input type="number" {...register("totalImported", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">New Jobs</label>
            <Input type="number" {...register("newJobs", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Updated Jobs</label>
            <Input type="number" {...register("updatedJobs", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Timestamp</label>
            <Input type="datetime-local" {...register("timestamp", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Failure Reasons</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <Input
                  {...register(`failedJobs.${index}.reason`)}
                  placeholder={`Failure ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  ✕
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ reason: "" })}>
              Add Failure
            </Button>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={createLogMutation.isPending}>
              {createLogMutation.isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLogModal;
