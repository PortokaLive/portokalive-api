"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidator_1 = require("../../validators/UserValidator");
var User_1 = require("../../model/User");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var throwError_1 = require("../../utils/throwError");
var GeneralError_1 = require("../../errors/GeneralError");
var AuthService_1 = require("../../services/AuthService");
exports.loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userPayload, activationPayload, activationCode, token, ex_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                return [4 /*yield*/, UserValidator_1.validateBeforeLogin(req, res)];
            case 1:
                _a = _b.sent(), email = _a.email, password = _a.password;
                return [4 /*yield*/, findAndComparePassword(email, password)];
            case 2:
                userPayload = _b.sent();
                if (!userPayload) {
                    throw new GeneralError_1.GeneralError(401, "Invalid credentials", "LOGIN_FAILED");
                }
                if (!!userPayload.activated) return [3 /*break*/, 4];
                activationPayload = { email: email, activation: true };
                return [4 /*yield*/, AuthService_1.signJwt(activationPayload, 600)];
            case 3:
                activationCode = _b.sent();
                throw new GeneralError_1.GeneralError(403, "email=" + userPayload.email + "&activationCode=" + activationCode, "ACTIVATION_REQUIRED");
            case 4: return [4 /*yield*/, AuthService_1.signJwt(userPayload, 31556926)];
            case 5:
                token = _b.sent();
                res.json({
                    result: "SUCCESS",
                    token: "Bearer " + token,
                });
                return [3 /*break*/, 7];
            case 6:
                ex_1 = _b.sent();
                throwError_1.throwError(ex_1, res);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var findAndComparePassword = function (email, password) {
    return new Promise(function (resolve, reject) {
        User_1.User.findOne({ email: email })
            .select("+password")
            .select("+activated")
            .then(function (user) {
            if (user) {
                bcryptjs_1.default
                    .compare(password, user.get("password"))
                    .then(function (result) {
                    if (result) {
                        var thisUser = {};
                        thisUser.id = user.id;
                        thisUser.email = user.email;
                        thisUser.uuid = user.uuid;
                        thisUser.activated = user.activated;
                        resolve(thisUser);
                    }
                    reject(reject(new GeneralError_1.GeneralError(401, "Invalid credentials", "INVALID_LOGIN")));
                })
                    .catch(function (err) {
                    reject(new GeneralError_1.GeneralError(401, err.message, "INVALID_LOGIN"));
                });
            }
        })
            .catch(function (err) {
            reject(new GeneralError_1.GeneralError(401, err.message, "INVALID_LOGIN"));
        });
    });
};
//# sourceMappingURL=UserLogin.js.map