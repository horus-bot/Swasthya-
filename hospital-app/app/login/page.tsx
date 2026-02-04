'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../lib/api/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const authStatus = localStorage.getItem('hospital_auth');
    if (authStatus === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link before logging in.');
        } else {
          setError(error.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        // Set authentication in localStorage
        localStorage.setItem('hospital_auth', 'true');
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('login_time', new Date().toISOString());
        
        // Redirect to dashboard
        router.push('/dashboard');
      }

    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-xl p-2 shadow-md">
            <svg
              viewBox="0 0 992 1056"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0 C327.36 0 654.72 0 992 0 C992 348.48 992 696.96 992 1056 C664.64 1056 337.28 1056 0 1056 C0 707.52 0 359.04 0 0 Z"
                fill="#FDFEFD"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Swasthya
          </h1>
          <p className="text-gray-600">
            Hospital Staff Access Portal
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@hospital.gov.in"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-colors"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-colors"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 transform hover:scale-[1.02]'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#3b82f6] hover:text-[#2563eb] font-medium">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            For authorized hospital personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
