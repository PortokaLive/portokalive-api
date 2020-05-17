import { Request, Response } from "express";

import { Router } from "express";
import UserRouter from "./v1/UserRoute";
import StreamRouter from "./v1/StreamRoute";

const router = Router();
router.use("/v1/user", UserRouter);
router.use("/v1/stream", StreamRouter);

export default router;
