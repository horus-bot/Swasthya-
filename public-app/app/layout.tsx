"use client";

import "./globals.css";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { usePathname } from "next/navigation";

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {!isLandingPage && <Header />}
        <main className="flex-grow">{children}</main>
        {!isLandingPage && <Footer />}
      </body>
    </html>
  );
}