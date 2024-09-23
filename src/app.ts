import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import loadRoutes from "./routes/index.routes";

dotenv.config();
const app: Express = express();
const prisma = new PrismaClient();

const corsOptions: CorsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

loadRoutes(app);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export { app, prisma };
