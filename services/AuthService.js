"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jwt = __importStar(require("jsonwebtoken"));
var AuthKeys_1 = __importDefault(require("../config/AuthKeys"));
exports.generateSalt = function (password) {
    return new Promise(function (resolve, reject) {
        bcryptjs_1.default.genSalt(10, function (err, salt) {
            if (err) {
                reject(err);
            }
            bcryptjs_1.default.hash(password, salt, function (err, hash) {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};
exports.signJwt = function (payload, expiresIn) {
    return new Promise(function (resolve, reject) {
        jwt.sign(payload, AuthKeys_1.default.secretKey, { expiresIn: expiresIn }, function (error, token) {
            if (error) {
                reject(error);
            }
            resolve(token);
        });
    });
};
exports.verifyJwt = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, AuthKeys_1.default.secretKey, function (error, decodedData) {
            if (error) {
                reject(error);
            }
            console.log(decodedData);
            resolve(decodedData);
        });
    });
};
//# sourceMappingURL=AuthService.js.map