// src/services/api.ts
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export interface Case {
  created_at: string | number | Date;
  updated_at: string | number | Date;
  id: number;
  patient_id: number;
  symptoms: string;
  status: "pending" | "reviewed" | "completed";
  prescription?: string;
}

export async function submitCase(patient_id: number, symptoms: string) {
  const res = await axios.post<Case>(`${BASE_URL}/cases/`, { patient_id, symptoms });
  return res.data;
}

export async function getPatientCases(patient_id: number) {
  const res = await axios.get<Case[]>(`${BASE_URL}/cases/patient/${patient_id}`);
  return res.data;
}

export async function getPendingCases() {
  const res = await axios.get<Case[]>(`${BASE_URL}/cases/pending`);
  return res.data;
}

export async function updateCase(caseId: number, prescription: string) {
  const res = await axios.put<Case>(`${BASE_URL}/cases/${caseId}`, { prescription, status: "reviewed" });
  return res.data;
}
