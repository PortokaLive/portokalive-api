import { Request, Response } from "express";
import EventSource from "eventsource";
import { IAuthRequest } from "../../config/AuthGuard";

export const getStream = async (req: Request, res: Response) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  const streamEvent = new EventSource(
    "http://178.128.97.123:8000/sse/streams?token=" +
      (req as IAuthRequest).token
  );

  streamEvent.onmessage = (event) => {
    res.write(`data: ${event.data}\n\n`);
  };
};
