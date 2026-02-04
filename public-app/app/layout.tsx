import "./globals.css";
import Header from "../components/layout/header";

export const metadata = {
  title: "Public Healthcare Platform",
  description: "Government & Public Healthcare Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}