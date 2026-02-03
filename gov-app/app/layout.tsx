import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swasthya - Health Command Center",
  description: "Monitor, Predict, and Respond to Health Crises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
