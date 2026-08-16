import {
  FormEvent,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiCheckCircle,
  FiLoader,
  FiX,
} from "react-icons/fi";

import {
  registerForNexIt,
  type NexItParticipant,
  type NexItProgram,
  type NexItYear,
} from "../firebase/nexItRegistration";

/* =====================================================
   EVENTS
===================================================== */

const events = [
  {
    id: "poster-design",
    name: "Poster Design",
    team: false,
  },
  {
    id: "paper-presentation",
    name: "Paper Presentation",
    team: true,
  },
  {
    id: "ai-prompting",
    name: "AI Prompting",
    team: false,
  },
  {
    id: "connections",
    name: "Connections",
    team: true,
  },
  {
    id: "cooking-without-fire",
    name: "Cooking Without Fire",
    team: true,
  },
  {
    id: "wealth-out-of-waste",
    name: "Wealth Out of Waste",
    team: true,
  },
];

/* =====================================================
   EMPTY PARTICIPANT
===================================================== */

const emptyParticipant: NexItParticipant = {
  name: "",
  registerNumber: "",
  email: "",
  phone: "",
  department: "",
  year: "",
};

/* =====================================================
   INITIAL FORM
===================================================== */

interface FormData {
  event: string;
  program: NexItProgram | "";
  email: string;

  participant1: NexItParticipant;
  participant2: NexItParticipant;
}

const initialForm: FormData = {
  event: "",
  program: "",
  email: "",

  participant1: {
    ...emptyParticipant,
  },

  participant2: {
    ...emptyParticipant,
  },
};

/* =====================================================
   COMPONENT
===================================================== */

