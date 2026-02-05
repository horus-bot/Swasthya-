"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </Head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {!isLandingPage && <Header />}
        <main className="flex-grow">{children}</main>
        {!isLandingPage && <Footer />}
      </body>
    </>
  );
}