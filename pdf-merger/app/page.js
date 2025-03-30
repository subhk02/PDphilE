// app/page.js
'use client';

import { useState, useRef } from 'react';
import { FileIcon, PlusIcon, Trash2Icon, ArrowDownIcon, XIcon } from 'lucide-react';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Filter for PDF files only
    const pdfFiles = selectedFiles.filter(file =>
      file.type === 'application/pdf'
    );

    if (pdfFiles.length !== selectedFiles.length) {
      setError('Only PDF files are accepted');
      setTimeout(() => setError(null), 3000);
    }

    setFiles(prev => [...prev, ...pdfFiles]);

    // Reset file input
    e.target.value = null;
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const mergePDFs = async () => {
    if (files.length === 0) {
      setError('Please add PDF files to merge');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Create FormData
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to merge PDFs');
      }

      // Get the file from the response
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'merged.pdf';

      // Trigger download
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Optional: clear files after successful merge
      clearAllFiles();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PDF Merger</h1>
          <p className="text-lg text-gray-600">Combine multiple PDF files into one document</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Upload PDF Files</h2>
            <p className="text-sm text-gray-500">Select the PDF files you want to merge</p>
          </div>
          <div className="p-6">
            {/* File Upload Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                multiple
                className="hidden"
              />
              <div className="mx-auto w-12 h-12 text-gray-400 mb-3">
                <PlusIcon className="w-12 h-12" suppressHydrationWarning />
              </div>
              <p className="text-gray-700 font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF files only (max 16MB each)</p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Selected Files ({files.length})</h3>
                  <button
                    onClick={clearAllFiles}
                    className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                      <div className="flex items-center overflow-hidden">
                        <FileIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                        <span className="truncate text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-500 hover:text-red-500 ml-2 flex-shrink-0 p-1"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="p-6 pt-0 flex justify-end">
            <button
              onClick={mergePDFs}
              disabled={isLoading || files.length === 0}
              className={`flex items-center px-4 py-2 rounded-md text-white font-medium ${isLoading || files.length === 0
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowDownIcon className="mr-2 h-4 w-4" suppressHydrationWarning />
                  Merge & Download
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center">
            <XIcon className="h-4 w-4 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">How It Works</h2>
          </div>
          <div className="p-6">
            <ol className="space-y-3 list-decimal ml-5">
              <li className="text-gray-700">Upload multiple PDF files using the upload area above</li>
              <li className="text-gray-700">Arrange files in the desired order (first on top)</li>
              <li className="text-gray-700">Click "Merge & Download" to combine the files</li>
              <li className="text-gray-700">Your merged PDF will automatically download</li>
            </ol>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>PDF Merger - A secure way to merge your PDF files</p>
      </footer>
    </main>
  );
}