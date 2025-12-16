"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Fathom.io",
    role: "Senior Rust Engineer",
    period: "Apr 2025 - Present",
    location: "Remote, UAE",
    current: true,
    highlights: [
      "Developed scalable backend systems in Rust for high-performance data and AI-driven platforms",
      "Collaborated cross-functionally with product managers, designers, and engineers",
      "Refactored legacy systems to boost performance and maintainability",
    ],
  },
  {
    company: "Audita",
    role: "Technical Advisor",
    period: "Apr 2025 - Nov 2025",
    location: "Remote",
    highlights: [
      "Smart contract audits with focus on Rust security and testing best practices",
      "Identified vulnerabilities and established secure development patterns",
      "Provided technical insights for robust audit processes",
    ],
  },
  {
    company: "Eiger",
    role: "Senior Rust Engineer",
    period: "Sep 2024 - Mar 2025",
    location: "Remote",
    highlights: [
      "Contributed to Polka Storage - decentralized storage parachain",
      "Designed and developed core infrastructure components",
    ],
  },
  {
    company: "GraphOps",
    role: "Senior Rust Engineer",
    period: "Jul 2022 - Sep 2024",
    location: "Remote",
    highlights: [
      "Designed distributed communication protocol using Rust and Waku",
      "Built Rust-based backend services and yew.rs frontend application",
      "Core developer team working on The Graph protocol",
    ],
  },
  {
    company: "The Graph",
    role: "Rust Engineer & Graph Advocate",
    period: "Mar 2021 - Jul 2024",
    location: "Remote",
    volunteer: "Graph Advocate (volunteer)",
    highlights: [
      "Created first full-fledged testing framework for subgraphs (Rust, AssemblyScript, WebAssembly)",
      "Technical Teacher and Community Care Advocate",
      "Helped developers contribute to Web3 and The Graph ecosystem",
    ],
  },
  {
    company: "Kraken Digital Asset Exchange",
    role: "Rust Engineer",
    period: "Dec 2021 - Jul 2022",
    location: "Remote",
    highlights: ["Developed tools simplifying HTTP API testing"],
  },
  {
    company: "OVO Energy",
    role: "Full Stack Engineer",
    period: "Jan 2020 - Mar 2021",
    location: "UK",
    highlights: [
      "Microservices backend (Kotlin), Flutter mobile app, React web app",
      "Technologies: AWS, Docker, GraphQL, TypeScript, Quarkus",
    ],
  },
  {
    company: "weiChain",
    role: "Junior Software Engineer",
    period: "Jan 2019 - Jan 2020",
    location: "Sofia, Bulgaria",
    highlights: [
      "Smart contracts on Ethereum and Aeternity blockchains",
      "Built decentralized cryptocurrency exchange and atomic swap widget",
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
                      {exp.period}
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
