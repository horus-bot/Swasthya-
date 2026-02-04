import Link from "next/link";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo and Brand */}
          <div className="brand">
            <h1 className="brand-title">Swasthya</h1>
            <span className="brand-subtitle">Healthcare Platform</span>
          </div>

          {/* Navigation Links */}
          <nav className="nav-desktop">
            <Link href="/home" className="nav-link">
              Home
            </Link>
            <Link href="/clinics" className="nav-link">
              Find Clinics
            </Link>
            <Link href="/appointments" className="nav-link">
              Appointments
            </Link>
            <Link href="/reports" className="nav-link">
              Health Reports
            </Link>
            <Link href="/profile" className="nav-link">
              Profile
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button className="menu-toggle">
              <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="nav-mobile">
        <Link href="/home" className="nav-mobile-link">
          Home
        </Link>
        <Link href="/clinics" className="nav-mobile-link">
          Find Clinics
        </Link>
        <Link href="/appointments" className="nav-mobile-link">
          Appointments
        </Link>
        <Link href="/reports" className="nav-mobile-link">
          Health Reports
        </Link>
        <Link href="/profile" className="nav-mobile-link">
          Profile
        </Link>
      </div>
    </header>
  );
}