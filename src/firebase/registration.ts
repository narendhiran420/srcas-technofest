import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";

/* =====================================================
   MEMBER DATA
===================================================== */

export interface MemberData {
  name: string;
  registerNumber: string;
  phone: string;
  department: string;
  year: string;
  program: "UG" | "PG";
}

/* =====================================================
   REGISTRATION DATA
===================================================== */

export interface RegistrationData {
  eventName: string;
  eventId: string;
  section: string;
  fee: number | string;

  email: string;

  teamName?: string;

  member1: MemberData;

  member2?: MemberData;
}

/* =====================================================
   SUBMIT TECHNO FEAST REGISTRATION
===================================================== */

export async function submitRegistration(
  data: RegistrationData
) {
  try {
    /* =================================================
       COMMON VALIDATION
    ================================================= */

    if (!data.eventName?.trim()) {
      throw new Error("Event name is required.");
    }

    if (!data.email?.trim()) {
      throw new Error("Email is required.");
    }

    if (!data.member1?.name?.trim()) {
      throw new Error("Member 1 name is required.");
    }

    if (!data.member1?.registerNumber?.trim()) {
      throw new Error(
        "Member 1 register number is required."
      );
    }

    if (!data.member1?.phone?.trim()) {
      throw new Error(
        "Member 1 phone number is required."
      );
    }

    if (!data.member1?.department?.trim()) {
      throw new Error(
        "Member 1 department is required."
      );
    }

    if (!data.member1?.year?.trim()) {
      throw new Error(
        "Member 1 year is required."
      );
    }

    if (!data.member1?.program) {
      throw new Error(
        "Member 1 program is required."
      );
    }

    /* =================================================
       MEMBER 2 VALIDATION
    ================================================= */

    if (data.member2) {
      if (!data.teamName?.trim()) {
        throw new Error(
          "Team name is required."
        );
      }

      if (!data.member2.name?.trim()) {
        throw new Error(
          "Member 2 name is required."
        );
      }

      if (!data.member2.registerNumber?.trim()) {
        throw new Error(
          "Member 2 register number is required."
        );
      }

      if (!data.member2.phone?.trim()) {
        throw new Error(
          "Member 2 phone number is required."
        );
      }

      if (!data.member2.department?.trim()) {
        throw new Error(
          "Member 2 department is required."
        );
      }

      if (!data.member2.year?.trim()) {
        throw new Error(
          "Member 2 year is required."
        );
      }

      if (!data.member2.program) {
        throw new Error(
          "Member 2 program is required."
        );
      }
    }

    /* =================================================
       FIRESTORE DATA
    ================================================= */

    const registrationData: Record<
      string,
      unknown
    > = {
      eventName: data.eventName.trim(),

      eventId: data.eventId,

      section: data.section,

      fee: data.fee,

      /* Common email */

      email: data.email
        .trim()
        .toLowerCase(),

      /* Team */

      teamName:
        data.teamName?.trim() || "",

      /* =================================================
         MEMBER 1
      ================================================= */

      member1Name:
        data.member1.name.trim(),

      member1RegisterNumber:
        data.member1.registerNumber.trim(),

      member1Phone:
        data.member1.phone.trim(),

      member1Department:
        data.member1.department.trim(),

      member1Year:
        data.member1.year.trim(),

      member1Program:
        data.member1.program,

      /* =================================================
         MEMBER 2
      ================================================= */

      member2Name:
        data.member2?.name?.trim() || "",

      member2RegisterNumber:
        data.member2?.registerNumber?.trim() || "",

      member2Phone:
        data.member2?.phone?.trim() || "",

      member2Department:
        data.member2?.department?.trim() || "",

      member2Year:
        data.member2?.year?.trim() || "",

      member2Program:
        data.member2?.program || "",

      /* =================================================
         REGISTRATION INFORMATION
      ================================================= */

      registrationType:
        data.section,

      teamEvent:
        Boolean(data.member2),

      createdAt:
        serverTimestamp(),
    };

    /* =================================================
       SAVE TO FIRESTORE
       Collection: registrations
    ================================================= */

    const documentReference =
      await addDoc(
        collection(db, "registrations"),
        registrationData
      );

    console.log(
      "Registration saved:",
      documentReference.id
    );

    return {
      success: true,
      id: documentReference.id,
    };
  } catch (error) {
    console.error(
      "Registration failed:",
      error
    );

    throw error;
  }
}