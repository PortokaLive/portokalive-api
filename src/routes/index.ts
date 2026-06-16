import { Request, Response } from "express";

import { Router } from "express";
import UserRouter from "./v1/UserRoute";
import StreamRouter from "./v1/StreamRoute";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    service: "portokalive-api",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

router.use("/v1/user", UserRouter);
router.use("/v1/stream", StreamRouter);

export default router;
