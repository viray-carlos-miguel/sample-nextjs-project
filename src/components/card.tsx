// src/components/card.tsx
import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", marginBottom: "1rem", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      {children}
    </div>
  );
}
