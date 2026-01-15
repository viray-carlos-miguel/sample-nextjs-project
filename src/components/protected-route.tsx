// src/components/protected-route.tsx
"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ role, children }: { role: "patient" | "doctor"; children: ReactNode }) {
  const { userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userRole || userRole !== role) router.push("/auth/login");
  }, [userRole, role, router]);

  if (userRole !== role) return null;
  return <>{children}</>;
}
