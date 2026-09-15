import React, { useState, useEffect, useRef, useMemo } from "react";

/**
 * ATSS — Service Capability Radar
 * React + Tailwind port of the original static HTML/SVG/vanilla-JS component.
 *
 * DATA SOURCE: recalculated from the "Project Submission" tracker (307 total
 * tracked entries). Each service's percentage is its actual share of all
 * rows in the tracker, not an estimate. "New Tower Drawing" was dropped
 * because it has zero occurrences in the source data. Stats (project count,
 * states served, clients) were derived the same way — states from the
 * 2-letter prefixes on project IDs, clients from the "Company Name" column.
 */

type ServiceDatum = {
  name: string;
  pct: number;
  count: number;
  desc: string;
};

type StatDatum = {
  num: string;
  label: string;
};

const TOTAL_PROJECTS = 307;

const DATA: ServiceDatum[] = [
  { name: "Structural Analysis", pct: 64.2, count: 197, desc: "Passing SA, Mod SA, Failing SA and Rerun SA combined — the core SA workload across new reviews, modifications, and re-analysis (159 Passing, 17 Mod, 16 Failing, 5 Rerun)." },
  { name: "SA Review", pct: 20.8, count: 64, desc: "Comprehensive structural analysis review across all governing load cases." },
  { name: "Mod Drawing", pct: 5.5, count: 17, desc: "Reinforcement and modification drawing packages." },
  { name: "Preliminary Design", pct: 4.2, count: 13, desc: "Early-stage design packages for new build and co-location, mostly Almvoy sites." },
  { name: "Closeout Report", pct: 1.6, count: 5, desc: "Post-construction closeout documentation and verification." },
  { name: "Tower Inspection Report", pct: 1.6, count: 5, desc: "Field inspection and condition assessment reporting." },
  { name: "Mount Analysis", pct: 1.3, count: 4, desc: "Structural analysis of antenna mount systems." },
  { name: "New Design", pct: 0.3, count: 1, desc: "Full engineering design package for a new tower structure." },
  { name: "Fatigue Analysis", pct: 0.3, count: 1, desc: "Fatigue and fitness-for-service evaluation under cyclic loads (natural wind and galloping)." },
];

const STATS: StatDatum[] = [
  { num: String(TOTAL_PROJECTS), label: "PROJECTS TRACKED" },
  { num: "20", label: "STATES SERVED" },
  { num: "5", label: "CLIENTS" },
];

const CX = 280;
const CY = 280;
const MAX_R = 190;
const MAX_VAL = 70; // scale ceiling — widened so combined Structural Analysis (64.2%) still fits inside the ring
const N = DATA.length;
const LABEL_RATIO = 1.2;

function pointAt(i: number, valueRatio: number): [number, number] {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const r = MAX_R * valueRatio;
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

// Break a label into at most two lines, split near the midpoint on a word
// boundary, so long service names don't overrun their slot on a 12-axis chart.
function splitLabel(name: string): string[] {
  const words = name.split(" ");
  if (words.length <= 1) return [name];
  let bestIdx = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length;
    const b = words.slice(i).join(" ").length;
    const diff = Math.abs(a - b);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIdx = i;
    }
  }
  return [words.slice(0, bestIdx).join(" "), words.slice(bestIdx).join(" ")];
}

