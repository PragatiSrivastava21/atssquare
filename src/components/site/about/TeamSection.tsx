import { motion } from "framer-motion";
import { User } from "lucide-react";

const team = [
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
    name: "Project Coordination Specialist",
    role: "Operations",
    bio: "Managing project workflows, client communication, and execution processes to ensure timely and high-quality delivery.",
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 md:py-28 container-px mx-auto">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-elevated)] hover:border-primary/40 hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-muted-foreground/50 mb-5 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <User size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
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
    </section>
  );
};

export default TeamSection;
