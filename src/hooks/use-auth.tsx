
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Mock user data including roles, this would come from your database in a real app
const mockUsers: {[key: string]: AppUser} = {
    'admin@labtrack.com': {
        uid: 'mock-admin-uid',
        name: 'Admin User',
        email: 'admin@labtrack.com',
        role: 'Admin',
        avatar: 'https://placehold.co/40x40.png',
    },
    'tech@labtrack.com': {
        uid: 'mock-tech-uid',
        name: 'Tech User',
        email: 'tech@labtrack.com',
        role: 'Technician',
        avatar: 'https://placehold.co/40x40.png',
    },
     'researcher@labtrack.com': {
        uid: 'mock-researcher-uid',
        name: 'Researcher User',
        email: 'researcher@labtrack.com',
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
      if (firebaseUser && firebaseUser.email && mockUsers[firebaseUser.email]) {
        setUser(mockUsers[firebaseUser.email]);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
        console.error("Firebase login error:", error);
        throw new Error("Invalid email or password.");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