export default function ServiceCapabilityRadar() {
  const [progress, setProgress] = useState<number>(0); // eased 0 -> 1 draw-in
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    function animate(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / 900, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current as number);
  }, []);

  const ringPolygons = useMemo(
    () =>
      [0.25, 0.5, 0.75, 1].map((ratio) => {
        const pts: string[] = [];
        for (let i = 0; i < N; i++) pts.push(pointAt(i, ratio).join(","));
        return pts.join(" ");
      }),
    []
  );

  const axes = useMemo(
    () =>
      DATA.map((d, i) => {
        const [x, y] = pointAt(i, 1);
        const [lx, ly] = pointAt(i, LABEL_RATIO);
        return { ...d, x, y, lx, ly, lines: splitLabel(d.name) };
      }),
    []
  );

  const { dataPoints, vertexPoints } = useMemo(() => {
    const pts: string[] = [];
    const verts: { x: number; y: number }[] = [];
    DATA.forEach((d, i) => {
      const ratio = (d.pct / MAX_VAL) * progress;
      const [x, y] = pointAt(i, ratio);
      pts.push(`${x},${y}`);
      verts.push({ x, y });
    });
    return { dataPoints: pts.join(" "), vertexPoints: verts };
  }, [progress]);

  const toggleActive = (i: number) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div
      className="min-h-screen px-6 py-20 text-[#f2f4f8]"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background:
          "radial-gradient(ellipse 900px 500px at 15% 0%, rgba(214,171,92,0.06), transparent 60%), linear-gradient(180deg, #060b18 0%, #0b1f3a 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');
        .radar-vertex { transition: r .25s ease, fill .25s ease; }
        .radar-axis-label { transition: fill .25s ease, font-weight .25s ease; }
        .radar-desc { transition: max-height .3s ease, opacity .25s ease, margin-top .3s ease; }
      `}</style>

      <div className="mx-auto max-w-[1320px]">
        {/* Eyebrow */}
        <div className="mb-[18px] flex items-center gap-[10px] text-xs font-semibold tracking-[0.14em] text-[#d6ab5c]">
          <span className="inline-block h-px w-5 bg-[rgba(214,171,92,0.55)]" />
          SERVICE DEPTH — ACTUAL PROJECT DATA
        </div>

        {/* Heading */}
        <h1 className="mb-5 max-w-[640px] text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.22] tracking-[-0.01em]">
          The full range of our{" "}
          <em
            className="not-italic text-[#d6ab5c]"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 500 }}
          >
            structural engineering
          </em>{" "}
          capability
        </h1>

        <p className="mb-14 max-w-[560px] text-[15.5px] leading-[1.65] text-[#8996ab]">
          Based on {TOTAL_PROJECTS} tracked project entries, this shows where ATSS&rsquo;s
          engineering hours actually go — across analysis, design, inspection
          and reporting disciplines built for tower infrastructure. Passing SA
          and SA Review together account for roughly 73% of all work.
        </p>

        {/* Panel */}
        <div
          className="relative border border-[rgba(255,255,255,0.08)] p-[44px_20px_36px] [border-radius:2px]"
          style={{
            background: "linear-gradient(160deg, #0a1830, rgba(10,24,48,0.4))",
          }}
        >
          {/* corner brackets */}
          <div className="pointer-events-none absolute left-0 top-0 h-[34px] w-[34px] border-l border-t border-[rgba(214,171,92,0.55)]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-[34px] w-[34px] border-b border-r border-[rgba(214,171,92,0.55)]" />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[640px_1fr]">
            {/* Chart */}
            <div className="relative">
              <svg viewBox="0 0 560 560" className="block h-auto w-full overflow-visible">
                <rect x="0" y="0" width="560" height="560" fill="#ffffff" />

                {/* grid rings */}
                  {ringPolygons.map((points, idx) => (
                    <polygon
                      key={idx}
                      points={points}
                      fill="none"
                      stroke="rgba(15,23,42,0.12)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* axis lines */}
                  {axes.map((a, i) => (
                    <line
                      key={i}
                      x1={CX}
                      y1={CY}
                      x2={a.x}
                      y2={a.y}
                      stroke="rgba(15,23,42,0.12)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* axis labels (up to two lines each) */}
                  {axes.map((a, i) => (
                    <text
                      key={i}
                      x={a.lx}
                      y={a.ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="radar-axis-label"
                      fontSize="9.5"
                      fontWeight="600"
                      letterSpacing="0.01em"
                      fill={activeIndex === i ? "#b8863f" : "#5b6472"}
                    >
                      {a.lines.map((line, li) => (
                        <tspan
                          key={li}
                          x={a.lx}
                          dy={li === 0 ? (a.lines.length > 1 ? "-0.35em" : "0") : "1.15em"}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  ))}

                  {/* data polygon */}
                  <polygon
                    points={dataPoints}
                    fill="#d6ab5c"
                    fillOpacity="0.16"
                    stroke="#b8863f"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* vertices */}
                  {vertexPoints.map((v, i) => {
                    const isActive = activeIndex === i;
                    return (
                      <circle
                        key={i}
                        className="radar-vertex"
                        cx={v.x}
                        cy={v.y}
                        r={isActive ? 6 : 3.5}
                        fill={isActive ? "#b8863f" : "#ffffff"}
                        stroke="#b8863f"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </svg>
              <div className="mt-[22px] text-center text-[10.5px] font-semibold tracking-[0.14em] text-[#5c6980]">
                RELATIVE SHARE ACROSS CORE SERVICE LINES ({TOTAL_PROJECTS} TRACKED PROJECTS)
              </div>
            </div>

            {/* Legend */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {DATA.map((d, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <div
                      key={d.name}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() =>
                        setActiveIndex((prev) => (prev === i ? null : prev))
                      }
                      onClick={() => toggleActive(i)}
                      className={`flex cursor-pointer items-start gap-[14px] border-t border-[rgba(255,255,255,0.08)] px-[6px] py-[15px] transition-colors duration-200 sm:odd:pr-4 sm:even:pl-4 ${
                        isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <div
                        className="mt-[3px] h-[15px] w-[15px] flex-shrink-0 rounded-full border-[1.5px] transition-all duration-200"
                        style={
                          isActive
                            ? {
                                background: "#d6ab5c",
                                borderColor: "#d6ab5c",
                                boxShadow: "0 0 0 3px rgba(214,171,92,0.16)",
                              }
                            : { borderColor: "#5c6980" }
                        }
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <div
                            className="text-[14px] font-semibold leading-snug transition-colors duration-200"
                            style={{ color: isActive ? "#d6ab5c" : "#f2f4f8" }}
                          >
                            {d.name}
                          </div>
                          <div
                            className="shrink-0 text-[13px] font-semibold [font-variant-numeric:tabular-nums]"
                            style={{ color: isActive ? "#d6ab5c" : "#8996ab" }}
                          >
                            {d.pct}%
                          </div>
                        </div>
                        <div
                          className="radar-desc overflow-hidden text-[12.5px] leading-[1.5] text-[#8996ab]"
                          style={
                            isActive
                              ? { maxHeight: 72, opacity: 1, marginTop: 6 }
                              : { maxHeight: 0, opacity: 0 }
                          }
                        >
                          {d.desc} ({d.count} of {TOTAL_PROJECTS} entries)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-b border-[rgba(255,255,255,0.08)]" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 gap-px border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)] sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#060b18] px-6 py-[26px]">
              <div className="text-[28px] font-bold tracking-[-0.01em] text-[#f2f4f8]">
                {s.num}
              </div>
              <div className="mt-[6px] text-[11px] font-semibold tracking-[0.1em] text-[#5c6980]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
