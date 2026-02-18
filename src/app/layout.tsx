import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⭐ CUSTOM OKALUERA FONT (LOCAL INSIDE APP FOLDER)
const okaluera = localFont({
  src: [
    {
      path: "./fonts/Okaluera.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-okaluera",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishweshwar Industries",
  description: "Your Guide To The Digital World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${okaluera.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
