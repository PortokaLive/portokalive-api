"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = function (err, res) {
    console.error("[ERROR] " + err.code + " : " + err.message);
    res.status(err.code).json({
        error: err.name,
        message: err.message,
    });
};
//# sourceMappingURL=throwError.js.map