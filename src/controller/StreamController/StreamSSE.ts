import { Request, Response } from "express";
import EventSource from "eventsource";
import { ENV } from "../../services/EnvironmentService";

export const getStream = async (req: Request, res: Response) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  console.log(req.query.token);
  console.log(ENV?.mediaServer);

  const streamEvent = new EventSource(
    `${ENV?.mediaServer}sse/streams?token=${req.query.token}`
  );

  streamEvent.onmessage = (event) => {
    res.write(`data: ${event.data}\n\n`);
  };
};
