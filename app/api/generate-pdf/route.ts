import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // 60 seconds timeout

export async function GET(request: NextRequest) {
  let browser;

  try {
    // Get the base URL from the request
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    console.log("Generating PDF for:", baseUrl);

    // Launch Puppeteer with Chromium for Vercel
    const isProduction = process.env.NODE_ENV === "production";

    // Configure chromium for Vercel
    if (isProduction) {
      chromium.setGraphicsMode = false;
    }

    browser = await puppeteer.launch({
      args: isProduction
        ? [
            ...chromium.args,
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-first-run",
            "--no-sandbox",
            "--no-zygote",
            "--single-process",
          ]
        : ["--no-sandbox"],
      defaultViewport: {
        width: 1280,
        height: 720,
      },
      executablePath: isProduction
        ? await chromium.executablePath()
        : process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "darwin"
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : "/usr/bin/google-chrome",
      headless: true,
    });

    const page = await browser.newPage();

    // Navigate to the website
    await page.goto(baseUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait a bit for animations to complete
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Hide navigation for PDF (optional - cleaner look)
    await page.evaluate(() => {
      const nav = document.querySelector("nav");
      if (nav) nav.style.display = "none";
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
    });

    await browser.close();

    // Return the PDF
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Pete-Pavlovski-CV.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      { error: "Failed to generate PDF", details: (error as Error).message },
      { status: 500 }
    );
  }
}
