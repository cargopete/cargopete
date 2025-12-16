"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export function DownloadPDF() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-pdf");

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Pete-Pavlovski-CV.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-card border-2 border-foreground/20 hover:border-rust-orange text-foreground font-semibold rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <Download className={`w-5 h-5 ${isGenerating ? "animate-bounce" : ""}`} />
      {isGenerating ? "Generating PDF..." : "Download as PDF"}
    </button>
  );
}
