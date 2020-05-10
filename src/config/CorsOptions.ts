import { CorsOptions } from "cors";
import { GeneralError } from "../errors/GeneralError";

const { WHITELIST_IPS, ENVIRONMENT } = process.env;

var corsOptions = {} as CorsOptions;

if (WHITELIST_IPS && ENVIRONMENT === "PROD") {
  const whitelist = <Array<string>>JSON.parse(WHITELIST_IPS);
  console.log("Whitelist IP: " + whitelist);

  corsOptions = {
    origin: (origin, callback) => {
      console.log("Origin of request: " + origin);
      if (origin && whitelist.indexOf(origin) !== -1) {
        console.log("Approved CORS");
        callback(null, true);
      } else {
        callback(
          new GeneralError(
            405,
            "Not allowed by Cross-Origin Resource Sharing",
            "CORSERROR"
          )
        );
      }
    },
  };
}

export default corsOptions;
