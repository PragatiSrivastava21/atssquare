import { useState, useMemo } from "react";
import type { CSSProperties } from "react";

/**
 * ServicesTower — interactive telecom-tower services section (TypeScript).
 * Hover / tap / keyboard-select a service: that section of the tower lights up
 * and the detail panel updates.
 *
 * EDIT the SERVICES array below with your real services (title, blurb, tags).
 * Each `id` maps to a tower zone (mounts, inspection, fea, structural, foundation).
 */

type ZoneId = "mounts" | "inspection" | "fea" | "structural" | "foundation";
type TowerZone = Exclude<ZoneId, "foundation">;

interface Service {
  id: ZoneId;
  title: string;
  zoneLabel: string;
  blurb: string;
  tags: string[];
}

interface Member {
  zone: TowerZone;
  d: string;
  leg?: boolean;
  horiz?: boolean;
}

interface TowerNode {
  zone: TowerZone;
  x: number;
  y: number;
}

const SERVICES: Service[] = [
  {
    id: "mounts",
    title: "Antenna mounting & retrofit",
    zoneLabel: "Antenna level",
    blurb:
      "Add or swap antennas, dishes and platforms on existing towers, with the structure checked before anything is installed.",
    tags: ["Loading checks", "Upgrade design", "Mount design"],
  },
  {
    id: "inspection",
    title: "AI-driven inspection",
    zoneLabel: "Survey level",
    blurb:
      "Drone and photo surveys that automatically flag corrosion, loose bolts and bent members, so crews climb only where it matters.",
    tags: ["Drone survey", "Defect detection", "Condition reports"],
  },
  {
    id: "fea",
    title: "FEA simulation",
    zoneLabel: "Stress zone",
    blurb:
      "Detailed finite element models that show where a tower is stressed under wind, ice and equipment loads.",
    tags: ["Wind and ice loads", "Stress mapping", "Failure checks"],
  },
  {
    id: "structural",
    title: "Structural analysis & design",
    zoneLabel: "Load path",
    blurb:
      "Full analysis and design of new and existing towers to the applicable standards, with clear, reviewable reports.",
    tags: ["Standards compliance", "New tower design", "Capacity reports"],
  },
  {
    id: "foundation",
    title: "Foundation assessment",
    zoneLabel: "Base & ground",
    blurb:
      "Check that the base and soil can carry the tower, before and after any change in load.",
    tags: ["Base reactions", "Soil review", "Reinforcement advice"],
  },
];

/* ---------- tower geometry (built once) ---------- */
const CX = 150;
const TOP = 40;
const BOTTOM = 470;
const PANELS = 12;
const halfWidth = (y: number): number =>
  10 + ((y - TOP) / (BOTTOM - TOP)) * 76;
const legL = (y: number): number => CX - halfWidth(y);
const legR = (y: number): number => CX + halfWidth(y);

// vertical extent of each zone on the tower
const ZONES: Record<ZoneId, [number, number]> = {
  mounts: [TOP, 130],
  inspection: [130, 215],
  fea: [215, 345],
  structural: [345, BOTTOM],
  foundation: [BOTTOM, 512],
};
const PLATFORMS: { y: number; zone: TowerZone }[] = [
  { y: 130, zone: "mounts" },
  { y: 215, zone: "inspection" },
  { y: 345, zone: "fea" },
];

function zoneForY(y: number): TowerZone {
  if (y < 130) return "mounts";
  if (y < 215) return "inspection";
  if (y < 345) return "fea";
  return "structural";
}

