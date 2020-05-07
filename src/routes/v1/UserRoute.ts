import auth from "../../config/auth";
import { Request, Response, Router } from "express";
import { registerUser } from "../../controller/UserController/UserRegister";
import { loginUser } from "../../controller/UserController/UserLogin";
import { getUser } from "../../controller/UserController/UserCRUD";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", auth, getUser);

export default router;
