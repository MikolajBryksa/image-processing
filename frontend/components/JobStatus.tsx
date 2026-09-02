"use client";

import { useState } from "react";
import { createJob, getJob } from "@/services/api";
import type { Job } from "@/types/job";

export default function JobStatus() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateJob = async () => {
    setLoading(true);
    setError(null);

    try {
      const newJob = await createJob();
      setJob(newJob);
    } catch {
      setError("Could not create job");
    } finally {
      setLoading(false);
    }
  };

  const handleGetJob = async () => {
    setLoading(true);
    setError(null);

    try {
      const existingJob = await getJob("abc123");
      setJob(existingJob);
    } catch {
      setError("Could not fetch job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <button
          onClick={handleCreateJob}
          disabled={loading}
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          Create Job
        </button>

        <button
          onClick={handleGetJob}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
        >
          Get Job
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {job && (
        <div className="rounded-lg border border-gray-200 p-4">
          <p>
            <strong>ID:</strong> {job.id}
          </p>

          <p>
            <strong>Status:</strong> {job.status}
          </p>
        </div>
      )}
    </div>
  );
}