function buildTower(): { members: Member[]; nodes: TowerNode[]; outline: string } {
  const step = (BOTTOM - TOP) / PANELS;
  const members: Member[] = [];
  const nodes: TowerNode[] = [];
  for (let i = 0; i < PANELS; i++) {
    const y0 = TOP + i * step;
    const y1 = y0 + step;
    const w0 = halfWidth(y0);
    const w1 = halfWidth(y1);
    const zone = zoneForY((y0 + y1) / 2);
    members.push(
      { zone, d: `M${CX - w0} ${y0} L${CX - w1} ${y1}`, leg: true },
      { zone, d: `M${CX + w0} ${y0} L${CX + w1} ${y1}`, leg: true },
      { zone, d: `M${CX - w1} ${y1} L${CX + w1} ${y1}`, horiz: true },
      { zone, d: `M${CX - w0} ${y0} L${CX + w1} ${y1}` },
      { zone, d: `M${CX + w0} ${y0} L${CX - w1} ${y1}` }
    );
    nodes.push({ zone, x: CX - w1, y: y1 }, { zone, x: CX + w1, y: y1 });
  }
  const outline = `${CX - halfWidth(TOP)},${TOP} ${CX + halfWidth(TOP)},${TOP} ${
    CX + halfWidth(BOTTOM)
  },${BOTTOM} ${CX - halfWidth(BOTTOM)},${BOTTOM}`;
  return { members, nodes, outline };
}

