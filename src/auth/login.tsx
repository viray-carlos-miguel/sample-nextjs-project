"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import Disclaimer from "../components/disclaimer";

export default function Login() {
  const [role, setRole] = useState<"patient" | "doctor" | "">("");
  const { setUserRole } = useAuth();
  const router = useRouter();

  const handleContinue = () => {
    if (!role) return;
    setUserRole(role);
    router.push(`/${role}/dashboard`);
  };

  return (
    <div>
      <h1>AI-Assisted Diagnosis (Educational Demo)</h1>
      <Disclaimer />
      <label>
        Select Role:
        <select value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="">-- Choose --</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
      </label>
      <br />
      <button onClick={handleContinue} disabled={!role}>
        Continue
      </button>
    </div>
  );
}
