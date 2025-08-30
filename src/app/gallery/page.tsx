'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Image, EraTheme } from '../../types';
import { getThemeDisplayName, getThemeIcon } from '../../lib/ai';
// import { formatRelativeTime, downloadFile, shareToSocial } from '../../lib/utils';
import Button from '../../components/ui/Button';

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchImages();
    
    // Check if there's a new image from generation
    const newImageId = searchParams.get('new');
    if (newImageId) {
      // Highlight the new image
      setTimeout(() => {
        const element = document.getElementById(`image-${newImageId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.classList.add('ring-4', 'ring-blue-500');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-blue-500');
          }, 3000);
        }
      }, 1000);
    }
  }, [searchParams]);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/images');
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const result = await response.json();
      setImages(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (image: Image) => {
    const filename = `timelens-${image.era_theme}-${Date.now()}.jpg`;
    // downloadFile(image.generated_url, filename);
  };

  const handleShare = (image: Image, platform: 'linkedin' | 'instagram' | 'twitter') => {
    // shareToSocial(platform, image.generated_url, `Check out my ${image.era_theme} transformation made with TimeLens!`);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your transformations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchImages}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-gray-400 text-6xl mb-4">🖼️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No transformations yet</h2>
          <p className="text-gray-600 mb-6">
            Start your journey by uploading a photo and choosing your first era transformation.
          </p>
          <Button onClick={() => window.location.href = '/upload'}>
            Create Your First Transformation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Transformations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore all your AI-generated transformations across different eras and styles.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              id={`image-${image.id}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div 
                className="relative cursor-pointer group"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.generated_url}
                  alt={`${image.era_theme} transformation`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Era Badge */}
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">{getThemeIcon(image.era_theme as EraTheme)}</span>
                  {getThemeDisplayName(image.era_theme as EraTheme)}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {/* <span>{formatRelativeTime(image.created_at)}</span> */}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleDownload(image)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Download
                  </Button>
                  
                  <div className="relative group">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Share
                    </Button>
                    
                    {/* Share Dropdown */}
                    <div className="absolute bottom-full left-0 mb-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <button
                        onClick={() => handleShare(image, 'linkedin')}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                      >
                        <span className="mr-2">💼</span> LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare(image, 'instagram')}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                      >
                        <span className="mr-2">📷</span> Instagram
                      </button>
                      <button
                        onClick={() => handleShare(image, 'twitter')}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                      >
                        <span className="mr-2">🐦</span> Twitter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {showImageModal && selectedImage && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getThemeDisplayName(selectedImage.era_theme as EraTheme)} Transformation
                    </h3>
                    <button
                      onClick={() => setShowImageModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Original</h4>
                      <img
                        src={selectedImage.original_url}
                        alt="Original"
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Generated</h4>
                      <img
                        src={selectedImage.generated_url}
                        alt="Generated"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      onClick={() => handleDownload(selectedImage)}
                      variant="outline"
                    >
                      Download
                    </Button>
                    <Button
                      onClick={() => {
                        handleShare(selectedImage, 'linkedin');
                        setShowImageModal(false);
                      }}
                    >
                      Share on LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}