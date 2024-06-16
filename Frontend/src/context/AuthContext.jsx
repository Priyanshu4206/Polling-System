import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });

  useEffect(() => {
    const token = Cookies.get('accessToken') || null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuthState({
          isAuthenticated: true,
          user: decodedToken,
          accessToken: token,
        });
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setAuthState({
      isAuthenticated: true,
      user: decodedToken,
      accessToken: token,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
  };

  const updateRole = (newRole) => {
    setAuthState(prevState => ({
      ...prevState,
      user: {
        ...prevState.user,
        role: newRole,
      },
    }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthContext, useAuth, AuthProvider }