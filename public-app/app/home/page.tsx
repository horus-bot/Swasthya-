"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  Stethoscope,
  AlertTriangle,
  Info,
  Bot,
  Search,
  Thermometer,
  Wind
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock Data for Trending News - Chennai Specific
const NEWS_UPDATES = [
  {
    id: 1,
    title: "Heatwave Alert: Stay Hydrated",
    summary: "IMD predicts soaring temperatures in Chennai. Public advised to avoid direct sun between 11 AM - 3 PM.",
    severity: "High",
    image: "☀️",
    date: "1h ago",
    location: "Chennai City"
  },
  {
    id: 2,
    title: "Makkalai Thedi Maruthuvam Camp",
    summary: "Doorstep healthcare screening camp to be held in North Chennai zones this weekend.",
    severity: "Medium",
    image: "🩺",
    date: "3h ago",
    location: "Royapuram"
  },
  {
    id: 3,
    title: "Dengue Prevention Drive",
    summary: "Corporation workers intensifying fogging operations in Velachery and Madipakkam areas.",
    severity: "Medium",
    image: "🦟",
    date: "5h ago",
    location: "Velachery"
  },
  {
    id: 4,
    title: "New Metro Link to RGGGH",
    summary: "Direct subway access connecting Central Metro to Rajiv Gandhi Govt General Hospital opened.",
    severity: "Low",
    image: "🚇",
    date: "1d ago",
    location: "Park Town"
  },
  {
    id: 5,
    title: "Free Eye Screening",
    summary: "Egmore Ophthalmic Hospital conducting free cataract screening for seniors.",
    severity: "Low",
    image: "👁️",
    date: "2d ago",
    location: "Egmore"
  }
];

// Mock Data for Government Issues - Chennai Context
const GOV_ISSUES = [
  {
    id: 1,
    title: "Stormwater Drain Completion",
    description: "Expediting final phase of stormwater drain network in T. Nagar and Mambalam to prevent monsoon waterlogging.",
    priority: "Critical",
    status: "In Progress",
    department: "Corporation",
    date: "Feb 02",
    location: "T. Nagar",
    icon: "🏗️"
  },
  {
    id: 2,
    title: "Cooum River Restoration",
    description: "Phase 3 of the eco-restoration project begun. Removing encroachments and planting native saplings along banks.",
    priority: "High",
    status: "Active",
    department: "CRRT",
    date: "Jan 15",
    location: "Central Chennai",
    icon: "🌊"
  },
  {
    id: 3,
    title: "Air Quality Monitoring",
    description: "Setting up 5 new continuous ambient air quality monitoring stations in Manali and Ennore industrial belts.",
    priority: "High",
    status: "Planning",
    department: "Pollution Ctrl",
    date: "Jan 28",
    location: "North Chennai",
    icon: "🏭"
  },
  {
    id: 4,
    title: "Road Relay & Safety",
    description: "Resurfacing damaged roads in OMR and ECR with improved reflective markings for night safety.",
    priority: "Medium",
    status: "Active",
    department: "Highways",
    date: "Feb 04",
    location: "OMR/ECR",
    icon: "🛣️"
  },
  {
    id: 5,
    title: "Smart Hospital Parking",
    description: "Implementing automated parking systems at Stanley Medical College to reduce congestion.",
    priority: "Low",
    status: "Completed",
    department: "Smart City",
    date: "Jan 10",
    location: "George Town",
    icon: "🅿️"
  }
];

// Helper for severity styles
const getSeverityStyle = (severity: string) => {
  switch(severity) {
    case 'High': case 'Critical': return 'bg-rose-500 text-white';
    case 'Medium': return 'bg-amber-500 text-white';
    case 'Low': return 'bg-teal-500 text-white';
    default: return 'bg-slate-500 text-white';
  }
};

