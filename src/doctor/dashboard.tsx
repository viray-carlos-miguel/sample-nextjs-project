// src/doctor/dashboard.tsx
"use client";
import ProtectedRoute from "../components/protected-route";
import CaseQueue from "./case-queue";

export default function DoctorDashboard() {
  return (
    <ProtectedRoute role="doctor">
      <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
        <h2>Doctor Dashboard</h2>
        <CaseQueue />
      </div>
    </ProtectedRoute>
  );
}
