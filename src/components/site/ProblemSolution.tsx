// TowerMap.tsx
// Dependencies: npm install leaflet react-leaflet @types/leaflet recharts

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Responsive hook ─────────────────────────────────────────────────────────

function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
}

// ── Data types ──────────────────────────────────────────────────────────────

interface ServiceItem { label: string; count: number; }
interface StateData {
  id: string; state: string; abbr: string;
  lat: number; lng: number; total: number;
  services: ServiceItem[];
}

function groupSAServices(services: ServiceItem[]): ServiceItem[] {
  const saGroup: ServiceItem = { label: "SA (All Types)", count: 0 };
  const others: ServiceItem[] = [];
  for (const s of services) {
    const lbl = s.label.toLowerCase();
    if (lbl.includes("sa") || lbl.includes("structural analysis")) {
      saGroup.count += s.count;
    } else {
      others.push(s);
    }
  }
  const result: ServiceItem[] = [];
  if (saGroup.count > 0) result.push(saGroup);
  return [...result, ...others];
}

const rawStateData: StateData[] = [
  { id: "AL", state: "Alabama", abbr: "AL", lat: 33.5186, lng: -86.8104, total: 24,
    services: [{ label: "Full SA", count: 5 }, { label: "Passing SA", count: 5 }, { label: "Mod SA", count: 4 }, { label: "Mod Drawing", count: 3 }, { label: "SA Review", count: 2 }, { label: "Failing SA", count: 2 }, { label: "Closeout Report", count: 1 }, { label: "Tower Inspection Report", count: 1 }, { label: "Re-run", count: 1 }] },
  { id: "MO", state: "Missouri", abbr: "MO", lat: 38.627, lng: -90.1994, total: 25,
    services: [{ label: "Full SA", count: 8 }, { label: "Passing SA", count: 7 }, { label: "SA Review", count: 7 }, { label: "Mod SA", count: 2 }, { label: "Mod Drawing", count: 1 }, { label: "Failing SA", count: 1 }, { label: "SBA Re-run", count: 2 }] },
  { id: "SC", state: "South Carolina", abbr: "SC", lat: 34.0007, lng: -81.0348, total: 20,
    services: [{ label: "Full SA", count: 4 }, { label: "Passing SA", count: 3 }, { label: "Mod SA", count: 3 }, { label: "Mod Drawing", count: 2 }, { label: "Failing SA", count: 2 }, { label: "SBA SA Re-run", count: 2 }, { label: "SA Review", count: 1 }, { label: "Closeout Report", count: 1 }, { label: "Tower Inspection Report", count: 1 }, { label: "Rerun SA", count: 1 }] },
  { id: "IA", state: "Iowa", abbr: "IA", lat: 41.5868, lng: -93.625, total: 18,
    services: [{ label: "Passing SA", count: 13 }, { label: "Full SA", count: 2 }, { label: "Mod SA", count: 1 }, { label: "Mod Drawing", count: 1 }, { label: "Failing SA", count: 1 }] },
  { id: "MS", state: "Mississippi", abbr: "MS", lat: 32.2988, lng: -90.1848, total: 17,
    services: [{ label: "Mod SA", count: 4 }, { label: "Mod Drawing", count: 4 }, { label: "Full SA", count: 3 }, { label: "Failing SA", count: 3 }, { label: "Passing SA", count: 1 }, { label: "Closeout Report", count: 1 }, { label: "Tower Inspection Report", count: 1 }] },
  { id: "GA", state: "Georgia", abbr: "GA", lat: 33.749, lng: -84.388, total: 16,
    services: [{ label: "Passing SA", count: 6 }, { label: "Full SA", count: 4 }, { label: "SA Review", count: 3 }, { label: "Guyed Tower Analysis / Reviews", count: 3 }] },
  { id: "OK", state: "Oklahoma", abbr: "OK", lat: 35.4676, lng: -97.5164, total: 14,
    services: [{ label: "SA Review", count: 12 }, { label: "Full SA", count: 2 }, { label: "Passing SA", count: 1 }] },
  { id: "MI", state: "Michigan", abbr: "MI", lat: 42.3314, lng: -83.0458, total: 12,
    services: [{ label: "SA Review", count: 8 }, { label: "Full SA", count: 3 }, { label: "Passing SA", count: 1 }] },
  { id: "TN", state: "Tennessee", abbr: "TN", lat: 36.1627, lng: -86.7816, total: 10,
    services: [{ label: "Mod SA", count: 3 }, { label: "Full SA", count: 2 }, { label: "Mod Drawing", count: 2 }, { label: "SBA SA Re-run", count: 1 }, { label: "Failing SA", count: 1 }, { label: "Closeout Report", count: 1 }] },
  { id: "MN", state: "Minnesota", abbr: "MN", lat: 44.9778, lng: -93.265, total: 8,
    services: [{ label: "Passing SA", count: 7 }, { label: "SA Review", count: 1 }] },
  { id: "WI", state: "Wisconsin", abbr: "WI", lat: 43.0389, lng: -87.9065, total: 6,
    services: [{ label: "SA Review", count: 3 }, { label: "Full SA", count: 2 }, { label: "Passing SA", count: 1 }] },
  { id: "IN", state: "Indiana", abbr: "IN", lat: 39.7684, lng: -86.1581, total: 5,
    services: [{ label: "SA Review", count: 5 }] },
  { id: "KY", state: "Kentucky", abbr: "KY", lat: 38.2527, lng: -85.7585, total: 5,
    services: [{ label: "Mount Analysis", count: 2 }, { label: "Passing SA", count: 2 }, { label: "Failing SA", count: 1 }] },
  { id: "OH", state: "Ohio", abbr: "OH", lat: 39.9612, lng: -82.9988, total: 4,
    services: [{ label: "Preliminary Design", count: 3 }, { label: "Full SA / Tower Analysis", count: 1 }] },
  { id: "ME", state: "Maine", abbr: "ME", lat: 43.6615, lng: -70.2553, total: 4,
    services: [{ label: "SA Review", count: 3 }, { label: "Full SA", count: 1 }] },
  { id: "VA", state: "Virginia", abbr: "VA", lat: 37.5407, lng: -77.436, total: 5,
    services: [{ label: "Full SA / Monopole Analysis", count: 3 }] },
  { id: "TX", state: "Texas", abbr: "TX", lat: 32.7767, lng: -96.797, total: 15,
    services: [{ label: "SA Review", count: 1 }] },
  { id: "FL", state: "Florida", abbr: "FL", lat: 27.9944, lng: -81.7603, total: 8,
    services: [{ label: "Full SA", count: 1 }] },
  { id: "NC", state: "North Carolina", abbr: "NC", lat: 35.2271, lng: -80.8431, total: 3,
    services: [{ label: "Full SA", count: 1 }] },
  { id: "WV", state: "West Virginia", abbr: "WV", lat: 38.5976, lng: -80.4549, total: 3,
    services: [{ label: "Full SA", count: 1 }] },
];

