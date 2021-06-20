import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

export default {
  mongoURI: process.env.MONGO_URI || "",
  apiVideoUrl: process.env.API_VIDEO_URL || "",
  port: process.env.PORT || 5000,
  secretKey: process.env.SECRET_KEY || "",
};
