'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthService, User } from '../lib/auth';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="ri-graduation-cap-line text-white text-lg"></i>
            </div>
            <h1 className="font-['Pacifico'] text-lg text-gray-800">Edu Tutor Portal</h1>
          </Link>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <i className="ri-search-line text-gray-600"></i>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <i className="ri-notification-3-line text-gray-600"></i>
            </button>
            {user ? (
              <div className="relative group">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  user.role === 'superadmin' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                } hover:from-blue-600 hover:to-indigo-700 transition-colors cursor-pointer`}>
                  <i className="ri-user-line text-white text-sm"></i>
                </div>
                <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">
                      {user.role === 'superadmin' ? 'Super Administrator' : 
                       user.role === 'admin' ? 'Administrator' : 'Tutor'}
                    </p>
                  </div>
                  {(user.role === 'admin' || user.role === 'superadmin') && (
                    <Link 
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      <i className="ri-admin-line text-sm"></i>
                      Admin Dashboard
                    </Link>
                  )}
                  <Link 
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <i className="ri-user-3-line text-sm"></i>
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 w-full text-left"
                  >
                    <i className="ri-logout-box-line text-sm"></i>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/login"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-colors"
              >
                <i className="ri-user-line text-white text-sm"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}