// src/context/auth-context.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Role = "patient" | "doctor" | null;

interface AuthContextType {
  userRole: Role;
  setUserRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<Role>(null);
  return <AuthContext.Provider value={{ userRole, setUserRole }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
