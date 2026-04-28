import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_TOKEN = "8763260524:AAEdSyDXLNb0BwB1dJSwgUFfHg-hOBmOcWs";
const CHAT_ID = "-5219198991";

export async function POST(req: NextRequest) {
  const { name, phone, message } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const text =
    `📬 *Нова заявка з сайту MetaDim*\n\n` +
    `👤 *Ім'я:* ${name}\n` +
    `📞 *Телефон:* ${phone}` +
    (message ? `\n💬 *Повідомлення:* ${message}` : "");

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
