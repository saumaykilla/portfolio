import { NextResponse } from "next/server";
import { AccessToken, RoomConfiguration, type VideoGrant } from "livekit-server-sdk";

const AGENT_NAME = "portfolio-concierge";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 30;
const hits = new Map<string, number[]>();

function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export const revalidate = 0;

export async function POST(req: Request) {
  const url = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!url || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "LiveKit is not configured yet." },
      { status: 503 },
    );
  }

  if (!rateLimit(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many sessions. Wait a moment, then retry." },
      { status: 429, headers: { "Retry-After": "30" } },
    );
  }

  const identity = `visitor_${crypto.randomUUID().slice(0, 8)}`;
  const roomName = `portfolio_${crypto.randomUUID().slice(0, 8)}`;

  const token = new AccessToken(apiKey, apiSecret, {
    identity,
    name: "Visitor",
    ttl: "15m",
  });

  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  };
  token.addGrant(grant);
  token.roomConfig = RoomConfiguration.fromJson(
    { agents: [{ agentName: AGENT_NAME }] },
    { ignoreUnknownFields: true },
  );

  return NextResponse.json(
    {
      serverUrl: url,
      roomName,
      participantName: "Visitor",
      participantToken: await token.toJwt(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