export default function ServicesTower() {
  const [active, setActive] = useState<ZoneId>(SERVICES[0].id);
  const { members, nodes, outline } = useMemo(buildTower, []);
  const idx = SERVICES.findIndex((s) => s.id === active);
  const current = SERVICES[idx];
  const on = (z: ZoneId): string => (z === active ? " is-on" : "");

  return (
    <section className="st-root" aria-labelledby="st-heading">
      <style>{CSS}</style>

      <div className="st-head">
        <span className="st-eyebrow">Our services</span>
        <h2 id="st-heading">What we do for your towers</h2>
        <p>Pick a service to see which part of the tower it looks after.</p>
      </div>

      <div className="st-grid">
        {/* ---------- left: service list ---------- */}
        <ul className="st-list">
          {SERVICES.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={"st-item" + (s.id === active ? " is-active" : "")}
                aria-pressed={s.id === active}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive(s.id)}
              >
                <span className="st-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="st-item-title">{s.title}</span>
                <span className="st-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* ---------- centre: tower ---------- */}
        <div className="st-stage">
          <svg
            className="st-tower"
            viewBox="0 0 300 540"
            role="img"
            aria-label={`Telecom tower with the ${current.title} section highlighted`}
          >
            <defs>
              <clipPath id="st-clip">
                <polygon points={outline} />
              </clipPath>

              {/* steel gradient along the height of the tower */}
              <linearGradient
                id="st-steel"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="40"
                x2="0"
                y2="470"
              >
                <stop offset="0" stopColor="#6670C0" />
                <stop offset="1" stopColor="#2F3680" />
              </linearGradient>

              {/* soft body fill that gives the lattice some volume */}
              <linearGradient id="st-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7C3AED" stopOpacity="0.02" />
                <stop offset="1" stopColor="#7C3AED" stopOpacity="0.10" />
              </linearGradient>

              {/* active-zone band */}
              <linearGradient id="st-band" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#06B6D4" stopOpacity="0" />
                <stop offset="0.5" stopColor="#06B6D4" stopOpacity="0.16" />
                <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
              </linearGradient>

              {/* stress heat */}
              <linearGradient id="st-heat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#06B6D4" stopOpacity="0" />
                <stop offset="0.3" stopColor="#FBBF24" stopOpacity="0.6" />
                <stop offset="0.7" stopColor="#F43F5E" stopOpacity="0.6" />
                <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.25" />
              </linearGradient>

              {/* scan trail */}
              <linearGradient id="st-trail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#06B6D4" stopOpacity="0" />
                <stop offset="1" stopColor="#06B6D4" stopOpacity="0.35" />
              </linearGradient>

              {/* ground */}
              <pattern
                id="st-hatch"
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="7" stroke="#C3C8EC" strokeWidth="1" />
              </pattern>
              <linearGradient id="st-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F7F5FF" stopOpacity="0" />
                <stop offset="1" stopColor="#F7F5FF" stopOpacity="1" />
              </linearGradient>
              <radialGradient id="st-beacon" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#F43F5E" stopOpacity="0.9" />
                <stop offset="1" stopColor="#F43F5E" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ===== zone highlight bands ===== */}
            {(Object.entries(ZONES) as [ZoneId, [number, number]][]).map(
              ([z, [y0, y1]]) => (
                <rect
                  key={z}
                  className={"st-band" + on(z)}
                  x="14"
                  y={y0}
                  width="272"
                  height={y1 - y0}
                  fill="url(#st-band)"
                />
              )
            )}

            {/* ===== tower body ===== */}
            <polygon points={outline} fill="url(#st-body)" />

            {/* lattice members */}
            {members.map((m, i) => (
              <path
                key={i}
                d={m.d}
                className={
                  "st-member" +
                  (m.leg ? " is-leg" : m.horiz ? " is-horiz" : "") +
                  on(m.zone)
                }
                onMouseEnter={() => setActive(m.zone)}
                onClick={() => setActive(m.zone)}
              />
            ))}

            {/* joint nodes */}
            {nodes.map((n, i) => (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r="1.9"
                className={"st-node" + on(n.zone)}
              />
            ))}

            {/* work platforms with railings */}
            {PLATFORMS.map((p) => {
              const w = halfWidth(p.y) + 9;
              return (
                <g key={p.y} className={"st-platform" + on(p.zone)}>
                  <line x1={CX - w} x2={CX + w} y1={p.y} y2={p.y} className="st-deck" />
                  <line x1={CX - w} x2={CX + w} y1={p.y - 6} y2={p.y - 6} className="st-rail" />
                  <line x1={CX - w} x2={CX - w} y1={p.y - 6} y2={p.y} className="st-rail" />
                  <line x1={CX + w} x2={CX + w} y1={p.y - 6} y2={p.y} className="st-rail" />
                </g>
              );
            })}

            {/* ===== mounts: lightning rod, beacon, panel antennas, dishes ===== */}
            <g className={"st-fx st-mounts" + on("mounts")}>
              {/* rod + beacon */}
              <line x1="150" y1="40" x2="150" y2="14" />
              <circle cx="150" cy="11" r="2.6" className="st-beacon-core" />
              <circle cx="150" cy="11" r="11" className="st-beacon-glow" />

              {/* headframe */}
              <line x1="118" y1="56" x2="182" y2="56" className="st-deck" />
              <line x1="150" y1="40" x2="124" y2="56" />
              <line x1="150" y1="40" x2="176" y2="56" />

              {/* panel antennas */}
              <rect x="112" y="56" width="8" height="30" rx="2" />
              <rect x="146" y="56" width="8" height="30" rx="2" />
              <rect x="180" y="56" width="8" height="30" rx="2" />

              {/* right dish */}
              <line x1={legR(100)} y1="100" x2="186" y2="100" />
              <path d="M186 88 Q202 100 186 112" />
              <line x1="194" y1="100" x2="204" y2="100" />
              <circle cx="205" cy="100" r="1.8" className="st-solid" />

              {/* left dish */}
              <line x1={legL(114)} y1="114" x2="112" y2="114" />
              <path d="M112 104 Q98 114 112 124" />
              <line x1="105" y1="114" x2="97" y2="114" />
              <circle cx="96" cy="114" r="1.8" className="st-solid" />
            </g>

            {/* ===== inspection: drone, scan sweep, defect markers ===== */}
            <g className={"st-fx st-drone" + on("inspection")}>
              <g className="st-drone-body" transform="translate(238 172)">
                <rect x="-10" y="-3" width="20" height="7" rx="3.5" className="st-solid-fill" />
                <line x1="-16" y1="-7" x2="-5" y2="-7" />
                <line x1="5" y1="-7" x2="16" y2="-7" />
                <line x1="-9" y1="-3" x2="-12" y2="-7" />
                <line x1="9" y1="-3" x2="12" y2="-7" />
                <path d="M-6 6 L-34 20 M6 6 L-18 26" className="st-beam" />
              </g>

              <g clipPath="url(#st-clip)">
                <g className="st-scan">
                  <rect x="20" y="130" width="260" height="22" fill="url(#st-trail)" stroke="none" />
                  <line x1="20" x2="280" y1="152" y2="152" className="st-scan-line" />
                </g>
              </g>

              {[158, 182, 203].map((y, i) => {
                const x = i === 1 ? legR(y) : legL(y);
                const delay: CSSProperties = { animationDelay: `${i * 0.5}s` };
                return (
                  <g key={y} className="st-defect" style={delay}>
                    <circle cx={x} cy={y} r="3.2" className="st-defect-dot" />
                    <circle cx={x} cy={y} r="7" className="st-defect-ring" />
                  </g>
                );
              })}
            </g>

            {/* ===== fea: stress heat + wind loading ===== */}
            <g clipPath="url(#st-clip)">
              <rect
                x="40"
                y="215"
                width="220"
                height="130"
                fill="url(#st-heat)"
                className={"st-heat" + on("fea")}
              />
            </g>
            <g className={"st-wind" + on("fea")}>
              {[240, 280, 320].map((y, i) => (
                <g key={y}>
                  <path
                    d={`M16 ${y} H${legL(y) - 12}`}
                    className="st-wind-line"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  />
                  <path
                    d={`M${legL(y) - 18} ${y - 4} L${legL(y) - 10} ${y} L${legL(y) - 18} ${y + 4}`}
                    className="st-wind-head"
                  />
                </g>
              ))}
            </g>

            {/* ===== foundation ===== */}
            <g
              className={"st-ground" + on("foundation")}
              onMouseEnter={() => setActive("foundation")}
              onClick={() => setActive("foundation")}
            >
              {/* soil */}
              <rect x="14" y="486" width="272" height="34" fill="url(#st-hatch)" className="st-hatch" />
              <rect x="14" y="486" width="272" height="34" fill="url(#st-fade)" />
              <line x1="14" y1="486" x2="286" y2="486" className="st-ground-line" />
              <path d="M14 502 Q80 497 150 502 T286 502" className="st-strata" />
              <path d="M14 516 Q90 511 150 516 T286 516" className="st-strata" />

              {/* pads + piles under each leg */}
              {[legL(BOTTOM), legR(BOTTOM)].map((x, i) => (
                <g key={i} className="st-pad">
                  <rect x={x - 19} y="470" width="38" height="16" rx="2" />
                  <path d={`M${x - 11} 486 v26 M${x} 486 v32 M${x + 11} 486 v26`} />
                </g>
              ))}
            </g>

            {/* ===== zone brackets (engineering-drawing style) ===== */}
            {SERVICES.map((s, i) => {
              const [y0, y1] = ZONES[s.id];
              const mid = (y0 + y1) / 2;
              return (
                <g key={s.id} className={"st-bracket" + on(s.id)}>
                  <path d={`M276 ${y0 + 3} h6 V${y1 - 3} h-6`} />
                  <text x="290" y={mid + 3} textAnchor="middle">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ---------- right: detail ---------- */}
        <div className="st-detail" aria-live="polite" key={current.id}>
          <div className="st-detail-top">
            <span className="st-detail-num">{String(idx + 1).padStart(2, "0")}</span>
            <span className="st-detail-zone">{current.zoneLabel}</span>
          </div>
          <h3>{current.title}</h3>
          <p>{current.blurb}</p>
          <ul className="st-tags">
            {current.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a className="st-cta" href="/contact">
            Discuss this service <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- styles (self-contained, no Tailwind needed) ---------- */
const CSS = `
.st-root{
  --bg:#FFFFFF;--bg2:#F3F0FF;--ink:#14173A;--mute:#5B6190;--line:#C9CDEB;--steel:#6670C0;
  --acc:#0891B2;--acc2:#7C3AED;--warn:#E11D48;
  position:relative;overflow:hidden;color:var(--ink);
  background:
    radial-gradient(700px 420px at 50% 45%,rgba(6,182,212,.12),transparent 70%),
    radial-gradient(600px 400px at 100% 0%,rgba(139,92,246,.16),transparent 65%),
    radial-gradient(600px 400px at 0% 100%,rgba(244,114,182,.12),transparent 65%),
    linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%);
  padding:clamp(40px,7vw,96px) clamp(16px,4vw,56px);
  font-family:inherit}

.st-head{max-width:1100px;margin:0 auto 44px;text-align:left}
.st-eyebrow{display:inline-block;font-size:.75rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
  color:var(--acc2);margin-bottom:12px;padding-left:34px;position:relative}
.st-eyebrow::before{content:"";position:absolute;left:0;top:50%;width:22px;height:1px;background:var(--acc2)}
.st-head h2{font-size:clamp(1.7rem,3.4vw,2.6rem);font-weight:650;letter-spacing:-.015em;margin:0 0 10px;line-height:1.15;
  background:linear-gradient(90deg,#14173A 25%,#6D28D9 65%,#DB2777);-webkit-background-clip:text;background-clip:text;color:transparent}
.st-head p{color:var(--mute);margin:0;max-width:52ch}

.st-grid{max-width:1100px;margin:0 auto;display:grid;gap:28px;align-items:center;grid-template-columns:1fr}
@media(min-width:900px){.st-grid{grid-template-columns:1fr minmax(260px,340px) 1fr;gap:36px}}

/* --- list --- */
.st-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
.st-item{all:unset;box-sizing:border-box;width:100%;display:flex;align-items:center;gap:14px;
  padding:15px 16px;border-radius:12px;cursor:pointer;color:var(--mute);
  border:1px solid transparent;position:relative;
  transition:color .2s,background .25s,border-color .25s,transform .25s,box-shadow .25s}
.st-item:hover{color:var(--ink);background:rgba(255,255,255,.7)}
.st-item:focus-visible{outline:2px solid var(--acc2);outline-offset:2px}
.st-idx{font-variant-numeric:tabular-nums;font-size:.78rem;letter-spacing:.08em;color:#B4B9E3;
  min-width:22px;transition:color .2s}
.st-item-title{flex:1;font-weight:500}
.st-arrow{opacity:0;transform:translateX(-6px);transition:opacity .25s,transform .25s;color:var(--acc2)}
.st-item.is-active{color:var(--ink);background:linear-gradient(90deg,#FFFFFF,rgba(255,255,255,.55));
  border-color:rgba(124,58,237,.28);transform:translateX(4px);
  box-shadow:0 10px 30px -14px rgba(91,60,200,.35)}
.st-item.is-active .st-idx{color:var(--acc2)}
.st-item.is-active .st-arrow{opacity:1;transform:none}
.st-item.is-active::before{content:"";position:absolute;left:-1px;top:14px;bottom:14px;width:3px;border-radius:3px;
  background:linear-gradient(180deg,#06B6D4,#8B5CF6);box-shadow:0 0 12px rgba(139,92,246,.45)}

/* --- stage --- */
.st-stage{position:relative;justify-self:center;width:100%;max-width:340px;order:-1}
@media(min-width:900px){.st-stage{order:0}}
.st-stage::before{content:"";position:absolute;inset:-10px -30px;pointer-events:none;
  background-image:linear-gradient(rgba(91,97,144,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(91,97,144,.10) 1px,transparent 1px);
  background-size:24px 24px;
  -webkit-mask-image:radial-gradient(closest-side,#000 30%,transparent 100%);
  mask-image:radial-gradient(closest-side,#000 30%,transparent 100%)}
.st-tower{position:relative;display:block;width:100%;height:auto;max-height:560px;overflow:visible}

.st-band{opacity:0;transition:opacity .4s}
.st-band.is-on{opacity:1}

.st-member{fill:none;stroke:url(#st-steel);stroke-width:1;stroke-linecap:round;cursor:pointer;opacity:.8;
  transition:stroke .3s,stroke-width .3s,opacity .3s,filter .3s}
.st-member.is-horiz{stroke-width:1.3}
.st-member.is-leg{stroke-width:2.4;opacity:1}
.st-member.is-on{stroke:var(--acc);opacity:1;stroke-width:1.6;filter:drop-shadow(0 0 3px rgba(6,182,212,.55))}
.st-member.is-leg.is-on{stroke-width:3}
.st-node{fill:var(--bg);stroke:var(--steel);stroke-width:1;transition:stroke .3s,fill .3s}
.st-node.is-on{stroke:var(--acc);fill:var(--acc)}

.st-platform line{stroke:var(--steel);stroke-linecap:round;transition:stroke .3s,filter .3s}
.st-deck{stroke-width:3}
.st-rail{stroke-width:1}
.st-platform.is-on line{stroke:var(--acc)}
.st-platform.is-on{filter:drop-shadow(0 0 3px rgba(6,182,212,.5))}

.st-fx{fill:none;stroke:var(--steel);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:stroke .3s,opacity .3s,filter .3s}
.st-fx rect{fill:var(--bg)}
.st-fx .st-deck{stroke-width:3}
.st-fx .st-solid{fill:var(--steel);stroke:none;transition:fill .3s}
.st-fx.is-on{stroke:var(--acc);filter:drop-shadow(0 0 3px rgba(6,182,212,.5))}
.st-fx.is-on .st-solid{fill:var(--acc)}

/* beacon (always on) */
.st-beacon-core{fill:var(--warn)!important;stroke:none!important}
.st-beacon-glow{fill:url(#st-beacon)!important;stroke:none!important;animation:st-pulse 2.6s ease-in-out infinite;transform-origin:150px 11px}
@keyframes st-pulse{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:1;transform:scale(1.15)}}

/* drone */
.st-drone{opacity:.45}
.st-drone.is-on{opacity:1}
.st-drone .st-solid-fill{fill:var(--bg)}
.st-drone-body{animation:st-hover 3s ease-in-out infinite}
@keyframes st-hover{0%,100%{transform:translate(238px,172px)}50%{transform:translate(238px,167px)}}
.st-beam{stroke-dasharray:3 3;opacity:0;stroke-width:1.2;transition:opacity .3s}
.st-drone.is-on .st-beam{opacity:.85}
.st-scan{opacity:0}
.st-scan-line{stroke:var(--acc);stroke-width:1.6}
.st-drone.is-on .st-scan{opacity:1;animation:st-scan 2.8s ease-in-out infinite}
@keyframes st-scan{0%,100%{transform:translateY(-20px)}50%{transform:translateY(60px)}}
.st-defect{opacity:0;transition:opacity .3s}
.st-drone.is-on .st-defect{opacity:1}
.st-defect-dot{fill:var(--warn)!important;stroke:none!important}
.st-defect-ring{fill:none;stroke:var(--warn)!important;stroke-width:1!important;transform-box:fill-box;transform-origin:center;
  animation:st-ping 1.8s ease-out infinite}
@keyframes st-ping{0%{transform:scale(.5);opacity:.9}100%{transform:scale(1.6);opacity:0}}

/* fea */
.st-heat{opacity:0;transition:opacity .45s}
.st-heat.is-on{opacity:1}
.st-wind{opacity:0;transition:opacity .35s}
.st-wind.is-on{opacity:1}
.st-wind-line{fill:none;stroke:var(--acc2);stroke-width:1.4;stroke-linecap:round;stroke-dasharray:6 6;animation:st-flow 1s linear infinite}
.st-wind-head{fill:none;stroke:var(--acc2);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round}
@keyframes st-flow{to{stroke-dashoffset:-12}}

/* foundation */
.st-ground{cursor:pointer}
.st-hatch{opacity:.6;transition:opacity .3s}
.st-ground-line{stroke:var(--steel);stroke-width:1.5;transition:stroke .3s}
.st-strata{fill:none;stroke:var(--line);stroke-width:1;stroke-dasharray:4 5;opacity:.8;transition:stroke .3s,opacity .3s}
.st-pad rect{fill:var(--bg);stroke:var(--steel);stroke-width:1.8;transition:stroke .3s}
.st-pad path{fill:none;stroke:var(--steel);stroke-width:2;stroke-linecap:round;transition:stroke .3s}
.st-ground.is-on .st-ground-line,
.st-ground.is-on .st-pad rect,
.st-ground.is-on .st-pad path{stroke:var(--acc)}
.st-ground.is-on .st-strata{stroke:var(--acc);opacity:1;animation:st-flow 2s linear infinite}
.st-ground.is-on .st-hatch{opacity:1}
.st-ground.is-on .st-pad{filter:drop-shadow(0 0 3px rgba(6,182,212,.5))}

/* zone brackets */
.st-bracket path{fill:none;stroke:#B4B9E3;stroke-width:1.2;stroke-linecap:round;transition:stroke .3s}
.st-bracket text{fill:#9AA0D0;font-size:9px;letter-spacing:.06em;font-variant-numeric:tabular-nums;transition:fill .3s}
.st-bracket.is-on path{stroke:var(--acc2)}
.st-bracket.is-on text{fill:var(--acc2)}

/* --- detail --- */
.st-detail{--navy:#0B1F4B;--navy2:#13306E;--gold:#FFC83D;
  animation:st-in .32s ease-out;padding:28px 28px 30px;border-radius:18px;position:relative;overflow:hidden;
  background:
    radial-gradient(260px 180px at 100% 0%,rgba(255,200,61,.14),transparent 70%),
    linear-gradient(160deg,var(--navy2) 0%,var(--navy) 70%);
  border:1px solid rgba(255,200,61,.22);
  box-shadow:0 26px 60px -22px rgba(11,31,75,.65),0 2px 6px rgba(11,31,75,.15)}
@keyframes st-in{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
.st-detail-top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.st-detail-num{font-size:.78rem;font-weight:700;letter-spacing:.08em;color:var(--navy);
  background:var(--gold);
  padding:3px 9px;border-radius:6px;font-variant-numeric:tabular-nums}
.st-detail-zone{font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:#A9B8DD}
.st-detail h3{font-size:1.4rem;font-weight:650;letter-spacing:-.01em;margin:0 0 10px;line-height:1.25;color:#FFFFFF}
.st-detail p{color:#C3CFEA;line-height:1.65;margin:0 0 18px;max-width:46ch}
.st-tags{list-style:none;margin:0 0 24px;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.st-tags li{font-size:.82rem;padding:5px 12px;border-radius:999px;border:1px solid rgba(255,200,61,.35);
  background:rgba(255,255,255,.06);color:#F3F6FF}
.st-cta{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:10px;
  background:var(--gold);color:var(--navy);
  font-weight:700;text-decoration:none;transition:filter .2s,transform .2s,box-shadow .2s;
  box-shadow:0 10px 26px -10px rgba(255,200,61,.65)}
.st-cta:hover{filter:brightness(1.07);transform:translateY(-1px)}
.st-cta:focus-visible{outline:2px solid #fff;outline-offset:2px}

@media(prefers-reduced-motion:reduce){
  .st-detail,.st-drone-body,.st-beacon-glow,.st-defect-ring,.st-wind-line,
  .st-drone.is-on .st-scan,.st-ground.is-on .st-strata{animation:none}
  .st-member,.st-item,.st-heat,.st-band,.st-fx,.st-arrow{transition:none}
}
`;
