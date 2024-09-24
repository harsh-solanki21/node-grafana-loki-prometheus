import { Request, Response } from "express";
import { register } from "../configs/metrics";

export class MetricsController {
  async metrics(_: Request, res: Response) {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
  }
}
