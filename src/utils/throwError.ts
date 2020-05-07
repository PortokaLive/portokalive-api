import { Response } from "express";
import { GeneralError } from "../errors/GeneralError";

export const throwError = (err: GeneralError, res: Response) => {
  console.error(`[ERROR] ${err.code} : ${err.message}`);
  res.status(err.code).json({
    error: err.name,
    message: err.message,
  });
};
