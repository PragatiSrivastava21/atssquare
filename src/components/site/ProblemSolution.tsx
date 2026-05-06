import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import staticMap from "@/assets/map.jpeg";

type PinStatus = "ok" | "warn" | "critical";

interface TowerPinProps {
  label: string;
  status?: PinStatus;
}

interface MetricChipProps {
  value: number | string;
  unit: string;
  label: string;
  color?: string;
  bgColor?: string;
  trend?: "up" | "down" | "stable";
}

// ─── Tower Pin ─────────────────────────────────────────────────────────────
const TowerPin: React.FC<TowerPinProps> = ({ label, status = "ok" }) => {
  const colors: Record<PinStatus, { dot: string; ring: string; line: string; glow: string }> = {
    ok: {
      dot: "bg-blue-400",
      ring: "rgba(59,130,246,0.3)",
      line: "bg-blue-400",
      glow: "0 0 12px rgba(59,130,246,0.8)",
    },
    warn: {
      dot: "bg-amber-400",
      ring: "rgba(245,158,11,0.3)",
      line: "bg-amber-400",
      glow: "0 0 12px rgba(245,158,11,0.8)",
    },
    critical: {
      dot: "bg-red-500",
      ring: "rgba(239,68,68,0.3)",
      line: "bg-red-500",
      glow: "0 0 12px rgba(239,68,68,0.9)",
    },
  };

  const c = colors[status];

  return (
    <div className="group absolute -translate-x-1/2 -translate-y-full flex flex-col items-center cursor-pointer z-10">
      {/* Tooltip */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm border border-white/15 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl">
        {label}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 border-r border-b border-white/15 rotate-45" />
      </div>

      {/* Outer pulse ring */}
      <div
        className={`absolute w-5 h-5 rounded-full ${c.dot} opacity-20`}
        style={{ animation: "outerPulse 2s ease-out infinite" }}
      />

      {/* Dot */}
      <div
        className={`w-3 h-3 rounded-full ${c.dot} border-2 border-white/80 relative z-10`}
        style={{ boxShadow: c.glow }}
      />
      {/* Stem */}
      <div className={`w-px h-5 ${c.line} opacity-60`} />
      {/* Base dot */}
      <div className={`w-1.5 h-1.5 rounded-full ${c.dot} opacity-50`} />
    </div>
  );
};

// ─── Animated Tower SVG ────────────────────────────────────────────────────
const AnimatedTower: React.FC = () => (
  <svg
    width="100"
    height="170"
    viewBox="0 0 90 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative z-10 drop-shadow-[0_0_18px_rgba(59,130,246,0.5)]"
  >
    {/* Main legs */}
    <line x1="45" y1="10" x2="15" y2="150" stroke="url(#legGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="45" y1="10" x2="75" y2="150" stroke="url(#legGrad)" strokeWidth="2.5" strokeLinecap="round" />

    {/* Horizontal cross-members */}
    <line x1="22" y1="50" x2="68" y2="50" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7" />
    <line x1="18" y1="80" x2="72" y2="80" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7" />
    <line x1="14" y1="110" x2="76" y2="110" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7" />
    <line x1="10" y1="140" x2="80" y2="140" stroke="#3b82f6" strokeWidth="2" opacity="0.9" />

    {/* Diagonal braces */}
    <line x1="22" y1="50" x2="33" y2="80" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
    <line x1="68" y1="50" x2="57" y2="80" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
    <line x1="18" y1="80" x2="28" y2="110" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
    <line x1="72" y1="80" x2="62" y2="110" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
    <line x1="14" y1="110" x2="24" y2="140" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />
    <line x1="76" y1="110" x2="66" y2="140" stroke="#60a5fa" strokeWidth="1" opacity="0.4" />

    {/* Antenna */}
    <line x1="45" y1="0" x2="45" y2="12" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
    {/* Antenna arms */}
    <line x1="38" y1="6" x2="45" y2="10" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
    <line x1="52" y1="6" x2="45" y2="10" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />

    {/* Blinking beacon */}
    <circle cx="45" cy="0" r="3.5" fill="#f59e0b">
      <animate attributeName="opacity" values="1;0.1;1" dur="1.1s" repeatCount="indefinite" />
      <animate attributeName="r" values="3;4.5;3" dur="1.1s" repeatCount="indefinite" />
    </circle>

    {/* Signal arcs */}
    <path d="M 55 -8 Q 70 0 55 8" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.5">
      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
    </path>
    <path d="M 62 -14 Q 82 0 62 14" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.3">
      <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
    </path>

    <defs>
      <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

// ─── Metric Chip ───────────────────────────────────────────────────────────
const MetricChip: React.FC<MetricChipProps> = ({
  value,
  unit,
  label,
  color = "text-blue-400",
  bgColor = "rgba(59,130,246,0.06)",
  trend,
}) => (
  <div
    className="flex-1 rounded-xl p-3 text-center border border-white/[0.07] relative overflow-hidden"
    style={{ background: bgColor }}
  >
    <div className="absolute inset-0 opacity-10"
      style={{ background: "radial-gradient(circle at 50% 0%, white, transparent 70%)" }} />
    <span className={`block font-mono text-2xl font-bold ${color} relative`}>
      {value}
      <span className="text-xs font-normal ml-0.5 opacity-80">{unit}</span>
    </span>
    <span className="block text-[10px] text-slate-500 uppercase tracking-widest mt-1">
      {label}
    </span>
    {trend && (
      <span className={`text-[9px] mt-0.5 block font-semibold ${
        trend === "up" ? "text-red-400" : trend === "down" ? "text-green-400" : "text-slate-500"
      }`}>
        {trend === "up" ? "▲ Rising" : trend === "down" ? "▼ Falling" : "● Stable"}
      </span>
    )}
  </div>
);

// ─── Sparkline ─────────────────────────────────────────────────────────────
const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200, h = 40;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill={color}
        fillOpacity="0.08"
        stroke="none"
      />
    </svg>
  );
};

// ─── Pin data ──────────────────────────────────────────────────────────────
interface PinData {
  left: string;
  top: string;
  label: string;
  status: PinStatus;
}

const PINS: PinData[] = [
  { left: "22%", top: "26%", label: "Tower A-12", status: "ok" },
  { left: "60%", top: "20%", label: "Tower B-07 ⚠", status: "critical" },
  { left: "80%", top: "52%", label: "Tower C-21", status: "ok" },
  { left: "45%", top: "58%", label: "Tower D-03", status: "warn" },
  { left: "15%", top: "72%", label: "Tower E-15", status: "ok" },
  { left: "68%", top: "78%", label: "Tower F-09", status: "ok" },
];

const LEGEND = [
  { color: "bg-blue-500", glow: "shadow-[0_0_6px_rgba(59,130,246,0.8)]", label: "Operational" },
  { color: "bg-amber-400", glow: "shadow-[0_0_6px_rgba(245,158,11,0.8)]", label: "Under Review" },
  { color: "bg-red-500", glow: "shadow-[0_0_6px_rgba(239,68,68,0.8)]", label: "Critical Alert" },
];

const RING_SIZES = [70, 110, 155, 200];

// ─── Main ──────────────────────────────────────────────────────────────────
const MapSection: React.FC = () => {
  const [loadFactor, setLoadFactor] = useState(87);
  const [windSpeed, setWindSpeed] = useState(34);
  const [uptime, setUptime] = useState(99.4);
  const [tick, setTick] = useState(0);
  const [loadHistory, setLoadHistory] = useState<number[]>([82, 85, 87, 84, 89, 86, 88, 87]);
  const [windHistory, setWindHistory] = useState<number[]>([30, 33, 35, 32, 38, 34, 36, 34]);

  useEffect(() => {
    const id = setInterval(() => {
      const newLoad = Math.round(84 + Math.random() * 8);
      const newWind = Math.round(30 + Math.random() * 12);
      setLoadFactor(newLoad);
      setWindSpeed(newWind);
      setUptime(parseFloat((99 + Math.random() * 0.9).toFixed(1)));
      setLoadHistory(prev => [...prev.slice(-7), newLoad]);
      setWindHistory(prev => [...prev.slice(-7), newWind]);
      setTick(t => t + 1);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#07090f]">

      {/* Ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.03] blur-3xl"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.15]" style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(6, 4, 39, 0.04) 39px,rgba(255,255,255,0.04) 40px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,0.04) 59px,rgba(255,255,255,0.04) 60px)",
      }} />

      <div className="relative max-w-7xl mx-auto px-3 md:px-4">

        {/* ── Header ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-semibold tracking-widest text-blue-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Infrastructure Monitoring
            </span>
            <span className="text-[11px] text-slate-600 font-mono">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100 leading-tight max-w-2xl">
            Tower Network Coverage &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Live Structural Health
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl leading-relaxed">
            Real-time geospatial mapping of active cell towers combined with AI-driven
            structural diagnostics — every node, every stress point, always visible.
          </p>

          {/* Summary stats row */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { val: "47", label: "Active Towers", color: "text-blue-400" },
              { val: "2", label: "Critical Alerts", color: "text-red-400" },
              { val: `${uptime}%`, label: "Network Uptime", color: "text-green-400" },
              { val: "142K", label: "FEA Nodes", color: "text-amber-400" },
            ].map(({ val, label, color }) => (
              <div key={label} className="flex flex-col">
                <span className={`font-mono text-2xl font-bold ${color}`}>{val}</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-5">

          {/* ── LEFT: MAP ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className=" order-2 lg:order-2 rounded-2xl max-w-7xl border border-white/[0.08] bg-[#0d1117] overflow-hidden flex flex-col"
            style={{ boxShadow: "0 0 40px rgba(149, 181, 231, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            {/* Card header */}
            <div className="flex order-1 lg:order-1 items-center gap-2.5 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
              <span className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase">
                Deployment Map
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-mono">North Region</span>
                <span className="bg-blue-500/15 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/20">
                  47 Assets
                </span>
              </div>
            </div>

            {/* Map area */}
            <div className="relative flex-1 overflow-hidden min-h-[360px]">
              <img
                src={staticMap}
                alt="Tower deployment map"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-[#07090f]/50" />
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(7,9,15,0.6) 100%)" }} />

              {/* Corner brackets */}
              {[
                "top-3 left-3 border-t border-l",
                "top-3 right-3 border-t border-r",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((cls) => (
                <div key={cls} className={`absolute w-5 h-5 ${cls} border-blue-400/40`} />
              ))}

              {/* Scan line */}
              <div
                className="absolute left-0 right-0 h-px z-20"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.8) 30%, rgba(147,197,253,1) 50%, rgba(59,130,246,0.8) 70%, transparent)",
                  animation: "scanMove 3.5s linear infinite",
                  boxShadow: "0 0 8px rgba(59,130,246,0.6)",
                }}
              />

              {/* Pins */}
              <div className="absolute inset-0 z-10">
                {PINS.map((pin) => (
                  <div key={pin.label} className="absolute" style={{ left: pin.left, top: pin.top }}>
                    <TowerPin label={pin.label} status={pin.status} />
                  </div>
                ))}
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-[#07090f] via-[#07090f]/60 to-transparent z-20 flex items-end justify-between">
                <div>
                  <div className="font-mono text-4xl font-bold text-blue-400 leading-none"
                    style={{ textShadow: "0 0 20px rgba(59,130,246,0.6)" }}>
                    47
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                    Active Towers
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  {LEGEND.map(({ color, glow, label }) => (
                    <div key={label} className="flex items-center gap-2 text-[10px] text-slate-400">
                      <div className={`w-2 h-2 rounded-full ${color} ${glow}`} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: HEALTH MONITOR ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-white/[0.08] bg-[#0d1117] overflow-hidden flex flex-col"
            style={{ boxShadow: "0 0 40px rgba(59,130,246,0.05), inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            {/* Card header */}
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase flex-1">
                Structural Health Monitor
              </span>
              <span className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live
              </span>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col items-center justify-center gap-5 p-6"
              style={{ background: "radial-gradient(ellipse at center top, rgba(59,130,246,0.06) 0%, transparent 65%)" }}
            >
              {/* Tower + rings */}
              <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
                {RING_SIZES.map((size, i) => (
                  <div
                    key={size}
                    className="absolute rounded-full"
                    style={{
                      width: size,
                      height: size,
                      border: "1.5px solid rgba(59,130,246,0.5)",
                      animation: `ringOut 2.8s ease-out ${i * 0.7}s infinite`,
                    }}
                  />
                ))}
                {/* Center glow */}
                <div className="absolute w-16 h-16 rounded-full opacity-20 blur-xl"
                  style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
                <AnimatedTower />
              </div>

              {/* Metric chips */}
              <div className="flex gap-2.5 w-full">
                <MetricChip
                  value={loadFactor}
                  unit="%"
                  label="Load Factor"
                  color="text-blue-400"
                  bgColor="rgba(59,130,246,0.06)"
                  trend={loadFactor > 88 ? "up" : "stable"}
                />
                <MetricChip
                  value={windSpeed}
                  unit="m/s"
                  label="Wind Speed"
                  color="text-amber-400"
                  bgColor="rgba(245,158,11,0.06)"
                  trend={windSpeed > 38 ? "up" : "down"}
                />
                <MetricChip
                  value={2}
                  unit=""
                  label="Alerts"
                  color="text-red-400"
                  bgColor="rgba(239,68,68,0.06)"
                  trend="stable"
                />
              </div>

              {/* Sparklines */}
              <div className="w-full grid grid-cols-2 gap-2.5">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-2">Load History</div>
                  <Sparkline data={loadHistory} color="#60a5fa" />
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-2">Wind History</div>
                  <Sparkline data={windHistory} color="#fbbf24" />
                </div>
              </div>

              {/* FEA stress bar */}
              <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">FEA Stress Analysis</div>
                  <div className="text-[10px] font-mono text-amber-400 font-semibold">87%</div>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-2 relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "87%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: "linear-gradient(90deg, #3b82f6, #60a5fa, #f59e0b)" }}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 opacity-40"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                        animation: "shimmer 2s linear infinite",
                        backgroundSize: "200% 100%",
                      }} />
                  </motion.div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-600">
                  <span>0 nodes</span>
                  <span className="text-amber-400/80 font-semibold">142,000 nodes computed</span>
                  <span>163,000</span>
                </div>
              </div>

              {/* Alert log */}
              <div className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 space-y-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Recent Alerts</div>
                {[
                  { time: "02:14", msg: "Tower B-07 — wind load exceeded threshold", color: "text-red-400", dot: "bg-red-500" },
                  { time: "01:48", msg: "Tower D-03 — scheduled inspection due", color: "text-amber-400", dot: "bg-amber-400" },
                ].map(({ time, msg, color, dot }) => (
                  <div key={time} className="flex items-start gap-2.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot} mt-1 shrink-0`} />
                    <span className="font-mono text-[10px] text-slate-600 shrink-0">{time}</span>
                    <span className={`text-[11px] ${color}`}>{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes scanMove {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ringOut {
          0%   { opacity: 0.7; transform: scale(0.3); }
          100% { opacity: 0;   transform: scale(1);   }
        }
        @keyframes outerPulse {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0;   }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default MapSection;