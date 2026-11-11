import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Zap, Target } from "lucide-react";
import { SiteLayout, PageTitle } from "@/components/site/Layout";
import { leaderboard, koPercent } from "@/components/site/data";

export const Route = createFileRoute("/hall-of-fame")({
  head: () => ({
    meta: [
      { title: "Hall of Fame & Leaderboard — APEX Combat League" },
      { name: "description", content: "APEX season rankings: every T800 robot's wins, losses, knockouts and K.O. percentage." },
      { property: "og:title", content: "Hall of Fame & Leaderboard — APEX" },
      { property: "og:description", content: "Season rankings, win/loss records and K.O. rates for APEX humanoid fighters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HallOfFame,
});

function HallOfFame() {
  const champ = leaderboard[0]!;
  const mostKos = [...leaderboard].sort((a, b) => b.kos - a.kos)[0]!;
  const bestRate = [...leaderboard].sort((a, b) => koPercent(b.wins, b.kos) - koPercent(a.wins, a.kos))[0]!;

  const cards = [
    { icon: Trophy, label: "Season Champion", name: champ.name, value: `${champ.wins}-${champ.losses}`, unit: "Record" },
    { icon: Zap, label: "Most K.O.s", name: mostKos.name, value: String(mostKos.kos), unit: "Knockouts" },
    { icon: Target, label: "Best K.O. Rate", name: bestRate.name, value: `${koPercent(bestRate.wins, bestRate.kos)}%`, unit: "K.O. %" },
  ];

  return (
    <SiteLayout>
      <PageTitle eyebrow="Season 3 · 2026" title="Hall of Fame" sub="Official APEX rankings. K.O. % is knockout wins divided by total wins." />

      {/* Stat cards */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.label} className="border border-border bg-card p-6 transition-colors hover:border-accent">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary"><c.icon className="h-4 w-4" /> {c.label}</div>
              <div className="mt-3 font-display text-4xl font-bold uppercase">{c.name}</div>
              <div className="mt-4 flex items-end gap-2 border-t border-border pt-4">
                <span className="font-display text-7xl font-bold text-primary">{c.value}</span>
                <span className="pb-2 font-tech text-xs uppercase tracking-widest text-muted-foreground">{c.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rankings table */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-4 font-display text-5xl font-bold uppercase">Season Rankings</h2>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-card font-tech text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Robot</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3 text-right">W</th>
                <th className="px-4 py-3 text-right">L</th>
                <th className="px-4 py-3 text-right">K.O.</th>
                <th className="px-4 py-3 text-right">K.O. %</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((r) => (
                <tr key={r.unit} className="border-t border-border transition-colors hover:bg-card">
                  <td className={`px-4 py-3 font-display text-3xl font-bold ${r.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>{r.rank}</td>
                  <td className="px-4 py-3">
                    <div className="font-display text-2xl font-semibold uppercase">{r.name}</div>
                    <div className="font-tech text-xs text-muted-foreground">{r.unit}</div>
                  </td>
                  <td className="px-4 py-3 text-sm uppercase tracking-wider text-muted-foreground">{r.cls}</td>
                  <td className="px-4 py-3 text-right font-display text-2xl">{r.wins}</td>
                  <td className="px-4 py-3 text-right font-display text-2xl text-muted-foreground">{r.losses}</td>
                  <td className="px-4 py-3 text-right font-display text-2xl">{r.kos}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-block min-w-14 border border-accent px-2 py-0.5 text-center font-display text-2xl text-primary">{koPercent(r.wins, r.kos)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteLayout>
  );
}
