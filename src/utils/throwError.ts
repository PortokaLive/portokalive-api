import { Response } from "express";
import { GeneralError } from "../errors/GeneralError";
import logger from "../logger";

export const throwError = (err: GeneralError, res: Response) => {
  logger.error(`[ERROR] ${err.code || err.name} : ${err.message}`);
  res.status(err.code || 500).json({
    error: err.name,
    message: err.message,
  });
};
