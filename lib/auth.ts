
'use client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'superadmin' | 'admin' | 'tutor';
  institution?: string;
  subjects?: string[];
  isApproved: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

// Mock authentication - will be replaced with Supabase
export const mockUsers: User[] = [
  {
    id: '0',
    email: 'super@edututorportal.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'superadmin',
    isApproved: true,
    createdAt: '2024-01-01'
  },
  {
    id: '1',
    email: 'admin@edututorportal.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isApproved: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'john@university.edu',
    firstName: 'John',
    lastName: 'Anderson',
    role: 'tutor',
    institution: 'Springfield University',
    subjects: ['Mathematics', 'Physics'],
    isApproved: true,
    createdAt: '2024-03-15'
  }
];

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    // Mock authentication logic
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password for superadmin
    if (user.email === 'super@edututorportal.com' && password !== '2001') {
      throw new Error('Invalid credentials');
    }
    
    if (!user.isApproved && user.role === 'tutor') {
      throw new Error('Account pending approval');
    }

    this.currentUser = user;
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    institution: string;
    subjects: string[];
  }): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'tutor',
      institution: userData.institution,
      subjects: userData.subjects,
      isApproved: false, // Requires admin approval
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);
    return newUser;
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      }
    }
    return null;
  }

  logout(): void {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin' || user?.role === 'superadmin';
  }

  isSuperAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'superadmin';
  }

  isTutor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'tutor' && user?.isApproved;
  }

  requireAdmin(): void {
    if (!this.isAdmin()) {
      throw new Error('Admin access required');
    }
  }

  requireSuperAdmin(): void {
    if (!this.isSuperAdmin()) {
      throw new Error('Super Admin access required');
    }
  }

  requireAuth(): void {
    const user = this.getCurrentUser();
    if (!user || (user.role === 'tutor' && !user.isApproved)) {
      throw new Error('Authentication required');
    }
  }
}
