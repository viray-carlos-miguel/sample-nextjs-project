// src/doctor/case-review.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProtectedRoute from "../components/protected-route";
import { getPendingCases, Case } from "../services/api";
import PrescriptionDraft from "./prescription-draft";
import Card from "../components/card";
import Button from "../components/button";

export default function CaseReview() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("id");
  const [caseData, setCaseData] = useState<Case | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!caseId) return;
    const fetchCase = async () => {
      try {
        const cases = await getPendingCases();
        const c = cases.find((c) => c.id === Number(caseId));
        setCaseData(c || null);
      } catch {
        setCaseData(null);
      }
    };
    fetchCase();
  }, [caseId]);

  if (!caseData) return <p>Loading case data...</p>;

  return (
    <ProtectedRoute role="doctor">
      <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
        <h2>Case Review</h2>
        <Card>
          <p><strong>Symptoms:</strong> {caseData.symptoms}</p>
          <p><strong>Status:</strong> {caseData.status}</p>
          {caseData.prescription && <p><strong>AI Suggested Prescription:</strong> {caseData.prescription}</p>}
        </Card>

        <PrescriptionDraft caseData={caseData} onUpdate={setCaseData} />

        <div style={{ marginTop: "1rem" }}>
          <Button onClick={() => router.push("/doctor/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
