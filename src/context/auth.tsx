import { ReactNode, createContext, useState, useEffect } from 'react';
import * as api from '../api/auth';
import { User } from '../types/auth';

type AuthContext = {
  user: User | null;
  setUser: (userData: User | null) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

const defaultAuthContext: AuthContext = {
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
};

export const AuthContext = createContext<AuthContext>(defaultAuthContext);

type AuthProviderProps = { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleSetAccessToken = (token: string | null) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          handleSetAccessToken(token);
          const response = await api.getCurrentUser(token);
          setUser(response);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        handleSetAccessToken(null);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken: handleSetAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
