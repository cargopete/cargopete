"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, Mail } from "lucide-react";

const commands = [
  { command: "whoami", output: "Senior Rust Engineer" },
  {
    command: "cat bio.txt",
    output:
      "Building distributed systems, backend services, and developer tools.\nPassionate about scalable, secure, high-performance solutions.",
  },
  { command: "ls current-role/", output: "Fathom.io - DataOps/AI platforms" },
];

export function Hero() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
      setIsTyping(false);
      return;
    }

    const currentCommand = commands[currentCommandIndex];
    const fullText = `pete@cargopete:~$ ${currentCommand.command}\n> ${currentCommand.output}\n\n`;

    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentCommandIndex((prev) => prev + 1);
        }, 500);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentCommandIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden terminal-effect">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-card border-2 border-border rounded-lg p-8 shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
            <span className="ml-4 font-mono text-sm text-foreground/60">
              pete@cargopete: ~
            </span>
          </div>

          {/* Terminal Content */}
          <div className="font-mono text-sm md:text-base space-y-1">
            <pre className="whitespace-pre-wrap text-foreground leading-relaxed">
              {displayedText}
            </pre>
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-rust-orange cursor-blink"></span>
            )}
            {!isTyping && (
              <div className="mt-4">
                <span className="text-foreground">pete@cargopete:~$ </span>
                <span className="inline-block w-2 h-4 bg-rust-orange cursor-blink ml-1"></span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rust-orange hover:bg-rust-orange/80 text-white font-mono rounded border-2 border-rust-orange transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            <a
              href="/pete-pavlovski-cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-card border-2 border-terminal-green text-terminal-green font-mono rounded transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>

          {/* ASCII Art - Optional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 5, duration: 1 }}
            className="mt-8 text-rust-orange/40 font-mono text-xs hidden md:block"
          >
            <pre>{`
   _____                    ____       __
  / ____|                  |  _ \\     | |
 | |     __ _ _ __ __ _  _ | |_) |    | |_ ___
 | |    / _\` | '__/ _\` |/ || |  <  _  | __/ _ \\
 | |___| (_| | | | (_| | (_| |_) |  |_| ||  __/
  \\_____\\__,_|_|  \\__, | (_)____/   \\__|\\__|
                   __/ |
                  |___/
            `}</pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
