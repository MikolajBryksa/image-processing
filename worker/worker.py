import time

import redis


redis_client = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True,
)


def process_job(job_id: str) -> None:
    print(f"Processing job: {job_id}")

    redis_client.set(
        f"job:{job_id}",
        "PROCESSING",
    )

    time.sleep(5)

    redis_client.set(
        f"job:{job_id}",
        "COMPLETED",
    )

    print(f"Completed job: {job_id}")


def main() -> None:
    print("Worker started. Waiting for jobs...")

    while True:
        try:
            result = redis_client.brpop(
                "jobs",
                timeout=5,
            )

            if result is None:
                continue

            _, job_id = result
            process_job(job_id)

        except redis.exceptions.TimeoutError:
            print("Redis timeout. Retrying...")

        except redis.exceptions.ConnectionError:
            print("Redis connection error. Retrying in 2 seconds...")
            time.sleep(2)


if __name__ == "__main__":
    main()