"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Container,
  Database,
  Globe,
  Blocks,
  Cpu,
} from "lucide-react";

const techCategories = [
  {
    title: "Languages",
    icon: Code2,
    items: ["Rust", "JavaScript/TypeScript", "Kotlin", "AssemblyScript"],
  },
  {
    title: "Rust Ecosystem",
    icon: Blocks,
    items: ["Actix-web", "Tokio", "Yew.rs", "libp2p", "Waku"],
  },
  {
    title: "Blockchain & Web3",
    icon: Globe,
    items: [
      "Ethereum",
      "Solana",
      "The Graph",
      "Polkadot/Substrate",
      "Aeternity",
    ],
  },
  {
    title: "Frontend & Fullstack",
    icon: Container,
    items: ["React", "Next.js", "Flutter", "GraphQL", "WebAssembly"],
  },
  {
    title: "Infrastructure & DevOps",
    icon: Database,
    items: ["Docker", "AWS", "Git", "CI/CD", "Microservices"],
  },
  {
    title: "Specialized Skills",
    icon: Cpu,
    items: [
      "Distributed Systems",
      "P2P Protocols",
      "API Testing",
      "Smart Contracts",
    ],
  },
];

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" className="py-20 px-4 bg-card/30">
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
              // TECH_STACK.toml
            </h2>
            <div className="h-1 w-20 bg-rust-orange"></div>
            <p className="mt-4 text-foreground/70">
              <span className="font-mono text-terminal-blue">
                [dependencies]
              </span>
            </p>
          </div>

          {/* Tech Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="p-6 bg-card border border-border rounded-lg hover:border-rust-orange transition-colors group"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-rust-orange" />
                    <h3 className="font-mono text-foreground font-semibold">
                      {category.title}
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="font-mono text-sm text-foreground/70 hover:text-terminal-green transition-colors flex items-center gap-2"
                      >
                        <span className="text-rust-orange">→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 p-6 bg-card border border-terminal-blue/30 rounded-lg"
          >
            <h3 className="font-mono text-terminal-blue mb-3">
              <span className="text-rust-orange">#</span> Currently Exploring
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "AI/ML Integration",
                "DataOps",
                "Advanced Async Patterns",
                "Zero-Knowledge Proofs",
              ].map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-terminal-blue/10 border border-terminal-blue/30 rounded text-sm font-mono text-terminal-blue"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
