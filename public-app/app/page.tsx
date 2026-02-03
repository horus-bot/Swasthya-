import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Public Healthcare Dashboard
      </h1>

      <p className="text-gray-600">
        Access government healthcare services easily from one place.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <DashboardLink href="/clinics" title="Nearest Clinics" />
        <DashboardLink href="/routing" title="Smart Routing" />
        <DashboardLink href="/appointments" title="Book Appointment" />
        <DashboardLink href="/map" title="Healthcare Map" />
        <DashboardLink href="/tracker" title="Health Tracker" />
        <DashboardLink href="/profile" title="My Health Profile" />
        <DashboardLink href="/notifications" title="Alerts" />
        <DashboardLink href="/reports" title="Report / Request" />
        <DashboardLink href="/chatbox" title="Chatbot" />
      </div>
    </main>
  );
}

function DashboardLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
    >
      <h2 className="font-medium">{title}</h2>
    </Link>
  );
}
