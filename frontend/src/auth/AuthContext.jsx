import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const savedUser    = localStorage.getItem('user');

    if (refreshToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const res = await axiosClient.post('/auth/login', { email, password });
    _saveSession(res.data);
    return res.data;
  }

  async function register(email, password, firstName, lastName) {
    const res = await axiosClient.post('/auth/register', {
      email, password, firstName, lastName,
    });
    _saveSession(res.data);
    return res.data;
  }

  function logout() {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  }

  function _saveSession(data) {
    sessionStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    const userInfo = {
      id:        data.userId,
      email:     data.email,
      firstName: data.firstName,
      lastName:  data.lastName,
      role:      data.role,
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  const isAdmin   = user?.role === 'ADMIN';
  const isLogged  = !!user;

  return (
    <AuthContext.Provider value={{
      user, loading, isAdmin, isLogged,
      login, register, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}