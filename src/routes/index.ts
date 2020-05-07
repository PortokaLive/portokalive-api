import { Request, Response } from "express";

import { Router } from "express";
import UserRouter from "./v1/UserRoute";

const router = Router();
router.use("/v1/user", UserRouter);

export default router;
