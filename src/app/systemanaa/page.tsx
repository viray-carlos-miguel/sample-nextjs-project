"use client";


import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function PatientInputPage() {
  const [form, setForm] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    symptoms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Patient Data:", form);
    alert("Patient information submitted successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Patient Information System</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Patient ID</Label>
                <Input name="patientId" value={form.patientId} onChange={handleChange} required />
              </div>

              <div>
                <Label>Age</Label>
                <Input name="age" type="number" value={form.age} onChange={handleChange} required />
              </div>

              <div>
                <Label>First Name</Label>
                <Input name="firstName" value={form.firstName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={form.lastName} onChange={handleChange} required />
              </div>

              <div>
                <Label>Gender</Label>
                <Input name="gender" placeholder="Male / Female" value={form.gender} onChange={handleChange} />
              </div>

              <div>
                <Label>Contact Number</Label>
                <Input name="contact" value={form.contact} onChange={handleChange} />
              </div>

              <div className="md:col-span-2">
                <Label>Address</Label>
                <Input name="address" value={form.address} onChange={handleChange} />
              </div>

              <div className="md:col-span-2">
                <Label>Symptoms / Notes</Label>
                <Textarea name="symptoms" rows={4} value={form.symptoms} onChange={handleChange} />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" className="px-8 rounded-xl">Save Patient</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
