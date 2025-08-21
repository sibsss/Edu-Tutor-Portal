'use client';

import Link from 'next/link';

export default function Offline() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <i className="ri-wifi-off-line text-white text-4xl"></i>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">You're Offline</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          No internet connection detected. Some features may not be available, but you can still browse previously loaded content.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            <i className="ri-home-line mr-2"></i>
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            <i className="ri-refresh-line mr-2"></i>
            Try Again
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            <i className="ri-information-line mr-1"></i>
            Previously viewed pages are available offline
          </p>
        </div>
      </div>
    </div>
  );
}