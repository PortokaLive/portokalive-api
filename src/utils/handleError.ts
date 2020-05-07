import { Request, Response, NextFunction } from "express";
import { GeneralError } from "../errors/GeneralError";

export const handleGeneralError = (
  err: GeneralError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.error(`[ERROR] ${err.code} : ${err.message}`);
    res.status(err.code).json({
      error: err.name,
      message: err.message,
    });
  } else {
    next();
  }
};
