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
    {
      name: "Ancient Egypt",
      icon: "🪔", // iconic + instantly recognizable
    },
    {
      name: "Medieval Knight",
      icon: "⚔️",
    },
    {
      name: "Renaissance Royalty",
      icon: "👑",
    },
    {
      name: "Victorian Era",
      icon: "🎩",
    },
    {
      name: "1920s Jazz Age",
      icon: "🍸",
    },
    {
      name: "1970s Retro",
      icon: "🕺",
    },
    {
      name: "Cyberpunk Future",
      icon: "🌌",
    },
    {
      name: "Space Explorer",
      icon: "🚀",
    },
    {
      name: "Anime Style",
      icon: "🎨",
    },
    {
      name: "Superhero",
      icon: "🦸",
    },
  ];

  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user images on component mount
  useEffect(() => {
    fetchUserImages();
  }, []); // Empty dependency array

  const fetchUserImages = useCallback(async () => {
    try {
      console.log('Fetching user images...');
      const response = await fetch('/api/images');
      const result = await response.json();

      console.log('Images API response:', result);

      if (response.ok) {
        setUserImages(result.images);
        console.log('Set user images:', result.images);
      } else {
        console.error('Failed to fetch images:', result.error);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
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
      formData.append('image', selectedImageFile);
      if (selectedEra) formData.append('eraTheme', selectedEra);
      if (customPrompt) formData.append('customPrompt', customPrompt);

      const response = await fetch('/api/transform', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Transformation failed');
      }

      setTransformedImage(result.image.generatedUrl);
      // reset custom prompt, era theme and image file

      // Refresh user images after successful transformation
      await fetchUserImages();
      // Show success message
      setTimeout(() => {
        setCustomPrompt('');
        setSelectedEra(null);
        setSelectedImageFile(null);
        setSelectedImage(null);
        setShowTransformingModal(false);
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
      console.error("AI transformation failed:", error);
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
        generatedImageUrl={previewImage?.generatedUrl || ''}
        eraTheme={previewImage?.eraTheme}
        createdAt={previewImage?.createdAt}
      />
      <div className="space-y-4 w-[70%] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Your Gallery</h1>
          <div className="flex items-center gap-4">
            <h2 className="text-gray-400">{userImages.length} transformations</h2>
            <button
              onClick={fetchUserImages}
              disabled={imagesLoading}
              className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors disabled:opacity-50"
              title="Refresh gallery"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {imagesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400"></div>
            <span className="ml-3 text-gray-400">Loading your images...</span>
          </div>
        ) : userImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-2">No transformations yet</h3>
            <p className="text-gray-400">Upload an image and transform it to see your gallery!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {userImages.map((image) => (
              <div key={image.id} className="group relative cursor-pointer break-inside-avoid" onClick={() => handleImageClick(image)}>
                <div className="relative overflow-hidden rounded-lg bg-[#333333]">
                  <img
                    src={image.generatedUrl}
                    alt={`${image.eraTheme} transformation`}
                    className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                      <div className="text-white text-sm font-medium">{image.eraTheme}</div>
                      <div className="text-gray-300 text-xs">
                        {new Date(image.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
            disabled={!selectedImageFile || (!selectedEra && !customPrompt)}
            className={`px-4 py-2 rounded-full ${selectedImageFile && (selectedEra || customPrompt)
              ? "bg-[#333333] cursor-pointer hover:bg-[#444444]"
              : "bg-[#222222] cursor-not-allowed text-gray-500"
              } transition-colors`}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
