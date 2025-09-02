"use client";

import TransformingModal from "@/components/modal/TransformingModal";
import ImagePreview from "@/components/modal/ImagePreview";
import Button from "@/components/ui/Button";
import { useRef, useState, useEffect, useCallback } from "react";
import { 
  Sparkles, 
  Upload, 
  Palette, 
  Wand2, 
  RefreshCw, 
  Plus, 
  X, 
  Image as ImageIcon,
  Calendar,
  Clock,
  Heart,
  Share2,
  Download,
  Trash2,
  Settings,
  Grid3X3,
  List,
  Search,
  Filter
} from "lucide-react";

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const themes = [
    { name: "medieval", icon: "⚔️", color: "from-amber-500 to-orange-600" },
    { name: "cyberpunk", icon: "🌃", color: "from-purple-600 to-pink-600" },
    { name: "anime", icon: "🌸", color: "from-pink-500 to-rose-600" },
    { name: "renaissance", icon: "🎨", color: "from-yellow-500 to-amber-600" },
    { name: "vintage", icon: "🍸", color: "from-amber-600 to-orange-700" },
    { name: "futuristic", icon: "🚀", color: "from-blue-500 to-cyan-600" },
    { name: "space", icon: "🌌", color: "from-indigo-600 to-purple-700" },
    { name: "steampunk", icon: "⚙️", color: "from-amber-700 to-orange-800" },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUserImages();
  }, []);

  const fetchUserImages = useCallback(async () => {
    try {
      setImagesLoading(true);
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

  const filteredImages = userImages.filter(image => {
    const matchesSearch = image.eraTheme.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || image.eraTheme === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Skeleton Loading Component
  const ImageSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-slate-700/50 rounded-2xl overflow-hidden">
        <div className="aspect-square bg-slate-600/50"></div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-slate-600/50 rounded w-3/4"></div>
          <div className="h-3 bg-slate-600/50 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-[70%] mx-auto">
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
        <div className="px-6 pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4  sticky top-20">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Your Gallery</h1>
                <p className="text-gray-400">
                  {imagesLoading ? 'Loading...' : `${userImages.length} transformations`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transformations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list' 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Refresh Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchUserImages}
                  disabled={imagesLoading}
                  className="rounded-xl"
                >
                  <RefreshCw className={`w-4 h-4 ${imagesLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            {imagesLoading ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                : "space-y-4"
              }>
                {Array.from({ length: 12 }).map((_, i) => (
                  <ImageSkeleton key={i} />
                ))}
              </div>
            ) : userImages.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">No transformations yet</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Upload an image and transform it with AI to see your amazing creations here.
                </p>
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Start Creating
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3"
                : "space-y-4"
              }>
                {userImages.map((image) => (
                  <div
                    key={image.id}
                    className={`group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02] ${
                      viewMode === 'list' ? 'flex items-center p-4' : ''
                    }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-20 h-20 mr-4' : 'aspect-square'}`}>
                      <img
                        src={image.generatedUrl}
                        alt={image.eraTheme}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">
                          {themes.find(t => t.name === image.eraTheme)?.icon}
                        </span>
                        <h3 className="font-semibold text-white text-sm">{image.eraTheme}</h3>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(image.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(image.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    {/* Action Overlay */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button
                          variant="glass"
                          size="xs"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={() => {
                            // Download functionality
                          }}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="glass"
                          size="xs"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={() => {
                            // Share functionality
                          }}
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-4 min-w-[400px]">
            {/* Selected Items Display */}
            {(selectedEra || selectedImage) && (
              <div className="flex items-center gap-3 bg-slate-700/50 px-4 py-3 rounded-xl mb-4">
                {selectedEra && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-3 py-1 rounded-lg">
                    <span className="text-lg">
                      {themes.find((t) => t.name === selectedEra)?.icon}
                    </span>
                    <span className="text-white text-sm font-medium">{selectedEra}</span>
                    <button
                      onClick={() => setSelectedEra(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {selectedImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-8 h-8 object-cover rounded-lg border border-slate-600"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setSelectedImageFile(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Controls */}
            <div className="flex items-center gap-3">
              {/* Upload Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl w-12 h-12 p-0"
              >
                <Upload className="w-5 h-5" />
              </Button>
              
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowThemeModal(!showThemeModal)}
                  className="rounded-xl w-12 h-12 p-0"
                >
                  <Palette className="w-5 h-5" />
                </Button>
                
                {showThemeModal && (
                  <div className="absolute bottom-14 left-0 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-3 min-w-[280px] z-50">
                    <div className="space-y-2">
                      {themes.map((theme) => (
                        <button
                          key={theme.name}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/50 transition-all text-white w-full text-left group"
                          onClick={() => {
                            setSelectedEra(theme.name);
                            setShowThemeModal(false);
                          }}
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${theme.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                            {theme.icon}
                          </div>
                          <span className="font-medium">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Prompt Input */}
              <input
                placeholder="Describe your vision..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />

              {/* Generate Button */}
              <Button
                variant={selectedImageFile && (selectedEra || customPrompt) ? "gradient" : "outline"}
                size="sm"
                onClick={initializeImageTransformation}
                disabled={!selectedImageFile || (!selectedEra && !customPrompt)}
                className="rounded-xl px-6"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Transform
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}