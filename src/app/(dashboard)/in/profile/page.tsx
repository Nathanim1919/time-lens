"use client";

import { authClient } from '@/lib/auth-client';
import { ArrowLeft, Mail, Calendar, Settings, LogOut, Crown, Sparkles, Zap, Shield, ArrowUpRight, CheckCircle, Star, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubscriptionService } from '@/services/SubscriptionService';
import { UsageService } from '@/services/UsageService';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [userStats, setUserStats] = useState({
    totalTransformations: 0,
    favoriteEra: 'None',
    memberSince: ''
  });
  const [currentPlan, setCurrentPlan] = useState('Free');

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push('/login');
      return;
    }
    fetchUserStats();
    fetchSubscriptionStatus();
  }, [session, isPending, router]);

  const fetchUserStats = async () => {
    try {
      // Get real usage stats from our service
      const usageStats = await UsageService.getUserUsageStats(session?.user?.id || '');
      
      // Get images for era analysis
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
          totalTransformations: usageStats.total,
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

  const fetchSubscriptionStatus = async () => {
    try {
      console.log('🔍 Fetching subscription status for user:', session?.user?.id);
      
      if (!session?.user?.id) {
        console.log('❌ No user ID found in session');
        setCurrentPlan('Free');
        return;
      }
      
      // Get real subscription status from our service
      const subscription = await SubscriptionService.getUserSubscription(session.user.id);
      console.log('📊 Subscription data:', subscription);
      
      const planDisplay = subscription.plan === 'free' ? 'Free' : subscription.plan === 'basic' ? 'Basic' : 'Pro';
      console.log('🎯 Setting plan to:', planDisplay);
      setCurrentPlan(planDisplay);
    } catch (error) {
      console.error('❌ Error fetching subscription status:', error);
      
      // Try to get subscription data directly from API as fallback
      try {
        const response = await fetch('/api/subscription?action=status');
        if (response.ok) {
          const data = await response.json();
          console.log('📊 Fallback subscription data:', data);
          const planDisplay = data.plan === 'free' ? 'Free' : data.plan === 'basic' ? 'Basic' : 'Pro';
          setCurrentPlan(planDisplay);
        } else {
          setCurrentPlan('Free');
        }
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
        setCurrentPlan('Free');
      }
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  const handleManageSubscription = () => {
    router.push('/in/subscription');
  };

  const handleRefresh = () => {
    fetchSubscriptionStatus();
    fetchUserStats();
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-[3px] border-purple-500 border-t-transparent"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-300 animate-ping"></div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/in')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Profile
            </h1>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-200" />
              <span className="text-sm font-medium">Refresh</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors duration-200 group"
            >
              <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-sm font-medium">Sign out</span>
            </button>
          </div>

          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            <div className="relative p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-3xl font-bold shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 animate-pulse"></div>
                    <span className="relative z-10">{session.user.name?.charAt(0).toUpperCase() || 'U'}</span>
                  </div>
                  {currentPlan !== 'Free' && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {session.user.name || 'User'}
                    </h2>
                    <div className="mt-2 flex flex-col md:flex-row md:items-center gap-4 text-gray-300 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-400" />
                        <span>{session.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span>Joined {userStats.memberSince}</span>
                      </div>
                    </div>
                  </div>

                  {/* Plan Status */}
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      currentPlan === 'Free' 
                        ? 'bg-gray-700/50 text-gray-300' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                    }`}>
                      {currentPlan === 'Free' ? 'Free Plan' : `${currentPlan} Plan`}
                    </div>
                    {currentPlan === 'Free' ? (
                      <Button
                        variant="gradient"
                        size="lg"
                        onClick={handleUpgrade}
                        className="rounded-full"
                      >
                        <Sparkles className="w-4 h-4" />
                        Upgrade to Pro
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="glass"
                        size="md"
                        onClick={handleManageSubscription}
                        className="rounded-full"
                      >
                        <Settings className="w-4 h-4" />
                        Manage Subscription
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 backdrop-blur-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-400 font-medium">Transformations</span>
                </div>
                <p className="text-3xl font-bold text-white">{userStats.totalTransformations}</p>
                <p className="text-xs text-gray-400 mt-1">Total images processed</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 backdrop-blur-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-400 font-medium">Favorite Era</span>
                </div>
                <p className="text-xl font-semibold text-white">{userStats.favoriteEra}</p>
                <p className="text-xs text-gray-400 mt-1">Most used style</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 backdrop-blur-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-400 font-medium">Status</span>
                </div>
                <p className="text-xl font-semibold text-green-400">Active</p>
                <p className="text-xs text-gray-400 mt-1">Account verified</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Current Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Basic image transformations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Standard quality output</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Community support</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-400" />
                Pro Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Unlimited transformations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Premium quality output</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Priority support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Advanced AI models</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upgrade CTA */}
          {currentPlan === 'Free' && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 p-8 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
              <div className="relative text-center space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Unlock Your Full Potential
                </h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Upgrade to Pro and experience unlimited transformations with premium quality and priority support.
                </p>
                <button
                  onClick={handleUpgrade}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 group"
                >
                  <Crown className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  Upgrade to Pro
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
