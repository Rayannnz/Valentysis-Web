import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* SMTP is a long-lived connection, so this route can't run on the edge runtime */
export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? "sales@valentisys.com";

/** Unselected dropdowns are reported as this rather than arriving blank. */
const FALLBACK = "Others";

/* Caps are generous for real enquiries but stop a bot pasting a novel into the mail body. */
const LIMITS = {
  fullName: 120,
  company: 160,
  email: 200,
  phone: 60,
  industry: 80,
  service: 80,
  idea: 4000,
} as const;

type Field = keyof typeof LIMITS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strips CR/LF so a submitted value can never inject extra mail headers. */
function oneLine(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function multiLine(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string
  );
}

/* Best-effort throttle. Serverless instances don't share memory, so this trims
   casual abuse rather than acting as a real rate limiter. */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

function transport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries from this address. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  /* honeypot — hidden from real users, so anything in it is a bot.
     Report success so the bot doesn't learn to retry. */
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const get = (field: Field) => oneLine(body[field], LIMITS[field]);

  const fullName = get("fullName");
  const company = get("company");
  const email = get("email");
  const phone = get("phone");
  const industry = get("industry") || FALLBACK;
  const service = get("service") || FALLBACK;
  const idea = multiLine(body.idea, LIMITS.idea);

  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { error: "Please fill in your name, work email, and work contact." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
  }

  const mailer = transport();
  if (!mailer) {
    console.error("[contact] SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS.");
    return NextResponse.json(
      { error: "The contact form isn't available right now. Please email us directly." },
      { status: 503 }
    );
  }

  const rows: [string, string][] = [
    ["Name", fullName],
    ["Company", company || "Not provided"],
    ["Work email", email],
    ["Work contact", phone],
    ["Industry", industry],
    ["Service", service],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "The idea:",
    idea || "Not shared.",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#1a1630">
      <h2 style="margin:0 0 18px;font-size:19px">New enquiry from valentisys.dev</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
                 <td style="padding:6px 18px 6px 0;color:#6b6780;vertical-align:top">${label}</td>
                 <td style="padding:6px 0;font-weight:600">${escapeHtml(value)}</td>
               </tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px;color:#6b6780">The idea</h3>
      <p style="margin:0;white-space:pre-wrap;line-height:1.6">${
        idea ? escapeHtml(idea) : "<em style=\"color:#8a869c\">Not shared.</em>"
      }</p>
    </div>
  `;

  try {
    await mailer.sendMail({
      from: process.env.CONTACT_FROM ?? `"Valentisys website" <${process.env.SMTP_USER}>`,
      to: TO,
      replyTo: `"${fullName.replace(/"/g, "")}" <${email}>`,
      subject: `New enquiry — ${fullName}${company ? ` (${company})` : ""} — ${service}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] Failed to send enquiry:", err);
    return NextResponse.json(
      { error: "We couldn't send that just now. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
