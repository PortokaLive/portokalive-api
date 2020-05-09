import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import keys from "../config/AuthKeys";

export const generateSalt = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const signJwt = (payload: any, expiresIn: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, keys.secretKey, { expiresIn }, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
};

export const verifyJwt = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, keys.secretKey, (error, decodedData) => {
      if (error) {
        reject(error);
      }
      console.log(decodedData);
      resolve(decodedData);
    });
  });
};
