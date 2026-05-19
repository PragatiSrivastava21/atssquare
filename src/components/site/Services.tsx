import { motion } from "framer-motion";
import { Activity, Building2, Antenna, Layers, Wind, Bot, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroTower from "@/assets/thermal.png";
import networkAerial from "@/assets/self.jpg";
import towerSlide1 from "@/assets/tower-slide-1.jpg";
import towerSlide2 from "@/assets/mm.png";
import services1 from "@/assets/services-1.jpg";
import services2 from "@/assets/1.jpeg";
import services3 from "@/assets/drawing.jpg";
import services4 from "@/assets/foundation.jpeg";
import services5 from "@/assets/services-5.png";
import services6 from "@/assets/fea.jpeg";
import services7 from "@/assets/img.png";

const services = [
  {
    icon: Activity,
    title: "Tower Structural Analysis",
    desc: "TIA-222-H compliant assessment of existing towers under current and future load profiles.",
    details:
      "ATSS provides comprehensive tower structural analysis services to evaluate the overall stability, strength, and safety of telecom towers under existing and proposed loading conditions. Our analysis covers wind loads, seismic forces, equipment additions, and future expansion scenarios in accordance with applicable national and international standards. Using advanced analytical tools and AI-assisted validation, we identify overstressed members, assess reserve capacity, and recommend strengthening solutions to ensure long-term structural reliability and regulatory compliance.",
    code: "01",
    image: services1,
  },
  {
    icon: Building2,
    title: "Structural Modification Design, Drawings & Construction Support",
    desc: "Modification of self-support, guyed tower and monopole engineered according to carrier needs and new 5G load requirements.",
    details:
      "ATSS offers end-to-end structural modification, design, and construction support services for existing telecom infrastructure. This includes strengthening of towers and mounts, retrofitting for additional equipment, and design support for construction and erection activities. Our engineering teams work closely with field and construction teams to ensure safe implementation, constructability, and compliance with design intent. AI-assisted planning and documentation help streamline execution, reduce downtime, and improve overall project efficiency.",
    code: "02",
    image: services2,
  },
  {
    icon: Antenna,
    title: "AI-Driven Mobile Application Services",
    desc: "ATSS provides a powerful AI-driven mobile application that digitally integrates field inspections, engineering analysis, and reporting.",
    details:
      "ATSS provides a powerful AI-driven mobile application that digitally integrates field inspections, engineering analysis, and reporting. The app supports tower and mount inspections through guided workflows, intelligent checklists, and AI-based image recognition for defect identification. Key features include auto generated COAX layouts based on site data, azimuths, and equipment configuration, real-time progress tracking, and automated data validation. Multi-language, one-click report generation ensures fast, standardized, and client-ready deliverables.",
    code: "03",
    image: towerSlide1,
  },
  {
    icon: Layers,
    title: "New Tower Design",
    desc: "Geotechnical-driven foundation review, retrofit / overturning assessment.",
    details:
      "ATSS specializes in the design of new telecom towers and antenna mounting structures tailored to site-specific and client-specific requirements. Our designs emphasize structural efficiency, constructability, durability, and future upgrade flexibility. By combining intelligent design automation with engineering expertise, we deliver optimized solutions that reduce material usage, improve constructability, and support long-term network expansion.",
    code: "04",
    image: towerSlide2,
  },
  {
    icon: Wind,
    title: "Mount Analysis and Design",
    desc: "Antenna mount analysis services focus on verifying the structural adequacy and load-bearing performance of antenna mounts installed on towers, rooftops, poles, and other supporting structures",
    details:
      "Our antenna mount analysis services focus on verifying the structural adequacy and load-bearing performance of antenna mounts installed on towers, rooftops, poles, and other supporting structures. We assess mount alignment, connection integrity, and behavior under wind, eccentric, and combined loading conditions. AI-enabled engineering workflows allow faster evaluation of multiple mounting configurations while ensuring safety, precision, and optimal antenna performance.",
    code: "05",
    image:  services7 ,
  },
  {
    icon: Bot,
    title: "Tower & Mount Drawings",
    desc: "Drone-fed computer vision detects corrosion, bolt fatigue and weld defects in minutes.",
    details:
      "We deliver high-quality structural drawings and detailed engineering documentation for towers, mounts, and associated components. Our drawings include general arrangements, member details, connection details, foundation layouts, and installation guidelines suitable for fabrication, erection, and inspection. AI-assisted drafting ensures accuracy, consistency, and reduced turnaround time while meeting industry and client standards.",
    code: "06",
    image: services3,
  },
  {
    icon: Layers,
    title: "Foundation Analysis",
    desc: "Detailed footing and soil-structure interaction review for stable tower support and uplift resistance.",
    details:
      "ATSS provides detailed foundation analysis services for telecom towers and supporting structures. This includes evaluating soil-structure interaction, bearing capacity, settlement, uplift, and overturning under combined loading conditions. Our foundation analysis ensures that structural loads are safely transferred to the ground while meeting geotechnical and structural design requirements. AI-assisted optimization helps achieve cost-effective and constructible foundation solutions.",
    code: "07",
    image: services4,
  },
  {
    icon: Wind,
    title: "Finite Element Analysis (FEA)",
    desc: "Advanced structural simulation to validate stress, deflection and fatigue performance under load.",
    details:
      "ATSS offers advanced Finite Element Analysis (FEA) services to evaluate complex structural behavior that cannot be accurately captured using conventional methods. FEA is applied to critical components such as bolted and welded connections, base plates, gussets, brackets, and special structural elements. Through detailed stress, strain, deformation, and fatigue analysis, we help optimize designs, validate safety margins, and improve structural performance under real-world loading conditions.",
  
    code: "08",
    image: services6,
  },
  {
    icon: Activity,
    title: "Thermal Analysis",
    desc: "Thermal mapping and heat transfer assessment for joints, coatings, and high-temperature load cases.",
    details:
      "Our thermal and heat analysis services assess the impact of temperature variations and heat generation on telecom structures and equipment. This includes evaluating thermal expansion effects, material performance in extreme climates, and heat dissipation from active telecom equipment such as radios, RRUs, and power units. AI-driven simulations help predict long-term behavior, reduce thermal stress risks, and ensure safe operation in diverse environmental conditions.",
  
    code: "09",
    image: heroTower,
  },
  {
    icon: Building2,
    title: "SolidWorks 3D Structural Modelling",
    desc: "Parametric 3D models and assemblies for detailed design review, fabrication, and BIM coordination.",
    details:
      "We offer SolidWorks-based 3D modeling services for telecom towers, mounts, and structural components. Detailed 3D models improve design visualization, coordination, and clash detection while supporting fabrication accuracy. These models are also used for advanced analysis, simulation, and digital documentation, enabling smarter engineering decisions and improved project execution.",
    code: "10",
    image: networkAerial,
  },
  {
    icon: Antenna,
    title: "Corrosion Analysis & Structural Repairs",
    desc: "Inspection-driven repair plans to restore strength, prevent failure, and extend tower service life.",
    details:
      "ATSS provides corrosion assessment and mitigation services to evaluate material degradation caused by environmental exposure, aging, and operational conditions. Our corrosion analysis includes visual inspections, section loss evaluation, coating condition assessment, and remaining life estimation. Based on findings, we develop structural modification and strengthening solutions such as member replacement, reinforcement, protective coating systems, and corrosion-resistant design upgrades to extend asset life and ensure continued structural safety.",
    code: "11",
    image: services5,
  },
];

const Services = () => {
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 bg-background">
     <div className="relative w-full px-6 md:px-12 lg:px-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            const hasLink = "link" in s && !!s.link;

            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-500 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1"
              >
                <img
  src={s.image}
  alt={s.title}
  className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${isActive ? "scale-105 blur-sm" : ""}`}
/>
              <div className={`absolute inset-0 transition-all duration-500 ${isActive ? "bg-black/60 backdrop-blur-sm" : "bg-black/35 group-hover:bg-black/30"}`} />

                <div className="relative flex min-h-[28rem] flex-col justify-between p-7 text-white">
                  <div className="relative flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white transition-all group-hover:bg-yellow-500 group-hover:text-slate-900">
                      <Icon size={20} />
                    </div>
                    <span className="font-display text-xs text-white/80">{s.code}</span>
                  </div>

                  <div>
                    <h3 className="relative mt-6 font-display text-2xl font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-white/80">
                      {s.desc}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="relative mt-5 border-t border-white/20 pt-5 text-sm text-white/80"
                    >
                      <p>{s.details}</p>

                      {/* Detail page link — only renders for services that have a link field */}
                      {hasLink && (
                        <button
                          type="button"
                          onClick={() => navigate((s as typeof s & { link: string }).link)}
                          className="mt-4 inline-flex items-center gap-1.5 font-medium text-yellow-400 underline-offset-4 transition-colors hover:text-yellow-300 hover:underline"
                        >
                          Learn more about this service
                          <ArrowUpRight size={14} />
                        </button>
                      )}
                    </motion.div>
                  )}

                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : i)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-300"
                  >
                    <span>{isActive ? "Show less" : "Read more"}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
