import { Response } from "express";
import { GeneralError } from "../errors/GeneralError";

export const throwError = (err: GeneralError, res: Response) => {
  console.error(`[ERROR] ${err.code || err.name} : ${err.message}`);
  res.status(err.code || 500).json({
    error: err.name,
    message: err.message,
  });
};
