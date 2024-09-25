import { createLogger, transports, format } from "winston";
import LokiTransport from "winston-loki";

const logConfig = {
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new LokiTransport({
      host: "http://192.168.29.238:3100", // Your IP address
      labels: { app: "node-app" },
      json: true,
      format: format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error(err),
    }),
  ],
};

const logger = createLogger(logConfig);

export default logger;
