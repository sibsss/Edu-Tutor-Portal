
'use client';

import { useState, useEffect } from 'react';
import { AuthService, User } from '../../lib/auth';
import Header from '../../components/Header';
import Link from 'next/link';

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'users' | 'admins'>('pending');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    try {
      authService.requireAdmin();
      const user = authService.getCurrentUser();
      setCurrentUser(user);
      loadUsers();
    } catch (error) {
      window.location.href = '/login';
    }
  }, []);

  const loadUsers = () => {
    // Mock data - will be replaced with Supabase queries
    const mockPending: User[] = [
      {
        id: '3',
        email: 'sarah@school.edu',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'tutor',
        institution: 'Lincoln High School',
        subjects: ['English', 'Literature'],
        isApproved: false,
        createdAt: '2024-12-20'
      },
      {
        id: '4',
        email: 'mike@college.edu',
        firstName: 'Mike',
        lastName: 'Davis',
        role: 'tutor',
        institution: 'City College',
        subjects: ['Chemistry', 'Biology'],
        isApproved: false,
        createdAt: '2024-12-19'
      }
    ];

    const mockAllUsers: User[] = [
      ...authService['mockUsers'],
      ...mockPending
    ];

    setPendingUsers(mockPending);
    setAllUsers(mockAllUsers);
  };

  const approveUser = (userId: string) => {
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    setAllUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, isApproved: true } : u
    ));
  };

  const rejectUser = (userId: string) => {
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    setAllUsers(prev => prev.filter(u => u.id !== userId));
  };

  const toggleUserStatus = (userId: string) => {
    setAllUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, isApproved: !u.isApproved } : u
    ));
  };

  const promoteToAdmin = (userId: string) => {
    if (!authService.isSuperAdmin()) return;
    
    setAllUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: 'admin', isApproved: true } : u
    ));
  };

  const demoteFromAdmin = (userId: string) => {
    if (!authService.isSuperAdmin()) return;
    
    setAllUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, role: 'tutor' } : u
    ));
  };

  const renderPendingApprovals = () => (
    <div className="space-y-4">
      {pendingUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className="ri-user-check-line text-4xl mb-2 block"></i>
          <p>No pending approvals</p>
        </div>
      ) : (
        pendingUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">{user.institution}</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                Pending
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Teaching Subjects:</h4>
              <div className="flex flex-wrap gap-1">
                {user.subjects?.map((subject) => (
                  <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => approveUser(user.id)}
                className="flex-1 py-2 px-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => rejectUser(user.id)}
                className="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderAllUsers = () => (
    <div className="space-y-4">
      {allUsers.filter(u => u.role !== 'superadmin' && u.role !== 'admin').map((user) => (
        <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              {user.institution && (
                <p className="text-sm text-gray-500">{user.institution}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {user.isApproved ? 'Active' : 'Pending'}
              </span>
              <div className="flex gap-1">
                {user.role === 'tutor' && (
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.isApproved 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {user.isApproved ? 'Deactivate' : 'Activate'}
                  </button>
                )}
                {authService.isSuperAdmin() && user.role === 'tutor' && user.isApproved && (
                  <button
                    onClick={() => promoteToAdmin(user.id)}
                    className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-600 hover:bg-purple-200"
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {user.subjects && (
            <div className="flex flex-wrap gap-1 mt-2">
              {user.subjects.map((subject) => (
                <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAdmins = () => (
    <div className="space-y-4">
      {allUsers.filter(u => u.role === 'admin' || u.role === 'superadmin').map((user) => (
        <div key={user.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.role === 'superadmin' 
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              </span>
              {authService.isSuperAdmin() && user.role === 'admin' && (
                <button
                  onClick={() => demoteFromAdmin(user.id)}
                  className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  Remove Admin
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const getTabs = () => {
    const tabs = [
      { key: 'pending', label: `Pending (${pendingUsers.length})` },
      { key: 'users', label: `Users (${allUsers.filter(u => u.role === 'tutor').length})` }
    ];
    
    if (authService.isSuperAdmin()) {
      tabs.push({ key: 'admins', label: `Admins (${allUsers.filter(u => u.role === 'admin' || u.role === 'superadmin').length})` });
    }
    
    return tabs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {currentUser?.role === 'superadmin' ? 'Super Admin Dashboard' : 'Admin Dashboard'}
            </h1>
            <p className="text-gray-600">Manage tutor applications and users</p>
          </div>

          <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
            <div className={`grid gap-1 ${getTabs().length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {getTabs().map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'pending' && renderPendingApprovals()}
          {activeTab === 'users' && renderAllUsers()}
          {activeTab === 'admins' && renderAdmins()}

          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              ← Back to Forum
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
