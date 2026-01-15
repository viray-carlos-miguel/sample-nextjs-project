// src/patient/dashboard.tsx
"use client";
import ProtectedRoute from "../components/protected-route";
import SymptomForm from "./symptom-form";
import CaseStatus from "./case-status";

export default function PatientDashboard() {
  return (
    <ProtectedRoute role="patient">
      <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
        <h2>Patient Dashboard</h2>
        <SymptomForm />
        <CaseStatus />
      </div>
    </ProtectedRoute>
  );
}
