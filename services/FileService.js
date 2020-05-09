"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var handlebars_1 = __importDefault(require("handlebars"));
exports.readHTMLFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(path, { encoding: "utf-8" }, function (err, html) {
            if (err) {
                reject(err);
            }
            else {
                resolve(html);
            }
        });
    });
};
exports.fillTemplate = function (html, replacements) {
    return handlebars_1.default.compile(html)(replacements);
};
//# sourceMappingURL=FileService.js.map