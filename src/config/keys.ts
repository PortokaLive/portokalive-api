import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

export default {
  mongoURI: process.env.MONGO_URI || "",
  port: process.env.PORT || 5000,
  secretKey: process.env.SECRET_KEY || "",
};
