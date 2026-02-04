'use client';

import { useState, useEffect } from 'react';
import { User, Calendar, Award, TrendingUp, Edit3, Save, X } from 'lucide-react';
import ProfileStatCard from './components/ProfileStatCard';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfoCard from './components/ProfileInfoCard';
import ProfessionalDetails from './components/ProfessionalDetails';
import PreferencesSettings from './components/PreferencesSettings';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.gov.in',
    phone: '+91 98765 43210',
    department: 'Emergency Medicine',
    role: 'Senior Consultant',
    employeeId: 'EMP001',
    specialization: 'Emergency Medicine, Critical Care',
    experience: '8 years',
    joinDate: '2018-03-15'
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: false,
    smsAlerts: true,
    theme: 'light'
  });

  const handleSave = () => {
    // Here you would typically save to database
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data if needed
    setIsEditing(false);
  };

  const handleDataChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-500 mt-2">Manage your account information and preferences</p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200"
            >
              <Save size={18} />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all duration-200"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfileStatCard 
          title="Years of Service" 
          value="8" 
          subtitle="Since 2018" 
          icon={<Calendar className="text-blue-600" size={24} />}
        />
        <ProfileStatCard 
          title="Performance Rating" 
          value="4.8" 
          subtitle="Out of 5.0" 
          icon={<Award className="text-emerald-600" size={24} />}
        />
        <ProfileStatCard 
          title="Patients Served" 
          value="2,156" 
          subtitle="Total career" 
          icon={<User className="text-purple-600" size={24} />}
        />
        <ProfileStatCard 
          title="Monthly Average" 
          value="89" 
          subtitle="Patients/month" 
          icon={<TrendingUp className="text-orange-600" size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <ProfileHeader profileData={profileData} />
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <ProfileInfoCard 
            profileData={profileData}
            isEditing={isEditing}
            onDataChange={handleDataChange}
          />

          {/* Professional Information */}
          <ProfessionalDetails 
            profileData={profileData}
            isEditing={isEditing}
            onDataChange={handleDataChange}
          />
        </div>
      </div>

      {/* Preferences and Settings */}
      <PreferencesSettings 
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
      />
    </div>
  );
}