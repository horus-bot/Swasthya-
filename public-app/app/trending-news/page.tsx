"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Bot, 
  Share2, 
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

// Expanded Mock Data
const ALL_NEWS = [
  {
    id: 1,
    title: "Dengue Alert: T. Nagar & Kodambakkam",
    summary: "Rise in dengue cases reported. Residents advised to prevent water stagnation. Fogging operations underway.",
    details: "The Chennai Corporation has intensified mosquito control measures in Zone 10 (Kodambakkam) and T. Nagar following a spike in dengue cases. Health officials report 15 new cases in the last 48 hours. Public health workers are conducting door-to-door inspections to check for larval breeding sources.",
    severity: "High",
    category: "Disease Outbreak",
    date: "2 hours ago",
    location: "T. Nagar, Chennai",
    likes: 245,
    views: "1.2k"
  },
  {
    id: 2,
    title: "Mega Vaccination Camp on Sunday",
    summary: "City-wide vaccination drive for Flu and COVID-19 boosters at all Urban Primary Health Centers.",
    details: "Greater Chennai Corporation announces a mega vaccination camp this Sunday from 9 AM to 4 PM. Vaccines available: Covishield, Covaxin, and seasonal Influenza shots. Special focus on elderly citizens and children.",
    severity: "Medium",
    category: "Public Health",
    date: "5 hours ago",
    location: "All Zones",
    likes: 890,
    views: "5.5k"
  },
  {
    id: 3,
    title: "New Dialysis Unit at Royapettah GH",
    summary: "State-of-the-art dialysis wing inaugurated at Government Royapettah Hospital. Free services for eligible patients.",
    details: "Minister for Health and Family Welfare inaugurated a 20-bed dialysis unit at Royapettah Government Hospital today. The unit is equipped with the latest hemodialysis machines and will offer free treatment under the Chief Minister's Comprehensive Health Insurance Scheme.",
    severity: "Low",
    category: "Infrastructure",
    date: "1 day ago",
    location: "Royapettah",
    likes: 567,
    views: "3.2k"
  },
  {
    id: 4,
    title: "Traffic Advisory: Marathon on ECR",
    summary: "Traffic diversions expected on East Coast Road this Sunday due to the Chennai Health Marathon.",
    details: "Chennai Traffic Police have announced diversions on ECR from Thiruvanmiyur to Kovalam between 4 AM and 10 AM this Sunday. Motorists are advised to use OMR as an alternative route. Emergency vehicles will be allowed passage.",
    severity: "Low",
    category: "Advisory",
    date: "1 day ago",
    location: "ECR, Chennai",
    likes: 120,
    views: "800"
  },
  {
    id: 5,
    title: "Free Eye Checkup Camp",
    summary: "Free eye screening camp at Tambaram Sanatorium this weekend.",
    details: "A comprehensive eye screening camp is organized by the Dept of Ophthalmology, at the Tambaram Sanatorium Community Hall. Free spectacles will be distributed to those in need. Cataract surgeries will be scheduled for eligible candidates.",
    severity: "Medium",
    category: "Event",
    date: "3 hours ago",
    location: "Tambaram",
    likes: 340,
    views: "1.5k"
  },
   {
    id: 6,
    title: "Heatwave Warning: Stay Hydrated",
    summary: "Temperatures expected to soar above 40°C. Residents advised to stay indoors during noon.",
    details: "The Regional Meteorological Centre has issued a heatwave warning for Chennai and surrounding districts for the next 3 days. High humidity combined with high temperatures may lead to heat exhaustion. Drink plenty of water and avoid direct sunlight between 12 PM and 3 PM.",
    severity: "High",
    category: "Weather Alert",
    date: "30 mins ago",
    location: "Chennai City",
    likes: 1024,
    views: "10k"
  }
];

export default function TrendingNewsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = ALL_NEWS.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter || item.severity === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAskAI = (news: typeof ALL_NEWS[0]) => {
     const query = encodeURIComponent(`I want to know more about the trending news: "${news.title}". Details: ${news.details}. What precautions should I take?`);
     router.push(`/chatbox?q=${query}`);
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'High': return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1 border border-red-200"><AlertTriangle size={12}/> High Priority</span>;
      case 'Medium': return <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full flex items-center gap-1 border border-orange-200"><Info size={12}/> Medium Priority</span>;
      case 'Low': return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1 border border-blue-200"><CheckCircle2 size={12}/> Info</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <Link href="/home" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
             </Link>
             <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   <TrendingUp className="text-teal-600" /> Trending News
                </h1>
                <p className="text-sm text-gray-500">Latest healthcare updates in Chennai</p>
             </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                   type="text" 
                   placeholder="Search news..." 
                   className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
             </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 overflow-x-auto no-scrollbar">
         <div className="flex gap-2">
            {['All', 'High', 'Medium', 'Public Health', 'Disease Outbreak', 'Infrastructure'].map((f) => (
               <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                     filter === f 
                     ? 'bg-teal-600 text-white shadow-md shadow-teal-200' 
                     : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600'
                  }`}
               >
                  {f}
               </button>
            ))}
         </div>
      </div>

      {/* News Feed Grid */}
      <div className="max-w-screen-xl mx-auto px-4 pb-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={news.id} 
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
               >
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-2">
                        <img src="https://ui-avatars.com/api/?name=Health+Dept&background=0d9488&color=fff" alt="Source" className="w-8 h-8 rounded-full" />
                        <div>
                           <p className="text-xs font-bold text-gray-900">Health Dept.</p>
                           <p className="text-[10px] text-gray-500">{news.date}</p>
                        </div>
                     </div>
                     {getSeverityBadge(news.severity)}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                     {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                     {news.summary}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50">
                     <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {news.location}</span>
                        <span className="flex items-center gap-1">❤️ {news.likes}</span>
                        <span className="flex items-center gap-1">👁️ {news.views}</span>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-3">
                        <button 
                           onClick={() => handleAskAI(news)}
                           className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal-50 text-teal-700 font-semibold text-sm hover:bg-teal-100 transition-colors"
                        >
                           <Bot size={16} /> Ask AI
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors">
                           <Share2 size={16} /> Share
                        </button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}