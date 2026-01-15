// src/doctor/prescription-draft.tsx
"use client";
import { useState, useEffect } from "react";
import { updateCase, Case } from "../services/api";
import Button from "../components/button";

interface Props {
  caseData: Case;
  onUpdate?: (updatedCase: Case) => void; // Callback to refresh parent
}

export default function PrescriptionDraft({ caseData, onUpdate }: Props) {
  const [prescription, setPrescription] = useState(caseData.prescription || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const updated = await updateCase(caseData.id, prescription);
      alert("Prescription updated successfully (educational demo only).");
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      alert("Error updating prescription.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Prescription Draft</h4>
      <textarea
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
        placeholder="Edit or confirm prescription..."
        style={{ width: "100%", height: "100px", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <Button onClick={handleSubmit} disabled={!prescription || submitting}>
        {submitting ? "Submitting..." : "Submit Prescription"}
      </Button>
    </div>
  );
}
