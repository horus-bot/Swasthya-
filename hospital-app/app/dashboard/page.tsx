"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatCard from "./components/StatCard";
import BedStatus from "./components/BedStatus";
import EquipmentStatus from "./components/EquipmentStatus";
import { AppointmentCard } from "./components/AppointmentCard";
import { updateAppointmentStatus } from "../lib/api/appointment.service";
import { getBedStatus, updateBedStatus } from "../lib/api/bedStatus.service";
import { getEquipment, updateEquipmentStatus } from "../lib/api/equipment.service";
import { getEquipmentRequests, updateEquipmentRequestStatus } from "../lib/api/equipmentRequest.service";

interface Appointment {
  id: string;
  patient_name: string;
  condition_type: string;
  appointment_time: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
}

const initialAppointments: Appointment[] = [
  {
    id: "1",
    patient_name: "Anitha R",
    condition_type: "Pregnancy Checkup",
    appointment_time: "10:30 AM",
    status: "pending",
  },
  {
    id: "2",
    patient_name: "Rahul K",
    condition_type: "High Fever",
    appointment_time: "11:15 AM",
    status: "pending",
  },
  {
    id: "3",
    patient_name: "Suresh M",
    condition_type: "Chest Pain",
    appointment_time: "12:00 PM",
    status: "pending",
  },
];

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [bedData, setBedData] = useState<any>(null);
  const [equipmentData, setEquipmentData] = useState<any[]>([]);
  const [equipmentRequests, setEquipmentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch bed status
        try {
          const { data: beds, error: bedError } = await getBedStatus();
          if (!bedError && beds && beds.length > 0) {
            setBedData(beds[0]);
          } else {
            // Fallback to mock data if no data returned
            setBedData({ total_beds: 40, available_beds: 12, occupied_beds: 28 });
          }
        } catch (e) {
          console.warn("Error fetching bed status:", e);
          setBedData({ total_beds: 40, available_beds: 12, occupied_beds: 28 });
        }

        // Fetch equipment
        try {
          const { data: equipment, error: equipError } = await getEquipment();
          if (!equipError && equipment) {
            setEquipmentData(equipment);
          } else {
            // Fallback mock data
            setEquipmentData([
              { id: "1", equipment_name: "MRI Scanner", status: "available" },
              { id: "2", equipment_name: "CT Scanner", status: "in_use" },
              { id: "3", equipment_name: "X-Ray Machine", status: "available" },
            ]);
          }
        } catch (e) {
          console.warn("Error fetching equipment:", e);
          setEquipmentData([
            { id: "1", equipment_name: "MRI Scanner", status: "available" },
            { id: "2", equipment_name: "CT Scanner", status: "in_use" },
            { id: "3", equipment_name: "X-Ray Machine", status: "available" },
          ]);
        }

        // Fetch equipment requests
        try {
          const { data: requests, error: reqError } = await getEquipmentRequests();
          if (!reqError && requests) {
            setEquipmentRequests(requests);
          } else {
            setEquipmentRequests([]);
          }
        } catch (e) {
          console.warn("Error fetching equipment requests:", e);
          setEquipmentRequests([]);
        }
      } catch (e) {
        console.error("Error fetching dashboard data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAppointmentUpdate = (id: string, newStatus: "pending" | "scheduled" | "completed" | "cancelled") => {
    // optimistic UI update (remove from pending immediately when scheduled)
    setAppointments(prev => prev.map(appt => (appt.id === id ? { ...appt, status: newStatus } : appt)));

    // For scheduled/completed/cancelled, persist local state & navigate first for snappy UX
    if (newStatus === "scheduled" || newStatus === "completed" || newStatus === "cancelled") {
      try {
        // update localStorage immediately for scheduled items so /appointments sees it
        const storedRaw = typeof window !== "undefined" ? localStorage.getItem("approvedAppointments") : null;
        const stored = storedRaw ? (JSON.parse(storedRaw) as Appointment[]) : [];
        if (newStatus === "scheduled") {
          const current = appointments.find(a => a.id === id) || { id, patient_name: "", condition_type: "", appointment_time: "" };
          const existingIndex = stored.findIndex(s => s.id === id);
          const toStore: Appointment = { ...current, status: "scheduled" };
          if (existingIndex === -1) stored.push(toStore);
          else stored[existingIndex] = { ...stored[existingIndex], ...toStore };
          localStorage.setItem("approvedAppointments", JSON.stringify(stored));
          // navigate immediately so user sees the scheduled list
          router.push("/appointments");
        } else {
          const filtered = stored.filter(s => s.id !== id);
          localStorage.setItem("approvedAppointments", JSON.stringify(filtered));
        }
      } catch (e) {
        console.warn("localStorage error", e);
      }

      // call backend in background and revert on failure
      (async () => {
        try {
          // only call backend for items that look like they came from the server (uuid-like id or created_at present)
          const current = appointments.find(a => a.id === id);
          const looksRemote = !!(current && (current.created_at || (id && id.includes("-"))));
          if (!looksRemote) {
            console.log("Skipping backend call for local mock appointment id", id);
            return;
          }

          console.log("handleAppointmentUpdate: calling API", { id, newStatus });
          const res = await updateAppointmentStatus(id, newStatus as "scheduled" | "completed" | "cancelled");
          console.log("handleAppointmentUpdate: api response", res);
          if ((res as any).error) {
            console.error("API update failed:", (res as any).error);
            // revert optimistic update
            setAppointments(prev => prev.map(appt => (appt.id === id ? { ...appt, status: "pending" } : appt)));
            // revert localStorage change
            try {
              const storedRaw2 = localStorage.getItem("approvedAppointments");
              const stored2 = storedRaw2 ? (JSON.parse(storedRaw2) as Appointment[]) : [];
              const filtered = stored2.filter(s => s.id !== id);
              localStorage.setItem("approvedAppointments", JSON.stringify(filtered));
            } catch (e) {
              console.warn("localStorage revert failed", e);
            }
          }
        } catch (e) {
          console.error("updateAppointmentStatus error", e);
        }
      })();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Hero Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#1e3a8a] shadow-lg">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Hospital Overview
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl font-medium">
            Welcome back! Here's your facility status at a glance.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Beds Available" 
          value={bedData?.available_beds ?? "—"} 
          subtitle={`Out of ${bedData?.total_beds ?? "—"}`} 
        />
        <StatCard title="Doctors On Duty" value="8" subtitle="Today" />
        <StatCard title="Avg Waiting Time" value="25 min" subtitle="Emergency" />
        <StatCard 
          title="Equipment Requests" 
          value={equipmentRequests.filter((r) => r.status === "pending").length} 
          subtitle="Pending" 
        />
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BedStatus data={bedData} onUpdate={updateBedStatus} />
        <EquipmentStatus data={equipmentData} onUpdate={updateEquipmentStatus} />
      </div>

      {/* Appointments */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          📅 Appointment Requests
        </h2>
        <div className="space-y-4">
          {appointments
            .filter((a) => a.status === "pending")
            .map((appt) => (
              <AppointmentCard key={appt.id} appt={appt} onUpdate={handleAppointmentUpdate} />
            ))}
   

        
        </div>
      </div>
    </div>
    
  );
}
