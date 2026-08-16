import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";

/* =====================================================
   NEX IT REGISTRATION DATA
===================================================== */

export interface NexItRegistrationData {
  name: string;
  registerNumber: string;
  email: string;
  phone: string;

  department?: string;

  // New fields
  program: "UG" | "PG";
  year: "1st Year" | "2nd Year" | "3rd Year";

  event: string;
}

/* =====================================================
   REGISTER NEX IT PARTICIPANT
===================================================== */

export async function registerForNexIt(
  data: NexItRegistrationData
) {
  try {
    /* =================================================
       VALIDATION
    ================================================= */

    if (!data.name.trim()) {
      throw new Error("Name is required");
    }

    if (!data.registerNumber.trim()) {
      throw new Error("Register number is required");
    }

    if (!data.email.trim()) {
      throw new Error("Email is required");
    }

    if (!data.phone.trim()) {
      throw new Error("Phone number is required");
    }

    if (!data.program) {
      throw new Error("UG or PG is required");
    }

    if (!data.year) {
      throw new Error("Year is required");
    }

    if (!data.event.trim()) {
      throw new Error("Event is required");
    }

    /* =================================================
       FIRESTORE DATA
    ================================================= */

    const registrationData = {
      name: data.name.trim(),

      registerNumber: data.registerNumber.trim(),

      email: data.email.trim().toLowerCase(),

      phone: data.phone.trim(),

      department:
        data.department?.trim() ||
        "B.Sc. Information Technology",

      /* New Program Field */

      program: data.program,

      /* Year Field */

      year: data.year,

      /* Combined value for easy viewing */

      studyLevel: `${data.program} ${data.year}`,

      /* Selected NEX IT Event */

      event: data.event.trim(),

      /* Identify registration */

      registrationType: "NEX IT",

      /* Firebase server timestamp */

      createdAt: serverTimestamp(),
    };

    /* =================================================
       SAVE TO FIRESTORE
       
       Collection:
       nexItRegistrations
    ================================================= */

    const docRef = await addDoc(
      collection(db, "nexItRegistrations"),
      registrationData
    );

    console.log(
      "NEX IT registration saved successfully:",
      docRef.id
    );

    return {
      success: true,
      id: docRef.id,
    };

  } catch (error) {

    console.error(
      "NEX IT registration error:",
      error
    );

    return {
      success: false,
      id: null,
      error,
    };
  }
}