import { Request, Response } from "express";

export const handleNotFound = (_: Request, res: Response) => {
  res.status(404).json({ error: 404, message: "Route not found" });
};
