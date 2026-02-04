import AppointmentStatCard from "./components/AppointmentStatCard";
import { AppointmentRequestCard } from "./components/AppointmentRequestCard";
import AppointmentSchedule from "./components/AppointmentSchedule";
import AppointmentFilters from "./components/AppointmentFilters";
import { Calendar, Clock, Users, AlertTriangle } from "lucide-react";

const pendingRequests = [
  {
    id: 1,
    patientName: "Anitha R",
    reason: "Pregnancy Checkup",
    requestedTime: "10:30 AM",
    requestedDate: "Feb 5, 2026",
    priority: "High" as const,
    contactNumber: "+91 98765 43210",
  },
  {
    id: 2,
    patientName: "Rahul K",
    reason: "High Fever",
    requestedTime: "11:15 AM",
    requestedDate: "Feb 5, 2026",
    priority: "Medium" as const,
    contactNumber: "+91 87654 32109",
  },
  {
    id: 3,
    patientName: "Suresh M",
    reason: "Chest Pain",
    requestedTime: "12:00 PM",
    requestedDate: "Feb 5, 2026",
    priority: "Critical" as const,
    contactNumber: "+91 76543 21098",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Appointments Management
        </h1>
        <p className="text-gray-500 mt-2">Manage patient appointments, schedules and requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AppointmentStatCard 
          title="Today's Appointments" 
          value="12" 
          subtitle="5 remaining" 
          icon={<Calendar className="text-blue-600" size={24} />}
        />
        <AppointmentStatCard 
          title="Pending Requests" 
          value="8" 
          subtitle="Awaiting approval" 
          icon={<Clock className="text-orange-600" size={24} />}
        />
        <AppointmentStatCard 
          title="Total Patients" 
          value="156" 
          subtitle="This month" 
          icon={<Users className="text-emerald-600" size={24} />}
        />
        <AppointmentStatCard 
          title="Emergency Slots" 
          value="3" 
          subtitle="Available today" 
          icon={<AlertTriangle className="text-red-600" size={24} />}
        />
      </div>

      {/* Filters */}
      <AppointmentFilters />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div>
          <AppointmentSchedule />
        </div>

        {/* Pending Requests */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            📋 Pending Appointment Requests
          </h2>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <AppointmentRequestCard key={request.id} {...request} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
