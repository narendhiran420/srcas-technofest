import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";

/* =====================================================
   TYPES
===================================================== */

export type NexItYear =
  | "1st Year"
  | "2nd Year"
  | "3rd Year";

export type NexItProgram =
  | "UG"
  | "PG";

/* =====================================================
   PARTICIPANT
===================================================== */

export interface NexItParticipant {
  name: string;
  registerNumber: string;
  email: string;
  phone: string;
  department: string;
  year: NexItYear | "";
}

/* =====================================================
   REGISTRATION
===================================================== */

export interface NexItRegistrationData {
  event: string;

  /* Common email */
  email: string;

  program: NexItProgram;

  participant1: NexItParticipant;

  participant2?: NexItParticipant;
}

/* =====================================================
   TEAM EVENTS
===================================================== */

export const NEX_IT_TEAM_EVENTS = [
  "Paper Presentation",
  "Connections",
  "Cooking Without Fire",
  "Wealth Out of Waste",
] as const;

/* =====================================================
   INDIVIDUAL EVENTS
===================================================== */

export const NEX_IT_INDIVIDUAL_EVENTS = [
  "Poster Design",
  "AI Prompting",
] as const;

/* =====================================================
   REGISTER NEX IT
===================================================== */

export async function registerForNexIt(
  data: NexItRegistrationData
) {
  try {
    /* =================================================
       BASIC VALIDATION
    ================================================= */

    if (!data.event?.trim()) {
      throw new Error(
        "Please select an event."
      );
    }

    if (!data.email?.trim()) {
      throw new Error(
        "Please enter your email."
      );
    }

    if (!data.program) {
      throw new Error(
        "Please select UG or PG."
      );
    }

    if (!data.participant1) {
      throw new Error(
        "Participant 1 details are required."
      );
    }

    /* =================================================
       EVENT
    ================================================= */

    const eventName =
      data.event.trim();

    const isTeamEvent =
      NEX_IT_TEAM_EVENTS.includes(
        eventName as
          (typeof NEX_IT_TEAM_EVENTS)[number]
      );

    const isIndividualEvent =
      NEX_IT_INDIVIDUAL_EVENTS.includes(
        eventName as
          (typeof NEX_IT_INDIVIDUAL_EVENTS)[number]
      );

    if (
      !isTeamEvent &&
      !isIndividualEvent
    ) {
      throw new Error(
        "Invalid NEX IT event selected."
      );
    }

    /* =================================================
       COMMON EMAIL
    ================================================= */

    const commonEmail =
      data.email
        .trim()
        .toLowerCase();

    /* =================================================
       PARTICIPANT 1
    ================================================= */

    validateParticipant(
      data.participant1,
      "Member 1"
    );

    /* =================================================
       PARTICIPANT 2
    ================================================= */

    if (isTeamEvent) {
      if (!data.participant2) {
        throw new Error(
          "Member 2 details are required for this team event."
        );
      }

      validateParticipant(
        data.participant2,
        "Member 2"
      );
    }

    /* =================================================
       FIRESTORE DATA
    ================================================= */

    const registrationData = {
      /* =================================================
         BASIC
      ================================================= */

      registrationType:
        "NEX IT",

      registrationFee:
        "FREE",

      event:
        eventName,

      teamEvent:
        isTeamEvent,

      teamSize:
        isTeamEvent ? 2 : 1,

      /* =================================================
         COMMON EMAIL
      ================================================= */

      email:
        commonEmail,

      /* =================================================
         PROGRAM
      ================================================= */

      program:
        data.program,

      /* =================================================
         MEMBER 1
      ================================================= */

      member1Name:
        data.participant1.name.trim(),

      member1RegisterNumber:
        data.participant1.registerNumber.trim(),

      member1Phone:
        data.participant1.phone.trim(),

      member1Department:
        data.participant1.department.trim(),

      member1Year:
        data.participant1.year,

      /* =================================================
         MEMBER 2
      ================================================= */

      member2Name:
        isTeamEvent &&
        data.participant2
          ? data.participant2.name.trim()
          : "",

      member2RegisterNumber:
        isTeamEvent &&
        data.participant2
          ? data.participant2.registerNumber.trim()
          : "",

      member2Phone:
        isTeamEvent &&
        data.participant2
          ? data.participant2.phone.trim()
          : "",

      member2Department:
        isTeamEvent &&
        data.participant2
          ? data.participant2.department.trim()
          : "",

      member2Year:
        isTeamEvent &&
        data.participant2
          ? data.participant2.year
          : "",

      /* =================================================
         NESTED MEMBER 1
      ================================================= */

      participant1: {
        name:
          data.participant1.name.trim(),

        registerNumber:
          data.participant1.registerNumber.trim(),

        email:
          commonEmail,

        phone:
          data.participant1.phone.trim(),

        department:
          data.participant1.department.trim(),

        year:
          data.participant1.year,
      },

      /* =================================================
         NESTED MEMBER 2
      ================================================= */

      participant2:
        isTeamEvent &&
        data.participant2
          ? {
              name:
                data.participant2.name.trim(),

              registerNumber:
                data.participant2
                  .registerNumber.trim(),

              email:
                commonEmail,

              phone:
                data.participant2.phone.trim(),

              department:
                data.participant2
                  .department.trim(),

              year:
                data.participant2.year,
            }
          : null,

      /* =================================================
         STUDY LEVEL
      ================================================= */

      member1StudyLevel:
        `${data.program} ${data.participant1.year}`,

      member2StudyLevel:
        isTeamEvent &&
        data.participant2
          ? `${data.program} ${data.participant2.year}`
          : "",

      /* =================================================
         TIMESTAMP
      ================================================= */

      createdAt:
        serverTimestamp(),
    };

    /* =================================================
       FIRESTORE COLLECTION
    ================================================= */

    const docRef =
      await addDoc(
        collection(
          db,
          "nexItRegistrations"
        ),
        registrationData
      );

    console.log(
      "NEX IT registration saved:",
      docRef.id
    );

    return {
      success: true,
      id: docRef.id,
      error: "",
    };

  } catch (error) {

    console.error(
      "NEX IT registration error:",
      error
    );

    return {
      success: false,
      id: null,
      error:
        error instanceof Error
          ? error.message
          : "Registration failed.",
    };
  }
}

/* =====================================================
   PARTICIPANT VALIDATION
===================================================== */

function validateParticipant(
  participant: NexItParticipant,
  label: string
) {
  if (!participant.name?.trim()) {
    throw new Error(
      `${label}: Name is required.`
    );
  }

  if (
    !participant.registerNumber?.trim()
  ) {
    throw new Error(
      `${label}: Register number is required.`
    );
  }

  if (!participant.phone?.trim()) {
    throw new Error(
      `${label}: Phone number is required.`
    );
  }

  if (
    !participant.department?.trim()
  ) {
    throw new Error(
      `${label}: Department is required.`
    );
  }

  if (!participant.year) {
    throw new Error(
      `${label}: Year is required.`
    );
  }
}