const stateData: StateData[] = rawStateData.map(s => ({
  ...s,
  services: groupSAServices(s.services),
}));

// ── Marker helpers ──────────────────────────────────────────────────────────

function getMarkerTier(total: number) {
  if (total >= 20) return { size: 42, ring: true };
  if (total >= 10) return { size: 36, ring: false };
  if (total >= 5)  return { size: 30, ring: false };
  return { size: 24, ring: false };
}

function getTierColor(total: number) {
  if (total >= 20) return "#185FA5";
  if (total >= 10) return "#1D9E75";
  if (total >= 5)  return "#BA7517";
  return "#57194f";
}

function makeIcon(s: StateData, isActive: boolean): L.DivIcon {
  const { size, ring } = getMarkerTier(s.total);
  const color = isActive ? "#e8c84a" : getTierColor(s.total);
  const sz = isActive ? size + 4 : size;
  const html = `<div style="position:relative;width:${sz+16}px;height:${sz+16}px;display:flex;align-items:center;justify-content:center;">
    ${ring || isActive ? `<div style="position:absolute;inset:-6px;border-radius:50%;background:${color}33;animation:towerPulse 2.4s ease-out infinite;"></div>` : ""}
    <div style="position:relative;width:${sz}px;height:${sz}px;border-radius:50%;background:${color};border:${isActive?"3px solid #fff":"2.5px solid rgba(255,255,255,0.85)"};box-shadow:${isActive?`0 0 0 3px ${color}66,0 6px 20px rgba(0,0,0,0.4)`:"0 2px 10px rgba(0,0,0,0.3)"};display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;">
      <span style="font-size:${sz>=38?11:9}px;font-weight:800;color:#fff;line-height:1.1;">${s.abbr}</span>
      <span style="font-size:${sz>=38?10:8}px;font-weight:600;color:rgba(255,255,255,0.85);line-height:1.1;">${s.total}+</span>
    </div>
  </div>`;
  return L.divIcon({ html, className: "", iconSize: [sz+16, sz+16], iconAnchor: [(sz+16)/2, (sz+16)/2], popupAnchor: [0, -(sz/2+8)] });
}

