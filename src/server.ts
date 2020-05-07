import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import keys from "./config/keys";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log("Invalid Request data");
    res.json({ error: err, message: err.message });
  } else {
    next();
  }
});

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected."))
  .catch((err) => console.error(err));

app.get("/", (_, res) => res.send("Welcome to OrangeLive WEB API Server"));

app.use("/api", routes);

app.use("*", function (_, res) {
  res.status(404).json({ error: 404, message: "Route not found" });
});

app.listen(keys.port, () => {
  console.log("info", `Server is listening at ${keys.port}`);
});
