import express from "express";
import { MetricsController } from "../controllers/metrics.controller";

const router = express.Router();
const metricsController = new MetricsController();

router.get("/metrics", metricsController.metrics);

export default router;
