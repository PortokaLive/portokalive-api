import { Request, Response } from "express";
import axios from "axios";

export const getStreamFlv = (req: Request, res: Response) => {
  res.redirect("http://178.128.97.123:8000/live/Demo.flv");
};
