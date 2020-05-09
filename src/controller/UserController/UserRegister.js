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
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidator_1 = require("../../validators/UserValidator");
var User_1 = require("../../model/User");
var uuid_1 = require("uuid");
var throwError_1 = require("../../utils/throwError");
var GeneralError_1 = require("../../errors/GeneralError");
var EmailService_1 = require("../../services/EmailService");
var AuthService_1 = require("../../services/AuthService");
var throwSuccess_1 = require("../../utils/throwSuccess");
var FileService_1 = require("../../services/FileService");
exports.registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email_1, password, hashedPassword, newUserModel_1, ex_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, UserValidator_1.validateBeforeRegister(req, res)];
            case 1:
                _a = _b.sent(), email_1 = _a.email, password = _a.password;
                return [4 /*yield*/, AuthService_1.generateSalt(password)];
            case 2:
                hashedPassword = _b.sent();
                newUserModel_1 = {
                    email: email_1,
                    password: hashedPassword,
                    uuid: uuid_1.v4(),
                };
                new User_1.User(newUserModel_1)
                    .save()
                    .then(function () {
                    doPostRegisterSteps(email_1, newUserModel_1.uuid, newUserModel_1.id);
                    throwSuccess_1.throwSuccess("Please check your email for account activation.", res);
                })
                    .catch(function (err) {
                    throw new GeneralError_1.GeneralError(500, err.message, err.name);
                });
                return [3 /*break*/, 4];
            case 3:
                ex_1 = _b.sent();
                throwError_1.throwError(ex_1, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var doPostRegisterSteps = function (email, uuid, id) { return __awaiter(void 0, void 0, void 0, function () {
    var html, payload, activationCode, registerTemplateReplacement, template;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, FileService_1.readHTMLFile("src/emails/RegisterUser_Template.html")];
            case 1:
                html = _a.sent();
                payload = {
                    email: email,
                    activation: true,
                };
                return [4 /*yield*/, AuthService_1.signJwt(payload, 600)];
            case 2:
                activationCode = _a.sent();
                registerTemplateReplacement = {
                    email: email,
                    activationCode: activationCode,
                };
                template = FileService_1.fillTemplate(html, registerTemplateReplacement);
                EmailService_1.sendEmailHTML("Please activate your account", email, template);
                return [2 /*return*/];
        }
    });
}); };
exports.activateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, activationCode, activation, user, thisUser, token, ex_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                return [4 /*yield*/, UserValidator_1.validateBeforeActivate(req, res)];
            case 1:
                _a = _b.sent(), email = _a.email, activationCode = _a.activationCode;
                return [4 /*yield*/, AuthService_1.verifyJwt(activationCode).catch(function () {
                        throw new GeneralError_1.GeneralError(400, "Activation code is invalid", "BAD_REQUEST");
                    })];
            case 2:
                activation = (_b.sent()).activation;
                if (!!!activation) return [3 /*break*/, 6];
                return [4 /*yield*/, User_1.User.findOne({ email: email }).select("+activated")];
            case 3:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 4];
                throw new GeneralError_1.GeneralError(404, "User not found", "NO_RECORD");
            case 4:
                user.activated = true;
                user.save();
                thisUser = {};
                thisUser.id = user.id;
                thisUser.email = user.email;
                thisUser.uuid = user.uuid;
                thisUser.activated = user.activated;
                return [4 /*yield*/, AuthService_1.signJwt(thisUser, 31556926)];
            case 5:
                token = _b.sent();
                res.json({
                    result: "SUCCESS",
                    token: "Bearer " + token,
                });
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                ex_2 = _b.sent();
                throwError_1.throwError(ex_2, res);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=UserRegister.js.map