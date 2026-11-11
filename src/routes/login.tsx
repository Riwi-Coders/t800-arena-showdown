import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Terminal } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Terminal de Acceso — APEX Combat League" },
      { name: "description", content: "Pilot and fan access terminal for APEX. Enter your Connection ID and Encryption Key to open your profile pass." },
      { property: "og:title", content: "Terminal de Acceso — APEX" },
      { property: "og:description", content: "Elite pilot and fan access terminal for the APEX humanoid combat league." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

// Demo only: any non-empty ID + key (4+ chars) is accepted. Nothing is sent anywhere.
function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [key, setKey] = useState("");
  const [role, setRole] = useState<"fan" | "pilot">("fan");
  const [error, setError] = useState("");
  const [granted, setGranted] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!id.trim()) return setError("Connection ID required");
    if (key.length < 4) return setError("Encryption Key must be at least 4 characters");
    setError("");
    setGranted(true);
    setTimeout(() => navigate({ to: "/pass", search: { id: id.trim(), role } }), 1400);
  }

  return (
    <SiteLayout>
      <section className="bg-arena px-4 pt-36 pb-20">
        <div className="mx-auto max-w-md border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3 font-tech text-xs uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2"><Terminal className="h-4 w-4 text-primary" /> APEX // Secure Node 01</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Online</span>
          </div>

          <div className="p-6">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Pilot / Fan Terminal</div>
            <h1 className="font-display text-6xl font-bold uppercase">Terminal de Acceso</h1>

            <div className="mt-5 grid grid-cols-2 gap-px bg-border">
              <button type="button" onClick={() => setRole("fan")} className={`py-2 font-tech text-sm uppercase tracking-widest ${role === "fan" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}>Fan</button>
              <button type="button" onClick={() => setRole("pilot")} className={`py-2 font-tech text-sm uppercase tracking-widest ${role === "pilot" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"}`}>Pilot</button>
            </div>

            <form onSubmit={submit} className="mt-5 space-y-4">
              <label className="block">
                <span className="font-tech text-xs uppercase tracking-widest text-muted-foreground">Connection ID</span>
                <input value={id} onChange={(e) => setId(e.target.value)} placeholder="APX-0000" disabled={granted}
                  className="mt-1 h-12 w-full rounded-sm border border-input bg-background px-3 font-tech text-foreground outline-none focus:border-accent" />
              </label>
              <label className="block">
                <span className="font-tech text-xs uppercase tracking-widest text-muted-foreground">Encryption Key</span>
                <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="••••••••" disabled={granted}
                  className="mt-1 h-12 w-full rounded-sm border border-input bg-background px-3 font-tech text-foreground outline-none focus:border-accent" />
              </label>

              {error && <p role="alert" className="font-tech text-sm text-primary">&gt; ERROR: {error}</p>}

              {granted ? (
                <div role="status" className="border border-accent bg-background p-4 font-tech text-sm">
                  <p className="text-muted-foreground">&gt; Handshake verified…</p>
                  <p className="text-muted-foreground">&gt; Decrypting profile…</p>
                  <p className="text-primary">&gt; ACCESS GRANTED. Loading your pass.</p>
                </div>
              ) : (
                <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary font-display text-2xl uppercase tracking-wide text-primary-foreground transition-colors hover:bg-accent">
                  <Lock className="h-4 w-4" /> Connect
                </button>
              )}
            </form>

            <p className="mt-4 font-tech text-xs text-muted-foreground">Demo terminal. Any ID and a key of 4+ characters will connect.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
