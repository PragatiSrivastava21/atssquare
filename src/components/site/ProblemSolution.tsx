// TowerMap.tsx
// Dependencies: npm install leaflet react-leaflet @types/leaflet recharts

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, MapContainerProps } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ── Fix Leaflet default marker icons broken by bundlers ────────────────────
// (Vite / webpack can't resolve the default marker PNG paths at runtime)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Types ──────────────────────────────────────────────────────────────────
interface WorkItem {
  label: string;
  pct: number;
  color: string;
}

interface Tower {
  id: number;
  state: string;
  lat: number;
  lng: number;
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
  {
    id: 1, state: "Alabama", lat: 33.5186, lng: -86.8104,
    name: "Tower Alpha", location: "Birmingham, AL", height: "180 m",
    year: 2021, team: 8, duration: "6 wks", status: "completed",
    work: [
      { label: "Structural", pct: 38, color: "#185FA5" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Fatigue",    pct: 18, color: "#BA7517" },
      { label: "Antenna",    pct: 14, color: "#993C1D" },
      { label: "FEA/CFD",   pct: 8,  color: "#534AB7" },
    ],
  },
  {
    id: 2, state: "Connecticut", lat: 41.7658, lng: -72.6851,
    name: "Tower Beta", location: "Hartford, CT", height: "215 m",
    year: 2022, team: 11, duration: "9 wks", status: "completed",
    work: [
      { label: "Structural", pct: 30, color: "#185FA5" },
      { label: "FEA/CFD",   pct: 28, color: "#534AB7" },
      { label: "Foundation", pct: 20, color: "#1D9E75" },
      { label: "Antenna",    pct: 12, color: "#993C1D" },
      { label: "Fatigue",    pct: 10, color: "#BA7517" },
    ],
  },
  {
    id: 3, state: "Georgia", lat: 33.749, lng: -84.388,
    name: "Tower Gamma", location: "Atlanta, GA", height: "145 m",
    year: 2023, team: 6, duration: "4 wks", status: "ongoing",
    work: [
      { label: "Structural", pct: 45, color: "#185FA5" },
      { label: "Antenna",    pct: 25, color: "#993C1D" },
      { label: "Foundation", pct: 18, color: "#1D9E75" },
      { label: "Fatigue",    pct: 12, color: "#BA7517" },
    ],
  },
  {
    id: 4, state: "Indiana", lat: 39.7684, lng: -86.1581,
    name: "Tower Delta", location: "Indianapolis, IN", height: "160 m",
    year: 2022, team: 9, duration: "7 wks", status: "completed",
    work: [
      { label: "Structural", pct: 32, color: "#185FA5" },
      { label: "Foundation", pct: 26, color: "#1D9E75" },
      { label: "FEA/CFD",   pct: 22, color: "#534AB7" },
      { label: "Antenna",    pct: 12, color: "#993C1D" },
      { label: "Fatigue",    pct: 8,  color: "#BA7517" },
    ],
  },
  {
    id: 5, state: "Iowa", lat: 41.5868, lng: -93.625,
    name: "Tower Epsilon", location: "Des Moines, IA", height: "195 m",
    year: 2023, team: 13, duration: "11 wks", status: "ongoing",
    work: [
      { label: "FEA/CFD",   pct: 30, color: "#534AB7" },
      { label: "Structural", pct: 28, color: "#185FA5" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Fatigue",    pct: 12, color: "#BA7517" },
      { label: "Antenna",    pct: 8,  color: "#993C1D" },
    ],
  },
  {
    id: 6, state: "Kentucky", lat: 38.2527, lng: -85.7585,
    name: "Tower Zeta", location: "Louisville, KY", height: "170 m",
    year: 2021, team: 7, duration: "5 wks", status: "completed",
    work: [
      { label: "Structural", pct: 40, color: "#185FA5" },
      { label: "Fatigue",    pct: 24, color: "#BA7517" },
      { label: "Antenna",    pct: 20, color: "#993C1D" },
      { label: "Foundation", pct: 16, color: "#1D9E75" },
    ],
  },
  {
    id: 7, state: "Maine", lat: 43.6615, lng: -70.2553,
    name: "Tower Eta", location: "Portland, ME", height: "200 m",
    year: 2024, team: 10, duration: "8 wks", status: "ongoing",
    work: [
      { label: "FEA/CFD",   pct: 35, color: "#534AB7" },
      { label: "Structural", pct: 30, color: "#185FA5" },
      { label: "Foundation", pct: 20, color: "#1D9E75" },
      { label: "Antenna",    pct: 15, color: "#993C1D" },
    ],
  },
  {
    id: 8, state: "Maryland", lat: 39.2904, lng: -76.6122,
    name: "Tower Theta", location: "Baltimore, MD", height: "155 m",
    year: 2022, team: 8, duration: "6 wks", status: "completed",
    work: [
      { label: "Structural", pct: 35, color: "#185FA5" },
      { label: "Foundation", pct: 25, color: "#1D9E75" },
      { label: "FEA/CFD",   pct: 20, color: "#534AB7" },
      { label: "Fatigue",    pct: 12, color: "#BA7517" },
      { label: "Antenna",    pct: 8,  color: "#993C1D" },
    ],
  },
  {
    id: 9, state: "Michigan", lat: 42.3314, lng: -83.0458,
    name: "Tower Iota", location: "Detroit, MI", height: "188 m",
    year: 2023, team: 9, duration: "7 wks", status: "ongoing",
    work: [
      { label: "Structural", pct: 33, color: "#185FA5" },
      { label: "FEA/CFD",   pct: 27, color: "#534AB7" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Antenna",    pct: 18, color: "#993C1D" },
    ],
  },
  {
    id: 10, state: "Minnesota", lat: 44.9778, lng: -93.265,
    name: "Tower Kappa", location: "Minneapolis, MN", height: "175 m",
    year: 2021, team: 10, duration: "8 wks", status: "completed",
    work: [
      { label: "Structural", pct: 38, color: "#185FA5" },
      { label: "Foundation", pct: 24, color: "#1D9E75" },
      { label: "Fatigue",    pct: 20, color: "#BA7517" },
      { label: "Antenna",    pct: 18, color: "#993C1D" },
    ],
  },
  {
    id: 11, state: "Mississippi", lat: 32.2988, lng: -90.1848,
    name: "Tower Lambda", location: "Jackson, MS", height: "162 m",
    year: 2022, team: 7, duration: "5 wks", status: "ongoing",
    work: [
      { label: "FEA/CFD",   pct: 32, color: "#534AB7" },
      { label: "Structural", pct: 28, color: "#185FA5" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Fatigue",    pct: 18, color: "#BA7517" },
    ],
  },
  {
    id: 12, state: "Missouri", lat: 38.627, lng: -90.1994,
    name: "Tower Mu", location: "St. Louis, MO", height: "178 m",
    year: 2023, team: 11, duration: "9 wks", status: "completed",
    work: [
      { label: "Structural", pct: 36, color: "#185FA5" },
      { label: "Foundation", pct: 26, color: "#1D9E75" },
      { label: "FEA/CFD",   pct: 20, color: "#534AB7" },
      { label: "Fatigue",    pct: 10, color: "#BA7517" },
      { label: "Antenna",    pct: 8,  color: "#993C1D" },
    ],
  },
  {
    id: 13, state: "New Hampshire", lat: 42.9956, lng: -71.4548,
    name: "Tower Nu", location: "Manchester, NH", height: "192 m",
    year: 2024, team: 8, duration: "6 wks", status: "ongoing",
    work: [
      { label: "Structural", pct: 42, color: "#185FA5" },
      { label: "FEA/CFD",   pct: 28, color: "#534AB7" },
      { label: "Foundation", pct: 18, color: "#1D9E75" },
      { label: "Antenna",    pct: 12, color: "#993C1D" },
    ],
  },
  {
    id: 14, state: "North Carolina", lat: 35.2271, lng: -80.8431,
    name: "Tower Xi", location: "Charlotte, NC", height: "168 m",
    year: 2021, team: 9, duration: "7 wks", status: "completed",
    work: [
      { label: "Structural", pct: 34, color: "#185FA5" },
      { label: "Foundation", pct: 24, color: "#1D9E75" },
      { label: "Fatigue",    pct: 22, color: "#BA7517" },
      { label: "FEA/CFD",   pct: 12, color: "#534AB7" },
      { label: "Antenna",    pct: 8,  color: "#993C1D" },
    ],
  },
  {
    id: 15, state: "Ohio", lat: 39.9612, lng: -82.9988,
    name: "Tower Omicron", location: "Columbus, OH", height: "185 m",
    year: 2022, team: 10, duration: "8 wks", status: "completed",
    work: [
      { label: "Structural", pct: 36, color: "#185FA5" },
      { label: "FEA/CFD",   pct: 26, color: "#534AB7" },
      { label: "Foundation", pct: 20, color: "#1D9E75" },
      { label: "Fatigue",    pct: 12, color: "#BA7517" },
      { label: "Antenna",    pct: 6,  color: "#993C1D" },
    ],
  },
  {
    id: 16, state: "Oklahoma", lat: 35.4676, lng: -97.5164,
    name: "Tower Pi", location: "Oklahoma City, OK", height: "172 m",
    year: 2023, team: 8, duration: "6 wks", status: "ongoing",
    work: [
      { label: "FEA/CFD",   pct: 33, color: "#534AB7" },
      { label: "Structural", pct: 29, color: "#185FA5" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Antenna",    pct: 16, color: "#993C1D" },
    ],
  },
  {
    id: 17, state: "South Carolina", lat: 34.0007, lng: -81.0348,
    name: "Tower Rho", location: "Columbia, SC", height: "158 m",
    year: 2021, team: 7, duration: "5 wks", status: "completed",
    work: [
      { label: "Structural", pct: 40, color: "#185FA5" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Fatigue",    pct: 20, color: "#BA7517" },
      { label: "Antenna",    pct: 18, color: "#993C1D" },
    ],
  },
  {
    id: 18, state: "Tennessee", lat: 36.1627, lng: -86.7816,
    name: "Tower Sigma", location: "Nashville, TN", height: "165 m",
    year: 2022, team: 9, duration: "7 wks", status: "ongoing",
    work: [
      { label: "Structural", pct: 38, color: "#185FA5" },
      { label: "FEA/CFD",   pct: 25, color: "#534AB7" },
      { label: "Foundation", pct: 20, color: "#1D9E75" },
      { label: "Fatigue",    pct: 17, color: "#BA7517" },
    ],
  },
  {
    id: 19, state: "Texas", lat: 32.7767, lng: -96.797,
    name: "Tower Tau", location: "Dallas, TX", height: "210 m",
    year: 2023, team: 14, duration: "12 wks", status: "ongoing",
    work: [
      { label: "Structural", pct: 32, color: "#185FA5" },
      { label: "FEA/CFD",   pct: 28, color: "#534AB7" },
      { label: "Foundation", pct: 20, color: "#1D9E75" },
      { label: "Fatigue",    pct: 12, color: "#BA7517" },
      { label: "Antenna",    pct: 8,  color: "#993C1D" },
    ],
  },
  {
    id: 20, state: "Virginia", lat: 37.5407, lng: -77.436,
    name: "Tower Upsilon", location: "Richmond, VA", height: "177 m",
    year: 2021, team: 8, duration: "6 wks", status: "completed",
    work: [
      { label: "Structural", pct: 36, color: "#185FA5" },
      { label: "Foundation", pct: 24, color: "#1D9E75" },
      { label: "FEA/CFD",   pct: 22, color: "#534AB7" },
      { label: "Fatigue",    pct: 12, color: "#BA7517" },
      { label: "Antenna",    pct: 6,  color: "#993C1D" },
    ],
  },
  {
    id: 21, state: "West Virginia", lat: 38.3498, lng: -81.6326,
    name: "Tower Phi", location: "Charleston, WV", height: "168 m",
    year: 2022, team: 7, duration: "5 wks", status: "completed",
    work: [
      { label: "Structural", pct: 38, color: "#185FA5" },
      { label: "Foundation", pct: 26, color: "#1D9E75" },
      { label: "Fatigue",    pct: 18, color: "#BA7517" },
      { label: "Antenna",    pct: 12, color: "#993C1D" },
      { label: "FEA/CFD",   pct: 6,  color: "#534AB7" },
    ],
  },
  {
    id: 22, state: "Wisconsin", lat: 43.0389, lng: -87.9065,
    name: "Tower Chi", location: "Milwaukee, WI", height: "183 m",
    year: 2024, team: 10, duration: "8 wks", status: "ongoing",
    work: [
      { label: "FEA/CFD",   pct: 34, color: "#534AB7" },
      { label: "Structural", pct: 28, color: "#185FA5" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Fatigue",    pct: 16, color: "#BA7517" },
    ],
  },
  {
    id: 23, state: "Florida", lat: 25.7617, lng: -80.1918,
    name: "Tower Psi", location: "Miami, FL", height: "195 m",
    year: 2023, team: 13, duration: "11 wks", status: "ongoing",
    work: [
      { label: "FEA/CFD",   pct: 30, color: "#534AB7" },
      { label: "Structural", pct: 28, color: "#185FA5" },
      { label: "Foundation", pct: 22, color: "#1D9E75" },
      { label: "Fatigue",    pct: 12, color: "#BA7517" },
      { label: "Antenna",    pct: 8,  color: "#993C1D" },
    ],
  },
];

// ── Custom Leaflet Icon factory ────────────────────────────────────────────
function makeIcon(tower: Tower, isActive: boolean): L.DivIcon {
  const bg = tower.status === "ongoing" ? "#BA7517" : "#185FA5";
  const ring = tower.status === "ongoing" ? "rgba(186,117,23,0.25)" : "rgba(24,95,165,0.22)";
  const border = isActive ? "3px solid #fff" : "2.5px solid #fff";
  const size = isActive ? 34 : 30;
  const shadow = isActive
    ? `0 0 0 3px ${bg}55, 0 4px 14px rgba(0,0,0,0.35)`
    : `0 2px 8px rgba(0,0,0,0.28)`;

  const html = `
    <div style="
      position:relative;
      width:${size}px;
      height:${size}px;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      ${isActive ? `<div style="
        position:absolute;
        inset:-8px;
        border-radius:50%;
        background:${ring};
        animation:towerPulse 2.2s ease-out infinite;
      "></div>` : ""}
      <div style="
        position:relative;
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        background:${bg};
        border:${border};
        box-shadow:${shadow};
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
        font-size:${isActive ? 11 : 10}px;
        font-weight:700;
        color:#fff;
        transition:all 0.2s;
        cursor:pointer;
      ">${tower.id}</div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [size + 16, size + 16],
    iconAnchor: [(size + 16) / 2, (size + 16) / 2],
    popupAnchor: [0, -(size / 2 + 8)],
  });
}

// ── Set initial view (works with react-leaflet v4 which dropped center/zoom props) ──
function SetInitialView() {
  const map = useMap();
  useEffect(() => {
    map.setView([38.5, -95] as [number, number], 4);
  }, []);
  return null;
}

// ── Map fly-to helper ──────────────────────────────────────────────────────
function FlyTo({ tower }: { tower: Tower | null }) {
  const map = useMap();
  useEffect(() => {
    if (tower) {
      map.flyTo([tower.lat, tower.lng] as [number, number], 7, { duration: 0.9 });
    }
  }, [tower, map]);
  return null;
}

// ── Detail Panel ───────────────────────────────────────────────────────────
function DetailPanel({ tower }: { tower: Tower | null }) {
  if (!tower) {
    return (
      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <p style={{ ...styles.panelTitle, color: "#8a9ab5", fontWeight: 400 }}>
            No location selected
          </p>
        </div>
        <div style={styles.emptyState}>
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none"
            stroke="#8a9ab5" strokeWidth={1.2} opacity={0.4}>
            <path d="M12 2L8 12H2l4.5 3.5L5 22l7-4 7 4-1.5-6.5L22 12h-6L12 2z"/>
          </svg>
          <p style={styles.emptyText}>
            Click any pin on the map to explore tower project details and work breakdown.
          </p>
        </div>
      </div>
    );
  }

  const ongoing = tower.status === "ongoing";

  return (
    <div style={styles.panel}>
      {/* Header */}
      <div style={styles.panelHeader}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div>
            <p style={styles.panelTitle}>{tower.state}</p>
            <p style={styles.panelSub}>{tower.name} · {tower.location}</p>
          </div>
          <span style={{
            ...styles.badge,
            background: ongoing ? "#FAEEDA" : "#EAF3DE",
            color: ongoing ? "#854F0B" : "#3B6D11",
          }}>
            {ongoing ? "Ongoing" : "Completed"}
          </span>
        </div>
      </div>

      {/* Donut chart */}
      <div style={{ padding: "14px 16px 0", display: "flex", justifyContent: "center" }}>
        <PieChart width={160} height={160}>
          <Pie
            data={tower.work}
            dataKey="pct"
            nameKey="label"
            cx={80} cy={80}
            innerRadius={46}
            outerRadius={72}
            stroke="#fff"
            strokeWidth={3}
            animationBegin={0}
            animationDuration={450}
          >
            {tower.work.map((w, i) => <Cell key={i} fill={w.color} />)}
          </Pie>
          <Tooltip
            formatter={(v: number, name: string) => [`${v}%`, name]}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </PieChart>
      </div>

      {/* Legend */}
      <div style={{ padding: "4px 16px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
        {tower.work.map((w, i) => (
          <div key={i} style={styles.legendRow}>
            <span style={{ ...styles.legendSwatch, background: w.color }} />
            <span style={styles.legendLabel}>{w.label}</span>
            <span style={styles.legendPct}>{w.pct}%</span>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div style={styles.metricsGrid}>
        {[
          { label: "Height",    value: tower.height },
          { label: "Year",      value: String(tower.year) },
          { label: "Team size", value: `${tower.team} eng.` },
          { label: "Duration",  value: tower.duration },
        ].map((m) => (
          <div key={m.label} style={styles.metricCard}>
            <p style={styles.metricLabel}>{m.label}</p>
            <p style={styles.metricValue}>{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function TowerMap() {
  const [selected, setSelected] = useState<Tower | null>(null);

  // Inject pulse keyframes once
  useEffect(() => {
    const id = "tower-pulse-style";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `
        @keyframes towerPulse {
          0%   { opacity: 0.7; transform: scale(1); }
          70%  { opacity: 0;   transform: scale(2.2); }
          100% { opacity: 0;   transform: scale(2.2); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={styles.page}>
      {/* Page header */}
      <div style={styles.pageHeader}>
        <span style={styles.headerBadge}>Project Map</span>
        <h1 style={styles.h1}>ATSS Tower Infrastructure</h1>
        <p style={styles.subtitle}>
          Click any marker to explore project details. Map powered by OpenStreetMap.
        </p>
      </div>

      {/* App shell */}
      <div style={styles.shell}>
        {/* Map */}
        <div style={styles.mapWrap}>
          <MapContainer
            style={{ width: "100%", height: "100%" }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <SetInitialView />
            {/* CARTO Voyager tiles — built on OpenStreetMap, no API key needed */}
            <TileLayer
              attribution="\u00a9 OpenStreetMap contributors \u00a9 CARTO"
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              subdomains={["a", "b", "c", "d"]}
              maxZoom={19}
            />

            <FlyTo tower={selected} />

            {towers.map((tower) => (
              <Marker
                key={tower.id}
                position={[tower.lat, tower.lng] as [number, number]}
                icon={makeIcon(tower, selected?.id === tower.id)}
                eventHandlers={{
                  click: () => setSelected(tower),
                }}
              >
                <Popup>
                  <div style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.5,
                    minWidth: 160,
                  }}>
                    <strong style={{ fontSize: 14 }}>{tower.name}</strong>
                    <br />
                    <span style={{ color: "#5a6a8a" }}>{tower.location}</span>
                    <br />
                    <span style={{
                      display: "inline-block",
                      marginTop: 5,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: tower.status === "ongoing" ? "#FAEEDA" : "#EAF3DE",
                      color: tower.status === "ongoing" ? "#854F0B" : "#3B6D11",
                    }}>
                      {tower.status === "ongoing" ? "Ongoing" : "Completed"}
                    </span>
                    <br />
                    <button
                      onClick={() => setSelected(tower)}
                      style={{
                        marginTop: 8,
                        padding: "4px 10px",
                        fontSize: 12,
                        borderRadius: 6,
                        border: "1px solid #185FA5",
                        background: "#185FA5",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      View details →
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map legend overlay */}
          <div style={styles.mapLegend}>
            {[
              { label: "Completed", color: "#185FA5" },
              { label: "Ongoing",   color: "#BA7517" },
            ].map(({ label, color }) => (
              <div key={label} style={styles.legendRowMap}>
                <div style={{ ...styles.legendDot, background: color }} />
                <span style={{ fontSize: 11, color: "#0a1640" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Tower count badge */}
          <div style={styles.countBadge}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#0a1640" }}>
              {towers.length}
            </span>
            <span style={{ fontSize: 11, color: "#5a6a8a", marginLeft: 4 }}>towers</span>
          </div>
        </div>

        {/* Detail panel */}
        <DetailPanel tower={selected} />
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#f0f4f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 16px",
  },
  pageHeader: {
    width: "100%",
    maxWidth: 1140,
    marginBottom: 20,
  },
  headerBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #b8962e, #f0d060)",
    color: "#0a1640",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "3px 12px",
    borderRadius: 999,
    marginBottom: 8,
  },
  h1: {
    fontSize: 26,
    fontWeight: 700,
    color: "#0a1640",
    letterSpacing: "-0.02em",
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    color: "#5a6a8a",
    marginTop: 4,
  },
  shell: {
    display: "flex",
    width: "100%",
    maxWidth: 1140,
    height: 560,
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(10,22,64,0.12)",
    boxShadow: "0 8px 40px rgba(10,22,64,0.12)",
    background: "#fff",
  },
  mapWrap: {
    flex: "1 1 0",
    position: "relative",
    minWidth: 0,
  },
  mapLegend: {
    position: "absolute",
    bottom: 24,
    left: 12,
    zIndex: 1000,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 8,
    border: "1px solid rgba(10,22,64,0.1)",
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    backdropFilter: "blur(4px)",
    pointerEvents: "none",
  },
  legendRowMap: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "2px solid #fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  countBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 1000,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 8,
    border: "1px solid rgba(10,22,64,0.1)",
    padding: "6px 12px",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "baseline",
    pointerEvents: "none",
  },
  panel: {
    flex: "0 0 270px",
    display: "flex",
    flexDirection: "column",
    borderLeft: "1px solid rgba(10,22,64,0.1)",
    background: "#fff",
    overflow: "hidden",
  },
  panelHeader: {
    padding: "16px 16px 12px",
    borderBottom: "1px solid rgba(10,22,64,0.08)",
    flexShrink: 0,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0a1640",
    lineHeight: 1.3,
    margin: 0,
  },
  panelSub: {
    fontSize: 11,
    color: "#5a6a8a",
    marginTop: 3,
    marginBottom: 0,
  },
  badge: {
    display: "inline-block",
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 9px",
    borderRadius: 999,
    flexShrink: 0,
    whiteSpace: "nowrap",
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#8a9ab5",
    maxWidth: 200,
    margin: 0,
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    fontSize: 12,
    color: "#5a6a8a",
  },
  legendSwatch: {
    width: 8,
    height: 8,
    borderRadius: 2,
    flexShrink: 0,
  },
  legendLabel: {
    flex: 1,
  },
  legendPct: {
    fontWeight: 600,
    fontSize: 12,
    color: "#0a1640",
    minWidth: 28,
    textAlign: "right",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 7,
    padding: "4px 16px 16px",
  },
  metricCard: {
    background: "#f4f6fa",
    borderRadius: 8,
    padding: "8px 10px",
    border: "1px solid rgba(10,22,64,0.06)",
  },
  metricLabel: {
    fontSize: 10,
    color: "#5a6a8a",
    margin: 0,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0a1640",
    marginTop: 2,
    marginBottom: 0,
  },
};
