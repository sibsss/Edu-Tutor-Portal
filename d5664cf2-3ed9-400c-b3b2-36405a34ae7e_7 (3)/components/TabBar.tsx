'use client';

import Link from 'next/link';

export default function TabBar() {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-0">
        <div className="grid grid-cols-4 h-16">
          <Link href="/" className="flex flex-col items-center justify-center text-blue-500">
            <i className="ri-discuss-line text-lg mb-1"></i>
            <span className="text-xs font-medium">Forum</span>
          </Link>
          <Link href="/announcements" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600">
            <i className="ri-megaphone-line text-lg mb-1"></i>
            <span className="text-xs">Announcements</span>
          </Link>
          <Link href="/resources" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600">
            <i className="ri-book-3-line text-lg mb-1"></i>
            <span className="text-xs">Resources</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600">
            <i className="ri-user-3-line text-lg mb-1"></i>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}