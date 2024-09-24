import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger";
import { httpRequestDurationMicroseconds } from "../configs/metrics";

function recordMetrics(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );

    httpRequestDurationMicroseconds
      .labels(
        req.method,
        req.route?.path || req.path,
        res.statusCode.toString()
      )
      .observe(duration / 1000); // Convert to seconds
  });
  next();
}

export default recordMetrics;
