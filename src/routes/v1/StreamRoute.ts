import AuthGuard from "../../config/AuthGuard";
import { Router } from "express";
import { getStream } from "../../controller/StreamController/StreamSSE";

const router = Router();

router.get("/", AuthGuard, getStream);

export default router;
