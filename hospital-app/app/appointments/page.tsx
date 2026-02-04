"use client";

import { useEffect, useState } from "react";
import { getAppointments, updateAppointmentStatus } from "../lib/api/appointment.service";
import { Check, X, Calendar, FileText, User, Clock } from "lucide-react";

interface Appointment {
  id: string;
  patient_name: string;
  condition_type: string;
  appointment_time: string;
  status?: "pending" | "scheduled" | "completed" | "cancelled";
  doctor?: { name: string; specialization: string };
  created_at?: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAppointments();
      if (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments");
      } else {
        // merge remote appointments with any locally-approved appointments
        const remote = (data as Appointment[]) || [];
        try {
          const raw = localStorage.getItem("approvedAppointments");
          const local = raw ? (JSON.parse(raw) as Appointment[]) : [];
          // merge by id, prefer local for approved items
          const merged = [...remote];
          local.forEach(l => {
            if (!merged.some(r => r.id === l.id)) merged.unshift(l);
            else {
              // replace remote with local copy if remote exists
              const idx = merged.findIndex(r => r.id === l.id);
              merged[idx] = { ...merged[idx], ...l };
            }
          });
          setAppointments(merged);
        } catch (e) {
          setAppointments(remote);
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: "scheduled" | "completed" | "cancelled") => {
    // optimistic UI change so the user sees instant feedback
    const previous = appointments;
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));

    // update localStorage immediately
    try {
      const raw = localStorage.getItem("approvedAppointments");
      const local = raw ? (JSON.parse(raw) as Appointment[]) : [];
      if (status === "scheduled") {
        const current = appointments.find(a => a.id === id);
        if (current && !local.some(l => l.id === id)) {
          local.push({ ...current, status });
        }
      } else {
        const filtered = local.filter(l => l.id !== id);
        local.length = 0;
        filtered.forEach(f => local.push(f));
      }
      localStorage.setItem("approvedAppointments", JSON.stringify(local));
    } catch (e) {
      console.warn("localStorage update failed", e);
    }

    try {
      const { error } = await updateAppointmentStatus(id, status);
      if (error) {
        console.error(error);
        setError("Failed to update appointment");
        // revert UI and localStorage
        setAppointments(previous);
        try {
          const raw = localStorage.getItem("approvedAppointments");
          const local = raw ? (JSON.parse(raw) as Appointment[]) : [];
          const filtered = local.filter(l => l.id !== id);
          localStorage.setItem("approvedAppointments", JSON.stringify(filtered));
        } catch (e) {
          console.warn("localStorage revert failed", e);
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
      setAppointments(previous);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Appointment Requests</h1>
          <p className="text-gray-600">Manage incoming patient appointments</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
        )}

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No appointment requests at the moment</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments
              .filter(a => a.status === "scheduled")
              .map(appt => (
                <div
                  key={appt.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-blue-500"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Patient Name</p>
                            <p className="text-lg font-semibold text-gray-900">{appt.patient_name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Condition</p>
                            <p className="text-gray-700">{appt.condition_type}</p>
                          </div>
                        </div>

                        {appt.doctor && (
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-sm text-gray-500">Doctor</p>
                              <p className="text-gray-700">{appt.doctor.name} - {appt.doctor.specialization}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Appointment Time</p>
                            <p className="text-gray-700">
                                  {(() => {
                                    if (!appt.appointment_time) return "—";
                                    const d = new Date(appt.appointment_time);
                                    if (!isNaN(d.getTime())) {
                                      return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
                                    }
                                    // fallback: show raw string if it's not a full ISO date
                                    return appt.appointment_time;
                                  })()}
                                </p>
                          </div>
                        </div>

                        {appt.status && (
                          <div className="pt-2">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                appt.status === "scheduled"
                                  ? "bg-green-100 text-green-800"
                                  : appt.status === "completed"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : appt.status === "cancelled"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 md:flex-col lg:flex-row">
                        <button
                          onClick={() => handleStatusChange(appt.id, "scheduled")}
                          className="flex-1 md:flex-none px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Schedule
                        </button>
                        <button
                          onClick={() => handleStatusChange(appt.id, "completed")}
                          className="flex-1 md:flex-none px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Complete
                        </button>
                        <button
                          onClick={() => handleStatusChange(appt.id, "cancelled")}
                          className="flex-1 md:flex-none px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
