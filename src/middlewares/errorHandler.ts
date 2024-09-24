import { NextFunction, Request, Response } from "express";
import logger from "../configs/logger";

export const notFoundHandler = (req: Request, res: Response) => {
  logger.error(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Not Found" });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};
