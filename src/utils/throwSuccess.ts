import { Response, Request } from "express";

export const throwSuccess = (resultMessage: string, res: Response) => {
  res.json({
    result: resultMessage,
  });
};