import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { users, credentials } from '../data/users';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('gadgetHubUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  const login = async (email: string, password: string, isAdminLogin = false): Promise<boolean> => {
    // For demo purposes, we're checking against hardcoded credentials
    // In a real app, this would be an API call
    let validCredentials = false;
    
    if (isAdminLogin) {
      validCredentials = 
        email === credentials.admin.email && password === credentials.admin.password;
    } else {
      validCredentials = 
        email === credentials.user.email && password === credentials.user.password ||
        email === credentials.admin.email && password === credentials.admin.password;
    }

    if (validCredentials) {
      const user = users.find(u => u.email === email);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setIsAdmin(user.role === 'admin');
        localStorage.setItem('gadgetHubUser', JSON.stringify(user));
        return true;
      }
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('gadgetHubUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};