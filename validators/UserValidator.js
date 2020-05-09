"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralError_1 = require("../errors/GeneralError");
var HelperValidator_1 = require("./HelperValidator");
var User_1 = require("../model/User");
var throwError_1 = require("../utils/throwError");
exports.validateBeforeRegister = function (req, res) {
    return new Promise(function (resolve, reject) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (!email || !password) {
            reject(new GeneralError_1.GeneralError(400, "Request body is invalid", "BAD_REQUEST"));
        }
        else if (!HelperValidator_1.isEmail(email)) {
            reject(new GeneralError_1.GeneralError(400, "Email is not a valid email", "INVALID_EMAIL"));
        }
        else if (password.length < 8) {
            reject(new GeneralError_1.GeneralError(400, "Password needs minimum 8 characters", "INVALID_PASSWORD"));
        }
        else {
            ifUserExists(email)
                .then(function () {
                reject(new GeneralError_1.GeneralError(422, "User already exists", "INVALID_EMAIL"));
            })
                .catch(function () {
                resolve({
                    email: email,
                    password: password,
                });
            });
        }
    });
};
exports.validateBeforeActivate = function (req, res) {
    return new Promise(function (resolve, reject) {
        try {
            var _a = req.body, email = _a.email, activationCode = _a.activationCode;
            if (!email || !activationCode) {
                throw new GeneralError_1.GeneralError(400, "Request query is invalid", "BAD_REQUEST");
            }
            resolve({
                email: email,
                activationCode: activationCode,
            });
        }
        catch (ex) {
            throwError_1.throwError(ex, res);
            reject();
        }
    });
};
exports.validateBeforeLogin = function (req, res) {
    return new Promise(function (resolve, reject) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (!email || !password) {
            throw new GeneralError_1.GeneralError(400, "Request body is invalid", "BAD_REQUEST");
        }
        else {
            ifUserExists(email)
                .then(function () {
                resolve({
                    email: email,
                    password: password,
                });
            })
                .catch(function () {
                reject(new GeneralError_1.GeneralError(422, "User does not exists", "NO_RECORD"));
            });
        }
    });
};
var ifUserExists = function (email) {
    return new Promise(function (resolve, reject) {
        User_1.User.findOne({ email: email }).then(function (user) {
            if (user)
                resolve(true);
            else
                reject(false);
        });
    });
};
//# sourceMappingURL=UserValidator.js.map