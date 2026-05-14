import { useState, useRef, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────
interface WorkItem {
  label: string;
  pct: number;
  color: string;
}

interface Tower {
  id: number;
  state: string;
  cx: number;
  cy: number;
  name: string;
  location: string;
  height: string;
  year: number;
  team: number;
  duration: string;
  status: "completed" | "ongoing";
  work: WorkItem[];
}

// ── Data ───────────────────────────────────────────────────────────────────
const towers: Tower[] = [
  { id:1,  state:"Alabama",        cx:463, cy:300, name:"Tower Alpha",   location:"Birmingham, AL",   height:"180 m", year:2021, team:8,  duration:"6 wks",  status:"completed",
    work:[{label:"Structural",pct:38,color:"#185FA5"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Fatigue",pct:18,color:"#BA7517"},{label:"Antenna",pct:14,color:"#993C1D"},{label:"FEA/CFD",pct:8,color:"#534AB7"}] },
  { id:2,  state:"Connecticut",    cx:576, cy:144, name:"Tower Beta",    location:"Hartford, CT",     height:"215 m", year:2022, team:11, duration:"9 wks",  status:"completed",
    work:[{label:"Structural",pct:30,color:"#185FA5"},{label:"FEA/CFD",pct:28,color:"#534AB7"},{label:"Foundation",pct:20,color:"#1D9E75"},{label:"Antenna",pct:12,color:"#993C1D"},{label:"Fatigue",pct:10,color:"#BA7517"}] },
  { id:3,  state:"Georgia",        cx:490, cy:315, name:"Tower Gamma",   location:"Atlanta, GA",      height:"145 m", year:2023, team:6,  duration:"4 wks",  status:"ongoing",
    work:[{label:"Structural",pct:45,color:"#185FA5"},{label:"Antenna",pct:25,color:"#993C1D"},{label:"Foundation",pct:18,color:"#1D9E75"},{label:"Fatigue",pct:12,color:"#BA7517"}] },
  { id:4,  state:"Indiana",        cx:456, cy:218, name:"Tower Delta",   location:"Indianapolis, IN", height:"160 m", year:2022, team:9,  duration:"7 wks",  status:"completed",
    work:[{label:"Structural",pct:32,color:"#185FA5"},{label:"Foundation",pct:26,color:"#1D9E75"},{label:"FEA/CFD",pct:22,color:"#534AB7"},{label:"Antenna",pct:12,color:"#993C1D"},{label:"Fatigue",pct:8,color:"#BA7517"}] },
  { id:5,  state:"Iowa",           cx:399, cy:207, name:"Tower Epsilon", location:"Des Moines, IA",   height:"195 m", year:2023, team:13, duration:"11 wks", status:"ongoing",
    work:[{label:"FEA/CFD",pct:30,color:"#534AB7"},{label:"Structural",pct:28,color:"#185FA5"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Fatigue",pct:12,color:"#BA7517"},{label:"Antenna",pct:8,color:"#993C1D"}] },
  { id:6,  state:"Kentucky",       cx:466, cy:248, name:"Tower Zeta",    location:"Louisville, KY",   height:"170 m", year:2021, team:7,  duration:"5 wks",  status:"completed",
    work:[{label:"Structural",pct:40,color:"#185FA5"},{label:"Fatigue",pct:24,color:"#BA7517"},{label:"Antenna",pct:20,color:"#993C1D"},{label:"Foundation",pct:16,color:"#1D9E75"}] },
  { id:7,  state:"Maine",          cx:596, cy:112, name:"Tower Eta",     location:"Portland, ME",     height:"200 m", year:2024, team:10, duration:"8 wks",  status:"ongoing",
    work:[{label:"FEA/CFD",pct:35,color:"#534AB7"},{label:"Structural",pct:30,color:"#185FA5"},{label:"Foundation",pct:20,color:"#1D9E75"},{label:"Antenna",pct:15,color:"#993C1D"}] },
  { id:8,  state:"Maryland",       cx:548, cy:213, name:"Tower Theta",   location:"Baltimore, MD",    height:"155 m", year:2022, team:8,  duration:"6 wks",  status:"completed",
    work:[{label:"Structural",pct:35,color:"#185FA5"},{label:"Foundation",pct:25,color:"#1D9E75"},{label:"FEA/CFD",pct:20,color:"#534AB7"},{label:"Fatigue",pct:12,color:"#BA7517"},{label:"Antenna",pct:8,color:"#993C1D"}] },
  { id:9,  state:"Michigan",       cx:462, cy:178, name:"Tower Iota",    location:"Detroit, MI",      height:"188 m", year:2023, team:9,  duration:"7 wks",  status:"ongoing",
    work:[{label:"Structural",pct:33,color:"#185FA5"},{label:"FEA/CFD",pct:27,color:"#534AB7"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Antenna",pct:18,color:"#993C1D"}] },
  { id:10, state:"Minnesota",      cx:390, cy:155, name:"Tower Kappa",   location:"Minneapolis, MN",  height:"175 m", year:2021, team:10, duration:"8 wks",  status:"completed",
    work:[{label:"Structural",pct:38,color:"#185FA5"},{label:"Foundation",pct:24,color:"#1D9E75"},{label:"Fatigue",pct:20,color:"#BA7517"},{label:"Antenna",pct:18,color:"#993C1D"}] },
  { id:11, state:"Mississippi",    cx:445, cy:312, name:"Tower Lambda",  location:"Jackson, MS",      height:"162 m", year:2022, team:7,  duration:"5 wks",  status:"ongoing",
    work:[{label:"FEA/CFD",pct:32,color:"#534AB7"},{label:"Structural",pct:28,color:"#185FA5"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Fatigue",pct:18,color:"#BA7517"}] },
  { id:12, state:"Missouri",       cx:418, cy:248, name:"Tower Mu",      location:"St. Louis, MO",    height:"178 m", year:2023, team:11, duration:"9 wks",  status:"completed",
    work:[{label:"Structural",pct:36,color:"#185FA5"},{label:"Foundation",pct:26,color:"#1D9E75"},{label:"FEA/CFD",pct:20,color:"#534AB7"},{label:"Fatigue",pct:10,color:"#BA7517"},{label:"Antenna",pct:8,color:"#993C1D"}] },
  { id:13, state:"New Hampshire",  cx:582, cy:126, name:"Tower Nu",      location:"Manchester, NH",   height:"192 m", year:2024, team:8,  duration:"6 wks",  status:"ongoing",
    work:[{label:"Structural",pct:42,color:"#185FA5"},{label:"FEA/CFD",pct:28,color:"#534AB7"},{label:"Foundation",pct:18,color:"#1D9E75"},{label:"Antenna",pct:12,color:"#993C1D"}] },
  { id:14, state:"North Carolina", cx:524, cy:268, name:"Tower Xi",      location:"Charlotte, NC",    height:"168 m", year:2021, team:9,  duration:"7 wks",  status:"completed",
    work:[{label:"Structural",pct:34,color:"#185FA5"},{label:"Foundation",pct:24,color:"#1D9E75"},{label:"Fatigue",pct:22,color:"#BA7517"},{label:"FEA/CFD",pct:12,color:"#534AB7"},{label:"Antenna",pct:8,color:"#993C1D"}] },
  { id:15, state:"Ohio",           cx:490, cy:215, name:"Tower Omicron", location:"Columbus, OH",     height:"185 m", year:2022, team:10, duration:"8 wks",  status:"completed",
    work:[{label:"Structural",pct:36,color:"#185FA5"},{label:"FEA/CFD",pct:26,color:"#534AB7"},{label:"Foundation",pct:20,color:"#1D9E75"},{label:"Fatigue",pct:12,color:"#BA7517"},{label:"Antenna",pct:6,color:"#993C1D"}] },
  { id:16, state:"Oklahoma",       cx:380, cy:295, name:"Tower Pi",      location:"Oklahoma City, OK",height:"172 m", year:2023, team:8,  duration:"6 wks",  status:"ongoing",
    work:[{label:"FEA/CFD",pct:33,color:"#534AB7"},{label:"Structural",pct:29,color:"#185FA5"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Antenna",pct:16,color:"#993C1D"}] },
  { id:17, state:"South Carolina", cx:524, cy:284, name:"Tower Rho",     location:"Columbia, SC",     height:"158 m", year:2021, team:7,  duration:"5 wks",  status:"completed",
    work:[{label:"Structural",pct:40,color:"#185FA5"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Fatigue",pct:20,color:"#BA7517"},{label:"Antenna",pct:18,color:"#993C1D"}] },
  { id:18, state:"Tennessee",      cx:464, cy:268, name:"Tower Sigma",   location:"Nashville, TN",    height:"165 m", year:2022, team:9,  duration:"7 wks",  status:"ongoing",
    work:[{label:"Structural",pct:38,color:"#185FA5"},{label:"FEA/CFD",pct:25,color:"#534AB7"},{label:"Foundation",pct:20,color:"#1D9E75"},{label:"Fatigue",pct:17,color:"#BA7517"}] },
  { id:19, state:"Texas",          cx:350, cy:338, name:"Tower Tau",     location:"Dallas, TX",       height:"210 m", year:2023, team:14, duration:"12 wks", status:"ongoing",
    work:[{label:"Structural",pct:32,color:"#185FA5"},{label:"FEA/CFD",pct:28,color:"#534AB7"},{label:"Foundation",pct:20,color:"#1D9E75"},{label:"Fatigue",pct:12,color:"#BA7517"},{label:"Antenna",pct:8,color:"#993C1D"}] },
  { id:20, state:"Virginia",       cx:540, cy:234, name:"Tower Upsilon", location:"Richmond, VA",     height:"177 m", year:2021, team:8,  duration:"6 wks",  status:"completed",
    work:[{label:"Structural",pct:36,color:"#185FA5"},{label:"Foundation",pct:24,color:"#1D9E75"},{label:"FEA/CFD",pct:22,color:"#534AB7"},{label:"Fatigue",pct:12,color:"#BA7517"},{label:"Antenna",pct:6,color:"#993C1D"}] },
  { id:21, state:"West Virginia",  cx:518, cy:228, name:"Tower Phi",     location:"Charleston, WV",   height:"168 m", year:2022, team:7,  duration:"5 wks",  status:"completed",
    work:[{label:"Structural",pct:38,color:"#185FA5"},{label:"Foundation",pct:26,color:"#1D9E75"},{label:"Fatigue",pct:18,color:"#BA7517"},{label:"Antenna",pct:12,color:"#993C1D"},{label:"FEA/CFD",pct:6,color:"#534AB7"}] },
  { id:22, state:"Wisconsin",      cx:428, cy:174, name:"Tower Chi",     location:"Milwaukee, WI",    height:"183 m", year:2024, team:10, duration:"8 wks",  status:"ongoing",
    work:[{label:"FEA/CFD",pct:34,color:"#534AB7"},{label:"Structural",pct:28,color:"#185FA5"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Fatigue",pct:16,color:"#BA7517"}] },
  { id:23, state:"Florida",        cx:502, cy:360, name:"Tower Psi",     location:"Miami, FL",        height:"195 m", year:2023, team:13, duration:"11 wks", status:"ongoing",
    work:[{label:"FEA/CFD",pct:30,color:"#534AB7"},{label:"Structural",pct:28,color:"#185FA5"},{label:"Foundation",pct:22,color:"#1D9E75"},{label:"Fatigue",pct:12,color:"#BA7517"},{label:"Antenna",pct:8,color:"#993C1D"}] },
];

// ── State polygon paths (SVG viewBox 0 0 680 480) ─────────────────────────
const statePaths: Record<string, string> = {
  Alabama:          "M463,265 L480,265 L482,290 L484,330 L478,340 L460,338 L458,310 L460,285Z",
  Connecticut:      "M568,140 L582,137 L585,150 L570,152Z",
  Georgia:          "M476,280 L512,278 L516,296 L514,332 L490,336 L468,332 L465,310 L470,290Z",
  Indiana:          "M444,205 L472,203 L474,234 L460,237 L442,234Z",
  Iowa:             "M374,190 L424,188 L426,220 L376,222Z",
  Kentucky:         "M440,243 L502,239 L506,257 L465,262 L442,260Z",
  Maine:            "M582,94 L612,91 L616,130 L594,132 L580,118Z",
  Maryland:         "M534,204 L564,200 L567,217 L548,224 L532,220Z",
  Michigan:         "M440,158 L482,155 L486,194 L460,197 L438,192Z",
  Minnesota:        "M358,138 L422,136 L424,174 L360,176Z",
  Mississippi:      "M430,284 L464,282 L466,336 L446,340 L428,334Z",
  Missouri:         "M390,230 L450,226 L452,264 L392,268Z",
  "New Hampshire":  "M574,110 L594,108 L597,137 L576,138Z",
  "North Carolina": "M500,254 L564,250 L568,274 L502,280Z",
  Ohio:             "M470,196 L516,193 L518,230 L472,234Z",
  Oklahoma:         "M338,273 L422,270 L424,314 L340,316Z",
  "South Carolina": "M504,268 L544,266 L547,297 L506,300Z",
  Tennessee:        "M436,253 L512,249 L514,270 L438,274Z",
  Texas:            "M288,284 L402,280 L406,382 L290,384Z",
  Virginia:         "M508,216 L568,212 L570,244 L510,248Z",
  "West Virginia":  "M502,208 L534,206 L538,242 L504,246Z",
  Wisconsin:        "M400,153 L458,150 L460,190 L402,192Z",
  Florida:          "M460,328 L542,326 L547,362 L516,388 L490,390 L462,372Z",
};

// ── Global CSS ─────────────────────────────────────────────────────────────
const globalCSS = `
  @keyframes towerPulse {
    0%   { opacity: 0.7; transform: scale(1); }
    70%  { opacity: 0;   transform: scale(2.2); }
    100% { opacity: 0;   transform: scale(2.2); }
  }
  .pulse-ring {
    animation: towerPulse 2.2s ease-out infinite;
    transform-origin: center;
    transform-box: fill-box;
  }
  .state-path { transition: fill 0.15s; }
  .state-path:hover { filter: brightness(1.15); }
  .tower-pin { cursor: pointer; }
  .tower-pin .pin-circle { transition: filter 0.2s; }
  .tower-pin:hover .pin-circle { filter: brightness(1.25); }
  .tower-pin.active .pin-circle { filter: drop-shadow(0 0 5px rgba(10,22,64,0.6)); }
`;

// ── Map Background ─────────────────────────────────────────────────────────
function MapBackground() {
  const xs = Array.from({ length: Math.ceil(680 / 32) + 1 }, (_, i) => i * 32);
  const ys = Array.from({ length: Math.ceil(480 / 32) + 1 }, (_, i) => i * 32);
  return (
    <>
      <rect x={0} y={0} width={680} height={480} fill="#dce8f5" />
      {xs.map((x) => <line key={`x${x}`} x1={x} y1={0} x2={x} y2={480} stroke="rgba(10,22,64,0.04)" strokeWidth={1} />)}
      {ys.map((y) => <line key={`y${y}`} x1={0} y1={y} x2={680} y2={y} stroke="rgba(10,22,64,0.04)" strokeWidth={1} />)}
    </>
  );
}

// ── State Shapes ───────────────────────────────────────────────────────────
interface StateShapesProps {
  towerMap: Record<string, Tower>;
  selected: Tower | null;
  onSelect: (t: Tower) => void;
  onHover: (label: string | null, e?: React.MouseEvent) => void;
}

function StateShapes({ towerMap, selected, onSelect, onHover }: StateShapesProps) {
  return (
    <>
      {Object.entries(statePaths).map(([name, d]) => {
        const t = towerMap[name];
        if (!t) return null;
        const isOngoing = t.status === "ongoing";
        const isActive  = selected?.state === name;
        const fill       = isActive
          ? (isOngoing ? "rgba(186,117,23,0.32)" : "rgba(24,95,165,0.32)")
          : (isOngoing ? "rgba(186,117,23,0.18)" : "rgba(24,95,165,0.18)");
        const stroke     = isOngoing ? "#BA7517" : "#185FA5";
        const shortName  = name.length > 12 ? name.split(" ").map((w) => w[0]).join("") : name;

        return (
          <g key={name} style={{ cursor: "pointer" }}
            onClick={() => onSelect(t)}
            onMouseEnter={(e) => onHover(`${name} — ${t.location}`, e)}
            onMouseMove={(e)  => onHover(`${name} — ${t.location}`, e)}
            onMouseLeave={()  => onHover(null)}
          >
            <path className="state-path" d={d} fill={fill} stroke={stroke} strokeWidth={1.2} />
            <text
              x={t.cx} y={t.cy - 20}
              textAnchor="middle" fontSize={8} fontWeight={600}
              fill={isOngoing ? "#854F0B" : "#0C447C"}
              fontFamily="-apple-system, sans-serif"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {shortName}
            </text>
          </g>
        );
      })}
    </>
  );
}

// ── Tower Pin ──────────────────────────────────────────────────────────────
interface TowerPinProps {
  tower: Tower;
  isActive: boolean;
  onSelect: (t: Tower) => void;
  onHover: (label: string | null, e?: React.MouseEvent) => void;
}

function TowerPin({ tower, isActive, onSelect, onHover }: TowerPinProps) {
  const pinColor   = tower.status === "ongoing" ? "#BA7517" : "#185FA5";
  const pulseColor = tower.status === "ongoing" ? "rgba(186,117,23,0.35)" : "rgba(24,95,165,0.3)";
  const cls = ["tower-pin", isActive ? "active" : ""].join(" ").trim();

  return (
    <g className={cls}
      onClick={() => onSelect(tower)}
      onMouseEnter={(e) => onHover(`${tower.state} — ${tower.location}`, e)}
      onMouseMove={(e)  => onHover(`${tower.state} — ${tower.location}`, e)}
      onMouseLeave={()  => onHover(null)}
    >
      <circle className="pulse-ring" cx={tower.cx} cy={tower.cy} r={14} fill={pulseColor} />
      <ellipse cx={tower.cx} cy={tower.cy + 3} rx={10} ry={4} fill="rgba(0,0,0,0.15)" />
      <circle
        className="pin-circle"
        cx={tower.cx} cy={tower.cy} r={12}
        fill={pinColor} stroke="#fff" strokeWidth={isActive ? 3 : 2.5}
      />
      <text
        x={tower.cx} y={tower.cy}
        textAnchor="middle" dominantBaseline="central"
        fontSize={10} fontWeight={700} fill="#fff"
        fontFamily="-apple-system, sans-serif"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {tower.id}
      </text>
    </g>
  );
}

// ── Detail Panel ───────────────────────────────────────────────────────────
function DetailPanel({ tower }: { tower: Tower | null }) {
  if (!tower) {
    return (
      <div style={s.detailPanel}>
        <div style={s.detailHeader}>
          <div style={{ ...s.detailName, color: "#8a9ab5", fontWeight: 400 }}>No state selected</div>
        </div>
        <div style={s.emptyState}>
          <svg width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="#8a9ab5" strokeWidth={1.3} opacity={0.4}>
            <path d="M12 2L8 12H2l4.5 3.5L5 22l7-4 7 4-1.5-6.5L22 12h-6L12 2z" />
          </svg>
          <p style={s.emptyText}>Select a state on the map to explore its tower project details.</p>
        </div>
      </div>
    );
  }

  const isOngoing = tower.status === "ongoing";

  return (
    <div style={s.detailPanel}>
      <div style={s.detailHeader}>
        <div style={s.detailName}>{tower.state}</div>
        <div style={s.detailMeta}>{tower.name} · {tower.location}</div>
        <span style={{
          ...s.statusBadge,
          background: isOngoing ? "#FAEEDA" : "#EAF3DE",
          color:      isOngoing ? "#854F0B" : "#3B6D11",
        }}>
          {isOngoing ? "Ongoing" : "Completed"}
        </span>
      </div>

      <div style={s.chartArea}>
        <div style={s.chartWrap}>
          <PieChart width={160} height={160}>
            <Pie
              data={tower.work} dataKey="pct" nameKey="label"
              cx={80} cy={80} innerRadius={48} outerRadius={74}
              strokeWidth={3} stroke="#fff"
              animationBegin={0} animationDuration={500}
            >
              {tower.work.map((w, i) => <Cell key={i} fill={w.color} />)}
            </Pie>
            <Tooltip formatter={(v: number, name: string) => [`${v}%`, name]} />
          </PieChart>
        </div>

        <div style={s.legend}>
          {tower.work.map((w, i) => (
            <div key={i} style={s.legendRow}>
              <span style={{ ...s.legendSwatch, background: w.color }} />
              <span style={s.legendLabel}>{w.label}</span>
              <span style={s.legendPct}>{w.pct}%</span>
            </div>
          ))}
        </div>

        <div style={s.metrics}>
          {[
            { label: "Height",   value: tower.height },
            { label: "Year",     value: String(tower.year) },
            { label: "Team",     value: String(tower.team) },
            { label: "Duration", value: tower.duration },
          ].map((m) => (
            <div key={m.label} style={s.metricCard}>
              <div style={s.metricLabel}>{m.label}</div>
              <div style={s.metricValue}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function TowerMap() {
  const [selected, setSelected] = useState<Tower | null>(null);
  const [tooltip, setTooltip]   = useState<{ text: string; x: number; y: number } | null>(null);

  const towerMap = Object.fromEntries(towers.map((t) => [t.state, t]));

  const handleHover = useCallback((label: string | null, e?: React.MouseEvent) => {
    if (!label || !e) { setTooltip(null); return; }
    setTooltip({ text: label, x: e.clientX, y: e.clientY });
  }, []);

  const handleMapMove = (e: React.MouseEvent) => {
    if (tooltip) setTooltip((p) => p ? { ...p, x: e.clientX, y: e.clientY } : null);
  };

  return (
    <div style={s.page}>
      <style>{globalCSS}</style>

      {/* Header */}
      <div style={s.pageHeader}>
        <span style={s.headerBadge}>Project Map</span>
        <h1 style={s.h1}>ATSS Tower Infrastructure</h1>
        <p style={s.subtitle}>Click any state or pin to view project details and work breakdown.</p>
      </div>

      {/* App shell */}
      <div style={s.app}>
        {/* Map */}
        <div style={s.mapPanel} onMouseMove={handleMapMove}>
          <svg viewBox="0 0 680 480" preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%", display: "block" }}
          >
            <MapBackground />
            <StateShapes towerMap={towerMap} selected={selected} onSelect={setSelected} onHover={handleHover} />
            {towers.map((t) => (
              <TowerPin key={t.id} tower={t} isActive={selected?.id === t.id} onSelect={setSelected} onHover={handleHover} />
            ))}
          </svg>

          {/* Map legend */}
          <div style={s.mapLegend}>
            {[{ label: "Completed", color: "#185FA5" }, { label: "Ongoing", color: "#BA7517" }].map(({ label, color }) => (
              <div key={label} style={s.mapLegendRow}>
                <div style={{ ...s.mapLegendDot, background: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <DetailPanel tower={selected} />
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div style={{ ...s.tooltip, left: tooltip.x, top: tooltip.y }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#f0f4f8", minHeight: "100vh",
    display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 16px",
  },
  pageHeader: { width: "100%", maxWidth: 1100, marginBottom: 24 },
  headerBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #b8962e, #f0d060)",
    color: "#0a1640", fontSize: 11, fontWeight: 700,
    letterSpacing: "0.1em", textTransform: "uppercase",
    padding: "3px 12px", borderRadius: 999, marginBottom: 8,
  },
  h1: { fontSize: 26, fontWeight: 700, color: "#0a1640", letterSpacing: "-0.02em", margin: 0 },
  subtitle: { fontSize: 14, color: "#5a6a8a", marginTop: 4 },
  app: {
    display: "flex", width: "100%", maxWidth: 1100, height: 520,
    borderRadius: 16, overflow: "hidden",
    border: "1px solid rgba(10,22,64,0.12)",
    boxShadow: "0 8px 40px rgba(10,22,64,0.12)", background: "#fff",
  },
  mapPanel: { flex: "1 1 60%", position: "relative", background: "#dce8f5", overflow: "hidden" },
  tooltip: {
    position: "fixed", background: "#0a1640", color: "#fff",
    fontSize: 11, fontWeight: 500, padding: "5px 10px", borderRadius: 6,
    pointerEvents: "none", whiteSpace: "nowrap", zIndex: 9999,
    transform: "translate(-50%, -160%)",
  },
  mapLegend: {
    position: "absolute", bottom: 14, left: 14,
    background: "rgba(255,255,255,0.92)", borderRadius: 8,
    border: "1px solid rgba(10,22,64,0.1)", padding: "8px 12px",
    fontSize: 11, color: "#0a1640", display: "flex", flexDirection: "column", gap: 5,
    backdropFilter: "blur(4px)",
  },
  mapLegendRow: { display: "flex", alignItems: "center", gap: 6 },
  mapLegendDot: { width: 10, height: 10, borderRadius: "50%", border: "2px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" },
  detailPanel: {
    flex: "0 0 260px", display: "flex", flexDirection: "column",
    borderLeft: "1px solid rgba(10,22,64,0.1)", background: "#fff", overflow: "hidden",
  },
  detailHeader: { padding: "18px 18px 14px", borderBottom: "1px solid rgba(10,22,64,0.08)", flexShrink: 0 },
  detailName: { fontSize: 16, fontWeight: 700, color: "#0a1640", lineHeight: 1.3 },
  detailMeta: { fontSize: 11, color: "#5a6a8a", marginTop: 3 },
  statusBadge: { display: "inline-block", fontSize: 10, fontWeight: 600, padding: "2px 9px", borderRadius: 999, marginTop: 6 },
  emptyState: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#8a9ab5", gap: 10, padding: 20, textAlign: "center" },
  emptyText: { fontSize: 12, lineHeight: 1.6, maxWidth: 200, margin: 0 },
  chartArea: { display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" },
  chartWrap: { display: "flex", justifyContent: "center", padding: "14px 16px 6px", flexShrink: 0 },
  legend: { padding: "0 16px 10px", display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 },
  legendRow: { display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "#5a6a8a" },
  legendSwatch: { width: 9, height: 9, borderRadius: 2, flexShrink: 0 },
  legendLabel: { flex: 1 },
  legendPct: { fontWeight: 600, fontSize: 11, color: "#0a1640", minWidth: 28, textAlign: "right" },
  metrics: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, padding: "0 16px 16px", flexShrink: 0 },
  metricCard: { background: "#f4f6fa", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(10,22,64,0.06)" },
  metricLabel: { fontSize: 10, color: "#5a6a8a" },
  metricValue: { fontSize: 15, fontWeight: 700, color: "#0a1640", marginTop: 1 },
};
