'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import TabBar from '../../components/TabBar';
import Link from 'next/link';

export default function Profile() {
  const [user] = useState({
    name: 'John Anderson',
    email: 'john.anderson@university.edu',
    institution: 'Springfield University',
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    joinDate: 'March 2023',
    postsCount: 23,
    likesReceived: 156,
    reputation: 4.8
  });

  const stats = [
    { label: 'Forum Posts', value: user.postsCount, icon: 'ri-chat-3-line' },
    { label: 'Likes Received', value: user.likesReceived, icon: 'ri-heart-line' },
    { label: 'Reputation', value: user.reputation, icon: 'ri-star-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                <i className="ri-user-line text-white text-2xl"></i>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h1>
                <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                <p className="text-gray-500 text-sm">{user.institution}</p>
              </div>
              <Link 
                href="/login"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <i className="ri-logout-box-line text-gray-400"></i>
              </Link>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Teaching Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {user.subjects.map((subject) => (
                  <span key={subject} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <i className={`${stat.icon} text-blue-500`}></i>
                </div>
                <div className="text-xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <Link href="/profile/edit" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <i className="ri-edit-line text-gray-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Edit Profile</h3>
                    <p className="text-sm text-gray-500">Update your information</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <Link href="/profile/posts" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="ri-file-text-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">My Posts</h3>
                    <p className="text-sm text-gray-500">View your forum posts</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <Link href="/profile/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <i className="ri-settings-3-line text-gray-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Settings</h3>
                    <p className="text-sm text-gray-500">App preferences</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <button className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <i className="ri-question-line text-gray-600"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-800">Help & Support</h3>
                    <p className="text-sm text-gray-500">Get help and contact support</p>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Member since {user.joinDate}</p>
          </div>
        </div>
      </main>

      <TabBar />
    </div>
  );
}