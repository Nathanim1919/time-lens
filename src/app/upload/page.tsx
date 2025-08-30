'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { EraTheme, getAvailableThemes, getThemeDisplayName, getThemeIcon } from '../../lib/ai';
import { validateImageFile, compressImage } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<EraTheme | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const themes = getAvailableThemes();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (validation.isValid) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError(validation.errors[0]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const validation = validateImageFile(file);
      if (validation.isValid) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError(validation.errors[0]);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Compress image if needed
      const compressedFile = await compressImage(selectedFile, 1024, 0.8);

      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', compressedFile);

      // Upload to API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      
      // Store uploaded image info for generation
      localStorage.setItem('uploadedImage', JSON.stringify(result.data));
      
      // Show theme selection
      setShowThemeModal(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleGenerate = async () => {
    if (!selectedTheme) return;

    const uploadedImage = localStorage.getItem('uploadedImage');
    if (!uploadedImage) {
      setError('No uploaded image found');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageData = JSON.parse(uploadedImage);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageData.image_url,
          era_theme: selectedTheme,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      const result = await response.json();
      
      // Redirect to gallery with new image
      router.push(`/gallery?new=${result.data.image.id}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transform Your Reality
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a selfie and choose your era. Our AI will create a stunning transformation in seconds.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div
              className={`border-2 border-dashed rounded-xl p-12 transition-all duration-200 ${
                selectedFile
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto relative">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button onClick={removeFile} variant="outline" size="sm">
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drop your photo here, or{' '}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-500 font-medium"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supports JPEG, PNG, and WebP up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {selectedFile && (
            <div className="mt-6 text-center">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full sm:w-auto"
              >
                {isUploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading... {uploadProgress}%
                  </div>
                ) : (
                  'Upload & Continue'
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Theme Selection Modal */}
        <Modal
          isOpen={showThemeModal}
          onClose={() => setShowThemeModal(false)}
          title="Choose Your Era"
          size="lg"
        >
          <div className="space-y-6">
            <p className="text-gray-600 text-center">
              Select the era or style you want to transform into
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedTheme === theme
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{getThemeIcon(theme)}</div>
                  <div className="font-medium text-gray-900">{getThemeDisplayName(theme)}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowThemeModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!selectedTheme || isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate Transformation'
                )}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
