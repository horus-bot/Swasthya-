type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">{title}</p>
          <p className="text-4xl font-bold mt-3 text-slate-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-2 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
}
