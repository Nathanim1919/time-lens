"use client";

import { useEffect, useState } from "react";

interface TransformingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImage?: string | null;
  selectedEra?: string | null;
  customPrompt?: string;
}

const steps = [
  { id: 1, label: "Getting image...", icon: "🖼️" },
  { id: 2, label: "Understanding prompt...", icon: "🤖" },
  { id: 3, label: "Starting transformation...", icon: "⚡" },
  { id: 4, label: "Finalizing...", icon: "✨" },
];

export default function TransformingModal({
  isOpen,
  onClose,
  selectedImage,
  selectedEra,
  customPrompt,
}: TransformingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      let stepIndex = 1;
      const interval = setInterval(() => {
        stepIndex++;
        if (stepIndex <= steps.length) {
          setCurrentStep(stepIndex);
        } else {
          clearInterval(interval);
        }
      }, 2000); // ⏱️ 2s per step
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#1b1b1b] to-[#262626] border border-violet-500/30 rounded-2xl p-8 max-w-4xl w-full h-[70%] mx-4 shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">AI Transformation</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#333333] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Original Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Original</h3>
            <div className="bg-[#2d2d2d] rounded-lg p-4 flex items-center justify-center h-48">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Original"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">No image selected</span>
              )}
            </div>
          </div>

          {/* Prompt */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Prompt</h3>
            <div className="bg-[#2d2d2d] rounded-lg p-4 h-48 flex flex-col justify-center">
              {selectedEra || customPrompt ? (
                <>
                  {selectedEra && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">
                        {selectedEra === "Medieval" && "🏰"}
                        {selectedEra === "Futuristic" && "🚀"}
                        {selectedEra === "Cyberpunk" && "🌌"}
                      </span>
                      <span className="text-white text-sm">{selectedEra}</span>
                    </div>
                  )}
                  {customPrompt && (
                    <p className="text-white text-sm opacity-90">{customPrompt}</p>
                  )}
                </>
              ) : (
                <span className="text-gray-500 text-sm">No prompt specified</span>
              )}
            </div>
          </div>

          {/* Transformation Progress */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Status</h3>
            <div className="bg-[#2d2d2d] rounded-lg p-4 h-48 flex flex-col justify-center">
              <div className="space-y-3">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 text-sm transition-all ${
                      step.id === currentStep
                        ? "text-violet-400 font-semibold"
                        : step.id < currentStep
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="text-lg">{step.icon}</span>
                    <span>{step.label}</span>
                    {step.id === currentStep && (
                      <span className="animate-pulse text-violet-400">●</span>
                    )}
                    {step.id < currentStep && (
                      <span className="text-green-400">✔</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Futuristic Loader */}
        <div className="mt-8 w-full">
          <div className="h-2 w-full bg-[#333] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 animate-[progress_8s_linear_forwards]"
              style={{
                width: `${(currentStep / steps.length) * 100}%`,
                transition: "width 0.5s ease",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
