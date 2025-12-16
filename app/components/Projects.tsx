"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, FileCode } from "lucide-react";

const projects = [
  {
    title: "graphcast",
    role: "Senior Rust Engineer",
    company: "GraphOps",
    period: "2022-2024",
    description:
      "Designed and built Graphcast, a distributed communication protocol for The Graph using Rust, Waku, and libp2p. Core infrastructure enabling decentralized Web3 indexing across global networks. Also developed Rust-based backend services and a yew.rs frontend application.",
    impact:
      "Enabled thousands of developers to build on The Graph protocol with reliable, decentralized P2P communication.",
    tech: ["Rust", "Waku", "libp2p", "Distributed Systems", "Yew.rs"],
    link: "https://github.com/graphops/graphcast-sdk",
    highlights: [
      "Built production-grade P2P messaging protocol from scratch",
      "Handled millions of messages across distributed global nodes",
      "Implemented fault-tolerant consensus and gossip mechanisms",
      "Developed complementary backend services and frontend tooling",
    ],
  },
  {
    title: "matchstick",
    role: "Rust Engineer",
    company: "The Graph",
    period: "2021",
    description:
      "Created and maintained Matchstick, the first (and only) full-fledged testing framework for subgraphs in The Graph ecosystem. Essential developer tooling that became the standard for subgraph development and quality assurance.",
    impact:
      "Became the de facto testing solution for subgraph developers worldwide, used by major projects and protocols.",
    tech: ["Rust", "AssemblyScript", "WebAssembly", "Testing", "DevTools"],
    link: "https://github.com/LimeChain/matchstick",
    highlights: [
      "First comprehensive testing solution in the entire ecosystem",
      "Integrated seamlessly with Graph CLI and deployment pipelines",
      "Adopted by major DeFi protocols and development teams",
      "Set the standard for subgraph quality and reliability",
    ],
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-terminal-green font-mono text-sm mb-2">
              // PROJECTS/
            </h2>
            <div className="h-1 w-20 bg-rust-orange"></div>
            <p className="mt-4 text-foreground/70">
              Featured work that makes an impact
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 md:p-8 bg-card border-2 border-border rounded-lg hover:border-rust-orange transition-all group"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileCode className="w-6 h-6 text-rust-orange" />
                    <h3 className="font-mono text-xl text-foreground font-bold">
                      {project.title}
                    </h3>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/40 hover:text-rust-orange transition-colors"
                      aria-label="View project"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Role & Company */}
                <div className="flex flex-wrap gap-2 mb-4 font-mono text-sm">
                  <span className="text-terminal-blue">{project.role}</span>
                  <span className="text-foreground/40">@</span>
                  <span className="text-terminal-green">{project.company}</span>
                  <span className="text-foreground/40">|</span>
                  <span className="text-foreground/60">{project.period}</span>
                </div>

                {/* Description */}
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact */}
                <div className="mb-4 p-4 bg-terminal-green/5 border-l-4 border-terminal-green rounded">
                  <p className="text-sm text-foreground/70">
                    <span className="text-terminal-green font-mono mr-2">
                      Impact:
                    </span>
                    {project.impact}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-4 space-y-2">
                  {project.highlights.map((highlight, hIndex) => (
                    <div
                      key={hIndex}
                      className="flex items-start gap-2 text-sm text-foreground/70"
                    >
                      <span className="text-rust-orange mt-1">▸</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-rust-orange/10 border border-rust-orange/30 rounded text-xs font-mono text-rust-orange"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
