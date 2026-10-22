import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const MAX = 5;

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.accessToken) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { recipients, subject, body } = (await req.json()) as { recipients: string[]; subject: string; body: string };
  const list = recipients.slice(0, MAX);
  const results: { to: string; ok: boolean; error?: string }[] = [];

  for (const to of list) {
    const r = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
      method: "POST",
      headers: { Authorization: `Bearer ${token.accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: { subject, body: { contentType: "Text", content: body }, toRecipients: [{ emailAddress: { address: to } }] },
      }),
    });
    results.push({ to, ok: r.ok, error: r.ok ? undefined : await r.text() });
  }
  return NextResponse.json({ results });
}
