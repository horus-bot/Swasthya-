import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import AlertsBanner from "@/components/dashboard/AlertsBanner";
import FeatureGrid from "@/components/dashboard/FeatureGrid";
import QuickActions from "@/components/dashboard/QuickActions";

import MiniMap from "@/components/map/MiniMap";
import ChatbotButton from "@/components/chatbox/ChatbotButton";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">

        {/* Welcome Section */}
        <section>
          <h1 className="text-2xl font-bold">
            Public Healthcare Access Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Government-supported healthcare services for citizens
          </p>
        </section>

        {/* Alerts */}
        <AlertsBanner />

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Quick Actions
          </h2>
          <QuickActions />
        </section>

        {/* Features */}
        <section>
          <h2 className="text-lg font-semibold mb-3">
            Available Services
          </h2>
          <FeatureGrid />
        </section>

        {/* Map Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3">
            Nearby Healthcare Facilities
          </h2>
          <MiniMap />
          <p className="text-xs text-gray-500 mt-2">
            Hotspot and interactive clinic indicators shown on map
          </p>
        </section>

      </main>

      {/* Chatbot Floating Button */}
      <ChatbotButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
