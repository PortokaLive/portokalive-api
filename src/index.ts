import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import keys from "./config/AuthKeys";
import routes from "./routes";
import cors from "cors";
import { handleNotFound } from "./utils/handleNotFound";
import { handleGeneralError } from "./utils/handleError";
import corsOptions from "./config/CorsOptions";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected."))
  .catch((err) => console.error(err));

app.use("/", express.static("static"));
app.use("/api", cors(corsOptions), routes);
app.use("*", handleNotFound);
app.use(handleGeneralError);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`);
});
