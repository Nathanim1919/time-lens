'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const plans = [
        {
            name: "Basic",
            price: "$9.99",
            period: "month",
            description: "Perfect for individual users and small projects",
            features: [
                "50 AI transformations per month",
                "Standard resolution (1080p)",
                "Basic era styles (10 options)",
                "Email support",
                "Download in JPG format"
            ],
            slug: "Basic",
            popular: false
        },
        {
            name: "Pro",
            price: "$29.99",
            period: "month",
            description: "For power users and professionals",
            features: [
                "Unlimited AI transformations",
                "4K resolution output",
                "All era styles (50+ options)",
                "Priority support",
                "Download in multiple formats",
                "Advanced customization",
                "API access",
                "Commercial usage rights"
            ],
            slug: "Pro",
            popular: true
        }
    ];

    const handleSubscribe = async (slug: string) => {
        try {
            setLoading(slug);
            await authClient.checkout({
                slug: slug,
            });
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(null);
        }
    };

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
                        Choose Your Plan
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Simple, Transparent
                        <br />
                        <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                            Pricing
                        </span>
                    </h1>
                    
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Start transforming your photos today. Choose the plan that fits your needs.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                    {plans.map((plan) => (
                        <div
                            key={plan.slug}
                            className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                                plan.popular 
                                    ? 'border-purple-400 bg-white/5 shadow-2xl shadow-purple-500/20' 
                                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400">/{plan.period}</span>
                                </div>
                                <p className="text-gray-400">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-300">
                                        <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSubscribe(plan.slug)}
                                disabled={loading === plan.slug}
                                className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                                    plan.popular
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:scale-105'
                                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading === plan.slug ? 'Processing...' : `Subscribe to ${plan.name}`}
                            </button>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-3">Can I cancel anytime?</h3>
                            <p className="text-gray-400">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-3">What payment methods do you accept?</h3>
                            <p className="text-gray-400">We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through Polar.</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-3">Is there a free trial?</h3>
                            <p className="text-gray-400">Yes! You can try our Basic plan with 5 free transformations. No credit card required to start.</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-3">How do I upgrade my plan?</h3>
                            <p className="text-gray-400">You can upgrade your plan anytime from your dashboard. The new rate will be prorated for the remainder of your billing cycle.</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-20">
                    <p className="text-gray-400 mb-6">Still have questions?</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                    >
                        Contact Support
                        <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
