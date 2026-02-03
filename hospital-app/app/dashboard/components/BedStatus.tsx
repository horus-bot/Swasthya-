export default function BedStatus() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
      <h3 className="font-bold text-lg mb-6 text-slate-900">
        🛏️ Bed Availability
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
          <span className="font-medium text-gray-700">Total Beds</span>
          <span className="font-bold text-xl text-slate-900">40</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
          <span className="font-medium text-gray-700">Available</span>
          <span className="font-bold text-xl text-emerald-600">
            12
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
          <span className="font-medium text-gray-700">ICU Available</span>
          <span className="font-bold text-xl text-amber-600">
            3
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600">Occupancy Rate</span>
          <span className="text-xs font-bold text-gray-900">70%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <div className="h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full w-[70%] shadow-md" />
        </div>
      </div>
    </div>
  );
}
