import { Router } from "express";
import { getStream } from "../../controller/StreamController/StreamSSE";
import { getStreamFlv } from "../../controller/StreamController/StreamFlv";

const router = Router();

router.get("/", getStream);
router.get("/:streamerId", getStreamFlv);

export default router;
