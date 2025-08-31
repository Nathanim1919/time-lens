"use client";

import TransformingModal from "@/components/modal/TransformingModal";
import ImagePreview from "@/components/modal/ImagePreview";
import { useRef, useState, useEffect, useCallback } from "react";

export default function DashboardPage() {
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [showTransformingModal, setShowTransformingModal] = useState(false);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userImages, setUserImages] = useState<any[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<any>(null);

  const themes = [
    { name: "Ancient Egypt", icon: "🪔" },
    { name: "Medieval Knight", icon: "⚔️" },
    { name: "Renaissance Royalty", icon: "👑" },
    { name: "Victorian Era", icon: "🎩" },
    { name: "1920s Jazz Age", icon: "🍸" },
    { name: "1970s Retro", icon: "🕺" },
    { name: "Cyberpunk Future", icon: "🌌" },
    { name: "Space Explorer", icon: "🚀" },
    { name: "Anime Style", icon: "🎨" },
    { name: "Superhero", icon: "🦸" },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUserImages();
  }, []);

  const fetchUserImages = useCallback(async () => {
    try {
      const response = await fetch("/api/images");
      const result = await response.json();
      if (response.ok) {
        setUserImages(result.images);
      } else {
        console.error("Failed to fetch images:", result.error);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setImagesLoading(false);
    }
  }, []);

  const handleImageClick = (image: any) => {
    setPreviewImage(image);
    setShowImagePreview(true);
  };

  const handleCloseImagePreview = () => {
    setShowImagePreview(false);
    setPreviewImage(null);
  };

  const initializeImageTransformation = async () => {
    if (!selectedImageFile || !(selectedEra || customPrompt)) return;
    setShowTransformingModal(true);
    setIsLoading(true);
    setTransformedImage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImageFile);
      if (selectedEra) formData.append("eraTheme", selectedEra);
      if (customPrompt) formData.append("customPrompt", customPrompt);

      const response = await fetch("/api/transform", { method: "POST", body: formData });
      const result = await response.json();

      if (!response.ok) throw new Error(result.details || result.error || "Transformation failed");

      setTransformedImage(result.image.generatedUrl);
      await fetchUserImages();

      setTimeout(() => {
        setCustomPrompt("");
        setSelectedEra(null);
        setSelectedImageFile(null);
        setSelectedImage(null);
        setShowTransformingModal(false);
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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
        transformedImage={transformedImage}
        isLoading={isLoading}
        error={error}
      />

      <ImagePreview
        isOpen={showImagePreview}
        onClose={handleCloseImagePreview}
        originalImageUrl={previewImage?.originalUrl}
        generatedImageUrl={previewImage?.generatedUrl || ""}
        eraTheme={previewImage?.eraTheme}
        createdAt={previewImage?.createdAt}
      />

      {/* Header */}
      <div className="w-[70%] mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Your Gallery</h1>
          <p className="text-gray-400 text-sm">{userImages.length} transformations</p>
        </div>
        <button
          onClick={fetchUserImages}
          disabled={imagesLoading}
          className="p-2 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors disabled:opacity-50"
          title="Refresh gallery"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Gallery */}
      <div className="w-[70%] mx-auto">
  {imagesLoading ? (
    <div className="flex items-center justify-center py-16 text-gray-400">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400 mr-3"></div>
      Loading your images...
    </div>
  ) : userImages.length === 0 ? (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🎨</div>
      <h3 className="text-xl font-semibold text-white mb-2">No transformations yet</h3>
      <p className="text-gray-400">Upload an image and transform it to see your gallery.</p>
    </div>
  ) : (
    <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {userImages.map((image) => (
        <div
          key={image.id}
          className="break-inside-avoid relative cursor-pointer rounded-2xl overflow-hidden bg-[#2a2a2a] shadow-lg"
          onClick={() => handleImageClick(image)}
        >
          <img
            src={image.generatedUrl}
            alt={image.eraTheme}
            className="w-full h-auto object-cover rounded-2xl transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center">
            <div className="opacity-0 hover:opacity-100 transition-opacity text-center">
              <p className="text-white font-medium">{image.eraTheme}</p>
              <p className="text-xs text-gray-300">
                {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


      {/* Bottom Action Bar */}
      <div className="w-[70%] mx-auto fixed bottom-8 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl p-4 flex flex-col gap-3">
        {(selectedEra || selectedImage) && (
          <div className="flex items-center gap-3 bg-[#2a2a2a] px-3 py-2 rounded-xl">
            {selectedEra && (
              <>
                <span className="text-lg">{themes.find((t) => t.name === selectedEra)?.icon}</span>
                <span className="text-white text-sm flex-1">{selectedEra}</span>
                <button
                  onClick={() => setSelectedEra(null)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </>
            )}
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-10 h-10 object-cover rounded-md border border-gray-700"
              />
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Upload Button */}
          <button
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-800 flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="text-white text-lg">+</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedImageFile(file);
                const reader = new FileReader();
                reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />

          {/* Theme Picker */}
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-800 flex items-center justify-center"
              title="Transformation Styles"
              onClick={() => setShowThemeModal(!showThemeModal)}
            >
              🎭
            </button>
            {showThemeModal && (
              <div className="absolute bottom-12 left-0 bg-[#2a2a2a] rounded-2xl shadow-2xl border border-gray-700 p-3 min-w-[220px] z-50">
                <div className="space-y-1">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors text-white w-full text-left"
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

          {/* Prompt Input */}
          <input
            placeholder="Write custom prompt..."
            className="flex-1 px-4 py-2 rounded-full bg-[#2a2a2a] text-white placeholder-gray-500 text-sm focus:outline-none"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />

          {/* Generate Button */}
          <button
            onClick={initializeImageTransformation}
            disabled={!selectedImageFile || (!selectedEra && !customPrompt)}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              selectedImageFile && (selectedEra || customPrompt)
                ? "bg-violet-600 hover:bg-violet-700 text-white"
                : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
            }`}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
