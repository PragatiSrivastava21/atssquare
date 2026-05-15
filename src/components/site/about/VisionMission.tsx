import { motion } from "framer-motion";
import { Globe, Rocket } from "lucide-react";

const VisionMission = () => {
  return (
    <section className="py-24 container-px mx-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

        .vm-section {
          font-family: 'Lato', sans-serif;
        }

        .vm-badge {
          display: inline-block;
          border-radius: 9999px;
          background: linear-gradient(135deg, #b8962e 0%, #f0d060 50%, #b8962e 100%);
          padding: 4px 16px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0a1628;
          box-shadow: 0 2px 12px rgba(184,150,46,0.35);
        }

        .vm-heading {
          font-family: 'Playfair Display', serif;
          color: #0a1628;
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .vm-gold-text {
          background: linear-gradient(135deg, #b8962e 0%, #f5e07a 40%, #c9a84c 70%, #f0d060 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* --- VISION CARD --- */
        .vm-card-vision {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          padding: 2.5rem;
          background: linear-gradient(145deg, #0a1628 0%, #0d2045 60%, #0a1628 100%);
          border: 1px solid rgba(184,150,46,0.4);
          box-shadow: 0 8px 40px rgba(10,22,40,0.45), inset 0 1px 0 rgba(184,150,46,0.2);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .vm-card-vision:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(10,22,40,0.6), 0 0 40px rgba(184,150,46,0.15), inset 0 1px 0 rgba(184,150,46,0.3);
        }

        /* shimmer line top */
        .vm-card-vision::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #f0d060, transparent);
        }

        /* subtle gold grid texture */
        .vm-card-vision::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(184,150,46,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,150,46,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        /* --- MISSION CARD --- */
        .vm-card-mission {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          padding: 2.5rem;
          background: #f4f6fa;
          border: 1px solid rgba(184,150,46,0.3);
          box-shadow: 0 8px 40px rgba(10,22,40,0.10), inset 0 -1px 0 rgba(184,150,46,0.15);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .vm-card-mission:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(10,22,40,0.18), 0 0 30px rgba(184,150,46,0.12);
        }
        .vm-card-mission::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #b8962e, transparent);
        }

        /* Icon containers */
        .vm-icon-vision {
          display: grid;
          place-items: center;
          width: 56px; height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #b8962e, #f0d060);
          box-shadow: 0 4px 20px rgba(184,150,46,0.45);
          color: #0a1628;
          transition: transform 0.3s ease;
        }
        .vm-card-vision:hover .vm-icon-vision {
          transform: rotate(-8deg) scale(1.08);
        }

        .vm-icon-mission {
          display: grid;
          place-items: center;
          width: 56px; height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #0a1628, #1a3060);
          box-shadow: 0 4px 20px rgba(10,22,40,0.3);
          color: #f0d060;
          transition: transform 0.3s ease;
        }
        .vm-card-mission:hover .vm-icon-mission {
          transform: rotate(8deg) scale(1.08);
        }

        /* Card titles */
        .vm-card-vision h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 1.6rem;
          letter-spacing: -0.01em;
        }

        .vm-card-mission h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #0a1628;
          margin-top: 1.6rem;
          letter-spacing: -0.01em;
        }

        /* Highlighted label under title */
        .vm-card-vision h3 .gold-underline,
        .vm-card-mission h3 .navy-underline {
          position: relative;
          display: inline-block;
        }
        .vm-card-vision h3 .gold-underline::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f0d060, transparent);
          border-radius: 2px;
        }
        .vm-card-mission h3 .navy-underline::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0a1628, transparent);
          border-radius: 2px;
        }

        /* Body text */
        .vm-card-vision p {
          margin-top: 1.1rem;
          color: rgba(255,255,255,0.78);
          font-size: 0.97rem;
          line-height: 1.78;
          font-weight: 300;
        }
        .vm-card-mission p {
          margin-top: 1.1rem;
          color: #2e3e5c;
          font-size: 0.97rem;
          line-height: 1.78;
          font-weight: 400;
        }

        /* Highlighted phrases inside paragraphs */
        .vm-card-vision p .hl {
          color: #f5e07a;
          font-weight: 700;
        }
        .vm-card-mission p .hl {
          color: #0a1628;
          font-weight: 700;
          border-bottom: 1.5px solid #c9a84c;
          padding-bottom: 1px;
        }

        /* Corner accent */
        .vm-corner-gold {
          position: absolute;
          top: -1px; right: -1px;
          width: 60px; height: 60px;
          background: linear-gradient(225deg, rgba(184,150,46,0.35) 0%, transparent 60%);
          border-radius: 0 24px 0 0;
          pointer-events: none;
        }

        .vm-corner-navy {
          position: absolute;
          bottom: -1px; left: -1px;
          width: 60px; height: 60px;
          background: linear-gradient(45deg, rgba(10,22,40,0.12) 0%, transparent 60%);
          border-radius: 0 0 0 24px;
          pointer-events: none;
        }
      `}</style>

      <motion.div
        className="vm-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <span className="vm-badge">What Drives Us</span>
          <h2 className="vm-heading mt-5">
            Purpose-built for the{" "}
            <span className="vm-gold-text">future</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* ── VISION ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="vm-card-vision"
          >
            <div className="vm-corner-gold" />
            <div className="relative" style={{ zIndex: 1 }}>
              <div className="vm-icon-vision">
                <Globe size={26} />
              </div>
              <h3>
                Our <span className="gold-underline">Vision</span>
              </h3>
              <p>
                To be the <span className="hl">foremost provider</span> of engineering solutions
                for the wireless industry, known for our dedication to{" "}
                <span className="hl">structural excellence</span> and our ability to deliver
                results that stand the test of time. We envision a future where our innovations
                set the <span className="hl">benchmark for safety and performance</span> in
                wireless infrastructure.
              </p>
            </div>
          </motion.div>

          {/* ── MISSION ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="vm-card-mission"
          >
            <div className="vm-corner-navy" />
            <div className="relative" style={{ zIndex: 1 }}>
              <div className="vm-icon-mission">
                <Rocket size={26} />
              </div>
              <h3>
                Our <span className="navy-underline">Mission</span>
              </h3>
              <p>
                Our mission is to deliver <span className="hl">superior engineering services</span>{" "}
                that ensure the safety, stability, and efficiency of wireless infrastructure. We
                strive to exceed industry standards through our commitment to{" "}
                <span className="hl">quality, transparency</span>, and continuous improvement. By
                leveraging <span className="hl">state-of-the-art technologies</span> and our
                extensive expertise, we aim to be your trusted partner in building a{" "}
                <span className="hl">robust and reliable network</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default VisionMission;
