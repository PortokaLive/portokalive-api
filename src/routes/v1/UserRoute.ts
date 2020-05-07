import auth from "../../config/auth";
import { Request, Response, Router } from "express";
import { registerUser } from "../../controller/UserController/UserRegister";
import { loginUser } from "../../controller/UserController/UserLogin";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
