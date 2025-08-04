import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Budget Planner",
  description:
    "Simple, free financial tools for the US market. Budget, debt, and emergency fund calculators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${robotoMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
