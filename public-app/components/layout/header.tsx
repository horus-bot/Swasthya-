import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between">
      <h1 className="font-semibold">Public Healthcare Platform</h1>
      <nav className="space-x-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/clinics">Clinics</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </header>
  );
}
