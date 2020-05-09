"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Regex_1 = require("../constants/Regex");
exports.isEmail = function (checkingString) {
    return Regex_1.EmailRegex.test(checkingString);
};
//# sourceMappingURL=HelperValidator.js.map