import React, { createContext, useContext, useState, useEffect } from 'react';

import { AuthContextType } from '../types/contextTypes';


//  Create the authentication context.
 
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider component responsible for managing user login state.
 *
 * @param children    Child components that need access to the authentication context.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize login state from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  
  // Log the user in and set the isLoggedIn state to true.
   
  const login = () => {
    setIsLoggedIn(true);
  };

  
  // Log the user out and set the isLoggedIn state to false.
   
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context within components.
 *
 * @returns Authentication context containing isLoggedIn state, login, and logout functions.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
