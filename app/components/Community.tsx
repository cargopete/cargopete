"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Users, Heart, Code } from "lucide-react";

export function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="community" className="py-20 px-4">
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
              // COMMUNITY.md
            </h2>
            <div className="h-1 w-20 bg-rust-orange"></div>
            <p className="mt-4 text-foreground/70">
              Contributing to the Rust and Web3 ecosystems
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Open Source */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-card border-2 border-border rounded-lg hover:border-rust-orange transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-rust-orange" />
                <h3 className="font-mono text-lg font-bold text-foreground">
                  Open Source
                </h3>
              </div>
              <p className="text-foreground/70 mb-4 text-sm">
                Active contributor to Rust and Web3 projects. Building tools
                that help developers ship better software.
              </p>
              <a
                href="https://github.com/neriumpete"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-terminal-green hover:text-rust-orange transition-colors font-mono text-sm group-hover:gap-3"
              >
                <Github className="w-4 h-4" />
                <span>github.com/neriumpete</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </a>
            </motion.div>

            {/* Community Advocacy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 bg-card border-2 border-border rounded-lg hover:border-terminal-green transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-terminal-green" />
                <h3 className="font-mono text-lg font-bold text-foreground">
                  Community
                </h3>
              </div>
              <p className="text-foreground/70 mb-4 text-sm">
                Graph Advocate (2021-2024): Technical Teacher & Community Care
                Advocate, helping developers contribute to Web3.
              </p>
              <div className="flex items-center gap-2 text-terminal-green font-mono text-xs">
                <Heart className="w-4 h-4" />
                <span>Volunteer work</span>
              </div>
            </motion.div>
          </div>

          {/* Stats or Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 bg-gradient-to-r from-rust-orange/10 to-terminal-green/10 border border-border rounded-lg"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🦀</div>
              <div>
                <h3 className="font-mono text-foreground font-bold mb-2">
                  Let&apos;s build the future together
                </h3>
                <p className="text-foreground/70 text-sm">
                  I believe in the power of open source and community
                  collaboration. Whether it&apos;s contributing to existing
                  projects, mentoring newcomers, or sharing knowledge -
                  I&apos;m always eager to connect with fellow developers and
                  push the boundaries of what&apos;s possible with Rust and
                  Web3 technologies.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
