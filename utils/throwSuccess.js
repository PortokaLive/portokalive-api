"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwSuccess = function (resultMessage, res) {
    console.log("[SUCCESS] " + resultMessage);
    res.json({
        result: resultMessage
    });
};
//# sourceMappingURL=throwSuccess.js.map