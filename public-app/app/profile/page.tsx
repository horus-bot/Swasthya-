"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------ Mock Data ------------------ */

const vitalsData = [
  { day: "Mon", heart: 72, bp: 120, sugar: 95 },
  { day: "Tue", heart: 105, bp: 145, sugar: 160 },
  { day: "Wed", heart: 70, bp: 118, sugar: 92 },
  { day: "Thu", heart: 98, bp: 135, sugar: 140 },
  { day: "Fri", heart: 73, bp: 119, sugar: 94 },
];

/* ------------------ Page ------------------ */

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const vitalsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // Profile cards (scroll-triggered)
    cardRefs.current.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });

    // Vitals section
    gsap.from(vitalsRef.current, {
      scrollTrigger: {
        trigger: vitalsRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <main className="p-4 sm:p-6 max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div
        ref={headerRef}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow">
            G
          </div>
          <div>
            <h1 className="text-xl font-bold">Gokul</h1>
            <p className="text-gray-500 text-sm">ABHA Linked</p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:scale-105 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {["Personal Details", "Medical Summary", "Emergency Contact"].map(
          (title, i) => (
            <div
              key={title}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="font-semibold text-lg mb-4">{title}</h2>

              {title === "Personal Details" && (
                <>
                  <ProfileRow label="Age" value="21" />
                  <ProfileRow label="Blood Group" value="O+" />
                  <ProfileRow label="Gender" value="Male" />
                </>
              )}

              {title === "Medical Summary" && (
                <>
                  <ProfileRow label="Conditions" value="None" />
                  <ProfileRow label="Allergies" value="None" />
                  <ProfileRow label="Last Checkup" value="Jan 2026" />
                </>
              )}

              {title === "Emergency Contact" && (
                <>
                  <ProfileRow label="Name" value="Parent" />
                  <ProfileRow label="Phone" value="+91 XXXXX XXXXX" />
                  <ProfileRow label="City" value="Tamil Nadu" />
                </>
              )}
            </div>
          )
        )}
      </div>

      {/* Health Vitals */}
      <div ref={vitalsRef}>
        <h2 className="text-lg font-semibold mb-4">
          Health Vitals (Last 5 Days)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <VitalCard title="Heart Rate" unit="bpm" color="#ef4444" dataKey="heart" />
          <VitalCard title="Blood Pressure" unit="mmHg" color="#3b82f6" dataKey="bp" />
          <VitalCard title="Blood Sugar" unit="mg/dL" color="#10b981" dataKey="sugar" />
        </div>
      </div>

      {isOpen && <EditProfileModal onClose={() => setIsOpen(false)} />}
    </main>
  );
}

/* ------------------ Vital Card ------------------ */

function VitalCard({
  title,
  unit,
  color,
  dataKey,
}: {
  title: string;
  unit: string;
  color: string;
  dataKey: "heart" | "bp" | "sugar";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const latest = vitalsData[vitalsData.length - 1][dataKey];
  const alert = getAlert(dataKey, latest);

  useEffect(() => {
    if (alert && cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: "0 0 0 6px rgba(239,68,68,0.15)",
        repeat: -1,
        yoyo: true,
        duration: 0.8,
      });
    }
  }, [alert]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() =>
        gsap.to(cardRef.current, { scale: 1.04, duration: 0.2 })
      }
      onMouseLeave={() =>
        gsap.to(cardRef.current, { scale: 1, duration: 0.2 })
      }
      className="bg-white rounded-xl shadow p-5 cursor-pointer"
    >
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold">
        {latest} {unit}
      </p>

      {alert && (
        <p className="text-xs text-red-600 mt-1">
          ⚠ {alert}
        </p>
      )}

      {/* Mini bars */}
      <div className="h-24 mt-4 flex items-end gap-1">
        {vitalsData.map((item, i) => (
          <div
            key={i}
            className="flex-1 rounded"
            style={{
              height: `${Math.min(item[dataKey], 160) / 2}px`,
              backgroundColor: color,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------ Alerts Logic ------------------ */

function getAlert(type: string, value: number) {
  if (type === "heart" && value > 100) return "High heart rate";
  if (type === "bp" && value > 140) return "High blood pressure";
  if (type === "sugar" && value > 150) return "High blood sugar";
  return null;
}

/* ------------------ Modal ------------------ */

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3 }
    );
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 w-[90%] max-w-md"
      >
        <h2 className="font-semibold text-lg mb-4">Edit Profile</h2>

        <div className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Name" />
          <input className="w-full border p-2 rounded" placeholder="Age" />
          <input className="w-full border p-2 rounded" placeholder="Blood Group" />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Reusable ------------------ */

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
