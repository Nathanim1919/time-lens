"use client";

import TransformingModal from "@/components/modal/TransformingModal";
import { useRef, useState } from "react";

export default function DashboardPage() {
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [selectedEra, setSelectedEra] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [showTransformingModal, setShowTransformingModal] = useState(false);
    const [customPrompt, setCustomPrompt] = useState<string>("");
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

        {
            name: "Early 20th Century",
            icon: "📺",
        },

        {
            name: "Space",
            icon: "🚀",
        },

        {
            name: "Renaissance",
            icon: "🇫",
        },

        {
            name: "Victorian",
            icon: "🇫",
        },
    ];
    // Ref for hidden file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initializeImageTransformation = () => {
        if (selectedImage || customPrompt) {
            setShowTransformingModal(true);
        }
    };

    return (
        <div className="p-8">
            <TransformingModal 
                isOpen={showTransformingModal}
                onClose={() => setShowTransformingModal(false)}
                selectedImage={selectedImage}
                selectedEra={selectedEra}
                customPrompt={customPrompt}
            />
            <div className="space-y-4 w-[70%] mx-auto">
                <div className="flex items-center justify-between">
                    <h1>Gallery</h1>
                    <h2>1000+ images</h2>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    {[...Array(16)].map((_, i) => (
                        <div key={i}>
                            <img src="https://picsum.photos/200/300" alt="Image" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-[70%] p-6 shadow-2xl rounded-3xl border border-gray-600 mx-auto bg-[#222121] fixed bottom-10 left-0 right-0">
                {(selectedEra || selectedImage) && (
                    <div className="items-center flex w-[320px] my-2 gap-2 p-2 bg-[#333333] rounded-lg">
                        {selectedEra && (
                            <>
                                <span className="text-lg">
                                    {themes.find((t) => t.name === selectedEra)?.icon}
                                </span>
                                <span className="text-white text-sm flex-1">{selectedEra}</span>
                                <button
                                    onClick={() => setSelectedEra(null)}
                                    className="text-gray-400 hover:text-white p-1"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}
                        {/* Image preview */}
                        {selectedImage && (
                            <div className="relative">
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="w-12 h-12 object-cover rounded-md border border-gray-600"
                                />
                            </div>
                        )}
                    </div>
                )}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 relative">
                        <button
                            className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center"
                            onClick={() => {
                                if (fileInputRef.current) fileInputRef.current.click();
                            }}
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedImageFile(file);
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        setSelectedImage(ev.target?.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <button
                            className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center"
                            title="Transformation Styles"
                            onClick={() => setShowThemeModal(!showThemeModal)}
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                                />
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
                        {/* Selected Era and Image Preview */}

                        <input
                            placeholder="Write custom prompt"
                            className="w-full p-4 rounded-full bg-[#333333] text-white"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={initializeImageTransformation}
                        disabled={!selectedImage && !customPrompt}
                        className={`px-4 py-2 rounded-full ${
                            selectedImage || customPrompt 
                                ? 'bg-[#333333] cursor-pointer hover:bg-[#444444]' 
                                : 'bg-[#222222] cursor-not-allowed text-gray-500'
                        } transition-colors`}>
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}
