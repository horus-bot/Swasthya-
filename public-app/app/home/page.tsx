import Link from "next/link";
import { 
  Building2, 
  Map as MapIcon, 
  Calendar, 
  MapPin, 
  Activity, 
  User, 
  Bell, 
  FileText, 
  MessageSquare,
  ArrowRight,
  Stethoscope
} from "lucide-react";
// import "./home.css"; // Removed CSS dependency

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-emerald-800 text-white pb-20 pt-16 lg:pb-32 lg:pt-24">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-teal-400/10 blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Your Health, <br />
                <span className="text-teal-200">Our Priority</span>
              </h1>
              <p className="text-lg md:text-xl text-teal-100 mb-8 max-w-2xl leading-relaxed">
                Connect seamlessly with government healthcare services. One comprehensive platform for appointments, records, and emergency support designed for your well-being.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link 
                  href="/appointments" 
                  className="bg-white text-teal-800 px-8 py-3.5 rounded-full font-semibold shadow-lg hover:bg-teal-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Book Appointment
                </Link>
                <Link 
                  href="/clinics" 
                  className="bg-teal-700/50 backdrop-blur-sm border border-teal-500/50 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-teal-700/70 transition-all duration-200"
                >
                  Find Clinics
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-lg">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-xs md:text-sm text-teal-200 font-medium uppercase tracking-wide">Hospitals</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">2K+</div>
                  <div className="text-xs md:text-sm text-teal-200 font-medium uppercase tracking-wide">Doctors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-xs md:text-sm text-teal-200 font-medium uppercase tracking-wide">Patients</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-5 relative">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Abstract Medical Illustration Replacement */}
                  <div className="bg-white p-8 aspect-square flex items-center justify-center">
                    <Stethoscope className="w-48 h-48 text-teal-600 opacity-80" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Healthcare Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions at your fingertips. Access all essential services from a single dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardLink 
              href="/clinics" 
              title="Nearest Clinics" 
              Icon={Building2}
              description="Find healthcare facilities near you"
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <DashboardLink 
              href="/routing" 
              title="Smart Routing" 
              Icon={MapIcon}
              description="AI-powered route optimization"
              color="text-indigo-600"
              bg="bg-indigo-50"
            />
            <DashboardLink 
              href="/appointments" 
              title="Book Appointment" 
              Icon={Calendar}
              description="Schedule with verified doctors"
              color="text-teal-600"
              bg="bg-teal-50"
            />
            <DashboardLink 
              href="/map" 
              title="Healthcare Map" 
              Icon={MapPin}
              description="Interactive facility locator"
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
            <DashboardLink 
              href="/tracker" 
              title="Health Tracker" 
              Icon={Activity}
              description="Monitor your health metrics"
              color="text-rose-600"
              bg="bg-rose-50"
            />
            <DashboardLink 
              href="/profile" 
              title="My Health Profile" 
              Icon={User}
              description="Personal health dashboard"
              color="text-purple-600"
              bg="bg-purple-50"
            />
            <DashboardLink 
              href="/notifications" 
              title="Alerts" 
              Icon={Bell}
              description="Health reminders & updates"
              color="text-amber-600"
              bg="bg-amber-50"
            />
            <DashboardLink 
              href="/reports" 
              title="Report / Request" 
              Icon={FileText}
              description="Medical reports & requests"
              color="text-cyan-600"
              bg="bg-cyan-50"
            />
            <DashboardLink 
              href="/chatbox" 
              title="AI Assistant" 
              Icon={MessageSquare}
              description="24/7 AI-powered support"
              color="text-sky-600"
              bg="bg-sky-50"
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
  Icon,
  description,
  color,
  bg
}: {
  href: string;
  title: string;
  Icon: React.ElementType;
  description: string;
  color: string;
  bg: string;
}) {
  return (
    <Link href={href} className="group flex items-start p-5 rounded-2xl hover:bg-gray-50 border border-gray-100 hover:border-teal-100 hover:shadow-md transition-all duration-300">
      <div className={`p-3 rounded-xl ${bg} ${color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="text-gray-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all">
        <ArrowRight className="w-5 h-5" />
      </div>
    </Link>
  );
}