import { createFileRoute, Link } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { SiteLayout } from "@/components/site/Layout";

type PassSearch = { id?: string | undefined; role?: "fan" | "pilot" | undefined };

export const Route = createFileRoute("/pass")({
  validateSearch: (s: Record<string, unknown>): PassSearch => {
    const id = s["id"];
    const role = s["role"];
    return {
      id: typeof id === "string" && id ? id.slice(0, 32) : undefined,
      role: role === "pilot" ? "pilot" : role === "fan" ? "fan" : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Your Profile Pass — APEX Combat League" },
      { name: "description", content: "Your APEX pilot or fan profile pass with access level and QR credential." },
      { property: "og:title", content: "Profile Pass — APEX" },
      { property: "og:description", content: "APEX member profile pass with QR credential." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Pass,
});

function Pass() {
  const { id, role = "fan" } = Route.useSearch();

  if (!id) {
    return (
      <SiteLayout>
        <section className="bg-arena px-4 pt-36 pb-20">
          <div className="mx-auto max-w-md border border-border bg-card p-6 text-center">
            <h1 className="font-display text-5xl font-bold uppercase">No Active Session</h1>
            <p className="mt-2 text-muted-foreground">Connect through the terminal to open your pass.</p>
            <Link to="/login" className="mt-5 inline-flex h-12 items-center rounded-sm bg-primary px-6 font-display text-2xl uppercase text-primary-foreground hover:bg-accent">Terminal de Acceso</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const isPilot = role === "pilot";
  const rows: [string, string][] = [
    ["Connection ID", id],
    ["Role", isPilot ? "Elite Pilot" : "Fan Member"],
    ["Access Level", isPilot ? "Paddock · Booth" : "Arena · Fan Zone"],
    ["Season", "2026 · Season 3"],
    ["Home Venue", "APEX Arena 01"],
    ["Status", "Active"],
  ];

  return (
    <SiteLayout>
      <section className="bg-arena px-4 pt-36 pb-20">
        <div className="mx-auto max-w-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-fight px-6 py-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">APEX Profile Pass</div>
              <div className="font-display text-5xl font-bold uppercase">{isPilot ? "Pilot" : "Fan"} Credential</div>
            </div>
            <div className="font-display text-4xl font-bold">APEX<span className="text-primary">.</span></div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
            <dl className="grid grid-cols-2 gap-px bg-border">
              {rows.map(([k, v]) => (
                <div key={k} className="bg-background p-3">
                  <dt className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="mt-1 truncate font-display text-2xl font-semibold uppercase">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-foreground p-2"><QRCodeSVG value={`APEX|${role}|${id}`} size={140} /></div>
              <span className="font-tech text-xs uppercase tracking-widest text-muted-foreground">Scan at gate</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border px-6 py-4">
            <Link to="/events" className="inline-flex h-11 items-center rounded-sm bg-primary px-5 font-display text-xl uppercase text-primary-foreground hover:bg-accent">Buy Tickets</Link>
            <Link to="/login" className="inline-flex h-11 items-center rounded-sm border border-border px-5 font-display text-xl uppercase text-muted-foreground hover:border-accent hover:text-foreground">Disconnect</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
