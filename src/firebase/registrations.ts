import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";

/* =====================================================
   TECHNO FEAST REGISTRATION DATA
===================================================== */

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
  section: string;
  fee: number | string;
}

/* =====================================================
   SUBMIT TECHNO FEAST REGISTRATION
===================================================== */

export async function submitRegistration(
  data: RegistrationData
) {
  try {
    /* =================================================
       VALIDATION
    ================================================= */

    if (!data.fullName?.trim()) {
      throw new Error("Full name is required");
    }

    if (!data.registerNumber?.trim()) {
      throw new Error("Register number is required");
    }

    if (!data.department?.trim()) {
      throw new Error("Department is required");
    }

    if (!data.year?.trim()) {
      throw new Error("Year is required");
    }

    if (!data.collegeName?.trim()) {
      throw new Error("College name is required");
    }

    if (!data.mobile?.trim()) {
      throw new Error("Mobile number is required");
    }

    if (!data.email?.trim()) {
      throw new Error("Email is required");
    }

    if (!data.eventName?.trim()) {
      throw new Error("Event name is required");
    }

    /* =================================================
       FIRESTORE DATA
    ================================================= */

    const registrationData = {
      fullName: data.fullName.trim(),

      registerNumber:
        data.registerNumber.trim(),

      department:
        data.department.trim(),

      year:
        data.year.trim(),

      collegeName:
        data.collegeName.trim(),

      mobile:
        data.mobile.trim(),

      email:
        data.email.trim().toLowerCase(),

      teamName:
        data.teamName?.trim() || "",

      teamMembers:
        data.teamMembers?.trim() || "",

      eventName:
        data.eventName.trim(),

      eventId:
        data.eventId,

      section:
        data.section,

      fee:
        data.fee,

      /* Identifies this as Techno Feast */

      registrationType:
        "TECHNO FEAST",

      /* Server-side Firebase timestamp */

      createdAt:
        serverTimestamp(),
    };

    /* =================================================
       SAVE TO FIRESTORE
       
       Collection:
       registrations
    ================================================= */

    const documentReference =
      await addDoc(
        collection(
          db,
          "registrations"
        ),
        registrationData
      );

    console.log(
      "Techno Feast registration saved:",
      documentReference.id
    );

    return {
      success: true,
      id: documentReference.id,
    };

  } catch (error) {

    console.error(
      "Techno Feast registration failed:",
      error
    );

    throw error;
  }
}