"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Wand2, 
  Image as ImageIcon, 
  Palette, 
  CheckCircle, 
  X, 
  RotateCcw,
  Download,
  Share2,
  Heart,
  Eye,
  EyeOff
} from "lucide-react";

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
  { 
    id: 1, 
    label: "Analyzing image", 
    icon: "🔍",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    id: 2, 
    label: "Processing request", 
    icon: "🧠",
    color: "from-purple-500 to-pink-500"
  },
  { 
    id: 3, 
    label: "Creating transformation", 
    icon: "✨",
    color: "from-yellow-500 to-orange-500"
  },
  { 
    id: 4, 
    label: "Finalizing", 
    icon: "🎨",
    color: "from-green-500 to-emerald-500"
  },
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
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setPulseAnimation(true);
      let stepIndex = 1;
      const interval = setInterval(() => {
        stepIndex++;
        if (stepIndex <= steps.length) {
          setCurrentStep(stepIndex);
        } else {
          clearInterval(interval);
          setPulseAnimation(false);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (transformedImage && !isLoading) {
      setCurrentStep(steps.length);
      setPulseAnimation(false);
    }
  }, [transformedImage, isLoading]);

  useEffect(() => {
    if (error && !isLoading) {
      console.log('Modal received error:', error);
      setPulseAnimation(false);
      setCurrentStep(1); // Reset to first step on error
    }
  }, [error, isLoading]);

  if (!isOpen) return null;

  // Debug logging
  console.log('Modal state:', { isLoading, error, transformedImage, currentStep });
  
  // Force error state detection
  const shouldShowError = error && !isLoading;
  const shouldShowLoading = isLoading && !error;
  const shouldShowSuccess = transformedImage && !isLoading && !error;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-1000 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut"
          }}
          className="relative z-10 w-full max-w-4xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: pulseAnimation ? [0, 5, -5, 0] : 0 }}
                transition={{ duration: 0.4, repeat: pulseAnimation ? Infinity : 0 }}
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"
              >
                <Wand2 className="w-4 h-4 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg font-semibold text-white">AI Transformation</h1>
                <p className="text-slate-400 text-xs">
                  {isLoading ? "Creating your masterpiece..." : "Transformation complete"}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Image */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Original
                </h3>
                
                <div className="relative rounded-xl bg-slate-800/50 border border-slate-600/50 overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Original"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs">No image selected</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <Palette className="w-3 h-3" />
                      <span>{selectedEra || "Custom prompt"}</span>
                    </div>
                    {customPrompt && (
                      <p className="text-slate-300 text-xs mt-1 truncate">
                        "{customPrompt}"
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Generated Image */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generated
                </h3>
                
                <div className="relative rounded-xl bg-slate-800/50 border border-slate-600/50 overflow-hidden">
                                     <div className="aspect-[4/3] relative">
                     {shouldShowLoading ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        {/* Loading Animation */}
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 360],
                          }}
                          transition={{
                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                          }}
                          className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center mb-3"
                        >
                          <motion.div
                            animate={{ rotate: [0, -360] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 bg-white/20 rounded-full"
                          />
                        </motion.div>
                        
                        {/* Step Info */}
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-center"
                        >
                          <div className="text-lg mb-1">{steps[currentStep - 1]?.icon}</div>
                          <h4 className="text-white text-sm font-medium">
                            {steps[currentStep - 1]?.label}
                          </h4>
                        </motion.div>
                      </div>
                                         ) : shouldShowError ? (
                       <div className="flex flex-col items-center justify-center h-full text-center p-4">
                         <motion.div
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ type: "spring", stiffness: 200 }}
                           className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mb-3"
                         >
                           <X className="w-5 h-5 text-red-400" />
                         </motion.div>
                         <h4 className="text-white text-sm font-medium mb-1">
                           {error.includes('quota') ? 'API Quota Exceeded' : 'Transformation Failed'}
                         </h4>
                         <p className="text-red-400 text-xs mb-3 max-w-xs">
                           {error.includes('quota') 
                             ? 'You\'ve reached the free tier limit. Please wait a moment or upgrade your plan.'
                             : error
                           }
                         </p>
                         <button
                           onClick={() => window.location.reload()}
                           className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors flex items-center gap-1"
                         >
                           <RotateCcw className="w-3 h-3" />
                           Try Again
                         </button>
                       </div>
                    ) : shouldShowSuccess ? (
                      <>
                        <img
                          src={transformedImage}
                          alt="Generated"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Success Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1, type: "spring" }}
                          className="absolute top-2 right-2 bg-green-500/20 backdrop-blur-sm rounded-full p-1.5"
                        >
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </motion.div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <Sparkles className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs">Ready to transform</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mt-6 space-y-4">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      animate={{
                        scale: currentStep === step.id ? [1, 1.1, 1] : 1,
                        backgroundColor: currentStep >= step.id ? "#8b5cf6" : "#475569"
                      }}
                      transition={{ duration: 0.2 }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                        currentStep > step.id ? 'bg-green-500' : ''
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        step.id
                      )}
                    </motion.div>
                    {index < steps.length - 1 && (
                      <motion.div
                        animate={{
                          backgroundColor: currentStep > step.id ? "#8b5cf6" : "#475569"
                        }}
                        transition={{ duration: 0.2 }}
                        className="w-8 h-0.5 mx-2 rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isLoading
                      ? `${(currentStep / steps.length) * 100}%`
                      : transformedImage
                      ? "100%"
                      : error ? "0%" : "0%",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

                             {/* Action Buttons */}
               <AnimatePresence mode="wait">
                 {shouldShowSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2">
                      <Download className="w-3 h-3" />
                      Download
                    </button>
                    <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2">
                      <Share2 className="w-3 h-3" />
                      Share
                    </button>
                    <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2">
                      <Heart className="w-3 h-3" />
                      Like
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
