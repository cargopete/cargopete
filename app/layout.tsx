import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pete Pavlovski | Senior Rust Engineer",
  description: "Senior Rust Engineer specialized in building distributed systems, backend services, and developer tools. AI, DataOps, Autonomous Systems.",
  keywords: ["Rust", "Senior Engineer", "Backend", "Distributed Systems", "Web3", "Blockchain", "DataOps"],
  authors: [{ name: "Pete Pavlovski" }],
  openGraph: {
    title: "Pete Pavlovski | Senior Rust Engineer",
    description: "Senior Rust Engineer specialized in building distributed systems, backend services, and developer tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