// ── Map sub-components ──────────────────────────────────────────────────────

function SetInitialView() {
  const map = useMap();
  useEffect(() => { map.setView([39.5, -96], 4); }, []);
  return null;
}

function FlyTo({ state }: { state: StateData | null }) {
  const map = useMap();
  useEffect(() => { if (state) map.flyTo([state.lat, state.lng], 7, { duration: 0.9 }); }, [state, map]);
  return null;
}

// ── Summary data ────────────────────────────────────────────────────────────

const SUMMARY_PIE = [
  { name: "Passing SA",      value: 125, color: "#3B82F6" },
  { name: "Full SA",         value: 97,  color: "#d80e1896" },
  { name: "Passing SA Reviews", value: 158, color: "#fa7305" },
  { name: "Mod SA",          value: 28,  color: "#e2cd0a" },
  { name: "Failing SA",      value: 16,  color: "#850541" },
  { name: "Mod Drawing",     value: 28,  color: "#EF4444" },
  { name: "Re-runs",         value: 19,  color: "#06B6D4" },
  { name: "Prelim Design",   value: 19,  color: "#84CC16" },
  { name: "Closeout Reports",value: 15,  color: "#6366F1" },
  { name: "Inspection Reports", value: 17, color: "#0e574e" },
  { name: "Guyed Tower Reviews", value: 3, color: "#EC4899" },
  { name: "Mount Analysis",  value: 10,  color: "#F97316" },
  { name: "Fatigue Analysis",value: 7,   color: "#8d1919" },
  { name: "Corrosion Analysis", value: 8, color: "#229722" },
  { name: "CFD Analysis",    value: 6,   color: "#8bf006" },
  { name: "FEA Analysis",    value: 7,   color: "#552f4dc9" },
  { name: "Heat Study",      value: 8,   color: "#10c4db" },
];

const TOTAL_SUMMARY = SUMMARY_PIE.reduce((a, d) => a + d.value, 0);

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.04) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 10, fontWeight: 800, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

// ── DetailPanel ─────────────────────────────────────────────────────────────

