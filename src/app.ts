import express, { Express } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import recordMetrics from "./middlewares/metrics";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";
import loadRoutes from "./routes/index.routes";

dotenv.config();
const app: Express = express();
const prisma = new PrismaClient();

const corsOptions: CorsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(recordMetrics);

loadRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

export { app, prisma };
