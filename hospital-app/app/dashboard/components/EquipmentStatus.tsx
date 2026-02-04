export default function EquipmentStatus() {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#3b82f6] transition-all group">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      
      <div className="relative">
        <h3 className="font-semibold mb-6 text-slate-900 group-hover:text-[#1e3a8a] transition-colors text-lg">⚙️ Equipment Status</h3>

        <ul className="space-y-3 text-sm">
          <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-[#dbeafe] transition-colors">
            <span className="font-medium text-gray-700">MRI Scanner</span>
            <span className="text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full text-xs">Not Operational</span>
          </li>

          <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
            <span className="font-medium text-gray-700">CT Scanner</span>
            <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-xs">Active</span>
          </li>

          <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
            <span className="font-medium text-gray-700">X-Ray</span>
            <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-xs">Active</span>
          </li>
        </ul>

        <button className="mt-6 w-full text-sm text-white font-medium bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] rounded-xl py-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105">
          Request Equipment Support →
        </button>
      </div>
    </div>
  );
}
