import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MLPVisuals | Premium Photography & Videography",
  description: "Luxury photography, videography, bookings, private galleries, and client delivery platform."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
