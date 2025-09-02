"use client";

import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                
                {/* Geometric Patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="text-center space-y-12">
                    
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                            <span className="text-sm font-medium text-white/80">Ready to Transform?</span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-6">
                            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                    Begin Your
                                </span>
                                <br />
                                <span className="text-white">Transformation</span>
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                Join thousands of users who have already discovered new versions of themselves across time and culture.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-12 pt-8">
                            <div className="text-center group">
                                <div className="text-4xl font-bold text-white group-hover:text-purple-300 transition-colors">50K+</div>
                                <div className="text-sm text-gray-400 mt-1">Transformations</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl font-bold text-white group-hover:text-blue-300 transition-colors">98%</div>
                                <div className="text-sm text-gray-400 mt-1">Satisfaction</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl font-bold text-white group-hover:text-pink-300 transition-colors">24/7</div>
                                <div className="text-sm text-gray-400 mt-1">Processing</div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
                        <Link
                            href="/upload"
                            className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                        >
                            <span className="relative z-10 flex items-center">
                                Start Your Journey
                                <svg
                                    className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        </Link>
                        
                        <Link
                            href="/gallery"
                            className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white border-2 border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                        >
                            <span className="flex items-center">
                                Explore Gallery
                                <svg
                                    className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-16">
                        <div className="text-center space-y-6">
                            <p className="text-sm text-gray-400 uppercase tracking-wider">Trusted by creators worldwide</p>
                            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                                {/* Decorative Trust Elements */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-300">Secure Processing</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse animation-delay-1000"></div>
                                    <span className="text-sm text-gray-300">Privacy First</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse animation-delay-2000"></div>
                                    <span className="text-sm text-gray-300">Instant Results</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Bottom Elements */}
                    <div className="pt-20">
                        <div className="flex justify-center space-x-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center space-y-2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" 
                                         style={{ animationDelay: `${i * 0.2}s` }}></div>
                                    <div className="h-8 w-px bg-gradient-to-b from-purple-400/50 to-transparent"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}