import { NextResponse } from "next/server";
import { resolveExpiredTakeovers } from "@/lib/takeover";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  const url = new URL(req.url);
  if (!secret || (auth !== `Bearer ${secret}` && url.searchParams.get("secret") !== secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const resolved = await resolveExpiredTakeovers();
  return NextResponse.json({ resolved });
}
