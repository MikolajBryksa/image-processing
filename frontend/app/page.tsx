"use client";

import { useEffect, useState } from "react";
import {
  createJob,
  deleteJob,
  getJobs
} from "@/services/api";
import type { Job } from "@/types/job";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadJobs() {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateJob() {
    try {
      await createJob();
      await loadJobs();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteJob(id: string) {
    try {
      await deleteJob(id);
      await loadJobs();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadJobs();

    const interval = setInterval(() => {
      loadJobs();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Image Processing
          </h1>

          <button
            onClick={handleCreateJob}
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Create Job
          </button>
        </div>

        <div className="rounded-lg border">
          <div className="border-b p-4">
            <h2 className="font-semibold">Jobs</h2>
          </div>

          {loading ? (
            <p className="p-4 text-gray-500">
              Loading...
            </p>
          ) : jobs.length === 0 ? (
            <p className="p-4 text-gray-500">
              No jobs found.
            </p>
          ) : (
            <div>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between border-b p-4 last:border-b-0"
                >
                  <div>
                    <p className="font-mono text-sm">
                      {job.id}
                    </p>

                    <p className="text-sm text-gray-500">
                      {job.status}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}