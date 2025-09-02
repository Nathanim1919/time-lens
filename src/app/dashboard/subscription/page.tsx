'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

interface CustomerState {
    customer: any;
    subscriptions: any[];
    benefits: any[];
    meters: any[];
}

export default function SubscriptionPage() {
    const [customerState, setCustomerState] = useState<CustomerState | null>(null);
    const [loading, setLoading] = useState(true);
    const [portalLoading, setPortalLoading] = useState(false);

    useEffect(() => {
        loadCustomerState();
    }, []);

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

    const openCustomerPortal = async () => {
        try {
            setPortalLoading(true);
            await authClient.customer.portal();
        } catch (error) {
            console.error('Error opening portal:', error);
            alert('Unable to open customer portal. Please try again.');
        } finally {
            setPortalLoading(false);
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
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white/80 mb-8">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                        Subscription Management
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Manage Your
                        <br />
                        <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                            Subscription
                        </span>
                    </h1>
                    
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        View your current plan, manage billing, and access your customer portal.
                    </p>
                </div>

                {/* Current Plan Status */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white">Current Plan</h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={openCustomerPortal}
                                    disabled={portalLoading}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                                >
                                    {portalLoading ? 'Opening...' : 'Manage Billing'}
                                </button>
                                <Link
                                    href="/pricing"
                                    className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
                                >
                                    Change Plan
                                </Link>
                            </div>
                        </div>

                        {customerState?.subscriptions && customerState.subscriptions.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                {customerState.subscriptions.map((subscription, index) => (
                                    <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold text-white">
                                                {subscription.product?.name || 'Pro Plan'}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                subscription.status === 'active' 
                                                    ? 'bg-green-500/20 text-green-300' 
                                                    : 'bg-yellow-500/20 text-yellow-300'
                                            }`}>
                                                {subscription.status}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-3 text-gray-300">
                                            <div className="flex justify-between">
                                                <span>Price:</span>
                                                <span>${subscription.price?.amount / 100}/month</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Next billing:</span>
                                                <span>{new Date(subscription.current_period_end).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Created:</span>
                                                <span>{new Date(subscription.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No Active Subscription</h3>
                                <p className="text-gray-400 mb-6">You don't have an active subscription yet.</p>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                                >
                                    Choose a Plan
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Usage Stats */}
                {customerState?.meters && customerState.meters.length > 0 && (
                    <div className="max-w-4xl mx-auto mb-20">
                        <h2 className="text-2xl font-bold text-white text-center mb-8">Usage Statistics</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {customerState.meters.map((meter, index) => (
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

                {/* Benefits */}
                {customerState?.benefits && customerState.benefits.length > 0 && (
                    <div className="max-w-4xl mx-auto mb-20">
                        <h2 className="text-2xl font-bold text-white text-center mb-8">Your Benefits</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {customerState.benefits.map((benefit, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{benefit.benefit?.name}</h3>
                                    </div>
                                    <p className="text-gray-400">{benefit.benefit?.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-8">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link
                            href="/pricing"
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
                        >
                            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Upgrade Plan</h3>
                            <p className="text-gray-400 text-sm">Get more features and higher limits</p>
                        </Link>

                        <button
                            onClick={openCustomerPortal}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
                        >
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Billing Settings</h3>
                            <p className="text-gray-400 text-sm">Manage payment methods and invoices</p>
                        </button>

                        <Link
                            href="/support"
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
                        >
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Get Help</h3>
                            <p className="text-gray-400 text-sm">Contact support for assistance</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
