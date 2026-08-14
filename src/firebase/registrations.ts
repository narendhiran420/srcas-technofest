import {
  addDoc,
  collection,
} from 'firebase/firestore';

import { db } from './config';

export interface RegistrationData {
  fullName: string;
  registerNumber: string;
  department: string;
  year: string;
  collegeName: string;
  mobile: string;
  email: string;
  teamName?: string;
  teamMembers?: string;
  eventName: string;
  eventId: string;
}

export async function submitRegistration(
  data: RegistrationData
): Promise<string> {
  try {
    const registration = {
      fullName: data.fullName.trim(),
      registerNumber: data.registerNumber.trim(),
      department: data.department.trim(),
      year: data.year.trim(),
      collegeName: data.collegeName.trim(),
      mobile: data.mobile.trim(),
      email: data.email.trim().toLowerCase(),
      teamName: data.teamName?.trim() || '',
      teamMembers: data.teamMembers?.trim() || '',
      eventName: data.eventName,
      eventId: data.eventId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, 'registrations'),
      registration
    );

    console.log(
      'Registration saved:',
      docRef.id
    );

    return docRef.id;
  } catch (error) {
    console.error(
      'Firebase registration failed:',
      error
    );

    throw error;
  }
}