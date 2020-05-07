import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import keys from "./keys";
import { User } from "../model/User";
import { GeneralError } from "../errors/GeneralError";
import { throwError } from "../utils/throwError";

export interface IAuthRequest extends Request {
  user: any;
  token: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const data: any = jwt.verify(token, keys.secretKey);
      const user = await User.findOne({ _id: data.id });
      if (!user) {
        throw new GeneralError(
          404,
          "INVALID_AUTHORIZATION",
          "Not authorized to access this resource"
        );
      }
      (<IAuthRequest>req).user = user;
      (<IAuthRequest>req).token = token;
    } else {
      throw new GeneralError(
        404,
        "INVALID_AUTHENTICATION",
        "There is no bearer token in authorization header"
      );
    }
  } catch (ex) {
    throwError((<GeneralError>ex),res);
  }
};

export default auth;
