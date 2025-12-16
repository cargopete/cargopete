"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, Download } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactOptions = [
    {
      icon: Mail,
      label: "--email",
      value: "pavlovskipetko@gmail.com",
      href: "mailto:pavlovskipetko@gmail.com",
      color: "text-rust-orange",
    },
    {
      icon: Github,
      label: "--github",
      value: "github.com/cargopete",
      href: "https://github.com/cargopete",
      color: "text-terminal-green",
    },
    {
      icon: Linkedin,
      label: "--linkedin",
      value: "linkedin.com/in/pete-pavlovski-07486a156",
      href: "https://www.linkedin.com/in/pete-pavlovski-07486a156/",
      color: "text-terminal-blue",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-card/30">
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
              // CONTACT.sh
            </h2>
            <div className="h-1 w-20 bg-rust-orange"></div>
          </div>

          {/* Terminal-style Contact Block */}
          <div className="bg-card border-2 border-border rounded-lg p-8 mb-8">
            <div className="font-mono text-sm space-y-3">
              <div className="text-foreground/60">
                <span className="text-terminal-green">pete@cargopete</span>:~${" "}
                ./contact.sh --help
              </div>

              <div className="pl-4 border-l-2 border-rust-orange/30 space-y-3 py-2">
                <div className="text-terminal-blue">Available options:</div>

                {contactOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.a
                      key={option.label}
                      href={option.href}
                      target={option.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        option.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3 hover:bg-rust-orange/10 p-2 rounded transition-colors group"
                    >
                      <Icon className={`w-4 h-4 ${option.color}`} />
                      <span className={`${option.color} min-w-[100px]`}>
                        {option.label}
                      </span>
                      <span className="text-foreground/70 group-hover:text-foreground transition-colors">
                        {option.value}
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-foreground/60">
                  <span className="text-terminal-green">pete@cargopete</span>:~${" "}
                  ./hire_me.sh
                </div>
                <div className="pl-4 text-rust-orange mt-2">
                  &gt; Let&apos;s build something great together
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="mailto:pavlovskipetko@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rust-orange hover:bg-rust-orange/80 text-white font-mono rounded-lg border-2 border-rust-orange transition-all hover:scale-105 hover:shadow-lg hover:shadow-rust-orange/20"
            >
              <Mail className="w-5 h-5" />
              Let&apos;s Work Together
            </a>

            <a
              href="/pete-pavlovski-cv.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-card border-2 border-terminal-green text-terminal-green font-mono rounded-lg transition-all hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download Full CV
            </a>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <p className="text-foreground/50 text-sm font-mono">
              <span className="text-rust-orange">//</span> Built with Rust
              passion, TypeScript precision, and terminal aesthetics{" "}
              <span className="text-terminal-green">❤</span>
            </p>
            <p className="text-foreground/40 text-xs font-mono mt-2">
              © {new Date().getFullYear()} Pete Pavlovski
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
