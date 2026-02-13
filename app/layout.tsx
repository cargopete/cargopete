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
  title: "Petko (Pete) Pavlovski | Senior Software Engineer",
  description: "Senior Software Engineer specialised in web3 and Rust. Building high-performance distributed systems that handle real-world scale.",
  keywords: ["Rust", "Senior Engineer", "Backend", "Distributed Systems", "Web3", "Blockchain", "P2P"],
  authors: [{ name: "Petko (Pete) Pavlovski" }],
  openGraph: {
    title: "Petko (Pete) Pavlovski | Senior Software Engineer",
    description: "Senior Software Engineer specialised in web3 and Rust. Building high-performance distributed systems.",
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
