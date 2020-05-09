import AuthGuard from "../../config/AuthGuard";
import { Router } from "express";
import {
  registerUser,
  activateUser,
} from "../../controller/UserController/UserRegister";
import { loginUser } from "../../controller/UserController/UserLogin";
import { getUser } from "../../controller/UserController/UserCRUD";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate", activateUser);
router.get("/:email", AuthGuard, getUser);

export default router;
