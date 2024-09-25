import { Express, Request, Response } from "express";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import { MetricsController } from "../controllers/metrics.controller";

const metricsController = new MetricsController();

const loadRoutes = (app: Express) => {
  app.get("/", async (_: Request, res: Response) =>
    res.send("Server is up and running...")
  );

  app.use("/api/v1/post", postRoutes);
  app.use("/api/v1/comment", commentRoutes);
  app.use("/metrics", metricsController.metrics);
};

export default loadRoutes;
