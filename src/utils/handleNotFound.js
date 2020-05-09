"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFound = function (_, res) {
    res.status(404).json({ error: 404, message: "Route not found" });
};
//# sourceMappingURL=handleNotFound.js.map