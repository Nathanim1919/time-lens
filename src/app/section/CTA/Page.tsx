"use client";

import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative py-28 bg-black overflow-hidden">
            {/* Background with subtle gradient and grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(30,30,30,0.8),rgba(0,0,0,1))]"></div>
            <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-3xl mx-auto text-center px-6">
                <div className="mb-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Begin your transformation.
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Join thousands discovering new realities with{" "}
                        <span className="font-medium text-gray-300">TimeLens</span>.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <Link
                        href="/upload"
                        className="group relative flex items-center justify-center px-8 py-4 
                                   text-lg font-medium rounded-xl transition-all duration-300
                                   bg-white text-black hover:bg-gray-100 hover:scale-105
                                   shadow-lg hover:shadow-xl"
                    >
                        Start Your Journey
                        <svg
                            className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                    </Link>
                    
                    <Link
                        href="/gallery"
                        className="group relative flex items-center justify-center px-8 py-4 
                                   text-lg font-medium rounded-xl transition-all duration-300
                                   border border-gray-700 text-white hover:bg-gray-900/30
                                   hover:scale-105"
                    >
                        View Examples
                        <svg
                            className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                    </Link>
                </div>
                
                {/* Decorative elements */}
                <div className="mt-16 flex justify-center space-x-8 opacity-60">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-2">
                                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            </div>
                            <div className="h-12 w-px bg-gradient-to-b from-gray-700 to-transparent"></div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
            `}</style>
        </section>
    );
}