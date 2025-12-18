// app/api/patients/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Import PrismaClient after generating it
let prisma: any;

try {
  // Try to import PrismaClient
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  console.warn('PrismaClient not available yet. Run: npx prisma generate');
  prisma = null;
}

export async function POST(request: NextRequest) {
  // If Prisma isn't set up yet, return a helpful error
  if (!prisma) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database not configured. Run: npx prisma generate && npx prisma db push' 
      },
      { status: 503 }
    );
  }

  try {
    const patientData = await request.json();
    
    // Validate required fields
    if (!patientData.firstName || !patientData.lastName || !patientData.age) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        patientId: patientData.patientId || `PT-${Date.now()}`,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        age: parseInt(patientData.age),
        gender: patientData.gender || 'Not specified',
        contact: patientData.contact || '',
        address: patientData.address || '',
        symptoms: patientData.symptoms || '',
        bloodType: patientData.bloodType || '',
        allergies: patientData.allergies || '',
        emergencyContact: patientData.emergencyContact || '',
      },
    });

    return NextResponse.json(
      { success: true, data: patient, message: 'Patient created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating patient:', error);
    
    // Check for duplicate patientId
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Patient ID already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { success: false, error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    
    return NextResponse.json({ 
      success: true, 
      data: patients,
      count: patients.length 
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}