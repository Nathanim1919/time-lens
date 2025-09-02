'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Calendar, 
  BarChart3, 
  Crown, 
  Zap, 
  Shield, 
  Users, 
  RefreshCw,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface SubscriptionData {
  currentPlan: string;
  status: string;
  nextBillingDate: string;
  usage: {
    transformations: number;
    limit: number;
    remaining: number;
  };
  benefits: string[];
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/subscription?action=status');
      if (!response.ok) {
        throw new Error('Failed to fetch subscription data');
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const handleManageBilling = async () => {
    try {
      const response = await fetch('/api/auth/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create portal session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error('Error creating portal session:', err);
      alert('Failed to open billing portal. Please try again.');
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'pro':
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 'basic':
        return <Zap className="w-6 h-6 text-blue-500" />;
      default:
        return <Users className="w-6 h-6 text-gray-500" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro':
        return 'from-purple-600 to-pink-600';
      case 'basic':
        return 'from-blue-600 to-cyan-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'pro':
        return 'Pro Plan';
      case 'basic':
        return 'Basic Plan';
      default:
        return 'Free Plan';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Subscription</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchSubscriptionData}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Subscription Management</h1>
            <p className="text-gray-400">Manage your plan and billing preferences</p>
          </div>
          <button
            onClick={fetchSubscriptionData}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {subscription && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Current Plan Card */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {getPlanIcon(subscription.currentPlan)}
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {getPlanName(subscription.currentPlan)}
                      </h2>
                      <p className="text-gray-400 capitalize">{subscription.status} • Monthly Billing</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    subscription.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {subscription.status === 'active' ? 'Active' : 'Pending'}
                  </div>
                </div>

                {/* Plan Features */}
                <div className="grid gap-4 mb-6">
                  {subscription.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleManageBilling}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Manage Billing
                  </button>
                  <button
                    onClick={() => router.push('/pricing')}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Change Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="space-y-6">
              {/* Next Billing */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-white">Next Billing</h3>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {new Date(subscription.nextBillingDate).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm">
                  {Math.ceil((new Date(subscription.nextBillingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                </p>
              </div>

              {/* Usage Meter */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-white">Daily Usage</h3>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Transformations</span>
                    <span className="text-white">
                      {subscription.usage.transformations} / {subscription.usage.limit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        subscription.usage.transformations / subscription.usage.limit > 0.8 
                          ? 'bg-red-500' 
                          : subscription.usage.transformations / subscription.usage.limit > 0.5 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${Math.min((subscription.usage.transformations / subscription.usage.limit) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400">
                  {subscription.usage.remaining} transformations remaining today
                </p>
              </div>

              {/* Plan Benefits */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-white">Plan Benefits</h3>
                </div>
                <div className="space-y-2">
                  {subscription.currentPlan === 'pro' && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Unlimited transformations</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Priority support</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Advanced AI models</span>
                      </div>
                    </>
                  )}
                  {subscription.currentPlan === 'basic' && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">10 transformations/day</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Standard support</span>
                      </div>
                    </>
                  )}
                  {subscription.currentPlan === 'free' && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">2 transformations/day</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-300">Community support</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/in/profile')}
            className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ← Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}
