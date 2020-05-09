var dotenv_1 = require("dotenv");
var path_1 = require("path");
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
exports["default"] = {
    mongoURI: process.env.MONGO_URI || "",
    port: process.env.PORT || 5000,
    secretKey: process.env.SECRET_KEY || ""
};
