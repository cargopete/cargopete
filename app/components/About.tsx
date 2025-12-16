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
              <span className="text-rust-orange font-bold">Rust maxi</span> and
              blockchain developer with 7+ years (almost) exclusively in the{" "}
              <span className="text-terminal-green font-semibold">
                Web3 space
              </span>
              . Currently building groundbreaking DataOps/AI products at{" "}
              <span className="text-terminal-blue font-semibold">
                Fathom.io
              </span>
              .
            </p>

            <p>
              My journey started with{" "}
              <span className="font-mono text-foreground/70">
                Ethereum smart contracts
              </span>{" "}
              and React frontends, but I quickly fell in love with Rust and
              haven&apos;t looked back. Since then, I&apos;ve worked on a wild
              range of projects:{" "}
              <span className="text-rust-orange">testing frameworks</span>,{" "}
              <span className="text-rust-orange">p2p messaging protocols</span>
              ,{" "}
              <span className="text-rust-orange">
                frontend apps &amp; backend services
              </span>{" "}
              — yes, all 100% Rust.
            </p>

            <p>
              Before discovering my calling in engineering, I was an accountant.
              The transition from spreadsheets to distributed systems has been
              quite the adventure, but it&apos;s taught me the value of
              precision, systematic thinking, and attention to detail —
              qualities that serve me well when building high-performance,
              secure systems.
            </p>

            <p>
              Based in{" "}
              <span className="font-mono text-terminal-blue">
                Sofia, Bulgaria
              </span>
              , I&apos;ve worked remotely with distributed teams around the
              world, contributing to open-source projects and helping shape the
              future of Web3 infrastructure.
            </p>

            {/* Key Highlights */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-card border border-border rounded hover:border-rust-orange transition-colors">
                <div className="text-3xl font-bold text-rust-orange font-mono">
                  7+
                </div>
                <div className="text-sm text-foreground/70 mt-1">
                  Years in Web3
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
