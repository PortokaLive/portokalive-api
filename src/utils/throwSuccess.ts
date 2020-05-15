import { Response, Request } from "express";

export const throwSuccess = (resultMessage: string, res: Response) => {
  console.log(`[SUCCESS] ${resultMessage}`);
  res.json({
    result: resultMessage,
  });
};

export const sendSuccessEmpty = (req: Request, res: Response) => {
  res.json({});
};
