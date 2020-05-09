"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var AuthKeys_1 = __importDefault(require("./config/AuthKeys"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var handleNotFound_1 = require("./utils/handleNotFound");
var handleError_1 = require("./utils/handleError");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.options("*", cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default
    .connect(AuthKeys_1.default.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () { return console.log("MongoDB successfully connected."); })
    .catch(function (err) { return console.error(err); });
app.use("/api", routes_1.default);
app.use("*", handleNotFound_1.handleNotFound);
app.use(handleError_1.handleGeneralError);
app.listen(process.env.PORT, function () {
    console.log("Server is listening at " + process.env.PORT);
});
//# sourceMappingURL=index.js.map