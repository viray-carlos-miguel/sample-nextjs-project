// src/doctor/case-queue.tsx
"use client";
import { useState, useEffect } from "react";
import { getPendingCases, Case } from "../services/api";
import Card from "../components/card";
import Button from "../components/button";
import { useRouter } from "next/navigation";

export default function CaseQueue() {
  const [cases, setCases] = useState<Case[]>([]);
  const router = useRouter();

  const fetchCases = async () => setCases(await getPendingCases());
  useEffect(() => { fetchCases(); }, []);

  return (
    <div>
      <h3>Pending Cases</h3>
      {cases.map(c => (
        <Card key={c.id}>
          <p><strong>Symptoms:</strong> {c.symptoms}</p>
          <Button onClick={() => router.push(`/doctor/case-review?id=${c.id}`)}>Review</Button>
        </Card>
      ))}
    </div>
  );
}
