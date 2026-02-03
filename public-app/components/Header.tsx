import Link from "next/link";
import { Logo } from "./logo";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-emerald-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Logo width={40} height={42} className="text-white" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white">Swasthya</h1>
              <span className="text-xs text-teal-100">Healthcare Platform</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/home" 
              className="text-white hover:text-teal-100 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/clinics" 
              className="text-white hover:text-teal-100 transition-colors duration-200 font-medium"
            >
              Find Clinics
            </Link>
            <Link 
              href="/appointments" 
              className="text-white hover:text-teal-100 transition-colors duration-200 font-medium"
            >
              Appointments
            </Link>
            <Link 
              href="/reports" 
              className="text-white hover:text-teal-100 transition-colors duration-200 font-medium"
            >
              Health Reports
            </Link>
            <Link 
              href="/profile" 
              className="text-white hover:text-teal-100 transition-colors duration-200 font-medium"
            >
              Profile
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-teal-600 rounded-md p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-teal-700">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/home" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-600 transition-colors duration-200">
            Home
          </Link>
          <Link href="/clinics" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-600 transition-colors duration-200">
            Find Clinics
          </Link>
          <Link href="/appointments" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-600 transition-colors duration-200">
            Appointments
          </Link>
          <Link href="/reports" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-600 transition-colors duration-200">
            Health Reports
          </Link>
          <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-600 transition-colors duration-200">
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}