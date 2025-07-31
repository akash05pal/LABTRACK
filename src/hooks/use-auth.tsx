
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
        // This is a mock implementation. For a real app, you'd want to handle this differently.
        // For testing, we can check for a manually set user for the demo.
        const mockUserEmail = 'admin@a1fence.com';
        if (firebaseUser?.email === mockUserEmail || (!firebaseUser && localStorage.getItem('isMockLoggedIn'))) {
             setUser(mockUsers[mockUserEmail]);
        } else {
            setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
     if (email === 'admin@a1fence.com' && pass === 'password') {
         // This is a mock login. In a real app, you'd use Firebase Auth.
         const appUser = mockUsers[email];
         setUser(appUser);
         // We'll use local storage to persist this mock login state
         localStorage.setItem('isMockLoggedIn', 'true');
         return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
        console.error("Firebase login error:", error);
        throw new Error("Invalid email or password.");
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('isMockLoggedIn');
    await signOut(auth);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
