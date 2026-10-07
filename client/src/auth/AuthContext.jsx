import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { apiFetch, getToken, TOKEN_KEY } from '../api/client';

// Holds "who is logged in" for the whole app.
const AuthContext = createContext(null);

const saveToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable (private mode) — the session just won't survive a reload */
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(Boolean(getToken()));

  // On page load: if we have a saved token, ask the server who it belongs to.
  useEffect(() => {
    if (!getToken()) return;
    apiFetch('/api/auth/me')
      .then((data) => {
        setUser(data.user);
        setPermissions(data.permissions || []);
      })
      .catch(() => saveToken(null)) // expired or invalid token
      .finally(() => setLoading(false));
  }, []);

  const handleAuth = (data) => {
    saveToken(data.token);
    setUser(data.user);
    setPermissions(data.permissions || []);
    return data.user;
  };

  const login = useCallback(
    (email, password) => apiFetch('/api/auth/login', { method: 'POST', body: { email, password }, auth: false }).then(handleAuth),
    []
  );

  const register = useCallback(
    (form) => apiFetch('/api/auth/register', { method: 'POST', body: form, auth: false }).then(handleAuth),
    []
  );

  const logout = useCallback(() => {
    saveToken(null);
    setUser(null);
    setPermissions([]);
  }, []);

  const value = useMemo(() => {
    const role = user ? user.role : null;
    return {
      user,
      setUser,
      permissions,
      loading,
      login,
      register,
      logout,
      isLoggedIn: Boolean(user),
      isAdmin: role === 'Administrator',
      canManageUsers: role === 'Administrator' || role === 'Manager',
    };
  }, [user, permissions, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
