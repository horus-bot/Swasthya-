"use client";

import { Users, UserCheck, Clock, Briefcase } from "lucide-react";

export default function StaffManagement() {
  const staffShifts = [
    { name: "Dr. Sarah Johnson", role: "Emergency Physician", shift: "Morning", status: "On Duty", department: "Emergency" },
    { name: "Dr. Rajesh Kumar", role: "Cardiologist", shift: "Morning", status: "On Duty", department: "Cardiology" },
    { name: "Nurse Priya Sharma", role: "Head Nurse", shift: "Morning", status: "On Duty", department: "ICU" },
    { name: "Dr. Amit Singh", role: "Surgeon", shift: "Afternoon", status: "Scheduled", department: "Surgery" },
    { name: "Nurse Sunita Devi", role: "Staff Nurse", shift: "Night", status: "Scheduled", department: "General" },
    { name: "Dr. Vikash Yadav", role: "Radiologist", shift: "Morning", status: "On Break", department: "Radiology" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Duty": return "bg-green-100 text-green-700 border-green-200";
      case "Scheduled": return "bg-blue-100 text-blue-700 border-blue-200";
      case "On Break": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Off Duty": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "Morning": return "bg-orange-100 text-orange-700";
      case "Afternoon": return "bg-purple-100 text-purple-700";
      case "Night": return "bg-indigo-100 text-indigo-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
          <Users className="text-blue-600" size={24} />
          Staff Schedule
        </h3>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Full Schedule →
        </button>
      </div>

      <div className="space-y-3">
        {staffShifts.map((staff, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center">
                <UserCheck size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{staff.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase size={12} />
                  <span>{staff.role} • {staff.department}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getShiftColor(staff.shift)}`}>
                {staff.shift}
              </span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(staff.status)}`}>
                {staff.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">15</p>
            <p className="text-xs text-gray-500">On Duty Now</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">8</p>
            <p className="text-xs text-gray-500">Scheduled</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-xs text-gray-500">On Break</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">45</p>
            <p className="text-xs text-gray-500">Total Staff</p>
          </div>
        </div>
      </div>
    </div>
  );
}