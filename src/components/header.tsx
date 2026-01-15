// src/components/header.tsx
"use client";
import { useAuth } from "../context/auth-context";

export default function Header() {
  const { userRole } = useAuth();
  return (
    <header style={{ padding: "1rem", background: "#1976d2", color: "#fff", display: "flex", justifyContent: "space-between" }}>
      <h1>AI-Assisted Medical Demo</h1>
      {userRole && <span>Role: {userRole.toUpperCase()}</span>}
    </header>
  );
}
