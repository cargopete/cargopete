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
              Senior Rust Engineer specialized in building{" "}
              <span className="text-rust-orange font-semibold">
                distributed systems
              </span>
              ,{" "}
              <span className="text-rust-orange font-semibold">
                backend services
              </span>
              , and{" "}
              <span className="text-rust-orange font-semibold">
                developer tools
              </span>
              . Currently helping{" "}
              <span className="text-terminal-blue font-semibold">
                Fathom.io
              </span>{" "}
              develop groundbreaking DataOps/AI products.
            </p>

            <p>
              My journey in tech has been quite the adventure - from accountant
              to Senior Rust Engineer. I&apos;ve spent the last several years
              deep in the trenches of{" "}
              <span className="font-mono text-terminal-green">
                Web3
              </span>,{" "}
              <span className="font-mono text-terminal-green">
                blockchain protocols
              </span>
              , and{" "}
              <span className="font-mono text-terminal-green">
                high-performance systems
              </span>
              .
            </p>

            <p>
              I&apos;m passionate about solving complex technical challenges
              with scalable, secure, and performant solutions. Whether
              it&apos;s designing distributed communication protocols,
              building testing frameworks, or optimizing backend systems for
              AI-driven platforms, I thrive on pushing the boundaries of
              what&apos;s possible.
            </p>

            <p>
              Based in{" "}
              <span className="font-mono text-terminal-blue">Bulgaria</span>,
              I&apos;ve worked with distributed teams across the globe,
              contributing to open-source projects and helping shape the future
              of Web3 infrastructure.
            </p>

            {/* Key Highlights */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-card border border-border rounded">
                <div className="text-3xl font-bold text-rust-orange font-mono">
                  6+
                </div>
                <div className="text-sm text-foreground/70 mt-1">
                  Years in Rust
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded">
                <div className="text-3xl font-bold text-terminal-green font-mono">
                  10+
                </div>
                <div className="text-sm text-foreground/70 mt-1">
                  Companies & Projects
                </div>
              </div>
              <div className="p-4 bg-card border border-border rounded">
                <div className="text-3xl font-bold text-terminal-blue font-mono">
                  ∞
                </div>
                <div className="text-sm text-foreground/70 mt-1">
                  Problems Solved
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
