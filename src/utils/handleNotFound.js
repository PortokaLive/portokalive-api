exports.handleNotFound = function (_, res) {
    res.status(404).json({ error: 404, message: "Route not found" });
};
