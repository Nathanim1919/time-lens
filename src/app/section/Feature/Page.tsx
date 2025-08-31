'use client';

import { useRef, useEffect, useState } from 'react';
import { getAvailableThemes, getThemeDisplayName, getThemeIcon } from "@/lib/ai";

export default function EraShowcase() {
    const themes = getAvailableThemes();
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(true);

    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;

        let animationFrame: number;
        let speed = 0.8; // slower, smoother

        const scroll = () => {
            if (isScrolling) {
                container.scrollLeft += speed;
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0; // seamless loop
                }
            }
            animationFrame = requestAnimationFrame(scroll);
        };

        animationFrame = requestAnimationFrame(scroll);

        const handleMouseEnter = () => setIsScrolling(false);
        const handleMouseLeave = () => setIsScrolling(true);

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrame);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isScrolling]);

    return (
        <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Heading */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-5 py-2 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-500/30 mb-6 backdrop-blur-sm">
                        <span className="mr-2">✨</span> AI-Powered Transformations
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-5 tracking-tight">
                        Step Into Different Eras
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Transform your photos with cutting-edge AI. See yourself in the past, present, and future — reimagined.
                    </p>
                </div>

                {/* Horizontal scroll cards */}
                <div 
                    ref={scrollContainer}
                    className="flex overflow-x-auto scrollbar-hide space-x-8 pb-10 pt-2"
                >
                    {[...themes, ...themes].map((theme, index) => (
                        <div
                            key={`${theme}-${index}`}
                            className="flex-shrink-0 w-80 rounded-2xl border border-gray-800 p-6 bg-gradient-to-b from-gray-900/60 to-gray-950/80 backdrop-blur-xl shadow-lg shadow-purple-500/10 transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-purple-500/20"
                        >
                            <div className="text-6xl mb-6 text-center transition-transform duration-300 hover:scale-125">
                                {getThemeIcon(theme)}
                            </div>
                            <h3 className="text-2xl font-semibold text-white text-center mb-3">
                                {getThemeDisplayName(theme)}
                            </h3>
                            <p className="text-gray-400 text-sm text-center leading-relaxed">
                                Experience the {getThemeDisplayName(theme).toLowerCase()} era with stunning AI realism.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <span className="inline-flex items-center text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping"></span>
                                    AI Powered
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <button className="inline-flex items-center px-7 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-lg hover:shadow-purple-500/30">
                        Try It Now
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
