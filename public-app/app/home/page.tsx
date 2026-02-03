import Header from "@/components/Header";
import AlertsBanner from "@/components/AlertsBanner";
import FeatureGrid from "@/components/FeatureGrid";
import MiniMap from "@/components/MiniMap";
import ChatbotButton from "@/components/ChatbotButton";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <AlertsBanner />
      <FeatureGrid />
      <MiniMap />
      <ChatbotButton />
      <Footer />
    </main>
  );
}
