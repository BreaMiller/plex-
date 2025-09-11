import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  user_id: string;
  username: string;
  display_name: string;
  email: string;
  avatar_url: string;
  verified: boolean;
  tier: string;
  registration_date: string;
  stats: {
    games_created: number;
    total_downloads: number;
    total_plays: number;
    credits_earned: number;
    average_rating: number;
    followers: number;
    following: number;
    achievements_unlocked: number;
  };
  bio?: string;
  location?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    youtube?: string;
    twitch?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('gaming_platform_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Fetch users data for mock authentication
      const response = await fetch('/data/mockup_users.json');
      const userData = await response.json();
      
      const foundUser = userData.users_database.users.find(
        (u: any) => u.username === username
      );

      if (foundUser) {
        // Mock authentication - in real app, would validate password
        setUser(foundUser);
        localStorage.setItem('gaming_platform_user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gaming_platform_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
