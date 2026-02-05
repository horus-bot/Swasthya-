export default function BedStatus({ data, onUpdate }: any) {
  const totalBeds = data?.total_beds ?? 40;
  const availableBeds = data?.available_beds ?? 12;
  const occupiedBeds = data?.occupied_beds ?? 28;
  const occupancyPercent = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#3b82f6] transition-all group">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      
      <div className="relative">
        <h3 className="font-bold text-lg mb-6 text-slate-900 group-hover:text-[#1e3a8a] transition-colors">🛏️ Bed Availability</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-[#dbeafe] rounded-xl group-hover:to-[#bfdbfe] transition-all">
            <span className="font-medium text-gray-700">Total Beds</span>
            <span className="font-bold text-xl text-slate-900">{totalBeds}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 hover:shadow-md transition-all">
            <span className="font-medium text-gray-700">Available</span>
            <span className="font-bold text-xl text-emerald-600">{availableBeds}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200 hover:shadow-md transition-all">
            <span className="font-medium text-gray-700">Occupied</span>
            <span className="font-bold text-xl text-amber-600">{occupiedBeds}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600">Occupancy Rate</span>
            <span className="text-xs font-bold text-gray-900">{occupancyPercent}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div className="h-3 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-full transition-all" style={{ width: `${occupancyPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
