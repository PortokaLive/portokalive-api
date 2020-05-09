"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserRoute_1 = __importDefault(require("./v1/UserRoute"));
var router = express_1.Router();
router.use("/v1/user", UserRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map