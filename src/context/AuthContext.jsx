import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on startup
  useEffect(() => {
    const storedUser = localStorage.getItem('cinewatch_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock Login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('cinewatch_users') || '[]');
    const existingUser = users.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
      const userData = { id: existingUser.id, email: existingUser.email };
      localStorage.setItem('cinewatch_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  // Mock Register
  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem('cinewatch_users') || '[]');
    if (users.find(u => u.email === email)) {
      return false; // User exists
    }
    
    const newUser = { id: Date.now().toString(), email, password };
    users.push(newUser);
    localStorage.setItem('cinewatch_users', JSON.stringify(users));
    
    // Auto login after register
    const userData = { id: newUser.id, email: newUser.email };
    localStorage.setItem('cinewatch_user', JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('cinewatch_user');
    setUser(null);
  };

  // --- Watchlist Logic (Per User) ---
  
  const getWatchlistKey = () => `watchlist_${user?.id}`;

  const getWatchlist = () => {
    if (!user) return [];
    const data = localStorage.getItem(getWatchlistKey());
    return data ? JSON.parse(data) : [];
  };

  const addToWatchlist = (movie) => {
    if (!user) return;
    const list = getWatchlist();
    if (!list.find(m => m.id === movie.id)) {
      const newList = [...list, { id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date }];
      localStorage.setItem(getWatchlistKey(), JSON.stringify(newList));
    }
  };

  const removeFromWatchlist = (movieId) => {
    if (!user) return;
    const list = getWatchlist();
    const newList = list.filter(m => m.id !== movieId);
    localStorage.setItem(getWatchlistKey(), JSON.stringify(newList));
  };

  const isInWatchlist = (movieId) => {
    if (!user) return false;
    return getWatchlist().some(m => m.id === movieId);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </AuthContext.Provider>
  );
};