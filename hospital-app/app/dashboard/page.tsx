import StatCard from "./components/StatCard";
import BedStatus from "./components/BedStatus";
import EquipmentStatus from "./components/EquipmentStatus";
import { AppointmentCard } from "./components/AppointmentCard";


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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Hospital Overview
        </h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's your facility status at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Beds Available" value="12" subtitle="Out of 40" />
        <StatCard title="Doctors On Duty" value="8" subtitle="Today" />
        <StatCard title="Avg Waiting Time" value="25 min" subtitle="Emergency" />
        <StatCard title="Pending Requests" value="3" subtitle="Action needed" />
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BedStatus />
        <EquipmentStatus />
      </div>

      {/* Appointments */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          📅 Appointment Requests
        </h2>
        <div className="space-y-4">
          {appointments.map((appt) => (
            <AppointmentCard key={appt.id} {...appt} />
          ))}
          <div className="bg-red-500 text-white p-4">
  Tailwind test
</div>

        
        </div>
      </div>
    </div>
    
  );
}
