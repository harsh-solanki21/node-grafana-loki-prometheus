import { Registry, collectDefaultMetrics, Histogram } from "prom-client";

export const register = new Registry();

collectDefaultMetrics({ register });

export const httpRequestDurationMicroseconds = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in microseconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});
