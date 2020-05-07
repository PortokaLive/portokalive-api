import * as jwt from "jsonwebtoken";
import keys from "../config/keys";

export const signJwt = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      keys.secretKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      }
    );
  });
};
