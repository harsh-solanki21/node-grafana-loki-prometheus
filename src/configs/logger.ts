import winston from "winston";
import LokiTransport from "winston-loki";

const logConfig = {
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new LokiTransport({
      host: "http://localhost:3100",
      labels: { job: "node-app" },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error(err),
    }),
  ],
};

const logger = winston.createLogger(logConfig);

export default logger;
