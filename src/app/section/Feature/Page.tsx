'use client';

import { useRef, useEffect, useState } from 'react';
import { getAvailableThemes, getThemeDisplayName, getThemeIcon } from "@/lib/ai";

export default function EraShowcase() {
    const themes = getAvailableThemes();
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(true);
    const [activeTheme, setActiveTheme] = useState(0);

    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;

        let animationFrame: number;
        let speed = 0.5; // Slower, smoother scrolling

        const scroll = () => {
            if (isScrolling) {
                container.scrollLeft += speed;
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0; // Seamless loop
                }
                
                // Update active theme based on scroll position
                const cardWidth = container.children[0]?.clientWidth || 0;
                const scrollPos = container.scrollLeft;
                const newActiveTheme = Math.floor(scrollPos / cardWidth) % themes.length;
                setActiveTheme(newActiveTheme);
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
    }, [isScrolling, themes.length]);

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Heading */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300 mb-6 backdrop-blur-sm border border-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        AI Transformations
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                        Journey Through Time
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Transform your photos across different eras with our advanced AI technology.
                    </p>
                </div>

                {/* Active theme indicator */}
                <div className="flex justify-center mb-10">
                    <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">{getThemeIcon(themes[activeTheme])}</div>
                            <div>
                                <h3 className="text-white font-medium">{getThemeDisplayName(themes[activeTheme])}</h3>
                                <p className="text-sm text-gray-400">Currently viewing</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal scroll cards */}
                <div 
                    ref={scrollContainer}
                    className="flex overflow-x-auto scrollbar-hide space-x-6 pb-12 pt-2 px-2"
                >
                    {[...themes, ...themes].map((theme, index) => (
                        <div
                            key={`${theme}-${index}`}
                            className="flex-shrink-0 w-72 rounded-2xl p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 transition-all duration-500 hover:border-gray-600 hover:scale-105"
                        >
                            <div className="text-5xl mb-5 text-center transition-transform duration-300">
                                {getThemeIcon(theme)}
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-3">
                                {getThemeDisplayName(theme)}
                            </h3>
                            <p className="text-gray-400 text-sm text-center leading-relaxed mb-4">
                                Experience the essence of {getThemeDisplayName(theme).toLowerCase()} through AI transformation.
                            </p>
                            <div className="mt-4 flex justify-center">
                                <span className="inline-flex items-center text-xs bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full">
                                    AI Generated
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center space-x-2 mb-12">
                    {themes.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === activeTheme ? 'bg-white w-4' : 'bg-gray-700'
                            }`}
                            onClick={() => {
                                const container = scrollContainer.current;
                                if (container) {
                                    const cardWidth = container.children[0]?.clientWidth || 0;
                                    container.scrollLeft = index * cardWidth;
                                    setActiveTheme(index);
                                }
                            }}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <button className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-100 transition-all duration-300">
                        Start Transforming
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                    <p className="text-gray-400 text-sm mt-4">
                        Upload your photo and choose any era
                    </p>
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
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-15px) translateX(8px); }
                }
            `}</style>
        </section>
    );
}