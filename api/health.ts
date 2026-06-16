import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Lightweight health for Vercel edge — full Express API runs on Railway/Docker. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    service: "portokalive-api",
    mode: "vercel-health",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    note: "Full API: deploy via Docker/Railway — see README.md",
  });
}
