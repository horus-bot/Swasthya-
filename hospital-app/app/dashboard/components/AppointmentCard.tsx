"use client";

import { Check, X } from "lucide-react";

type AppointmentCardProps = {
  id: number;
  name: string;
  reason: string;
  time: string;
  priority: "Low" | "Medium" | "High" | "Critical";
};

export function AppointmentCard({
  id,
  name,
  reason,
  time,
  priority,
}: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all group">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Patient Info */}
        <div className="flex-1">
          <p className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            📋 {reason} • ⏰ {time}
          </p>
          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
              priority === "Critical"
                ? "bg-red-100 text-red-700"
                : priority === "High"
                ? "bg-orange-100 text-orange-700"
                : priority === "Medium"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {priority} Priority
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 text-sm font-semibold border border-emerald-200 hover:from-emerald-100 hover:to-green-100 hover:shadow-md transition-all">
            <Check size={16} />
            Approve
          </button>

          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-700 text-sm font-semibold border border-red-200 hover:from-red-100 hover:to-rose-100 hover:shadow-md transition-all">
            <X size={16} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

const appointments = [
  {
    id: 1,
    name: "Anitha R",
    reason: "Pregnancy Checkup",
    time: "10:30 AM",
    priority: "High" as const,
  },
  {
    id: 2,
    name: "Rahul K",
    reason: "High Fever",
    time: "11:15 AM",
    priority: "Medium" as const,
  },
  {
    id: 3,
    name: "Suresh M",
    reason: "Chest Pain",
    time: "12:00 PM",
    priority: "Critical" as const,
  },
];

export default function AppointmentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Appointment Requests
      </h1>

      <div className="space-y-4">
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} {...appt} />
        ))}
      </div>
    </div>
  );
}
