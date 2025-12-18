// app/systemanaa/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Brain, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Stethoscope,
  Thermometer,
  Heart,
  Clock,
  Activity,
  Pill,
  User
} from "lucide-react";
import Link from "next/link";

// Symptom severity options
const severityOptions = [
  { value: "mild", label: "Mild", color: "text-green-400" },
  { value: "moderate", label: "Moderate", color: "text-yellow-400" },
  { value: "severe", label: "Severe", color: "text-orange-400" },
  { value: "critical", label: "Critical", color: "text-red-400" },
];

// Body areas for symptom location
const bodyAreas = [
  "Head",
  "Chest",
  "Abdomen",
  "Back",
  "Arms",
  "Legs",
  "General (Whole Body)",
];

export default function SymptomAnalysisPage() {
  const [form, setForm] = useState({
    patientId: `PT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    symptoms: "",
    symptomDuration: "",
    severity: "",
    bodyArea: "",
    existingConditions: "",
    medications: "",
    allergies: "",
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    possibleConditions: string[];
    urgency: string;
    recommendedActions: string[];
    suggestedPrescription?: string;
  } | null>(null);
  const [doctorSignature, setDoctorSignature] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate new patient ID on component mount
  useEffect(() => {
    const generatePatientId = () => {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `PT-${year}-${randomNum}`;
    };
    setForm(prev => ({ ...prev, patientId: generatePatientId() }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.age) newErrors.age = "Age is required";
    if (form.age && (parseInt(form.age) < 0 || parseInt(form.age) > 150)) newErrors.age = "Age must be between 0 and 150";
    if (!form.symptoms.trim()) newErrors.symptoms = "Symptoms description is required";
    if (!form.symptomDuration.trim()) newErrors.symptomDuration = "Duration is required";
    if (!form.severity) newErrors.severity = "Severity level is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mock AI analysis function (in real app, this would call your API)
  const performAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results based on symptoms
    const mockResults = {
      possibleConditions: ["Influenza", "Upper Respiratory Infection", "COVID-19"],
      urgency: form.severity === "critical" ? "Immediate" : form.severity === "severe" ? "Urgent" : "Routine",
      recommendedActions: [
        "Consult with a healthcare provider",
        "Rest and stay hydrated",
        "Monitor symptoms closely",
        "Seek emergency care if symptoms worsen"
      ],
      suggestedPrescription: form.symptoms.toLowerCase().includes("fever") 
        ? "Acetaminophen 500mg - 1 tablet every 6 hours as needed"
        : "Over-the-counter symptom relief as directed"
    };
    
    setAnalysisResult(mockResults);
    setIsAnalyzing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!analysisResult) {
      await performAnalysis();
      return;
    }
    
    if (!doctorSignature.trim()) {
      setErrors(prev => ({ ...prev, doctorSignature: "Doctor signature is required" }));
      return;
    }
    
    // Submit the analysis and prescription
    try {
      const response = await fetch('/api/analyses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          age: parseInt(form.age),
          analysis: analysisResult,
          doctorSignature,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Show success message and reset form
        alert(`Analysis completed and prescription issued for ${form.firstName} ${form.lastName}!`);
        
        // Reset form
        setForm({
          patientId: `PT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          symptoms: "",
          symptomDuration: "",
          severity: "",
          bodyArea: "",
          existingConditions: "",
          medications: "",
          allergies: "",
        });
        setAnalysisResult(null);
        setDoctorSignature("");
        setErrors({});
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Failed to submit analysis. Please try again.");
    }
  };

  const clearForm = () => {
    setForm({
      patientId: `PT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      symptoms: "",
      symptomDuration: "",
      severity: "",
      bodyArea: "",
      existingConditions: "",
      medications: "",
      allergies: "",
    });
    setAnalysisResult(null);
    setDoctorSignature("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1e33] to-[#1a2a3a] text-white font-sans p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Symptom Analysis & Prescription System
              </h1>
              <p className="text-gray-400">Enter symptoms for AI analysis and generate doctor-verified prescriptions</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10">
                <Upload className="mr-2 h-4 w-4" />
                Import History
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left: Symptom Input Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 shadow-xl border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Patient Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Patient Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="patientId" className="text-gray-300">Patient ID</Label>
                      <Input 
                        id="patientId"
                        name="patientId" 
                        value={form.patientId} 
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 text-white"
                        readOnly
                      />
                    </div>

                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                      <Input 
                        id="firstName"
                        name="firstName" 
                        value={form.firstName} 
                        onChange={handleChange}
                        className={`bg-white/5 border-white/10 text-white ${errors.firstName ? "border-red-500" : ""}`}
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                      <Input 
                        id="lastName"
                        name="lastName" 
                        value={form.lastName} 
                        onChange={handleChange}
                        className={`bg-white/5 border-white/10 text-white ${errors.lastName ? "border-red-500" : ""}`}
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="age" className="text-gray-300">Age *</Label>
                      <Input 
                        id="age"
                        name="age" 
                        type="number" 
                        value={form.age} 
                        onChange={handleChange}
                        className={`bg-white/5 border-white/10 text-white ${errors.age ? "border-red-500" : ""}`}
                      />
                      {errors.age && (
                        <p className="text-red-400 text-sm mt-1">{errors.age}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="gender" className="text-gray-300">Gender</Label>
                      <Select 
                        value={form.gender} 
                        onValueChange={(value) => handleSelectChange('gender', value)}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a2a3a] border-white/10 text-white">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Symptom Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-blue-400" />
                    Symptom Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="symptomDuration" className="text-gray-300">Duration *</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="symptomDuration"
                          name="symptomDuration" 
                          value={form.symptomDuration} 
                          onChange={handleChange}
                          placeholder="e.g., 3 days"
                          className={`bg-white/5 border-white/10 text-white ${errors.symptomDuration ? "border-red-500" : ""}`}
                        />
                        <Select 
                          value="days" 
                          onValueChange={() => {}}
                        >
                          <SelectTrigger className="w-24 bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1a2a3a] border-white/10 text-white">
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.symptomDuration && (
                        <p className="text-red-400 text-sm mt-1">{errors.symptomDuration}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="severity" className="text-gray-300">Severity Level *</Label>
                      <Select 
                        value={form.severity} 
                        onValueChange={(value) => handleSelectChange('severity', value)}
                      >
                        <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.severity ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a2a3a] border-white/10 text-white">
                          {severityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className={option.color}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.severity && (
                        <p className="text-red-400 text-sm mt-1">{errors.severity}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="bodyArea" className="text-gray-300">Affected Body Area</Label>
                      <Select 
                        value={form.bodyArea} 
                        onValueChange={(value) => handleSelectChange('bodyArea', value)}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a2a3a] border-white/10 text-white">
                          {bodyAreas.map((area) => (
                            <SelectItem key={area} value={area.toLowerCase()}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="symptoms" className="text-gray-300">Describe Symptoms *</Label>
                    <Textarea 
                      id="symptoms"
                      name="symptoms" 
                      rows={4} 
                      value={form.symptoms} 
                      onChange={handleChange} 
                      placeholder="Please describe all symptoms in detail, including when they started, what makes them better or worse, and any associated symptoms..."
                      className={`bg-white/5 border-white/10 text-white ${errors.symptoms ? "border-red-500" : ""}`}
                    />
                    {errors.symptoms && (
                      <p className="text-red-400 text-sm mt-1">{errors.symptoms}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="existingConditions" className="text-gray-300">Existing Medical Conditions</Label>
                      <Input 
                        id="existingConditions"
                        name="existingConditions" 
                        value={form.existingConditions} 
                        onChange={handleChange}
                        placeholder="e.g., Diabetes, Hypertension"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="medications" className="text-gray-300">Current Medications</Label>
                      <Input 
                        id="medications"
                        name="medications" 
                        value={form.medications} 
                        onChange={handleChange}
                        placeholder="List current medications"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="allergies" className="text-gray-300">Allergies</Label>
                      <Input 
                        id="allergies"
                        name="allergies" 
                        value={form.allergies} 
                        onChange={handleChange}
                        placeholder="List any allergies (medications, food, etc.)"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Analysis Button */}
                <div className="pt-6 border-t border-white/10">
                  {!analysisResult ? (
                    <Button
                      type="button"
                      onClick={performAnalysis}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 text-lg rounded-xl shadow-lg transition transform hover:scale-[1.02]"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Analyzing Symptoms...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-5 w-5" />
                          Start AI Symptom Analysis
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      {/* Doctor Signature Input */}
                      <div>
                        <Label htmlFor="doctorSignature" className="text-gray-300">Doctor's Signature *</Label>
                        <Input 
                          id="doctorSignature"
                          name="doctorSignature" 
                          value={doctorSignature} 
                          onChange={(e) => setDoctorSignature(e.target.value)}
                          placeholder="Enter your full name and credentials"
                          className={`bg-white/5 border-white/10 text-white ${errors.doctorSignature ? "border-red-500" : ""}`}
                        />
                        {errors.doctorSignature && (
                          <p className="text-red-400 text-sm mt-1">{errors.doctorSignature}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={clearForm}
                          className="border-white/20 hover:bg-white/10"
                        >
                          Start New Analysis
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Issue Prescription
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right: Analysis Results Panel */}
          <div>
            {analysisResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 shadow-xl border border-blue-500/20"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  Analysis Results
                </h2>

                {/* Urgency Level */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Urgency Level</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      analysisResult.urgency === "Immediate" ? "bg-red-500/20 text-red-400" :
                      analysisResult.urgency === "Urgent" ? "bg-orange-500/20 text-orange-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {analysisResult.urgency}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {analysisResult.urgency === "Immediate" ? "Seek emergency care immediately" :
                     analysisResult.urgency === "Urgent" ? "Consult healthcare provider within 24 hours" :
                     "Schedule appointment when convenient"}
                  </div>
                </div>

                {/* Possible Conditions */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-gray-300">Possible Conditions</h3>
                  <ul className="space-y-2">
                    {analysisResult.possibleConditions.map((condition, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <Activity className="h-4 w-4 text-blue-400" />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prescription */}
                {analysisResult.suggestedPrescription && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-gray-300 flex items-center gap-2">
                      <Pill className="h-4 w-4 text-green-400" />
                      Suggested Prescription
                    </h3>
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20">
                      <p className="text-white">{analysisResult.suggestedPrescription}</p>
                      <div className="mt-4 pt-4 border-t border-green-500/20">
                        <p className="text-sm text-gray-400">Requires doctor verification:</p>
                        <div className="mt-2 p-3 bg-white/5 rounded-lg">
                          <p className="text-xs text-gray-400">Doctor's Signature Area</p>
                          <p className="text-sm mt-1">{doctorSignature || "Awaiting signature..."}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommended Actions */}
                <div>
                  <h3 className="font-medium mb-3 text-gray-300">Recommended Actions</h3>
                  <ul className="space-y-2">
                    {analysisResult.recommendedActions.map((action, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 shadow-xl border border-white/10 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
                  <Brain className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Analysis Ready</h3>
                <p className="text-gray-400 mb-6">
                  Enter patient symptoms and click "Start AI Symptom Analysis" to get intelligent diagnosis suggestions and prescription recommendations.
                </p>
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    <span>Symptom pattern recognition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span>AI-powered diagnosis suggestions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    <span>Prescription generation</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Analyses Today</p>
                <p className="text-xl md:text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <CheckCircle2 className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Accuracy Rate</p>
                <p className="text-xl md:text-2xl font-bold">96.5%</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <Pill className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Prescriptions Issued</p>
                <p className="text-xl md:text-2xl font-bold">142</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}