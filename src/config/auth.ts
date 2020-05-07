import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import User from "../model/user";
import keys from "./keys";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    try {
      const data: any = jwt.verify(token, keys.secretKey);
      const user = await User.findOne({ _id: data.id });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({
        error: "INVALID_AUTHORIZATION",
        message: "Not authorized to access this resource",
      });
    }
  } else
    res.status(401).send({
      error: "INVALID_AUTHENTICATION",
      message: "There is no bearer token in authorization header",
    });
};

export default auth;
