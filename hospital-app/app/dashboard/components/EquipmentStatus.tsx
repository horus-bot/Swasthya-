export default function EquipmentStatus({ data, onUpdate }: any) {
  const equipment = data ?? [];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return { text: 'text-green-600', bg: 'bg-green-50', label: 'Available' };
      case 'in_use':
        return { text: 'text-blue-600', bg: 'bg-blue-50', label: 'In Use' };
      case 'maintenance':
        return { text: 'text-amber-600', bg: 'bg-amber-50', label: 'Maintenance' };
      case 'broken':
        return { text: 'text-red-600', bg: 'bg-red-50', label: 'Broken' };
      default:
        return { text: 'text-gray-600', bg: 'bg-gray-50', label: status };
    }
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#3b82f6] transition-all group">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      
      <div className="relative">
        <h3 className="font-semibold mb-6 text-slate-900 group-hover:text-[#1e3a8a] transition-colors text-lg">⚙️ Equipment Status</h3>

        <ul className="space-y-3 text-sm">
          {equipment.length === 0 ? (
            <li className="text-center py-6 text-gray-500">No equipment data available</li>
          ) : (
            equipment.slice(0, 5).map((item: any) => {
              const statusInfo = getStatusColor(item.status);
              return (
                <li key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-[#dbeafe] transition-colors">
                  <span className="font-medium text-gray-700">{item.equipment_name || 'Unknown'}</span>
                  <span className={`${statusInfo.text} font-medium ${statusInfo.bg} px-3 py-1 rounded-full text-xs`}>
                    {statusInfo.label}
                  </span>
                </li>
              );
            })
          )}
        </ul>

        <button className="mt-6 w-full text-sm text-white font-medium bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] rounded-xl py-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105">
          Request Equipment Support →
        </button>
      </div>
    </div>
  );
}
