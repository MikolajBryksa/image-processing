import type { Job } from "@/types/job";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function createJob(): Promise<Job> {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  return response.json();
}

export async function getJob(id: string): Promise<Job> {
  const response = await fetch(`${API_URL}/api/jobs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
}

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(`${API_URL}/api/jobs`);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
}

export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
}