import { Request, Response, NextFunction } from "express";
import { GeneralError } from "../errors/GeneralError";
import logger from "../logger";

export const handleGeneralError = (
  err: GeneralError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    logger.error(`[ERROR] ${err.code} : ${err.message}`);
    res.status(err.code).json({
      error: err.name,
      message: err.message,
    });
  } else {
    next();
  }
};
