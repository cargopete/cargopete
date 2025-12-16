"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function DownloadPDF() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      // Hide nav and buttons temporarily
      const nav = document.querySelector("nav");
      const buttons = document.querySelectorAll("button");

      if (nav) (nav as HTMLElement).style.display = "none";
      buttons.forEach((btn) => ((btn as HTMLElement).style.display = "none"));

      // Wait a tiny bit for DOM to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture the page
      const element = document.body;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#0a0a0a",
      });

      // Show nav and buttons again
      if (nav) (nav as HTMLElement).style.display = "";
      buttons.forEach((btn) => ((btn as HTMLElement).style.display = ""));

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("Pete-Pavlovski-CV.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-card border-2 border-foreground/20 hover:border-rust-orange text-foreground font-semibold rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className={`w-5 h-5 ${isGenerating ? "animate-bounce" : ""}`} />
      {isGenerating ? "Generating..." : "Download as PDF"}
    </button>
  );
}
