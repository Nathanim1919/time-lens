'use client';

import { useRef, useEffect, useState } from 'react';
// import { getAvailableThemes, getThemeDisplayName, getThemeIcon } from "@/lib/ai";

export default function EraShowcase() {
    // const themes = getAvailableThemes();
    const [activeTheme, setActiveTheme] = useState(0);
    const [hoveredTheme, setHoveredTheme] = useState<number | null>(null);

    return (
        <section className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-60"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white/80 mb-8">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                        AI-Powered Transformations
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Transform Across
                        <br />
                        <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                            Every Era
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Experience yourself in different historical periods, artistic styles, and cultural contexts with our advanced AI technology.
                    </p>
                </div>

            

                {/* Interactive Showcase */}
                <div className="relative mb-20">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white mb-4">
                            See It In Action
                        </h3>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Watch how our AI transforms your photos across different eras and styles in real-time.
                        </p>
                    </div>

                    {/* Interactive Demo */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Original */}
                            <div className="text-center">
                                <div className="relative mb-4">
                                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 border-2 border-slate-600">
                                        <img 
                                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                                            alt="Original" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        ✓
                                    </div>
                                </div>
                                <h4 className="font-semibold text-white">Original Photo</h4>
                                <p className="text-sm text-gray-400">Your starting point</p>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>

                            {/* Transformed */}
                            <div className="text-center">
                                <div className="relative mb-4">
                                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-800 to-blue-800 border-2 border-purple-600">
                                        <img 
                                            src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80" 
                                            alt="Transformed" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        ✨
                                    </div>
                                </div>
                                <h4 className="font-semibold text-white">AI Transformed</h4>
                                <p className="text-sm text-gray-400">Renaissance style</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-4xl font-bold text-white mb-2">50+</div>
                        <div className="text-gray-300">Available Styles</div>
                    </div>
                    <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-4xl font-bold text-white mb-2">&lt;30s</div>
                        <div className="text-gray-300">Processing Time</div>
                    </div>
                    <div className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-4xl font-bold text-white mb-2">4K</div>
                        <div className="text-gray-300">Output Quality</div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                        Start Your Transformation
                        <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                    <p className="text-gray-400 mt-4">
                        Upload your photo and choose from 50+ unique styles
                    </p>
                </div>
            </div>
        </section>
    );
}