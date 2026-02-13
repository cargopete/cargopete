"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-terminal-green font-mono text-sm mb-2">
              // ABOUT.rs
            </h2>
            <div className="h-1 w-20 bg-rust-orange"></div>
          </div>

          {/* Content */}
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-lg md:text-xl">
              <span className="text-rust-orange font-bold">Senior Software Engineer</span>{" "}
              specialised in{" "}
              <span className="text-terminal-green font-semibold">
                web3 and Rust
              </span>
              . I build high-performance distributed systems that handle real-world scale.
            </p>

            <p>
              Currently at{" "}
              <span className="text-terminal-blue font-semibold">Fathom.io</span>{" "}
              building Rust backend systems for AI-driven data products. Previously designed{" "}
              <span className="text-rust-orange">Graphcast</span> — a P2P protocol handling millions of messages across global nodes — and created{" "}
              <span className="text-rust-orange">Matchstick</span>, now the standard testing framework for The Graph ecosystem.
            </p>

            <p>
              Before discovering my calling in engineering, I was an accountant.
              The transition from spreadsheets to distributed systems has been
              quite the adventure, but my background in finance has made me{" "}
              <span className="text-terminal-green font-semibold">
                obsessive about correctness and edge cases
              </span>{" "}
              — qualities that serve me well when building systems where reliability isn&apos;t optional.
            </p>

            <p>
              Based in{" "}
              <span className="font-mono text-terminal-blue">
                Sofia, Bulgaria
              </span>
              , I&apos;ve spent 7+ years working remotely with distributed teams around the
              world, shipping Rust systems that handle real-world scale.
            </p>

            {/* Key Highlights */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-card border border-border rounded hover:border-rust-orange transition-colors">
                <div className="text-3xl font-bold text-rust-orange font-mono">
                  7+
                </div>
                <div className="text-sm text-foreground/70 mt-1">
                  Years in Rust and web3
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded hover:border-terminal-green transition-colors">
                <div className="text-3xl font-bold text-terminal-green font-mono">
                  100%
                </div>
                <div className="text-sm text-foreground/70 mt-1">
                  Rust Projects
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded hover:border-terminal-blue transition-colors">
                <div className="text-3xl font-bold text-terminal-blue font-mono">
                  10+
                </div>
                <div className="text-sm text-foreground/70 mt-1">
                  Companies
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
