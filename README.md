# NodeJS with Grafana, Loki, and Prometheus

This project is a Node.js application that demonstrates integration with Grafana, Loki, and Prometheus for monitoring and logging.

## Features

- Express.js server with TypeScript
- Prisma ORM for database operations
- Winston logger with Loki transport
- Prometheus metrics
- CORS enabled
- Environment variable configuration

## Prerequisites

- Node.js (>=20)
- pnpm package manager
- Docker and Docker Compose (for running Grafana, Loki, and Prometheus)

## Installation

1. Clone the repository

2. Install dependencies

3. Set up environment variables
   Rename `.env.example` to `.env` and modify it with your configuration

4. Run Prisma scripts from `package.json`

## Running the Application

1. Run to start the application and associated services (Postgres, Grafana, Loki, Prometheus)

```bash
docker-compose --env-file .env up --build
```

2. Access the application:

- API: http://localhost:5000
- Grafana: http://localhost:3000
- Prometheus: http://localhost:9090

<br />

## Grafana and Prometheus Dashboard

![grafana](https://github.com/user-attachments/assets/1ffa9610-d117-4d92-9e7e-3b1bd5ee22f1)

![prometheus](https://github.com/user-attachments/assets/617a1c0d-56b9-4074-aa05-b899127032b5)
