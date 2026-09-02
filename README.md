# Image Processing

A web application for uploading and processing images. The project is designed as a learning and experimental application for practicing modern backend, frontend, messaging, and containerization technologies. The application will allow users to submit image processing jobs and track their status.

## Tech Stack

- Frontend: **Next.js, React, TypeScript, Tailwind**
- Backend: **Java 21, Spring Boot, Maven, Redis, Python**
- Containerization: **Docker**

## Features

- Upload images for processing
- Submit image processing jobs
- Queue jobs using Redis
- Track job status
- Process images asynchronously
- Download processed images
- REST API for communication

## Setup

- **Make sure all requirements are installed**:

  ```
  java --version
  mvn --version
  node --version
  npm --version
  docker --version
  python --version
  ```

- **Clone the repository**:

  ```
  git clone git@github.com:MikolajBryksa/image-processing.git
  ```

- **Install frontend dependencies**:

  ```
  cd frontend
  npm install
  ```

- **Install worker dependencies**:

  ```
  cd worker
  pip install -r requirements.txt
  ```

## Launch

- **Run the backend**:

  ```
  cd backend
  mvn spring-boot:run
  http://localhost:8080
  curl http://localhost:8080/api/health
  ```

- **Run the frontend**:

  ```
  cd frontend
  npm run dev
  http://localhost:3000
  ```

- **Run the Docker**:

  ```
  open Docker Desktop
  docker compose up -d
  docker exec -it image-processing-redis redis-cli
  PING
  ```

- **Run the worker**:

  ```
  cd worker
  source .venv/bin/activate
  python worker.py
  ```

## Use Case

1. The user clicks "Start job"
2. Next.js sends a POST request
3. Spring creates a job
4. Spring pushes the job to Redis
5. The worker picks up the job
6. The worker performs the "work"
7. The worker saves the result
8. The frontend can check the status