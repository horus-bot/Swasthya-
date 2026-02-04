import Link from "next/link";
import "./home.css";

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Health Dashboard
            </h1>
            <p className="hero-subtitle">
              Access government healthcare services easily from one comprehensive platform designed for your well-being.
            </p>
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-number">500+</span>
                <span className="stat-label">Hospitals</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">2K+</span>
                <span className="stat-label">Doctors</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Patients</span>
              </div>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="medical-icon-container">
              <svg className="medical-icon" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="#1e3a8a" opacity="0.1"/>
                <circle cx="100" cy="100" r="70" fill="#3b82f6" opacity="0.2"/>
                <circle cx="100" cy="100" r="50" fill="#60a5fa" opacity="0.3"/>
                <path d="M70 90 L130 90 L130 110 L70 110 Z" fill="white"/>
                <path d="M90 70 L110 70 L110 130 L90 130 Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <main className="services-section">
        <div className="services-container">
          <div className="section-header">
            <h2 className="section-title">Healthcare Services</h2>
            <p className="section-subtitle">
              Comprehensive healthcare solutions at your fingertips
            </p>
          </div>

          <div className="services-grid">
            <DashboardLink 
              href="/clinics" 
              title="Nearest Clinics" 
              icon="🏥"
              description="Find healthcare facilities near you"
            />
            <DashboardLink 
              href="/routing" 
              title="Smart Routing" 
              icon="🗺️"
              description="AI-powered route optimization"
            />
            <DashboardLink 
              href="/appointments" 
              title="Book Appointment" 
              icon="📅"
              description="Schedule with verified doctors"
            />
            <DashboardLink 
              href="/map" 
              title="Healthcare Map" 
              icon="📍"
              description="Interactive facility locator"
            />
            <DashboardLink 
              href="/tracker" 
              title="Health Tracker" 
              icon="📊"
              description="Monitor your health metrics"
            />
            <DashboardLink 
              href="/profile" 
              title="My Health Profile" 
              icon="👤"
              description="Personal health dashboard"
            />
            <DashboardLink 
              href="/notifications" 
              title="Alerts" 
              icon="🔔"
              description="Health reminders & updates"
            />
            <DashboardLink 
              href="/reports" 
              title="Report / Request" 
              icon="📋"
              description="Medical reports & requests"
            />
            <DashboardLink 
              href="/chatbox" 
              title="AI Assistant" 
              icon="💬"
              description="24/7 AI-powered support"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardLink({
  href,
  title,
  icon,
  description,
}: {
  href: string;
  title: string;
  icon: string;
  description: string;
}) {
  return (
    <Link href={href} className="service-card">
      <div className="service-icon">{icon}</div>
      <div className="service-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
      </div>
      <div className="service-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </Link>
  );
}