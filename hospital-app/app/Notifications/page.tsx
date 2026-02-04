import NotificationStatCard from "./components/NotificationStatCard";
import EmergencyAlerts from "./components/EmergencyAlerts";
import SystemNotifications from "./components/SystemNotifications";
import AlertsPanel from "./components/AlertsPanel";
import NotificationFilters from "./components/NotificationFilters";
import { Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Notifications & Alerts
        </h1>
        <p className="text-gray-500 mt-2">Monitor system alerts, notifications, and recent hospital activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <NotificationStatCard 
          title="Active Alerts" 
          value="7" 
          subtitle="Require attention" 
          icon={<AlertTriangle className="text-red-600" size={24} />}
        />
        <NotificationStatCard 
          title="Unread Notifications" 
          value="15" 
          subtitle="New messages" 
          icon={<Bell className="text-blue-600" size={24} />}
        />
        <NotificationStatCard 
          title="Resolved Today" 
          value="23" 
          subtitle="Issues handled" 
          icon={<CheckCircle className="text-emerald-600" size={24} />}
        />
        <NotificationStatCard 
          title="Response Time" 
          value="4.2m" 
          subtitle="Average today" 
          icon={<Clock className="text-purple-600" size={24} />}
        />
      </div>

      {/* Filters */}
      <NotificationFilters />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Emergency Alerts - Takes 2 columns */}
        <div className="xl:col-span-2">
          <EmergencyAlerts />
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="xl:col-span-1">
          <AlertsPanel />
        </div>
      </div>

      {/* System Notifications - Full width */}
      <div>
        <SystemNotifications />
      </div>
    </div>
  );
}