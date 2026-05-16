/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = storage.getData();
    const foundUser = data.users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      storage.setCurrentUser(userWithoutPassword as User);
      return true;
    }
    return false;
  };

  const signup = async (userData: Partial<User>) => {
    const data = storage.getData();
    
    if (data.users.some(u => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      password: userData.password || '',
      role: userData.role || 'MEMBER',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      joinedAt: new Date().toISOString(),
    };

    data.users.push(newUser);
    storage.setData(data);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    storage.setCurrentUser(userWithoutPassword as User);
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
