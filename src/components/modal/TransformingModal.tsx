"use client";

import { useEffect, useState } from "react";

interface TransformingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImage?: string | null;
  selectedEra?: string | null;
  customPrompt?: string;
  transformedImage?: string | null;
  isLoading?: boolean;
  error?: string | null;
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
  transformedImage,
  isLoading = false,
  error,
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

  // Reset step when transformation completes
  useEffect(() => {
    if (transformedImage && !isLoading) {
      setCurrentStep(steps.length);
    }
  }, [transformedImage, isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#1b1b1b] to-[#262626] border border-violet-500/30 rounded-2xl p-8 max-w-4xl w-full h-[90%] mx-4 shadow-xl relative">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Original</h3>
            <div className="bg-[#2d2d2d] rounded-lg p-4 flex items-center justify-center">
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

        

                     {/* Generated Image */}
           <div className="space-y-4">
             <h3 className="text-lg font-semibold text-white">Generated</h3>
             <div className="bg-[#2d2d2d] rounded-lg p-4 flex items-center justify-center">
               {isLoading ? (
                 <div className="text-center">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400 mx-auto mb-2"></div>
                   <span className="text-gray-400 text-sm">Transforming...</span>
                 </div>
               ) : error ? (
                 <div className="text-center text-red-400">
                   <div className="text-2xl mb-2">⚠️</div>
                   <span className="text-sm">Error: {error}</span>
                 </div>
               ) : transformedImage ? (
                 <img
                   src={transformedImage}
                   alt="Generated"
                   className="w-full h-full object-cover rounded-lg"
                 />
               ) : (
                 <span className="text-gray-500">Ready to transform</span>
               )}
             </div>
           </div>
        </div>

                 {/* Progress Bar */}
         <div className="mt-8 w-full">
           <div className="h-2 w-full bg-[#333] rounded-full overflow-hidden">
             <div
               className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
               style={{
                 width: isLoading 
                   ? `${(currentStep / steps.length) * 100}%` 
                   : transformedImage 
                     ? "100%" 
                     : "0%",
               }}
             ></div>
           </div>
                        {(transformedImage || error) && !isLoading && (
               <div className="mt-4 text-center">
                 <button
                   onClick={onClose}
                   className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-full transition-colors"
                 >
                   Close
                 </button>
               </div>
             )}
         </div>
      </div>
    </div>
  );
}
