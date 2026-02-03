"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Bell,
  User,
} from "lucide-react";
import TopBar from "./components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 px-6 py-8 hidden md:flex flex-col shadow-sm">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-10">
          Hospital Panel
        </h2>

        <nav className="space-y-2 text-sm">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            href="/dashboard"
          />
          <SidebarItem
            icon={<CalendarCheck size={18} />}
            label="Appointments"
            href="/appointments"
          />
          <SidebarItem
            icon={<BedDouble size={18} />}
            label="Resources"
            href="/resources"
          />
          <SidebarItem
            icon={<Bell size={18} />}
            label="Notifications"
            href="/notifications"
          />
          <SidebarItem
            icon={<User size={18} />}
            label="Profile"
            href="/profile"
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <TopBar />
        {children}
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

