import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, HistoryItem, SavedFile } from '../types';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  firebaseSignOut, 
  onAuthStateChanged,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy
} from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  role: Role;
  setRole: (role: Role) => void;
  login: () => void;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
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
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  isFirebaseConnected: boolean;
  loading: boolean;
}

const ADMIN_EMAILS = [
  'yassmohamad417@gmail.com',
  'ahmed@business.io'
];

const isAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.some((e) => e.toLowerCase() === email.trim().toLowerCase());
};

const mockDefaultUser: User = {
  id: 'usr-2026-demo',
  name: 'Yassine Mohamad',
  email: 'yassmohamad417@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  plan: 'Pro',
  creditsUsed: 142,
  creditsLimit: 1000,
  apiKey: 'sk_toolkit_live_994827581920384',
  createdAt: '2026-01-15'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockDefaultUser);
  const [role, setRoleState] = useState<Role>('admin');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

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

  // Sync Firebase Auth State
  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | null = null;
    let unsubscribeHistory: (() => void) | null = null;
    let unsubscribeFiles: (() => void) | null = null;
    let unsubscribeFavs: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setIsFirebaseConnected(true);
        const userRef = doc(db, 'users', fbUser.uid);
        const isSuperAdmin = isAdminEmail(fbUser.email);
        
        try {
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data() as User;
            const effectiveRole = isSuperAdmin ? 'admin' : (data.role || 'user');
            
            if (isSuperAdmin && data.role !== 'admin') {
              await setDoc(userRef, { role: 'admin' }, { merge: true });
            }

            const updatedUser: User = { ...data, role: effectiveRole };
            setUser(updatedUser);
            setRoleState(effectiveRole);
          } else {
            // Initial creation
            const newUser: User = {
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
              email: fbUser.email || '',
              avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
              role: isSuperAdmin ? 'admin' : 'user',
              plan: isSuperAdmin ? 'Pro' : 'Free',
              creditsUsed: 0,
              creditsLimit: isSuperAdmin ? 1000 : 50,
              apiKey: `sk_live_${fbUser.uid.slice(0, 10)}_${Date.now()}`,
              createdAt: new Date().toISOString().slice(0, 10)
            };
            await setDoc(userRef, newUser);
            setUser(newUser);
            setRoleState(newUser.role);
          }

          // Live listener for user profile updates
          unsubscribeUserDoc = onSnapshot(userRef, (uSnap) => {
            if (uSnap.exists()) {
              const uData = uSnap.data() as User;
              const finalRole = isSuperAdmin ? 'admin' : (uData.role || 'user');
              setUser({ ...uData, role: finalRole });
              setRoleState(finalRole);
            }
          });

          // Live listener for History
          const hQuery = query(collection(db, 'history'), where('userId', '==', fbUser.uid));
          unsubscribeHistory = onSnapshot(hQuery, (hSnap) => {
            const items: HistoryItem[] = [];
            hSnap.forEach((docSnap) => {
              const d = docSnap.data();
              items.push({
                id: docSnap.id,
                toolId: d.toolId,
                toolName: d.toolName,
                input: d.input,
                output: d.output,
                timestamp: d.timestamp
              });
            });
            if (items.length > 0) setHistory(items);
          });

          // Live listener for Saved Files
          const fQuery = query(collection(db, 'savedFiles'), where('userId', '==', fbUser.uid));
          unsubscribeFiles = onSnapshot(fQuery, (fSnap) => {
            const files: SavedFile[] = [];
            fSnap.forEach((docSnap) => {
              const d = docSnap.data();
              files.push({
                id: docSnap.id,
                name: d.name,
                type: d.type,
                size: d.size,
                url: d.url,
                createdAt: d.createdAt
              });
            });
            if (files.length > 0) setSavedFiles(files);
          });

          // Live listener for Favorites
          const favQuery = query(collection(db, 'favorites'), where('userId', '==', fbUser.uid));
          unsubscribeFavs = onSnapshot(favQuery, (favSnap) => {
            const favIds: string[] = [];
            favSnap.forEach((dSnap) => {
              favIds.push(dSnap.data().toolId);
            });
            if (favIds.length > 0) setFavorites(favIds);
          });

        } catch (err: any) {
          console.error('Firestore init error:', err);
        }
      } else {
        setIsFirebaseConnected(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      if (unsubscribeHistory) unsubscribeHistory();
      if (unsubscribeFiles) unsubscribeFiles();
      if (unsubscribeFavs) unsubscribeFavs();
    };
  }, []);

  const clearAuthError = () => setAuthError(null);

  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setAuthError(err.message || 'Google sign in failed');
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setShowAuthModal(false);
    } catch (err: any) {
      console.error('Email Sign In Error:', err);
      setAuthError(err.message || 'Invalid email or password');
    }
  };

  const signupWithEmail = async (email: string, pass: string, name: string) => {
    setAuthError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (res.user) {
        const isSuperAdmin = isAdminEmail(email);
        const newUser: User = {
          id: res.user.uid,
          name: name || email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.user.uid}`,
          role: isSuperAdmin ? 'admin' : 'user',
          plan: isSuperAdmin ? 'Pro' : 'Free',
          creditsUsed: 0,
          creditsLimit: isSuperAdmin ? 1000 : 50,
          apiKey: `sk_live_${res.user.uid.slice(0, 10)}_${Date.now()}`,
          createdAt: new Date().toISOString().slice(0, 10)
        };
        await setDoc(doc(db, 'users', res.user.uid), newUser);
        setUser(newUser);
        setRoleState(newUser.role);
      }
      setShowAuthModal(false);
    } catch (err: any) {
      console.error('Email Signup Error:', err);
      setAuthError(err.message || 'Failed to create account');
    }
  };

  const setRole = async (newRole: Role) => {
    setRoleState(newRole);
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      if (auth.currentUser) {
        try {
          await setDoc(doc(db, 'users', auth.currentUser.uid), { role: newRole }, { merge: true });
        } catch (e) {
          console.error('Role update error:', e);
        }
      }
    }
  };

  const login = () => {
    setShowAuthModal(true);
  };

  const logout = async () => {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (e) {
      console.error('Logout error:', e);
    }
    setUser(null);
  };

  const toggleFavorite = async (toolId: string) => {
    const isFav = favorites.includes(toolId);
    const updated = isFav ? favorites.filter((id) => id !== toolId) : [...favorites, toolId];
    setFavorites(updated);

    if (auth.currentUser) {
      try {
        if (isFav) {
          const q = query(
            collection(db, 'favorites'), 
            where('userId', '==', auth.currentUser.uid), 
            where('toolId', '==', toolId)
          );
          const snaps = await getDocs(q);
          snaps.forEach((d: any) => deleteDoc(d.ref));
        } else {
          await addDoc(collection(db, 'favorites'), {
            userId: auth.currentUser.uid,
            toolId,
            createdAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.error('Favorites sync error:', err);
      }
    }
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const addHistoryItem = async (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newItem: HistoryItem = {
      ...item,
      id: `h-${Date.now()}`,
      timestamp: timeStr
    };

    setHistory((prev) => [newItem, ...prev]);

    if (user) {
      setUser({ ...user, creditsUsed: user.creditsUsed + 1 });
    }

    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'history'), {
          userId: auth.currentUser.uid,
          toolId: item.toolId,
          toolName: item.toolName,
          input: item.input,
          output: item.output,
          timestamp: timeStr
        });
      } catch (e) {
        console.error('History save error:', e);
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const addSavedFile = async (file: Omit<SavedFile, 'id' | 'createdAt'>) => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const newFile: SavedFile = {
      ...file,
      id: `sf-${Date.now()}`,
      createdAt: dateStr
    };

    setSavedFiles((prev) => [newFile, ...prev]);

    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'savedFiles'), {
          userId: auth.currentUser.uid,
          name: file.name,
          type: file.type,
          size: file.size,
          url: file.url,
          createdAt: dateStr
        });
      } catch (e) {
        console.error('Saved file error:', e);
      }
    }
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
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        authError,
        clearAuthError,
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
        setShowSqlModal,
        showAuthModal,
        setShowAuthModal,
        isFirebaseConnected,
        loading
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
