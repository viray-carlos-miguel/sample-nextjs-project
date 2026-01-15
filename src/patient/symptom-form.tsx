// src/patient/symptom-form.tsx
"use client";
import { useState, useEffect } from "react";
import { submitCase, getPatientCases, Case } from "../services/api";
import Button from "../components/button";
import Card from "../components/card";

const patientId = 1; // demo only

export default function SymptomForm() {
  const [symptoms, setSymptoms] = useState("");
  const [cases, setCases] = useState<Case[]>([]);

  const fetchCases = async () => setCases(await getPatientCases(patientId));
  useEffect(() => { fetchCases(); }, []);

  const handleSubmit = async () => {
    await submitCase(patientId, symptoms);
    setSymptoms("");
    fetchCases();
  };

  return (
    <div>
      <h3>Submit Symptoms</h3>
      <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Describe your symptoms" style={{ width: "100%", height: "100px", marginBottom: "0.5rem", padding: "0.5rem" }} />
      <Button onClick={handleSubmit} disabled={!symptoms}>Submit</Button>

      <h3 style={{ marginTop: "2rem" }}>Your Cases</h3>
      {cases.map(c => (
        <Card key={c.id}>
          <p><strong>Symptoms:</strong> {c.symptoms}</p>
          <p><strong>Status:</strong> {c.status}</p>
          {c.prescription && <p><strong>Prescription:</strong> {c.prescription}</p>}
        </Card>
      ))}
    </div>
  );
}
