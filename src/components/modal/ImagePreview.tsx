"use client";

import { useState, useEffect } from "react";
import { X, Download, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (isOpen) {
      setIsOriginalImage(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentImageUrl = isOriginalImage
    ? originalImageUrl
    : generatedImageUrl;
  const canSwitch = originalImageUrl && originalImageUrl !== generatedImageUrl;

  const handleImageSwitch = () => {
    if (!canSwitch) return;
    setIsOriginalImage(!isOriginalImage);
  };

  const handleDownload = async () => {
    if (!currentImageUrl) return;
    try {
      const response = await fetch(currentImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `time-lens-${
        isOriginalImage ? "original" : "generated"
      }-${Date.now()}.jpg`;
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
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full h-full flex flex-col bg-black">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-medium text-sm">
              {isOriginalImage ? "Original" : "Generated"}
            </h2>
            {eraTheme && (
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-xs">
                {eraTheme}
              </span>
            )}
            {createdAt && (
              <span className="text-gray-400 text-xs">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {canSwitch && (
              <button
                onClick={handleImageSwitch}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                title="Switch image"
              >
                <Shuffle className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Area */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageUrl}
              src={currentImageUrl}
              alt={isOriginalImage ? "Original" : "Generated"}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
