
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

// Mock user data including roles, this would come from your database in a real app
const mockUsers: {[key: string]: AppUser} = {
    'admin@a1fence.com': {
        uid: 'mock-admin-uid',
        name: 'Admin User',
        email: 'admin@a1fence.com',
        role: 'Admin',
        avatar: 'https://placehold.co/40x40.png',
    },
    'tech@a1fence.com': {
        uid: 'mock-tech-uid',
        name: 'Tech User',
        email: 'tech@a1fence.com',
        role: 'Technician',
        avatar: 'https://placehold.co/40x40.png',
    },
     'researcher@a1fence.com': {
        uid: 'mock-researcher-uid',
        name: 'Researcher User',
        email: 'researcher@a1fence.com',
        role: 'Researcher',
        avatar: 'https://placehold.co/40x40.png',
    }
};


interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: 'Admin' | 'Technician' | 'Researcher';
  avatar: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser && firebaseUser.email) {
        // In a real app, you would fetch user profile from Firestore here
        const appUser = mockUsers[firebaseUser.email];
        setUser(appUser || null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    // In a real app, you might not have mock users, but this allows easy testing
    if (email === 'admin@a1fence.com' && pass === 'password') {
         // This is a mock login. In a real app, you'd use Firebase Auth.
         // Since we can't create users in this environment, we'll simulate it.
         const appUser = mockUsers[email];
         setUser(appUser);
         // Simulate setting a fake auth state
         localStorage.setItem('mock-auth-user', JSON.stringify(appUser));
         return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
        throw new Error("Invalid email or password.");
    }

  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('mock-auth-user');
    await signOut(auth);
  };
  
   // Effect to check for mock auth state on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('mock-auth-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
