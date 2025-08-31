'use client';

import { useState } from "react";

export default function DashboardPage() {
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [selectedEra, setSelectedEra] = useState<string | null>(null);
    const themes = [
        {
            name: "Medieval",
            icon: "🏰",
        },

        {
            name: "Futuristic",
            icon: "🚀",
        },

        {
            name: "Late 20th Century",
            icon: "📺",
        },
    ];
    return (
        <div className="p-8">
            <div className="space-y-4 w-[70%] mx-auto">
                <div className="flex items-center justify-between">
                    <h1>Gallery</h1>
                    <h2>1000+ images</h2>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                    <div>
                        <img src="https://picsum.photos/200/300" alt="Image" />
                    </div>
                </div>
            </div>
            <div className="w-[70%] p-6 rounded-3xl mx-auto bg-[#222121] fixed bottom-10 left-0 right-0">
                <div
                    className="flex items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-2 relative">
                        <button
                            className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        <button
                            className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center"
                            title="Transformation Styles"
                            onClick={() => setShowThemeModal(!showThemeModal)}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                            </svg>
                        </button>
                        
                        {/* Small dropdown card */}
                        {showThemeModal && (
                            <div className="absolute bottom-12 left-0 bg-[#333333] rounded-lg shadow-lg border border-gray-600 p-3 min-w-[200px] z-50">
                                <div className="space-y-2">
                                    {themes.map((theme) => (
                                        <button 
                                            key={theme.name}
                                            className="flex items-center gap-3 p-2 rounded-md hover:bg-[#444444] transition-colors text-white w-full text-left"
                                            onClick={() => {
                                                setSelectedEra(theme.name);
                                                setShowThemeModal(false);
                                            }}
                                        >
                                            <span className="text-xl">{theme.icon}</span>
                                            <span className="text-sm">{theme.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-2">
                        {/* Selected Era Display */}
                        {selectedEra && (
                            <div className="flex items-center gap-2 p-2 bg-[#333333] rounded-lg">
                                <span className="text-lg">
                                    {themes.find(t => t.name === selectedEra)?.icon}
                                </span>
                                <span className="text-white text-sm flex-1">{selectedEra}</span>
                                <button 
                                    onClick={() => setSelectedEra(null)}
                                    className="text-gray-400 hover:text-white p-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        
                        <input
                            placeholder="Write custom prompt"
                            className="w-full p-4 rounded-full bg-[#333333]"
                        />
                    </div>
                    
                    <button
                        className="px-4 py-2 rounded-full bg-[#333333]"
                    >Generate</button>
                </div>
            </div>
        </div>
    );
}