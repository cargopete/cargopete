"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Name & Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Pete Pavlovski
            </h1>
            <p className="text-2xl md:text-3xl text-rust-orange font-semibold">
              Senior Rust Engineer
            </p>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Rust maxi with 7+ years (almost) exclusively in Web3. Building distributed systems,
              p2p protocols, and backend services — all 100% Rust.
            </p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rust-orange hover:bg-rust-orange/80 text-white font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-rust-orange/20"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-8 justify-center pt-8 text-sm text-foreground/60"
          >
            <div>
              <span className="block text-2xl font-bold text-rust-orange">
                7+
              </span>
              <span>Years in Web3</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-terminal-green">
                100%
              </span>
              <span>Rust Projects</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-terminal-blue">
                10+
              </span>
              <span>Companies</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
