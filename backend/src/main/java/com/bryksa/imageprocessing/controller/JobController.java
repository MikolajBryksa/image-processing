package com.bryksa.imageprocessing.controller;

import com.bryksa.imageprocessing.model.Job;
import com.bryksa.imageprocessing.service.JobService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public Job createJob() {
        return jobService.createJob();
    }

    @GetMapping("/{id}")
    public Job getJob(@PathVariable String id) {
        return jobService.getJob(id);
    }

    @GetMapping
    public List<Job> getJobs() {
        return jobService.getJobs();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {

        boolean deleted = jobService.deleteJob(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}