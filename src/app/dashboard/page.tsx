'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const checkoutId = searchParams.get('checkout_id');
    const [customerState, setCustomerState] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomerState();
        
        // Auto-redirect to profile page after 3 seconds if checkout_id is present
        if (checkoutId) {
            const timer = setTimeout(() => {
                router.push('/in/profile');
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [checkoutId, router]);

    const loadCustomerState = async () => {
        try {
            const { data } = await authClient.customer.state();
            setCustomerState(data);
        } catch (error) {
            console.error('Error loading customer state:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Success Message */}
                {checkoutId && (
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="bg-green-500/10 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-4">Welcome to TimeLens!</h1>
                            <p className="text-gray-300 text-lg mb-6">
                                Your subscription has been activated successfully. You can now start transforming your photos with AI.
                            </p>
                            <p className="text-blue-400 text-sm mb-4">
                                Redirecting to your profile in 3 seconds...
                            </p>
                            <div className="text-sm text-gray-400">
                                Checkout ID: {checkoutId}
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Your
                        <br />
                        <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                            Dashboard
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Manage your AI transformations, view your subscription, and access all your features.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <Link
                        href="/upload"
                        className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group"
                    >
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Upload Photo</h3>
                        <p className="text-gray-400">Start transforming your photos with AI</p>
                    </Link>

                    <Link
                        href="/dashboard/subscription"
                        className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group"
                    >
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Subscription</h3>
                        <p className="text-gray-400">Manage your plan and billing</p>
                    </Link>

                    <Link
                        href="/gallery"
                        className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group"
                    >
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Gallery</h3>
                        <p className="text-gray-400">View your transformations</p>
                    </Link>
                </div>

                {/* Subscription Status */}
                {customerState?.subscriptions && customerState.subscriptions.length > 0 && (
                    <div className="max-w-4xl mx-auto mb-20">
                        <h2 className="text-2xl font-bold text-white text-center mb-8">Your Current Plan</h2>
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            {customerState.subscriptions.map((subscription: any, index: number) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {subscription.product?.name || 'Pro Plan'}
                                        </h3>
                                        <p className="text-gray-400">Active subscription</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white">
                                            ${subscription.price?.amount / 100}/month
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Usage Stats */}
                {customerState?.meters && customerState.meters.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-white text-center mb-8">Usage This Month</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {customerState.meters.map((meter: any, index: number) => (
                                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                                    <h3 className="text-lg font-semibold text-white mb-2">{meter.meter?.name}</h3>
                                    <div className="text-3xl font-bold text-purple-400 mb-2">
                                        {meter.consumed_units}
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        of {meter.meter?.limit || 'unlimited'} used
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
