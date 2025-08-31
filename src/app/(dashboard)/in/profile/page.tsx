"use client";

import { authClient } from '@/lib/auth-client';
import { ArrowLeft, User, Mail, Calendar, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [userStats, setUserStats] = useState({
    totalTransformations: 0,
    favoriteEra: 'None',
    memberSince: ''
  });

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push('/login');
      return;
    }
    fetchUserStats();
  }, [session, isPending, router]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/images');
      const result = await response.json();

      if (response.ok) {
        const images = result.images || [];
        const eraCounts: { [key: string]: number } = {};

        images.forEach((image: any) => {
          eraCounts[image.eraTheme] = (eraCounts[image.eraTheme] || 0) + 1;
        });

        const favoriteEra = Object.keys(eraCounts).length > 0
          ? Object.keys(eraCounts).reduce((a, b) => eraCounts[a] > eraCounts[b] ? a : b)
          : 'None';

        setUserStats({
          totalTransformations: images.length,
          favoriteEra,
          memberSince: session?.user?.createdAt
            ? new Date(session.user.createdAt).toLocaleDateString()
            : 'Unknown'
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-gray-600 border-t-white"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/in')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Profile</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign out</span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-2xl font-semibold shadow-inner">
            {session.user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">{session.user.name || 'User'}</h2>
            <div className="mt-1 flex flex-col md:flex-row md:items-center gap-2 text-gray-400 text-sm">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>{session.user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Joined {userStats.memberSince}</span>
              </div>
            </div>
          </div>
          <button className="ml-auto p-2 rounded-full hover:bg-white/10 transition">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-sm">
            <div className="text-sm text-gray-400 mb-1">Transformations</div>
            <p className="text-3xl font-semibold">{userStats.totalTransformations}</p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-sm">
            <div className="text-sm text-gray-400 mb-1">Favorite Era</div>
            <p className="text-xl font-medium">{userStats.favoriteEra}</p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-sm">
            <div className="text-sm text-gray-400 mb-1">Status</div>
            <p className="text-xl font-medium text-green-400">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
