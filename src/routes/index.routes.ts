import { Express } from "express";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import metricsRoutes from "./metrics.routes";

const loadRoutes = (app: Express) => {
  app.use("/api/v1/post", postRoutes);
  app.use("/api/v1/comment", commentRoutes);
  app.use("/prometheus", metricsRoutes);
};

export default loadRoutes;
