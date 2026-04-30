/**
 * Telegram notification helper. Reads credentials from env, never falls back to
 * hardcoded values. Returns success/error info but does not throw, so the
 * caller (contact API) can still 200 even if Telegram is down.
 */

type TelegramResult = { ok: true } | { ok: false; error: string };

export async function sendTelegramMessage(
  text: string,
  options?: { parseMode?: "Markdown" | "MarkdownV2" | "HTML" },
): Promise<TelegramResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      ok: false,
      error:
        "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in environment",
    };
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: options?.parseMode ?? "Markdown",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!res.ok) {
      const errBody = await res.text();
      return { ok: false, error: `Telegram ${res.status}: ${errBody}` };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Telegram fetch failed",
    };
  }
}

export function buildContactNotification(input: {
  name: string;
  phone: string;
  message?: string | null;
  source?: string;
}): string {
  const escape = (s: string) =>
    s.replace(/[_*`[\]()]/g, (c) => `\\${c}`); // basic Markdown escape

  const lines = [
    `📬 *Нова заявка з сайту MetaDim*`,
    ``,
    `👤 *Ім'я:* ${escape(input.name)}`,
    `📞 *Телефон:* ${escape(input.phone)}`,
  ];
  if (input.message?.trim()) {
    lines.push(`💬 *Повідомлення:* ${escape(input.message)}`);
  }
  if (input.source) {
    lines.push(`🏷 *Джерело:* ${escape(input.source)}`);
  }
  return lines.join("\n");
}