export default function NexIT() {

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState("");

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    form,
    setForm,
  ] = useState<FormData>(
    initialForm
  );

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    showSuccess,
    setShowSuccess,
  ] = useState(false);

  /* =====================================================
     SELECTED EVENT
  ===================================================== */

  const selectedEventData =
    events.find(
      (item) =>
        item.name === selectedEvent
    );

  const isTeamEvent =
    selectedEventData?.team === true;

  /* =====================================================
     OPEN REGISTRATION
  ===================================================== */

  function openRegistration(
    eventName: string
  ) {

    const selected =
      events.find(
        (item) =>
          item.name === eventName
      );

    setSelectedEvent(
      eventName
    );

    setForm({
      ...initialForm,

      event:
        eventName,

      participant1: {
        ...emptyParticipant,
      },

      participant2: {
        ...emptyParticipant,
      },
    });

    setError("");

    setShowForm(true);

    setTimeout(() => {
      document
        .getElementById(
          "nexit-registration"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }

  /* =====================================================
     UPDATE COMMON FIELD
  ===================================================== */

  function updateCommon(
    field:
      | "email"
      | "program",
    value: string
  ) {

    setForm(
      (current) => ({
        ...current,

        [field]:
          value,
      })
    );
  }

  /* =====================================================
     UPDATE PARTICIPANT
  ===================================================== */

  function updateParticipant(
    participant:
      | "participant1"
      | "participant2",
    field:
      keyof NexItParticipant,
    value: string
  ) {

    setForm(
      (current) => ({
        ...current,

        [participant]: {
          ...current[participant],

          [field]:
            value,
        },
      })
    );
  }

  /* =====================================================
     SUBMIT
  ===================================================== */

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (submitting) {
      return;
    }

    setError("");
    setSubmitting(true);

    try {

      /* ===============================================
         VALIDATION
      =============================================== */

      if (!form.event) {
        throw new Error(
          "Please select an event."
        );
      }

      if (!form.email.trim()) {
        throw new Error(
          "Please enter your email."
        );
      }

      if (!form.program) {
        throw new Error(
          "Please select UG or PG."
        );
      }

      if (
        !form.participant1.name.trim()
      ) {
        throw new Error(
          "Please enter Member 1 name."
        );
      }

      if (
        !form.participant1
          .registerNumber
          .trim()
      ) {
        throw new Error(
          "Please enter Member 1 register number."
        );
      }

      if (
        !form.participant1.phone.trim()
      ) {
        throw new Error(
          "Please enter Member 1 phone number."
        );
      }

      if (
        !form.participant1
          .department
          .trim()
      ) {
        throw new Error(
          "Please enter Member 1 department."
        );
      }

      if (!form.participant1.year) {
        throw new Error(
          "Please select Member 1 year."
        );
      }

      /* ===============================================
         TEAM MEMBER 2
      =============================================== */

      if (isTeamEvent) {

        if (
          !form.participant2.name.trim()
        ) {
          throw new Error(
            "Please enter Member 2 name."
          );
        }

        if (
          !form.participant2
            .registerNumber
            .trim()
        ) {
          throw new Error(
            "Please enter Member 2 register number."
          );
        }

        if (
          !form.participant2.phone.trim()
        ) {
          throw new Error(
            "Please enter Member 2 phone number."
          );
        }

        if (
          !form.participant2
            .department
            .trim()
        ) {
          throw new Error(
            "Please enter Member 2 department."
          );
        }

        if (!form.participant2.year) {
          throw new Error(
            "Please select Member 2 year."
          );
        }
      }

      /* ===============================================
         FIREBASE
      =============================================== */

      const participant1: NexItParticipant = {
        ...form.participant1,

        email:
          form.email
            .trim()
            .toLowerCase(),

        year:
          form.participant1.year as NexItYear,
      };

      let participant2:
        | NexItParticipant
        | undefined;

      if (isTeamEvent) {

        participant2 = {
          ...form.participant2,

          email:
            form.email
              .trim()
              .toLowerCase(),

          year:
            form.participant2.year as NexItYear,
        };
      }

      const result =
        await registerForNexIt({

          event:
            form.event,

          email:
            form.email
              .trim()
              .toLowerCase(),

          program:
            form.program as NexItProgram,

          participant1,

          ...(participant2
            ? {
                participant2,
              }
            : {}),
        });

      /* ===============================================
         RESULT
      =============================================== */

      if (!result.success) {

        throw new Error(
          result.error ||
            "Registration failed. Please try again."
        );
      }

      /* ===============================================
         SUCCESS
      =============================================== */

      setShowForm(false);

      setShowSuccess(true);

    } catch (err) {

      console.error(
        "NEX IT registration error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );

    } finally {

      setSubmitting(false);
    }
  }

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <div className="min-h-screen bg-ink-950 text-paper-100">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-neon-blue/10 blur-[100px]" />

          <div className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-neon-purple/10 blur-[100px]" />

          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[100px]" />

        </div>

        <div className="relative mx-auto max-w-6xl text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-neon-cyan">
              INTER-DEPARTMENT FUNCTION
            </p>

            <h1 className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-5xl font-black tracking-wide text-transparent sm:text-7xl">
              NEX IT
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-paper-100/65 sm:text-lg">
              Think. Build. Innovate.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-paper-100/50">
              Participate in exciting technology
              and creative challenges and
              showcase your skills.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-neon-cyan">
              FREE REGISTRATION
            </div>

          </motion.div>

        </div>
      </section>

      {/* =================================================
          EVENTS
      ================================================= */}

      <section className="px-5 pb-24 sm:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-cyan">
              NEX IT
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Events
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {events.map(
              (event, index) => (

                <motion.div
                  key={event.id}

                  initial={{
                    opacity: 0,
                    y: 25,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay:
                      index * 0.05,
                  }}

                  className="group glass-card rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-glow-cyan"
                >

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 text-lg font-bold text-neon-cyan">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </div>

                  <h3 className="min-h-[56px] text-lg font-bold">
                    {event.name}
                  </h3>

                  <p className="mt-2 text-xs text-paper-100/50">
                    {event.team
                      ? "Team Event • 2 Members"
                      : "Individual Event"}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-neon-cyan">
                    FREE REGISTRATION
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      openRegistration(
                        event.name
                      )
                    }
                    className="mt-6 w-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-glow"
                  >
                    Register
                  </button>

                </motion.div>
              )
            )}

          </div>

        </div>
      </section>

      {/* =================================================
          REGISTRATION
      ================================================= */}

      <AnimatePresence>

        {showForm && (

          <motion.section
            id="nexit-registration"

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: 30,
            }}

            className="px-5 pb-24 sm:px-8"
          >

            <div className="mx-auto max-w-4xl">

              <div className="glass-card rounded-3xl border border-white/10 p-6 shadow-glow sm:p-10">

                {/* HEADER */}

                <div className="mb-8">

                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">
                    NEX IT Registration
                  </p>

                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                    {selectedEvent}
                  </h2>

                  <p className="mt-2 text-sm text-paper-100/50">
                    {isTeamEvent
                      ? "Team event — enter details for both members."
                      : "Individual event — enter your details."}
                  </p>

                </div>

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="space-y-8"
                >

                  {/* =================================================
                      EVENT
                  ================================================= */}

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Event
                    </label>

                    <select
                      value={
                        form.event
                      }

                      onChange={(e) =>
                        setForm(
                          (current) => ({
                            ...current,
                            event:
                              e.target.value,
                          })
                        )
                      }

                      required

                      className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-100 outline-none focus:border-neon-cyan/60"
                    >

                      <option value="">
                        Select Event
                      </option>

                      {events.map(
                        (event) => (
                          <option
                            key={
                              event.id
                            }
                            value={
                              event.name
                            }
                          >
                            {event.name}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* =================================================
                      COMMON EMAIL + PROGRAM
                  ================================================= */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    <Input
                      label="Common Email"
                      type="email"
                      value={
                        form.email
                      }
                      required
                      placeholder="Enter common email"
                      onChange={(value) =>
                        updateCommon(
                          "email",
                          value
                        )
                      }
                    />

                    <div>

                      <label className="mb-2 block text-sm font-medium">
                        Program
                        <span className="ml-1 text-red-400">
                          *
                        </span>
                      </label>

                      <select
                        required
                        value={
                          form.program
                        }
                        onChange={(e) =>
                          updateCommon(
                            "program",
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-100 outline-none focus:border-neon-cyan/60"
                      >

                        <option value="">
                          Select Program
                        </option>

                        <option value="UG">
                          UG
                        </option>

                        <option value="PG">
                          PG
                        </option>

                      </select>

                    </div>

                  </div>

                  {/* =================================================
                      MEMBER 1
                  ================================================= */}

                  <ParticipantSection
                    title="Member 1"
                    participant={
                      form.participant1
                    }
                    updateParticipant={
                      updateParticipant
                    }
                    participantKey="participant1"
                  />

                  {/* =================================================
                      MEMBER 2
                  ================================================= */}

                  {isTeamEvent && (

                    <ParticipantSection
                      title="Member 2"
                      participant={
                        form.participant2
                      }
                      updateParticipant={
                        updateParticipant
                      }
                      participantKey="participant2"
                    />

                  )}

                  {/* =================================================
                      ERROR
                  ================================================= */}

                  {error && (

                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">

                      <p className="text-sm text-red-400">
                        {error}
                      </p>

                    </div>

                  )}

                  {/* =================================================
                      BUTTONS
                  ================================================= */}

                  <div className="flex flex-col gap-3 sm:flex-row">

                    <button
                      type="submit"
                      disabled={
                        submitting
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-bold transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {submitting ? (
                        <>
                          <FiLoader className="animate-spin" />
                          Registering...
                        </>
                      ) : (
                        "Submit Registration"
                      )}

                    </button>

                    <button
                      type="button"
                      disabled={
                        submitting
                      }
                      onClick={() => {
                        setShowForm(
                          false
                        );
                        setError("");
                      }}
                      className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-paper-100/70 transition hover:bg-white/5 hover:text-white"
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </motion.section>

        )}

      </AnimatePresence>

      {/* =================================================
          SUCCESS POPUP
      ================================================= */}

      <AnimatePresence>

        {showSuccess && (

          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}
          >

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.85,
                y: 20,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.85,
                y: 20,
              }}

              className="relative w-full max-w-md rounded-3xl border border-neon-cyan/30 bg-ink-900 p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.25)]"
            >

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setShowSuccess(
                    false
                  )
                }
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-paper-100/50 transition hover:bg-white/10 hover:text-white"
              >
                <FiX />
              </button>

              {/* ICON */}

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neon-cyan/10">

                <FiCheckCircle className="text-5xl text-neon-cyan" />

              </div>

              <h2 className="mt-6 text-2xl font-black">
                Registration Successful!
              </h2>

              <p className="mt-3 text-sm leading-6 text-paper-100/60">
                Your NEX IT registration has been successfully submitted.
              </p>

              {/* EVENT */}

              <div className="mt-5 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-4">

                <p className="text-xs uppercase tracking-widest text-neon-cyan/70">
                  Registered Event
                </p>

                <p className="mt-2 font-bold">
                  {selectedEvent}
                </p>

              </div>

              {/* PROGRAM */}

              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">

                <p className="text-[10px] uppercase tracking-widest text-paper-100/40">
                  Program
                </p>

                <p className="mt-1 font-bold text-neon-cyan">
                  {form.program}
                </p>

              </div>

              {/* EMAIL */}

              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">

                <p className="text-[10px] uppercase tracking-widest text-paper-100/40">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-bold text-neon-cyan">
                  {form.email}
                </p>

              </div>

              <p className="mt-5 text-xs text-paper-100/40">
                Your registration details have been saved to Firebase.
              </p>

              <button
                type="button"
                onClick={() => {

                  setShowSuccess(
                    false
                  );

                  setForm(
                    initialForm
                  );

                  setSelectedEvent(
                    ""
                  );

                }}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-bold transition hover:shadow-glow"
              >
                Done
              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

/* =====================================================
   PARTICIPANT SECTION
===================================================== */

function ParticipantSection({
  title,
  participant,
  updateParticipant,
  participantKey,
}: {
  title: string;

  participant:
    NexItParticipant;

  updateParticipant: (
    participant:
      | "participant1"
      | "participant2",
    field:
      keyof NexItParticipant,
    value: string
  ) => void;

  participantKey:
    | "participant1"
    | "participant2";
}) {

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">

      <div className="mb-6">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">
          Participant Details
        </p>

        <h3 className="mt-2 text-xl font-bold">
          {title}
        </h3>

      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        {/* NAME */}

        <Input
          label="Name"
          value={
            participant.name
          }
          required
          placeholder="Enter name"
          onChange={(value) =>
            updateParticipant(
              participantKey,
              "name",
              value
            )
          }
        />

        {/* REGISTER NUMBER */}

        <Input
          label="Register Number"
          value={
            participant.registerNumber
          }
          required
          placeholder="Enter register number"
          onChange={(value) =>
            updateParticipant(
              participantKey,
              "registerNumber",
              value
            )
          }
        />

        {/* PHONE */}

        <Input
          label="Phone Number"
          type="tel"
          value={
            participant.phone
          }
          required
          placeholder="Enter phone number"
          onChange={(value) =>
            updateParticipant(
              participantKey,
              "phone",
              value
            )
          }
        />

        {/* DEPARTMENT */}

        <Input
          label="Department"
          value={
            participant.department
          }
          required
          placeholder="e.g. B.Sc IT"
          onChange={(value) =>
            updateParticipant(
              participantKey,
              "department",
              value
            )
          }
        />

        {/* YEAR */}

        <div>

          <label className="mb-2 block text-sm font-medium">

            Year

            <span className="ml-1 text-red-400">
              *
            </span>

          </label>

          <select
            required
            value={
              participant.year
            }
            onChange={(e) =>
              updateParticipant(
                participantKey,
                "year",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-100 outline-none focus:border-neon-cyan/60"
          >

            <option value="">
              Select Year
            </option>

            <option value="1st Year">
              1st Year
            </option>

            <option value="2nd Year">
              2nd Year
            </option>

            <option value="3rd Year">
              3rd Year
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   INPUT
===================================================== */

function Input({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {

  return (
    <div>

      <label className="mb-2 block text-sm font-medium">

        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={
          placeholder
        }
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper-100 outline-none transition placeholder:text-white/25 focus:border-neon-cyan/60 focus:shadow-glow-cyan"
      />

    </div>
  );
}