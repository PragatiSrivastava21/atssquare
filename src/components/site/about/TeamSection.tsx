import { motion } from "framer-motion";
import { User } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const team: TeamMember[] = [
   {
    name: "Project Coordination Specialist",
    role: "Operations",
    bio: "Managing project workflows, client communication, and execution processes to ensure timely and high-quality delivery.",
  },
   {
    name: "Drafting Specialist",
    role: "CAD",
    bio: "Providing accurate CAD drafting and structural detailing solutions for tower projects, ensuring precision, clarity, and smooth execution.",
  },
  {
    name: "Structural Analysis Engineer",
    role: "Engineering",
    bio: "Specialized in telecom tower structural analysis, ensuring safety, precision, and optimized engineering solutions for complex infrastructure projects.",
  },
  {
    name: "Design & Simulation Expert",
    role: "R&D",
    bio: "Focused on advanced modeling, FEA/CFD simulations, and innovative design strategies to improve tower performance and reliability.",
  },
 
  {
    name: "Others",
    role: "Engineering",
    bio: "Specialized in reviewing reports and providing insights for various engineering aspects.",
  },
 
];

const styles = `
  /* Second row: flex centered, cards match grid column width on desktop */
  .team-second-row {
    display: flex;
    justify-content: center;
    gap: 1.5rem; /* matches gap-6 = 24px */
    flex-wrap: wrap;
  }

  @media (max-width: 1023px) {
    .team-second-row-card {
      width: 100%;
    }
  }

  /* On sm (640px+) mirror the 2-col grid */
  @media (min-width: 640px) and (max-width: 1023px) {
    .team-second-row-card {
      width: calc((100% - 1.5rem) / 2);
    }
  }

  /* On desktop mirror the 3-col grid: (100% - 2*gap) / 3 */
  @media (min-width: 1024px) {
    .team-second-row-card {
      width: calc((100% - 2 * 1.5rem) / 3);
      max-width: calc((100% - 2 * 1.5rem) / 3);
    }
  }
`;

const TeamSection = () => {
  const firstRow = team.slice(0, 3);
  const secondRow = team.slice(3);

  return (
    <section className="py-20 md:py-28 container-px mx-auto">
      <style>{styles}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          Our People
        </span>
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Our <span className="text-gradient-hero">Team</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          A dedicated team of engineers and specialists driving excellence in every project.
        </p>
      </motion.div>

      {/* Row 1 — CSS Grid: 1 col → 2 col → 3 col */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {firstRow.map((member: TeamMember, i: number) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40"
            style={{
              boxShadow: "var(--shadow-card, 0 2px 8px rgba(0,0,0,0.08))",
            }}
            whileHover={{
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.15)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-muted-foreground/50 mb-5 transition-all duration-500 group-hover:bg-primary/10 group-hover:text-primary group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                <User size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                {member.name}
              </h3>
              <span className="mt-1 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
                {member.role}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 2 — Flexbox centered; cards match grid column width */}
      <div className="team-second-row mt-6">
        {secondRow.map((member: TeamMember, i: number) => (
          <div key={member.name} className="team-second-row-card">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 3) * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 h-full"
              style={{
                boxShadow: "var(--shadow-card, 0 2px 8px rgba(0,0,0,0.08))",
              }}
              whileHover={{
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.15)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-muted-foreground/50 mb-5 transition-all duration-500 group-hover:bg-primary/10 group-hover:text-primary group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                  <User size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {member.name}
                </h3>
                <span className="mt-1 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
                  {member.role}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
