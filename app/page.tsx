"use client";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

function App() {
  const { data: session, status } = useSession();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Test");
  const [body, setBody] = useState("Hello from the prototype.");
  const [out, setOut] = useState("");

  async function send() {
    const recipients = to.split(/[\s,;]+/).filter(Boolean);
    const r = await fetch("/api/send", { method: "POST", body: JSON.stringify({ recipients, subject, body }) });
    setOut(JSON.stringify(await r.json(), null, 2));
  }

  if (status === "loading") return <p>Loading…</p>;
  if (!session)
    return <button onClick={() => signIn("azure-ad")}>Sign in with Microsoft</button>;

  return (
    <>
      <p>Signed in as {session.user?.email} <button onClick={() => signOut()}>Sign out</button></p>
      <textarea placeholder="Recipients (max 5, separated by comma or space)" value={to} onChange={(e) => setTo(e.target.value)} rows={2} style={{ width: "100%" }} />
      <input value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: "100%", margin: "8px 0" }} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} style={{ width: "100%" }} />
      <button onClick={send}>Send</button>
      <pre>{out}</pre>
    </>
  );
}

export default function Page() {
  return <SessionProvider><App /></SessionProvider>;
}
