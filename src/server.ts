import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import keys from "./config/keys";
import routes from "./routes";
import cors from "cors";
import { handleNotFound } from "./utils/handleNotFound";
import { handleGeneralError } from "./utils/handleError";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected."))
  .catch((err) => console.error(err));

app.use("/api", routes);
app.use("*", handleNotFound);
app.use(handleGeneralError);

app.listen(keys.port, () => {
  console.log(`Server is listening at ${keys.port}`);
});
