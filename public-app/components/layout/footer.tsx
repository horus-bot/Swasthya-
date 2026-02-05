import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Swasthya Platform</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              A comprehensive government initiative to provide accessible, affordable, and high-quality healthcare services to every citizen.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/clinics" className="text-sm text-gray-500 hover:text-teal-600 transition-colors">Find Clinics</Link></li>
              <li><Link href="/appointments" className="text-sm text-gray-500 hover:text-teal-600 transition-colors">Book Appointments</Link></li>
              <li><Link href="/reports" className="text-sm text-gray-500 hover:text-teal-600 transition-colors">My Reports</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Emergency</h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-500">Ambulance: <span className="font-semibold text-gray-900">102</span></span></li>
              <li><span className="text-sm text-gray-500">General Help: <span className="font-semibold text-gray-900">108</span></span></li>
              <li><Link href="/instructions" className="text-sm text-red-600 hover:text-red-700 font-medium">Emergency Guidelines</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Government Public Healthcare Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
