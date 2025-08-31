"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  { id: 1, label: "Analyzing image", icon: "🖼️" },
  { id: 2, label: "Understanding your request", icon: "🤖" },
  { id: 3, label: "Crafting the transformation", icon: "⚡" },
  { id: 4, label: "Adding final touches", icon: "✨" },
];

export default function TransformingModal({
  isOpen,
  onClose,
  selectedImage,
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
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (transformedImage && !isLoading) {
      setCurrentStep(steps.length);
    }
  }, [transformedImage, isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl h-[90%] bg-[#1c1c1e]/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h1 className="text-xl font-semibold text-white">Transforming</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Original</p>
            <div className="rounded-2xl bg-black/30 aspect-square flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Original"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No image</span>
              )}
            </div>
          </div>

          {/* Generated */}
          <div>
            <p className="text-sm text-gray-400 mb-2">Generated</p>
            <div className="rounded-2xl bg-black/30 aspect-square flex items-center justify-center overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-400 mb-3"></div>
                  <span className="text-gray-400 text-sm">
                    {steps[currentStep - 1]?.label}
                  </span>
                </div>
              ) : error ? (
                <div className="text-center text-red-400">
                  <div className="text-2xl mb-2">⚠️</div>
                  <span className="text-sm">{error}</span>
                </div>
              ) : transformedImage ? (
                <img
                  src={transformedImage}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Ready to transform</span>
              )}
            </div>
          </div>
        </div>

        {/* Progress + Actions */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{
                width: isLoading
                  ? `${(currentStep / steps.length) * 100}%`
                  : transformedImage
                  ? "100%"
                  : "0%",
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {(transformedImage || error) && !isLoading && (
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
