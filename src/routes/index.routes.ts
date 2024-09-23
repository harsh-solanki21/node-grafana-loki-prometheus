import { Express } from "express";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";

const loadRoutes = (app: Express) => {
  app.use("/api/v1/post", [], postRoutes);
  app.use("/api/v1/comment", [], commentRoutes);
};

export default loadRoutes;
