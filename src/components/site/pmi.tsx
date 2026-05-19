import { useState } from "react";

function ServiceCard({ icon, title, subtitle, features, accent, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-3xl p-8 flex flex-col gap-4 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(160deg, #0f2044 0%, #122554 100%)"
          : "linear-gradient(160deg, #0d1d3e 0%, #102050 100%)",
        boxShadow: hovered
          ? `0 24px 60px -12px ${accent}55, 0 4px 20px -4px ${accent}33`
          : "0 8px 40px -8px rgba(0,0,0,0.4), 0 2px 12px -2px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
        animationDelay: delay,
        animation: "fadeUp 0.7s ease both",
        border: `1.5px solid ${hovered ? accent + "66" : "#1e3a6e"}`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-10 right-10 h-[3px] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
        style={{
          background: `linear-gradient(135deg, ${accent}28, ${accent}10)`,
          border: `1px solid ${accent}44`,
          transition: "transform 0.3s ease",
          transform: hovered ? "rotate(-4deg) scale(1.08)" : "rotate(0deg) scale(1)",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h3
          className="text-xl font-bold tracking-tight mb-1"
          style={{ fontFamily: "'Playfair Display', serif", color: "#ffffff" }}
        >
          {title}
        </h3>
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: accent }}>
          {subtitle}
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#94afd4" }}>
          {features.description}
        </p>
        <ul className="space-y-1.5">
          {features.list.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#b8cfe8" }}>
              <span
                className="mt-1 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: `${accent}28` }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .badge-shimmer {
          background: linear-gradient(90deg, #e8e4d0 0%, #f5f0dc 40%, #e8e4d0 80%);
          background-size: 400px 100%;
          animation: shimmer 2.8s infinite linear;
        }
      `}</style>

      <div
        className="flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
        style={{
          background: "#ffffff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Header */}
        <div
          className="text-center mb-10 relative z-10"
          style={{ animation: "fadeUp 0.6s ease both" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 badge-shimmer">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c9a227" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#9a7a1a" }}>
              Premium Offerings
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #0d1d3e 30%, #c9a227 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Precision. Trust.
            <br />
            <span style={{ fontStyle: "italic" }}>Expertise.</span>
          </h1>

          <p className="max-w-md mx-auto text-lg leading-relaxed" style={{ color: "#0a1640" }}>
            Two cornerstone services, engineered to deliver clarity and confidence
            at every stage of your project lifecycle.
          </p>

          {/* Divider ornament */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a227)" }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#c9a227" }} />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a227)" }} />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl relative z-10">
          <ServiceCard
            icon="📋"
            title="PMI Closeout Reports"
            subtitle="Project Intelligence"
            accent="#c9a227"
            delay="0.15s"
            features={{
              description:
                "Comprehensive, audit-ready closeout documentation that captures every milestone, deliverable, and critical data — giving stakeholders the full picture.",
              list: [
                "Full project lifecycle documentation for each and every step.",
                "We ensure that documents are accepted by the stakeholders.",
                "Continously improved PMI standards",
              ],
            }}
          />
          <ServiceCard
            icon="🗼"
            title="Tower Inspection"
            subtitle="Structural Integrity"
            accent="#4a9fd4"
            delay="0.28s"
            features={{
              description:
                "Rigorous, certified tower assessments using the latest equipment and protocols — ensuring structural integrity, safety compliance, and long-term reliability.",
              list: [
                "Visual & structural assessment",
                "Non destructive testing. Ex- Ultrasonic Testing, Magnetic Particle Testing",
                "Corrosion assessment above and below grade",
                 "Detailed photographic reporting",
                "Safety compliance certification",
               
              ],
            }}
          />
        </div>

        {/* Bottom tag 
        <p
          className="mt-10 text-lg tracking-widest uppercase font-bold z-10 relative"
          style={{
            color: "#f0b916",
            animation: "fadeUp 0.9s ease both",
            animationDelay: "0.5s",
          }}
        >
          Trusted by industry leaders worldwide
        </p>*/}
      </div>
    </>
  );
}