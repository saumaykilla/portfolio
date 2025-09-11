import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100","200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Saumay - Portfolio",
  description: "Portfolio website of Saumay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