function DetailPanel({ layout }: { layout: "side" | "bottom" }) {
  const isBottom = layout === "bottom";
  const pieSize = isBottom ? 160 : 210;
  const pieInner = isBottom ? 40 : 55;
  const pieOuter = isBottom ? 72 : 95;

  const panelStyle: React.CSSProperties = isBottom
    ? {
        width: "100%",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#0d1b3e",
        overflow: "hidden",
        flexShrink: 0,
      }
    : {
        flex: "0 0 245px",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        background: "#0d1b3e",
        overflow: "hidden",
      };

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={{
        padding: isBottom ? "10px 16px 8px" : "14px 16px 10px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
        display: isBottom ? "flex" : "block",
        alignItems: isBottom ? "center" : undefined,
        justifyContent: isBottom ? "space-between" : undefined,
        gap: isBottom ? 12 : undefined,
      }}>
        <div>
          <p style={{ fontSize: isBottom ? 13 : 15, fontWeight: 700, color: "#e0e8f8", margin: 0, lineHeight: 1.3, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Portfolio Overview
          </p>
          <p style={{ fontSize: 11, color: "#6a8aaa", marginTop: 2, marginBottom: 0, fontFamily: "'Poppins', sans-serif" }}>
            500+ deliverables · 26 states · 15+ months
          </p>
        </div>
        {/* Inline stats for bottom layout */}
        {isBottom && (
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {[{ l: "States", v: "26" }, { l: "Months", v: "15+" }, { l: "Total", v: "500+" }].map(m => (
              <div key={m.l} style={{ textAlign: "center", padding: "4px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#e0e8f8", margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>{m.v}</p>
                <p style={{ fontSize: 9, color: "#4a6a8a", margin: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>{m.l}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Body: horizontal on bottom, vertical on side */}
      <div style={{
        display: isBottom ? "flex" : "flex",
        flexDirection: isBottom ? "row" : "column",
        overflowX: isBottom ? "auto" : undefined,
        overflowY: isBottom ? "hidden" : undefined,
        flex: isBottom ? undefined : 1,
        minHeight: 0,
        alignItems: isBottom ? "flex-start" : undefined,
      }}>
        {/* Pie chart */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isBottom ? "10px 8px 10px 16px" : "14px 8px 4px",
          flexShrink: 0,
        }}>
          <PieChart width={pieSize} height={pieSize}>
            <Pie
              data={SUMMARY_PIE}
              dataKey="value"
              nameKey="name"
              cx={pieSize / 2} cy={pieSize / 2}
              innerRadius={pieInner} outerRadius={pieOuter}
              animationBegin={0} animationDuration={600}
              isAnimationActive={true}
              labelLine={false}
              label={renderCustomLabel}
            >
              {SUMMARY_PIE.map((d, i) => (
                <Cell key={`cell-${i}`} fill={d.color} stroke="#0d1b3e" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number, n: string) => [
                `${v}+ (${Math.round(v / TOTAL_SUMMARY * 100)}%)`, n
              ]}
              contentStyle={{
                fontSize: 11, borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#1a2d5a", color: "#e0e8f8",
              }}
            />
          </PieChart>
        </div>

        {/* Legend list */}
        <div style={{
          padding: isBottom ? "10px 16px 10px 4px" : "0 14px 10px",
          overflowY: isBottom ? undefined : "auto",
          overflowX: isBottom ? undefined : undefined,
          flex: isBottom ? undefined : 1,
          minWidth: isBottom ? 320 : undefined,
          display: isBottom ? "flex" : "block",
          flexDirection: isBottom ? "column" : undefined,
          justifyContent: isBottom ? "center" : undefined,
        }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: "#4a6a8a",
            textTransform: "uppercase" as const, letterSpacing: "0.1em",
            margin: isBottom ? "0 0 5px" : "6px 0 5px",
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>Service Totals</p>
          <div style={isBottom
            ? { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "3px 16px" }
            : {}
          }>
            {SUMMARY_PIE.map((d, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 7,
                paddingBottom: 5,
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                marginBottom: 4,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, flexShrink: 0, background: d.color }} />
                <span style={{ flex: 1, fontSize: 11, color: "#7a9abb", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>{d.name}</span>
                <span style={{
                  fontWeight: 800, fontSize: 12, color: d.color,
                  background: `${d.color}22`,
                  borderRadius: 6, padding: "1px 7px",
                  fontFamily: "'Playfair Display', Georgia, serif"
                }}>
                  {Math.round(d.value / TOTAL_SUMMARY * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats footer — only on side panel */}
      {!isBottom && (
        <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          {[{ l: "States", v: "26" }, { l: "Months", v: "15+" }, { l: "Total", v: "500+" }].map(m => (
            <div key={m.l} style={{ flex: 1, padding: "10px 8px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#e0e8f8", margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>{m.v}</p>
              <p style={{ fontSize: 10, color: "#4a6a8a", margin: "2px 0 0", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>{m.l}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Root component ──────────────────────────────────────────────────────────

export default function TowerMap() {
  const [selected, setSelected] = useState<StateData | null>(null);
  const { isMobile, isTablet, isDesktop, width } = useBreakpoint();

  // Derived layout values
  const headerPadding = isMobile ? "14px 12px 10px" : "20px 16px 14px";
  const h1FontSize = isMobile ? 22 : isTablet ? 30 : 38;
  const h2FontSize = isMobile ? 11 : isTablet ? 13 : 16;
  const taglineSize = isMobile ? 11 : 13;
  const showTagline = !isMobile;
  const mapHeight = isMobile ? 340 : isTablet ? 480 : undefined; // undefined = flex fill
  const shellDirection: React.CSSProperties["flexDirection"] = isDesktop ? "row" : "column";

  useEffect(() => {
    const id = "atss-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        @keyframes towerPulse { 0%{opacity:.6;transform:scale(1)} 70%{opacity:0;transform:scale(2.4)} 100%{opacity:0;transform:scale(2.4)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom { border-radius: 8px !important; overflow: hidden; border: 1px solid rgba(255,255,255,0.12) !important; background: #0d1b3e !important; }
        .leaflet-control-zoom a { color: #e0e8f8 !important; background: #0d1b3e !important; font-family: 'Poppins', sans-serif !important; }
        .leaflet-control-zoom a:hover { background: #1a2d5a !important; }
        .atss-heading { animation: fadeSlideDown 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        * { box-sizing: border-box; }
      `;
      document.head.appendChild(el);
    }
  }, []);

  return (
    <div style={{
      fontFamily: "'Poppins', system-ui, sans-serif",
      background: "#080f22",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: headerPadding,
    }}>
      {/* ── Header ── */}
      <div style={{ width: "100%", marginBottom: isMobile ? 10 : 14 }} className="atss-heading">
        {/* Top rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: isMobile ? 6 : 10 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,200,74,0.4), transparent)" }} />
          <div style={{ width: 7, height: 7, background: "#e8c84a", transform: "rotate(45deg)", flexShrink: 0 }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,200,74,0.4), transparent)" }} />
        </div>

        {/* Center block */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: isMobile ? 8 : 14, padding: "0 8px" }}>
          <span style={{
            display: "block", fontSize: isMobile ? 8 : 10, fontWeight: 600,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#e8c84a", marginBottom: isMobile ? 6 : 10,
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>ATSS · Active Project Portfolio</span>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: h1FontSize,
            fontWeight: 800, color: "#e0e8f8",
            letterSpacing: "0.04em", lineHeight: 1.1,
            margin: "0 0 4px", textTransform: "uppercase",
            background: "linear-gradient(90deg, #b8962e, #f0d060, #e8c84a, #b8962e)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
          }}>Interactive Coverage Map</h1>

          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: h2FontSize, fontWeight: 300, color: "#8aabcc",
            letterSpacing: isMobile ? "0.06em" : "0.12em",
            textTransform: "uppercase", margin: "0 0 10px",
          }}>of Active Tower Structural Engineering Projects</h2>

          {showTagline && (
            <p style={{
              fontSize: taglineSize, fontFamily: "'Poppins', sans-serif",
              fontWeight: 400, color: "#5a7a9a", maxWidth: 560,
              lineHeight: 1.6, margin: "0 0 14px", letterSpacing: "0.02em",
            }}>
              Showcasing ATSS's expanding infrastructure footprint through detailed analyses,
              modification drawings, and engineering deliverables.
            </p>
          )}

          {/* Stat pills */}
          <div style={{ display: "flex", gap: isMobile ? 5 : 8, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { v: "500+", l: "Deliverables" },
              { v: "26",   l: "States" },
              { v: "20+",  l: "Months Active" },
              { v: "10+",  l: "Service Types" },
            ].map(m => (
              <div key={m.l} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(232,200,74,0.15)",
                borderRadius: 10, padding: isMobile ? "4px 10px" : "6px 16px",
                minWidth: isMobile ? 52 : 64,
              }}>
                <span style={{ fontSize: isMobile ? 14 : 18, fontWeight: 700, color: "#e0e8f8", lineHeight: 1.1, fontFamily: "'Playfair Display', Georgia, serif" }}>{m.v}</span>
                <span style={{ fontSize: isMobile ? 7 : 9, color: "#4a6a8a", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>{m.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,200,74,0.4), transparent)" }} />
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(232,200,74,0.5)", flexShrink: 0, whiteSpace: "nowrap", fontFamily: "'Playfair Display', Georgia, serif" }}>
            CLICK ANY MARKER TO EXPLORE
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,200,74,0.4), transparent)" }} />
        </div>
      </div>

      {/* ── Shell ── */}
      <div style={{
        display: "flex",
        width: "100%",
        flex: isDesktop ? 1 : undefined,
        flexDirection: shellDirection,
        minHeight: isDesktop ? 620 : undefined,
        borderRadius: isMobile ? 10 : 14,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        background: "#0d1b3e",
      }}>
        {/* Map */}
        <div style={{
          flex: isDesktop ? "1 1 0" : undefined,
          position: "relative",
          minWidth: 0,
          height: mapHeight ?? (isDesktop ? undefined : 340),
          width: "100%",
        }}>
          <MapContainer style={{ width: "100%", height: "100%" }}>
            <SetInitialView />
            <TileLayer {...({
              url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
              attribution: "",
              subdomains: ["a","b","c","d"],
              maxZoom: 19,
            } as any)} />
            <FlyTo state={selected} />
            {stateData.map(s => (
              <Marker
                key={s.id}
                position={[s.lat, s.lng] as [number, number]}
                eventHandlers={{ click: () => setSelected(s) }}
                {...({ icon: makeIcon(s, selected?.id === s.id) } as any)}
              >
                <Popup>
                  <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: 13, lineHeight: 1.5, minWidth: 140 }}>
                    <strong style={{ fontSize: 14, color: "#0a1640", fontFamily: "'Playfair Display', Georgia, serif" }}>{s.state}</strong><br />
                    <span style={{ color: "#5a6a8a" }}>{s.total}+ deliverables</span><br />
                    <span style={{ fontSize: 11, color: "#8a9ab5" }}>{s.services.length} service categories</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Side panel (desktop) or bottom panel (mobile/tablet) */}
        <DetailPanel layout={isDesktop ? "side" : "bottom"} />
      </div>
    </div>
  );
}
