package com.bryksa.imageprocessing.service;

import com.bryksa.imageprocessing.model.Job;
import com.bryksa.imageprocessing.util.IdGenerator;

import java.util.List;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    private final StringRedisTemplate redisTemplate;

    private final IdGenerator idGenerator;

    public JobService(
            StringRedisTemplate redisTemplate,
            IdGenerator idGenerator
    ) {
        this.redisTemplate = redisTemplate;
        this.idGenerator = idGenerator;
    }

    public Job createJob() {
        String id = idGenerator.generate();

        redisTemplate.opsForValue().set(
                "job:" + id,
                "QUEUED"
        );

        // Queue
        redisTemplate.opsForList().leftPush(
                "jobs",
                id
        );

        // All jobs
        redisTemplate.opsForList().leftPush(
                "jobs:all",
                id
        );

        return new Job(id, "QUEUED");
    }

    public Job getJob(String id) {
        String status = redisTemplate
                .opsForValue()
                .get("job:" + id);

        if (status == null) {
            return null;
        }

        return new Job(id, status);
    }

    public List<Job> getJobs() {
        List<String> ids = redisTemplate
                .opsForList()
                .range("jobs:all", 0, -1);

        return ids.stream()
                .map(id -> getJob(id))
                .toList();
    }

    public boolean deleteJob(String id) {
        Boolean exists = redisTemplate.hasKey("job:" + id);

        if (Boolean.FALSE.equals(exists)) {
            return false;
        }

        redisTemplate.delete("job:" + id);

        redisTemplate.opsForList().remove(
                "jobs:all",
                0,
                id
        );

        redisTemplate.opsForList().remove(
                "jobs",
                0,
                id
        );

        return true;
    }
}