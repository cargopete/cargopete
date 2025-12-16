"use client";

import { Download } from "lucide-react";

export function DownloadPDF() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-card border-2 border-foreground/20 hover:border-rust-orange text-foreground font-semibold rounded-lg transition-all hover:scale-105"
    >
      <Download className="w-5 h-5" />
      Download as PDF
    </button>
  );
}
