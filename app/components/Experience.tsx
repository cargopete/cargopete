"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin } from "lucide-react";

const monthMap: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function formatPeriodWithDuration(period: string): string {
  const [startStr, endStr] = period.split(" - ");
  const [startMonth, startYear] = startStr.split(" ");
  const startDate = new Date(parseInt(startYear), monthMap[startMonth]);

  let endDate: Date;
  if (endStr === "Present") {
    endDate = new Date();
  } else {
    const [endMonth, endYear] = endStr.split(" ");
    endDate = new Date(parseInt(endYear), monthMap[endMonth]);
  }

  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration: string;
  if (years === 0) {
    duration = `${months} month${months !== 1 ? "s" : ""}`;
  } else if (months === 0) {
    duration = `${years} year${years !== 1 ? "s" : ""}`;
  } else {
    duration = `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
  }

  return `${period} (${duration})`;
}

const experiences = [
  {
    company: "Fathom.io",
    role: "AI Infrastructure Engineer",
    period: "Apr 2025 - Present",
    location: "Remote, UAE",
    current: true,
    highlights: [
      "Building scalable Rust backend systems for high-performance AI-driven data platforms",
      "Collaborating cross-functionally with product, design, and engineering to shape requirements",
      "Refactoring and optimizing systems to boost performance and maintainability",
    ],
  },
  {
    company: "GraphOps",
    role: "Senior Rust Engineer",
    period: "Jul 2022 - Apr 2025",
    location: "Remote",
    highlights: [
      "Designed and built distributed P2P messaging protocol using Rust, Waku, and libp2p",
      "Developed high-performance Rust backend services handling millions of messages",
      "Built yew.rs frontend application for developer tooling",
      "Core developer on critical infrastructure serving global distributed nodes",
    ],
  },
  {
    company: "The Graph",
    role: "Rust Engineer & Developer Advocate",
    period: "Mar 2021 - Jul 2024",
    location: "Remote",
    volunteer: "Developer Advocate (Dec 2021 - Jul 2024)",
    highlights: [
      "Created and maintained the ecosystem's standard testing framework (Matchstick)",
      "Technologies: Rust, AssemblyScript, WebAssembly",
      "Volunteered as Technical Teacher and Community Advocate",
      "Mentored developers and contributed to ecosystem tooling",
      "Grew adoption through documentation, tutorials, and developer support",
    ],
  },
  {
    company: "Kraken",
    role: "Rust Engineer",
    period: "Dec 2021 - Jul 2022",
    location: "Remote",
    highlights: [
      "Worked on developer tools that simplify HTTP API testing",
      "Improved testing infrastructure for cryptocurrency exchange APIs",
    ],
  },
  {
    company: "OVO Energy",
    role: "Full Stack Engineer",
    period: "Jan 2020 - Mar 2021",
    location: "Remote, UK",
    highlights: [
      "Maintained and improved scheduling product for field engineer appointments",
      "Microservices-based Kotlin backend with Quarkus framework",
      "Built Flutter mobile app from scratch",
      "Developed React web application",
      "Technologies: AWS, Docker, GraphQL, TypeScript, Gradle",
    ],
  },
  {
    company: "WeiChain",
    role: "Junior Software Engineer",
    period: "Jan 2019 - Jan 2020",
    location: "Sofia, Bulgaria",
    highlights: [
      "Wrote smart contracts on Ethereum and Aeternity blockchains",
      "Created React-based web applications for blockchain interactions",
      "Built and deployed decentralized cryptocurrency exchange to mainnet",
      "Developed atomic swap widget for trustless cross-chain trading",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-terminal-green font-mono text-sm mb-2">
              // WORK_HISTORY.log
            </h2>
            <div className="h-1 w-20 bg-rust-orange"></div>
            <p className="mt-4 text-foreground/70 font-mono text-sm">
              <span className="text-terminal-blue">$</span> tail -f
              career.log
            </p>
          </div>

          {/* Timeline */}
          <div className="relative border-l-2 border-border pl-8 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[41px] w-6 h-6 rounded-full border-4 ${
                    exp.current
                      ? "bg-terminal-green border-terminal-green animate-pulse"
                      : "bg-rust-orange border-background"
                  }`}
                ></div>

                {/* Content */}
                <div className="mb-2">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <h3 className="font-mono text-xl text-foreground font-bold flex items-center gap-2">
                      {exp.company}
                      {exp.current && (
                        <span className="text-xs px-2 py-1 bg-terminal-green/20 text-terminal-green border border-terminal-green rounded">
                          Current
                        </span>
                      )}
                    </h3>
                    <span className="font-mono text-sm text-foreground/60">
                      {formatPeriodWithDuration(exp.period)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <span className="text-rust-orange font-semibold">
                      {exp.role}
                    </span>
                    <div className="flex items-center gap-1 text-foreground/60">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono text-xs">{exp.location}</span>
                    </div>
                  </div>

                  {exp.volunteer && (
                    <p className="text-xs text-terminal-blue font-mono mb-2">
                      + {exp.volunteer}
                    </p>
                  )}

                  {/* Highlights */}
                  <ul className="space-y-2 mt-3">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <span className="text-rust-orange mt-1">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
