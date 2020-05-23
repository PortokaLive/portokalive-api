import { Request, Response } from "express";
import { ENV } from "../../services/EnvironmentService";
import http from "http";
import { throwError } from "../../utils/throwError";
import { GeneralError } from "../../errors/GeneralError";

export const getStreamFlv = (req: Request, res: Response) => {
  if (!req.query.token) {
    throwError(
      new GeneralError(403, "Token is empty", "INVALID_AUTHENTICATION"),
      res
    );
    return;
  }
  const url =
    ENV?.mediaServer +
    "live/" +
    req.params.streamerId +
    "?token=" +
    req.query.token;
  http.get(url, (response) => {
    if (response.statusCode !== 200) {
      throwError(
        new GeneralError(
          response.statusCode || 500,
          response.statusMessage || "Unknown error at fetching live stream",
          "INVALID_LIVE_STREAM_FETCH"
        ),
        res
      );
    } else {
      response.on("data", (data) => {
        res.write(data);
      });
      response.on("error", (error) => {
        throwError(new GeneralError(500, error.message, error.name), res);
      });
      setTimeout(() => {
        response.destroy();
      },10000);
    }
  });
};
