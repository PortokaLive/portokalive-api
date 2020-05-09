"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGeneralError = function (err, _, res, next) {
    if (err) {
        console.error("[ERROR] " + err.code + " : " + err.message);
        res.status(err.code).json({
            error: err.name,
            message: err.message,
        });
    }
    else {
        next();
    }
};
//# sourceMappingURL=handleError.js.map