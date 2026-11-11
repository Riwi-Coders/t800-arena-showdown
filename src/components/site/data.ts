import hero from "@/assets/hero-robot.jpg";
import titan from "@/assets/fighter-titan.jpg";
import falcon from "@/assets/fighter-falcon.jpg";

export const fighters = [
  { name: "White Eagle", unit: "T800-WE01", cls: "Heavyweight", img: hero, record: "14-1-0", weight: 78, torque: 450, velocity: 9.4, kos: 11, style: "Counter-striker", actuator: "Planetary BLDC + harmonic drive", dof: 31 },
  { name: "Steel Titan", unit: "T800-ST03", cls: "Super Heavyweight", img: titan, record: "12-2-0", weight: 92, torque: 520, velocity: 8.1, kos: 10, style: "Pressure brawler", actuator: "Hydraulic linear (hip/knee)", dof: 29 },
  { name: "Red Falcon", unit: "T800-RF07", cls: "Middleweight", img: falcon, record: "9-0-0", weight: 64, torque: 380, velocity: 10.6, kos: 6, style: "Kick specialist", actuator: "Quasi-direct drive BLDC", dof: 33 },
];
export type Fighter = (typeof fighters)[number];

export const partners = ["EngineAI", "Servotek", "Kinetik", "ArenaOne", "Voltra", "Torqline", "Hexacore", "Ironpulse"];

// Season leaderboard. KO % = KO wins / total wins.
export const leaderboard = [
  { rank: 1, name: "White Eagle", unit: "T800-WE01", cls: "Heavyweight", wins: 14, losses: 1, kos: 11 },
  { rank: 2, name: "Red Falcon", unit: "T800-RF07", cls: "Middleweight", wins: 9, losses: 0, kos: 6 },
  { rank: 3, name: "Steel Titan", unit: "T800-ST03", cls: "Super Heavyweight", wins: 12, losses: 2, kos: 10 },
  { rank: 4, name: "Iron Wraith", unit: "T800-IW02", cls: "Heavyweight", wins: 10, losses: 4, kos: 7 },
  { rank: 5, name: "Black Kestrel", unit: "T800-BK05", cls: "Middleweight", wins: 8, losses: 3, kos: 4 },
  { rank: 6, name: "Volt Ronin", unit: "T800-VR09", cls: "Lightweight", wins: 7, losses: 3, kos: 3 },
  { rank: 7, name: "Granite Ox", unit: "T800-GO04", cls: "Super Heavyweight", wins: 6, losses: 5, kos: 5 },
  { rank: 8, name: "Silver Mantis", unit: "T800-SM11", cls: "Lightweight", wins: 5, losses: 4, kos: 2 },
];

export function koPercent(wins: number, kos: number) {
  return wins === 0 ? 0 : Math.round((kos / wins) * 100);
}
