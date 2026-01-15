// src/patient/case-status.tsx
"use client";

import { useState, useEffect } from "react";
import { getPatientCases, Case } from "../services/api";
import Card from "../components/card";

const patientId = 1; // Demo: replace with dynamic user ID from AuthContext if available

export default function CaseStatus() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const data = await getPatientCases(patientId);
      setCases(data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  if (loading) return <p>Loading your cases...</p>;

  if (cases.length === 0) return <p>You have not submitted any cases yet.</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Your Case History</h3>
      {cases.map((c) => (
        <Card key={c.id}>
          <p><strong>Case ID:</strong> {c.id}</p>
          <p><strong>Symptoms:</strong> {c.symptoms}</p>
          <p><strong>Status:</strong> {c.status}</p>
          {c.prescription && <p><strong>AI Prescription:</strong> {c.prescription}</p>}
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            Submitted: {new Date(c.created_at).toLocaleString()} | Last Updated: {new Date(c.updated_at).toLocaleString()}
          </p>
        </Card>
      ))}
    </div>
  );
}
