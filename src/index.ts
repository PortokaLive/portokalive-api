import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import keys from "./config/AuthKeys";
import routes from "./routes";
import cors from "cors";
import { handleNotFound } from "./utils/handleNotFound";
import { handleGeneralError } from "./utils/handleError";
import corsOptions from "./config/CorsOptions";
import logger, { loggerStream } from "./logger";
import morgan from "morgan";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("combined", { stream: loggerStream }));

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.log("MongoDB successfully connected."))
  .catch((err) => logger.error(err));

app.use("/", express.static("static"));
app.use("/api", cors(corsOptions), routes);
app.use("*", handleNotFound);
app.use(handleGeneralError);

app.listen(keys.port, () => {
  logger.log(`Server is listening at ${keys.port}`);
});
