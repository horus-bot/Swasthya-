export default function EquipmentStatus() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h3 className="font-semibold mb-4">
        Equipment Status
      </h3>

      <ul className="space-y-3 text-sm">
        <li className="flex justify-between items-center">
          <span>MRI Scanner</span>
          <span className="text-red-600 font-medium">
            Not Operational
          </span>
        </li>

        <li className="flex justify-between items-center">
          <span>CT Scanner</span>
          <span className="text-green-600 font-medium">
            Active
          </span>
        </li>

        <li className="flex justify-between items-center">
          <span>X-Ray</span>
          <span className="text-green-600 font-medium">
            Active
          </span>
        </li>
      </ul>

      <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">
        Request Equipment Support →
      </button>
    </div>
  );
}
