"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Profile } from "./types";
import { mockProfiles } from "./mock-data";

type AuthContextType = {
  user: Profile | null;
  login: (role: "buyer" | "admin") => void;
  logout: () => void;
  isAuthenticated: boolean;
  isBuyer: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  isBuyer: false,
  isAdmin: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);

  const login = (role: "buyer" | "admin") => {
    const profile = mockProfiles.find((p) => p.role === role);
    if (profile) setUser(profile);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isBuyer: user?.role === "buyer",
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
