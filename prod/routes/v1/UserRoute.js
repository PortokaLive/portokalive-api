"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AuthGuard_1 = __importDefault(require("../../config/AuthGuard"));
var express_1 = require("express");
var UserRegister_1 = require("../../controller/UserController/UserRegister");
var UserLogin_1 = require("../../controller/UserController/UserLogin");
var UserCRUD_1 = require("../../controller/UserController/UserCRUD");
var router = express_1.Router();
router.post("/register", UserRegister_1.registerUser);
router.post("/login", UserLogin_1.loginUser);
router.post("/activate", UserRegister_1.activateUser);
router.get("/:email", AuthGuard_1.default, UserCRUD_1.getUser);
exports.default = router;
//# sourceMappingURL=UserRoute.js.map