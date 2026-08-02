import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, HistoryItem, SavedFile } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role;
  setRole: (role: Role) => void;
  login: () => void;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  history: HistoryItem[];
  addHistoryItem: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  savedFiles: SavedFile[];
  addSavedFile: (file: Omit<SavedFile, 'id' | 'createdAt'>) => void;
  removeSavedFile: (id: string) => void;
  showSqlModal: boolean;
  setShowSqlModal: (show: boolean) => void;
}

const mockUser: User = {
  id: 'usr-2026',
  name: 'Ahmed Mansour',
  email: 'ahmed@business.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'pro',
  plan: 'Pro',
  creditsUsed: 142,
  creditsLimit: 500,
  apiKey: 'sk_toolkit_live_994827581920384',
  createdAt: '2026-01-15'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [role, setRoleState] = useState<Role>('admin');
  const [favorites, setFavorites] = useState<string[]>(['remove-background', 'json-formatter', 'ai-blog-writer']);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'h-1',
      toolId: 'ai-blog-writer',
      toolName: 'AI Blog Article Generator',
      input: 'Topic: Future of AI SaaS in 2026',
      output: 'Artificial intelligence has revolutionized digital workflows...',
      timestamp: '2026-08-01 14:32'
    }
  ]);
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([
    {
      id: 'sf-1',
      name: 'product_background_removed.png',
      type: 'PNG Image',
      size: '1.4 MB',
      url: '#',
      createdAt: '2026-07-30'
    }
  ]);
  const [showSqlModal, setShowSqlModal] = useState(false);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const login = () => {
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: `h-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setHistory((prev) => [newItem, ...prev]);
    if (user) {
      setUser({ ...user, creditsUsed: user.creditsUsed + 1 });
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const addSavedFile = (file: Omit<SavedFile, 'id' | 'createdAt'>) => {
    const newFile: SavedFile = {
      ...file,
      id: `sf-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setSavedFiles((prev) => [newFile, ...prev]);
  };

  const removeSavedFile = (id: string) => {
    setSavedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        login,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        history,
        addHistoryItem,
        clearHistory,
        savedFiles,
        addSavedFile,
        removeSavedFile,
        showSqlModal,
        setShowSqlModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
