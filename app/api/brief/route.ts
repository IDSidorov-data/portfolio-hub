import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export const runtime = "nodejs";

const BUDGETS = new Set(["до 50к", "50–150к", "150–300к", "300к+", "не знаю"]);
const DEADLINES = new Set(["как можно скорее", "2–4 недели", "1–3 месяца", "исследую"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TG_RE = /^[a-zA-Z0-9_]{3,32}$/;
const STOPWORDS_RE = /(крипт|ставк|заработ(?:ай|ок)|xxx|18\+|free money)/i;
const LINKS_RE = /(https?:\/\/|www\.)/gi;

const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 4);
const MAX_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const TG_TOPIC_ID = process.env.TG_TOPIC_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "";

function escHtml(value: string) {
  return value.replace(/[&<>]/g, (char) => (char === "&" ? "&amp;" : char === "<" ? "&lt;" : "&gt;"));
}
function b64enc(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}
function b64dec(value: string) {
  try {
    return Buffer.from(value, "base64").toString("utf8");
  } catch {
    return "";
  }
}
function capsRatio(value: string) {
  const letters = (value.match(/[A-Za-zА-Яа-яЁё]/g) || []).length;
  if (!letters) return 0;
  const caps = (value.match(/[A-ZА-ЯЁ]/g) || []).length;
  return caps / letters;
}
function sanitizeFilename(name: string) {
  const base = name.split("/").pop()!.split("\\").pop()!;
  return base.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 100) || "file";
}
function hashPayload(parts: string[]) {
  const hash = crypto.createHash("sha256");
  hash.update(parts.join("|"), "utf8");
  return hash.digest("hex");
}

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) {
    return {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    } satisfies Record<string, string>;
  }
  return {} as Record<string, string>;
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: NextRequest) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    return NextResponse.json(
      { ok: false, error: "Server env is not set" },
      { status: 500, headers: corsHeaders(req) }
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: "Bad form" }, { status: 400, headers: corsHeaders(req) });
  }

  const website = ((form.get("website") as string) || "").trim();
  if (website) {
    return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders(req) });
  }

  const startedAt = Number(form.get("startedAt") || 0);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 6000) {
    return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders(req) });
  }

  const name = ((form.get("name") as string) || "").trim();
  const telegramRaw = ((form.get("telegram") as string) || "").trim();
  const telegram = telegramRaw.replace(/^@/, "");
  const email = ((form.get("email") as string) || "").trim();
  const about = ((form.get("about") as string) || "").trim();
  const budget = ((form.get("budget") as string) || "").trim();
  const deadline = ((form.get("deadline") as string) || "").trim();
  const page = ((form.get("page") as string) || "").trim();
  const ref = ((form.get("ref") as string) || "").trim();
  const utm = {
    utm_source: ((form.get("utm_source") as string) || "").trim(),
    utm_medium: ((form.get("utm_medium") as string) || "").trim(),
    utm_campaign: ((form.get("utm_campaign") as string) || "").trim(),
    utm_content: ((form.get("utm_content") as string) || "").trim(),
    utm_term: ((form.get("utm_term") as string) || "").trim(),
  };

  if (!name || name.length < 2 || name.length > 60 || /(https?:\/\/|www\.|@.+\.)/i.test(name)) {
    return NextResponse.json(
      { ok: false, error: "Имя некорректно" },
      { status: 400, headers: corsHeaders(req) }
    );
  }
  if (!telegram && !email) {
    return NextResponse.json(
      { ok: false, error: "Укажите Telegram или Email" },
      { status: 400, headers: corsHeaders(req) }
    );
  }
  if (telegram && !TG_RE.test(telegram)) {
    return NextResponse.json(
      { ok: false, error: "Telegram некорректен" },
      { status: 400, headers: corsHeaders(req) }
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email некорректен" },
      { status: 400, headers: corsHeaders(req) }
    );
  }
  if (about.length < 20 || about.length > 1500) {
    return NextResponse.json(
      { ok: false, error: "О проекте: 20–1500 символов" },
      { status: 400, headers: corsHeaders(req) }
    );
  }
  const linksCount = (about.match(LINKS_RE) || []).length;
  if (linksCount > 3 || capsRatio(about) > 0.8 || STOPWORDS_RE.test(about)) {
    return NextResponse.json(
      { ok: false, error: "Текст отклонён фильтром" },
      { status: 400, headers: corsHeaders(req) }
    );
  }
  if (!BUDGETS.has(budget) || !DEADLINES.has(deadline)) {
    return NextResponse.json(
      { ok: false, error: "Выберите бюджет/срок" },
      { status: 400, headers: corsHeaders(req) }
    );
  }

  let file = form.get("file") as File | null;
  if (file && file.size > 0) {
    const extOk = /\.(pdf|png|jpe?g)$/i.test(file.name);
    const mimeOk = /^(application\/pdf|image\/png|image\/jpeg)$/.test(file.type);
    if (!extOk || !mimeOk) {
      return NextResponse.json(
        { ok: false, error: "Недопустимый тип файла" },
        { status: 400, headers: corsHeaders(req) }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: `Файл больше лимита (${MAX_UPLOAD_MB} МБ)` },
        { status: 400, headers: corsHeaders(req) }
      );
    }
  } else {
    file = null;
  }

  const sigParts = [
    name,
    telegram,
    email,
    about,
    budget,
    deadline,
    page,
    ref,
    utm.utm_source,
    utm.utm_medium,
    utm.utm_campaign,
    utm.utm_content,
    utm.utm_term,
  ];
  const signature = hashPayload(sigParts);
  const reqCookies = cookies();
  const prevSig = reqCookies.get("brief_sig")?.value || "";
  if (prevSig && prevSig === signature) {
    return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders(req) });
  }

  const rlCookie = reqCookies.get("brief_rl")?.value;
  if (rlCookie) {
    const lastTs = Number(b64dec(rlCookie));
    if (Number.isFinite(lastTs) && Date.now() - lastTs < 60_000) {
      return NextResponse.json(
        { ok: false, error: "Too many requests" },
        { status: 429, headers: corsHeaders(req) }
      );
    }
  }

  const parts: string[] = [];
  const tgLink = telegram ? `<a href="https://t.me/${escHtml(telegram)}">@${escHtml(telegram)}</a>` : "";
  const emailLink = email ? `<a href="mailto:${escHtml(email)}">${escHtml(email)}</a>` : "";
  const contact = [tgLink, emailLink].filter(Boolean).join(" · ");

  const utmShown = Object.entries(utm)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${escHtml(value)}`)
    .join(" ");

  parts.push("🟣 Новая заявка с сайта");
  parts.push(`<b>Имя:</b> ${escHtml(name)}`);
  parts.push(`<b>Связь:</b> ${contact || "—"}`);
  parts.push(`<b>Бюджет:</b> ${escHtml(budget)} · <b>Срок:</b> ${escHtml(deadline)}`);
  parts.push(`<b>Страница:</b> ${escHtml(page || "/")} · <b>UTM:</b> ${utmShown || "—"}`);
  if (ref) parts.push(`<b>Ref:</b> ${escHtml(ref)}`);
  parts.push("");
  parts.push("<b>О проекте:</b>");
  parts.push(escHtml(about));

  const text = parts.join("\n");

  const baseUrl = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;
  const msgBody: Record<string, unknown> = {
    chat_id: TG_CHAT_ID,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };
  if (TG_TOPIC_ID) msgBody.message_thread_id = Number(TG_TOPIC_ID);

  const sendMessage = await fetch(`${baseUrl}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msgBody),
  });

  if (!sendMessage.ok) {
    return NextResponse.json({ ok: false, error: "Unexpected" }, { status: 500, headers: corsHeaders(req) });
  }

  if (file) {
    const fd = new FormData();
    fd.set("chat_id", TG_CHAT_ID);
    if (TG_TOPIC_ID) fd.set("message_thread_id", String(TG_TOPIC_ID));
    const cleanName = sanitizeFilename(file.name);
    fd.set("document", file as any, cleanName);
    fd.set("caption", "📎 Вложение к заявке");

    const sendDoc = await fetch(`${baseUrl}/sendDocument`, { method: "POST", body: fd });
    if (!sendDoc.ok) {
      // silently ignore attachment failures to avoid exposing PII in logs
    }
  }

  const response = NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders(req) });
  response.cookies.set("brief_rl", b64enc(String(Date.now())), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60,
    path: "/",
  });
  response.cookies.set("brief_sig", signature, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 300,
    path: "/",
  });
  return response;
}
