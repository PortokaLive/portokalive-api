import { Router } from "express";
import { getStream } from "../../controller/StreamController/StreamSSE";

const router = Router();

router.get("/", getStream);

export default router;
