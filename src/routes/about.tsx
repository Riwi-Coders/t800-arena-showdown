import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, ShieldCheck, Flag } from "lucide-react";
import { SiteLayout, PageTitle } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the League — APEX Combat League" },
      { name: "description", content: "The origin of APEX, the EngineAI T800 humanoid chassis, and the safety rules behind every humanoid robot fight." },
      { property: "og:title", content: "About the League — APEX" },
      { property: "og:description", content: "Origin story, T800 chassis technology and tournament safety rules of the APEX humanoid combat league." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const chassis: [string, string][] = [
  ["Height", "1.72 m"],
  ["Weight range", "64 – 92 kg"],
  ["Peak joint torque", "Up to 520 Nm"],
  ["Degrees of freedom", "29 – 33 DoF"],
  ["Shell", "Matte polymer composite"],
  ["Control loop", "1 kHz whole-body"],
];

const rules = [
  "Every unit passes a 48-hour technical inspection and torque calibration before fight night.",
  "Remote pilots operate from a sealed booth. No humans inside the octagon while units are live.",
  "Hardware kill switch on every chassis, plus a referee-controlled arena-wide stop.",
  "Strikes are capped at the certified torque limit for each weight class.",
  "A K.O. is declared when a unit cannot return to guard stance within 10 seconds.",
  "Battery packs sit in fire-rated housings; a fire crew is stationed ringside.",
];

function About() {
  return (
    <SiteLayout>
      <PageTitle eyebrow="About the League" title="Built to Fight" sub="APEX is a professional combat league for full-size humanoid robots, engineered for real impact and run like a real sport." />

      {/* Origin */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <div className="grid h-12 w-12 place-items-center border border-accent text-primary"><Flag className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-5xl font-bold uppercase">Origin</h2>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
              APEX started in 2024 as a test bench: engineers pushing EngineAI T800 humanoids to their limits in sparring sessions.
              The footage drew crowds, so in 2025 the sessions became a league with weight classes, rankings and a full fight calendar.
              Today APEX runs a three-season tour with live broadcasts and drive-in screenings presented by Monster's Cinema.
            </p>
          </div>
        </div>
      </section>

      {/* Chassis */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-center gap-3"><Cpu className="h-5 w-5 text-primary" /><h2 className="font-display text-5xl font-bold uppercase">T800 Chassis Technology</h2></div>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Every APEX athlete runs on the same T800 humanoid platform: a matte white shell over exposed metal actuators,
            balanced by a whole-body controller that keeps the unit upright under full-power strikes.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-px bg-border md:grid-cols-3">
            {chassis.map(([k, v]) => (
              <div key={k} className="bg-card p-5">
                <div className="font-tech text-xs uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="mt-1 font-display text-4xl font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety rules */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-primary" /><h2 className="font-display text-5xl font-bold uppercase">Tournament Safety Rules</h2></div>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {rules.map((r, i) => (
              <li key={i} className="flex gap-4 border border-border bg-card p-5">
                <span className="font-display text-4xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted-foreground">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sponsor */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-6 border border-accent bg-card p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Presenting Sponsor</div>
              <div className="font-display text-6xl font-bold uppercase">Monster's Cinema</div>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Official host of APEX Arena 01 at the Monster's Cinema Drive-In Grounds, with live big-screen screenings of every main event.
              </p>
            </div>
            <Link to="/events" className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-6 font-display text-2xl uppercase text-primary-foreground hover:bg-accent">See Events</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
