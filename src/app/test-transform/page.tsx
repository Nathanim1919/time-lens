"use client";

import { useState, useRef } from "react";

export default function TestTransformPage() {
  const [file, setFile] = useState<File | null>(null);
  const [eraTheme, setEraTheme] = useState("Medieval");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      if (eraTheme) formData.append('eraTheme', eraTheme);
      if (customPrompt) formData.append('customPrompt', customPrompt);

      const response = await fetch('/api/transform', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Transformation failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Transform API</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700"
            />
          </div>

          {/* Era Theme */}
          <div>
            <label className="block text-sm font-medium mb-2">Era Theme</label>
            <select
              value={eraTheme}
              onChange={(e) => setEraTheme(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              <option value="Medieval">Medieval</option>
              <option value="Futuristic">Futuristic</option>
              <option value="Victorian">Victorian</option>
              <option value="Renaissance">Renaissance</option>
            </select>
          </div>

          {/* Custom Prompt */}
          <div>
            <label className="block text-sm font-medium mb-2">Custom Prompt (optional)</label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter custom prompt..."
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!file || isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              file && !isLoading
                ? 'bg-violet-600 hover:bg-violet-700'
                : 'bg-gray-600 cursor-not-allowed'
            } transition-colors`}
          >
            {isLoading ? 'Transforming...' : 'Transform Image'}
          </button>
        </form>

        {/* Results */}
        {isLoading && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400"></div>
              <span className="ml-3">Processing image...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-900 border border-red-700 rounded-lg">
            <h3 className="font-semibold text-red-300">Error</h3>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Transformation Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Original Image</h4>
                <img
                  src={result.image.originalUrl}
                  alt="Original"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">Transformed Image</h4>
                <img
                  src={result.image.generatedUrl}
                  alt="Transformed"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-300">
              <p><strong>Era Theme:</strong> {result.image.eraTheme}</p>
              <p><strong>Created:</strong> {new Date(result.image.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
