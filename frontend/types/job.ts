export type JobStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface Job {
  id: string;
  status: JobStatus;
}