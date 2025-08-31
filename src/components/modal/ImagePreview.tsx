"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, Maximize2, Download } from "lucide-react";

interface ImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  originalImageUrl?: string;
  generatedImageUrl: string;
  eraTheme?: string;
  createdAt?: string;
}

export default function ImagePreview({
  isOpen,
  onClose,
  originalImageUrl,
  generatedImageUrl,
  eraTheme,
  createdAt,
}: ImagePreviewProps) {
  const [isOriginalImage, setIsOriginalImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsOriginalImage(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const currentImageUrl = isOriginalImage ? originalImageUrl : generatedImageUrl;
  const canSwitch = originalImageUrl && originalImageUrl !== generatedImageUrl;

  const handleImageSwitch = () => {
    if (!canSwitch) return;
    setIsLoading(true);
    setIsOriginalImage(!isOriginalImage);
    // Small delay to show loading state
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleDownload = async () => {
    if (!currentImageUrl) return;
    
    try {
      const response = await fetch(currentImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `time-lens-${isOriginalImage ? "original" : "generated"}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full flex flex-col bg-black">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm border-b border-gray-800">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold">
              {isOriginalImage ? "Original Image" : "Generated Image"}
            </h2>
            {eraTheme && (
              <span className="px-3 py-1 bg-violet-600/20 text-violet-300 rounded-full text-sm border border-violet-500/30">
                {eraTheme}
              </span>
            )}
            {createdAt && (
              <span className="text-gray-400 text-sm">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-white"
              title="Download image"
            >
              <Download className="w-5 h-5" />
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-white"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center p-4 relative">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400"></div>
            </div>
          ) : (
            <div className="relative max-w-full max-h-full">
              <img
                src={currentImageUrl}
                alt={isOriginalImage ? "Original image" : "Generated image"}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              />
              
              {/* Image Switch Controls */}
              {canSwitch && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700">
                  <button
                    onClick={handleImageSwitch}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-white text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Switch to {isOriginalImage ? "Generated" : "Original"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Info Bar */}
        {canSwitch && (
          <div className="p-4 bg-black/50 backdrop-blur-sm border-t border-gray-800">
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${!isOriginalImage ? 'bg-violet-500' : 'bg-gray-600'}`} />
                <span className="text-white text-sm">Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isOriginalImage ? 'bg-blue-500' : 'bg-gray-600'}`} />
                <span className="text-white text-sm">Original</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}