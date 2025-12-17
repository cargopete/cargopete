"use client";

import { Download } from "lucide-react";

export function DownloadPDF() {
  return (
    <a
      href="/pete-pavlovski-cv.pdf"
      download="pete-pavlovski-cv.pdf"
      className="inline-flex items-center gap-2 px-8 py-4 bg-card border-2 border-rust-orange text-rust-orange hover:bg-rust-orange hover:text-white font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-rust-orange/20"
    >
      <Download className="w-5 h-5" />
      Download CV
    </a>
  );
}
