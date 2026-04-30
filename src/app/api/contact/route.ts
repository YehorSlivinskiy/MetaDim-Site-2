import { NextRequest, NextResponse } from "next/server";
import { saveContactRequest } from "@/lib/db";
import {
  sendTelegramMessage,
  buildContactNotification,
} from "@/lib/telegram";
import { rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per minute per IP. Disabled if Upstash env not set.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const limit = await rateLimit(`contact:${ip}`, { max: 5, windowSec: 60 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Забагато запитів. Спробуйте через хвилину." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.resetIn ?? 60),
          "X-RateLimit-Remaining": String(limit.remaining ?? 0),
        },
      },
    );
  }

  let body: { name?: string; phone?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim() || undefined;

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (name.length > 200 || phone.length > 50 || (message?.length ?? 0) > 5000) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  // Save to DB first — Telegram failure should not lose the lead.
  try {
    await saveContactRequest({ name, phone, message });
  } catch (e) {
    console.error("Failed to save contact request:", e);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 },
    );
  }

  // Notify Telegram (non-blocking failure — DB already has the lead)
  const tg = await sendTelegramMessage(
    buildContactNotification({ name, phone, message, source: "website" }),
  );
  if (!tg.ok) {
    console.error("Telegram notification failed:", tg.error);
    // Still return success — the lead is saved in DB
  }

  return NextResponse.json({ ok: true });
}