export default function HomePage() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation - Ensure visibility by using autoAlpha and running immediately
      gsap.from(".hero-content > *", {
        y: 30,
        autoAlpha: 0, // Handles opacity + visibility
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all" // Clear styles after animation to prevent sticking
      });

      // Stats/Weather Cards Animation
      gsap.from(".stat-card", {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.3, // Reduced delay
        stagger: 0.1,
        ease: "back.out(1.7)",
        clearProps: "all"
      });

      // Quick Actions Grid
      gsap.from(".action-card", {
        scrollTrigger: {
          trigger: ".actions-section",
          start: "top 90%", // Trigger earlier (was 80%)
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "all"
      });

      // News & Issues
      gsap.from(".info-card", {
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 85%", // Trigger earlier
        },
        y: 30, // Changed from x to y for subtler effect
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleNewsClick = (news: typeof NEWS_UPDATES[0]) => {
    const query = encodeURIComponent(`Can you tell me more about "${news.title}"?`);
    router.push(`/chatbox?q=${query}`);
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative bg-[#0f766e] text-white pt-8 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
            <div className="hero-content space-y-4 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-teal-800/50 rounded-full text-teal-200 text-xs font-semibold tracking-wide border border-teal-700/50">
                OFFICIAL PUBLIC HEALTHCARE PORTAL
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Namaste, <span className="text-teal-300">Citizen</span>
              </h1>
              <p className="text-teal-100 text-lg leading-relaxed">
                Access healthcare services, track real-time health updates, and connect with government initiatives seamlessly.
              </p>
            </div>
            
            {/* Live Environment Stats (Mock) */}
            <div className="hidden md:flex gap-4">
              <div className="stat-card bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-32 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-colors cursor-default">
                <div className="flex items-center gap-2 text-teal-200 mb-2">
                  <Thermometer size={18} /> <span className="text-xs font-medium uppercase tracking-wider">Temp</span>
                </div>
                <div className="text-3xl font-bold">28°C</div>
                <div className="text-xs text-teal-200/80 mt-1">Sunny</div>
              </div>
              <div className="stat-card bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-32 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-colors cursor-default">
                <div className="flex items-center gap-2 text-teal-200 mb-2">
                  <Wind size={18} /> <span className="text-xs font-medium uppercase tracking-wider">AQI</span>
                </div>
                <div className="text-3xl font-bold text-amber-300">112</div>
                <div className="text-xs text-amber-200/80 mt-1">Moderate</div>
              </div>
            </div>
          </div>

          {/* Search Bar - Floating */}
          <div className="hero-content relative max-w-2xl">
            <input 
              type="text" 
              placeholder="Search for clinics, medicines, or services..." 
              className="w-full bg-white text-slate-800 placeholder:text-slate-400 pl-14 pr-4 py-5 rounded-2xl shadow-2xl shadow-teal-900/20 focus:outline-none focus:ring-4 focus:ring-teal-500/30 transition-shadow text-lg"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS GRID - Overlapping Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 actions-section pb-12">
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
               <Stethoscope size={28} />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Healthcare Services</h2>
               <p className="text-slate-500 text-sm">Quick access to essential services</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            <ServiceCard href="/clinics" title="Find Clinics" icon={Building2} color="bg-blue-50 text-blue-600" />
            <ServiceCard href="/appointments" title="Appointments" icon={Calendar} color="bg-violet-50 text-violet-600" />
            <ServiceCard href="/reports" title="My Reports" icon={FileText} color="bg-emerald-50 text-emerald-600" />
            <ServiceCard href="/chatbox" title="AI Assistant" icon={Bot} color="bg-sky-50 text-sky-600" />
            
            <ServiceCard href="/map" title="Health Map" icon={MapPin} color="bg-rose-50 text-rose-600" />
            <ServiceCard href="/tracker" title="Tracker" icon={Activity} color="bg-amber-50 text-amber-600" />
            <ServiceCard href="/routing" title="Smart Route" icon={MapIcon} color="bg-indigo-50 text-indigo-600" />
            <ServiceCard href="/details" title="Emergency" icon={AlertTriangle} color="bg-red-50 text-red-600" />
          </div>
        </div>
      </main>

      {/* CONTENT COLUMNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 info-section mb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Government Initiatives (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-teal-600 rounded-full"></span>
                Gov Initiatives
              </h2>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-teal-100">Updates</span>
            </div>

            <div className="space-y-4">
              {GOV_ISSUES.map((issue) => (
                <div key={issue.id} className="info-card group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex gap-5 relative z-10">
                    <div className="text-4xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">{issue.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-700 transition-colors">{issue.title}</h3>
                        <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm ${getSeverityStyle(issue.priority)}`}>
                          {issue.priority}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-4">{issue.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 bg-slate-50 p-3 rounded-lg">
                        <span className="flex items-center gap-1.5"><Building2 size={14} className="text-slate-300"/> {issue.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-300"/> {issue.location}</span>
                        <button className="ml-auto text-teal-600 hover:text-teal-800 transition-colors flex items-center gap-1">Details <ArrowRight size={12}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Trending News (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                Trending Now
              </h2>
              <Link href="/trending-news" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">View All Updates</Link>
            </div>

            <div className="grid gap-4">
              {NEWS_UPDATES.map((news) => (
                <div 
                  key={news.id} 
                  onClick={() => handleNewsClick(news)}
                  className="info-card cursor-pointer bg-white border-l-4 border-l-blue-500 border-y border-r border-slate-100 p-5 rounded-r-xl shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{news.location}</span>
                    <span className="text-xs font-medium text-slate-400">{news.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors text-lg">{news.title}</h4>
                  <p className="text-sm text-slate-600 line-clamp-2">{news.summary}</p>
                </div>
              ))}
              
              <div className="info-card bg-gradient-to-br from-teal-600 to-blue-700 rounded-2xl p-8 text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Bot size={120} />
                </div>
                <div className="relative z-10">
                  <Bot size={48} className="mx-auto mb-4 text-white/90 drop-shadow-md" />
                  <h3 className="font-bold text-xl mb-2">Need Help? Ask MediBot</h3>
                  <p className="text-teal-100 mb-6 leading-relaxed">Our AI assistant can help you find medicines, interpret symptoms, and guide you to the right care.</p>
                  <Link href="/chatbox" className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-3 rounded-full text-sm font-bold shadow-xl hover:scale-105 hover:bg-teal-50 transition-all duration-300">
                    <MessageSquare size={16} /> Start Chat
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
}

function ServiceCard({ href, title, icon: Icon, color }: { href: string; title: string; icon: any; color: string }) {
  return (
    <Link href={href} className="action-card group flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${color}`}>
        <Icon size={28} />
      </div>
      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 text-center">{title}</span>
    </Link>
  );
}