import { Request, Response, NextFunction } from "express";

export const handleError = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.error(err.stack);
    res.json({ error: err, message: err.message });
  } else {
    next();
  }
};
