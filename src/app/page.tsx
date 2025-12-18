// app/page.tsx
"use client";

import { IconType } from "react-icons";
import Link from "next/link";
import { 
  FaStethoscope,
  FaUserMd,
  FaShieldAlt,
  FaLock,
  FaEyeSlash,
  FaSearch,
  FaClipboardList,
  FaChartLine,
  FaUsers,
  FaCalendarAlt,
  FaPills,
  FaFileMedical,
  FaUserInjured,
  FaHospital,
  FaProcedures,
  FaHeartbeat,
  FaBrain,
  FaVial,
  FaPrescriptionBottleAlt,
  FaNotesMedical,
  FaUserCheck
} from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [stats] = useState({
    symptomsAnalyzed: 856,
    prescriptionsGenerated: 124,
    doctorsAvailable: 12,
    analysisAccuracy: "96.5%",
    pendingReviews: 8,
    urgentCases: 3
  });

  const recentAnalyses = [
    { 
      patient: "John Doe", 
      symptoms: "Fever, Cough, Fatigue",
      diagnosis: "Influenza A",
      prescription: "Oseltamivir 75mg",
      doctor: "Dr. Sarah Chen",
      status: "Prescribed",
      urgency: "Medium"
    },
    { 
      patient: "Maria Garcia", 
      symptoms: "Headache, Nausea, Dizziness",
      diagnosis: "Migraine",
      prescription: "Sumatriptan 50mg",
      doctor: "Dr. James Wilson",
      status: "Review Pending",
      urgency: "Low"
    },
    { 
      patient: "Robert Kim", 
      symptoms: "Chest Pain, Shortness of Breath",
      diagnosis: "Possible Angina",
      prescription: "Nitroglycerin 0.4mg",
      doctor: "Dr. Lisa Park",
      status: "Urgent",
      urgency: "High"
    },
    { 
      patient: "Emma Thompson", 
      symptoms: "Joint Pain, Fatigue, Rash",
      diagnosis: "Rheumatoid Arthritis",
      prescription: "Methotrexate 10mg",
      doctor: "Dr. Michael Brown",
      status: "Prescribed",
      urgency: "Medium"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1e33] to-[#1a2a3a] text-white font-sans">
      {/* Top Navigation */}
      <header className="w-full px-10 py-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="text-blue-400 text-4xl">
            <FaStethoscope size="1em" />
          </div>
          <h1 className="text-xl font-semibold">Systemanaa Symptom Analyzer</h1>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium opacity-90">
          <Link href="/" className="hover:text-blue-400 transition">Dashboard</Link>
          <Link href="/analysis" className="hover:text-blue-400 transition">New Analysis</Link>
          <Link href="/prescriptions" className="hover:text-blue-400 transition">Prescriptions</Link>
          <Link href="/doctors" className="hover:text-blue-400 transition">Doctors</Link>
          <Link href="/settings" className="hover:text-blue-400 transition">Settings</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-10 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI-Powered Symptom Analysis & Prescription System
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Enter patient symptoms, get AI-driven diagnosis analysis, and generate prescriptions that require doctor verification and signature for treatment.
          </p>

          <Link
            href="/systemanaa"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transition transform hover:scale-105"
          >
            Start Symptom Analysis
          </Link>
        </div>

        {/* Right Hero Icon */}
        <div className="flex justify-center">
          <div className="text-blue-400 opacity-80 drop-shadow-2xl">
            <FaBrain size="9rem" />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-10 py-16">
        <h3 className="text-2xl font-semibold mb-10 text-center">System Analytics</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: FaUserInjured, label: "Symptoms Analyzed", value: stats.symptomsAnalyzed, color: "from-blue-500 to-blue-600" },
            { icon: FaPrescriptionBottleAlt, label: "Prescriptions Generated", value: stats.prescriptionsGenerated, color: "from-green-500 to-green-600" },
            { icon: FaUserMd, label: "Doctors Available", value: stats.doctorsAvailable, color: "from-purple-500 to-purple-600" },
            { icon: FaBrain, label: "Analysis Accuracy", value: stats.analysisAccuracy, color: "from-yellow-500 to-yellow-600" },
            { icon: FaNotesMedical, label: "Pending Reviews", value: stats.pendingReviews, color: "from-orange-500 to-orange-600" },
            { icon: FaProcedures, label: "Urgent Cases", value: stats.urgentCases, color: "from-red-500 to-red-600" }
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-white/10"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center shadow-lg`}>
                  <div className="text-white">
                    <Icon size="2rem" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">{value}</p>
                  <p className="text-sm opacity-90">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Analyses */}
      <section className="px-10 py-16 border-t border-white/10">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-semibold">Recent Symptom Analyses</h3>
          <Link 
            href="/analyses" 
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-4">
          {recentAnalyses.map((analysis, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 hover:from-blue-500/10 hover:to-purple-500/10 transition-all border border-white/10"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Patient Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    analysis.urgency === 'High' ? 'bg-red-500/20' : 
                    analysis.urgency === 'Medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                  }`}>
                    <FaUserInjured className={`${
                      analysis.urgency === 'High' ? 'text-red-400' : 
                      analysis.urgency === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                    }`} size="1.5rem" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{analysis.patient}</h4>
                    <p className="text-sm text-gray-400">{analysis.symptoms}</p>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">Diagnosis</p>
                  <p className="font-medium">{analysis.diagnosis}</p>
                </div>

                {/* Prescription */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">Prescription</p>
                  <div className="flex items-center justify-center gap-2">
                    <FaPills className="text-blue-400" size="1rem" />
                    <p className="font-medium">{analysis.prescription}</p>
                  </div>
                </div>

                {/* Doctor & Status */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <FaUserMd className="text-purple-400" size="1rem" />
                    <p className="text-sm">{analysis.doctor}</p>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    analysis.status === 'Prescribed' ? 'bg-green-500/20 text-green-400' :
                    analysis.status === 'Review Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {analysis.status}
                  </span>
                  {analysis.status === 'Prescribed' && (
                    <p className="text-xs text-gray-400 mt-1 italic">Signed by doctor</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-10 py-16 border-t border-white/10">
        <h3 className="text-2xl font-semibold mb-10 text-center">How Our System Works</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: FaClipboardList,
              title: "Symptom Input",
              description: "Patient enters symptoms, duration, severity, and medical history through our detailed form.",
              steps: ["Detailed symptom description", "Medical history input", "Symptom severity rating"]
            },
            {
              icon: FaBrain,
              title: "AI Analysis & Diagnosis",
              description: "Our AI analyzes symptoms against medical databases to suggest possible conditions.",
              steps: ["Pattern recognition", "Differential diagnosis", "Risk assessment"]
            },
            {
              icon: FaPrescriptionBottleAlt,
              title: "Prescription Generation",
              description: "System generates treatment plan and prescriptions requiring doctor verification and signature.",
              steps: ["Medication recommendations", "Treatment protocol", "Doctor signature required"]
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 hover:from-blue-500/10 hover:to-purple-500/10 transition-all border border-white/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <div className="text-blue-400">
                    <feature.icon size="2.5rem" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <ul className="space-y-2 text-left w-full">
                  {feature.steps.map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Verification */}
      <section className="px-10 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaUserCheck className="text-blue-400" size="3rem" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Doctor Verification Required</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            All AI-generated prescriptions require verification and digital signature from licensed medical doctors before being issued to patients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
              <FaVial className="text-green-400 mx-auto mb-4" size="2rem" />
              <p className="font-medium">Medical Validation</p>
              <p className="text-sm text-gray-400 mt-2">Doctors review AI recommendations</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
              <FaFileMedical className="text-yellow-400 mx-auto mb-4" size="2rem" />
              <p className="font-medium">Digital Signature</p>
              <p className="text-sm text-gray-400 mt-2">Secure digital signature on prescriptions</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-xl border border-white/10">
              <FaShieldAlt className="text-red-400 mx-auto mb-4" size="2rem" />
              <p className="font-medium">Legal Compliance</p>
              <p className="text-sm text-gray-400 mt-2">All prescriptions meet regulatory standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-10 py-20 text-center">
        <p className="text-xl text-gray-300 mb-6 max-w-xl mx-auto">
          Begin analyzing symptoms and generating doctor-verified prescriptions in minutes.
        </p>

        <Link
          href="/systemanaa"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          Start Symptom Analysis Now
        </Link>
        
        <p className="text-sm text-gray-400 mt-6 max-w-lg mx-auto">
          <FaShieldAlt className="inline mr-2" size="1rem" />
          All analyses require doctor verification. This system assists medical professionals and does not replace clinical judgment.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-10 py-6 text-center text-sm text-gray-400 border-t border-white/10">
        © {new Date().getFullYear()} Systemanaa Symptom Analyzer. Medical decision support system for healthcare professionals only.
      </footer>
    </div>
  );
}