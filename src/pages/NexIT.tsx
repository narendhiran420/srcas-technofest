import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiLoader, FiX } from "react-icons/fi";
import { registerForNexIt } from "../firebase/nexItRegistration";

/* =====================================================
   NEX IT EVENTS
===================================================== */

const events = [
  {
    id: "poster-design",
    name: "Poster Design",
  },
  {
    id: "paper-presentation",
    name: "Paper Presentation",
  },
  {
    id: "debugging",
    name: "Debugging",
  },
  {
    id: "ai-prompting",
    name: "AI Prompting",
  },
  {
    id: "connection",
    name: "Connection",
  },
  {
    id: "cooking-without-fire",
    name: "Cooking Without Fire",
  },
  {
    id: "wealth-out-of-waste",
    name: "Wealth Out of Waste",
  },
  {
    id: "fake-virus-detection",
    name: "Fake Virus Detection",
  },
];

/* =====================================================
   FORM DATA
===================================================== */

interface FormData {
  name: string;
  registerNumber: string;
  email: string;
  phone: string;
  department: string;

  /* NEW */
  program: "UG" | "PG" | "";
  year: string;

  event: string;
}

const initialForm: FormData = {
  name: "",
  registerNumber: "",
  email: "",
  phone: "",
  department: "",
  program: "",
  year: "",
  event: "",
};

/* =====================================================
   COMPONENT
===================================================== */

export default function NexIT() {
  const [selectedEvent, setSelectedEvent] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] =
    useState<FormData>(initialForm);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showSuccess, setShowSuccess] =
    useState(false);

  /* =====================================================
     OPEN REGISTRATION
  ===================================================== */

  function openRegistration(eventName: string) {
    setSelectedEvent(eventName);

    setForm({
      ...initialForm,
      event: eventName,
    });

    setError("");
    setShowForm(true);

    setTimeout(() => {
      document
        .getElementById("nexit-registration")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }

  /* =====================================================
     UPDATE FIELD
  ===================================================== */

  function updateField(
    field: keyof FormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
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
      /* -----------------------------------------------
         VALIDATION
      ------------------------------------------------ */

      if (!form.program) {
        throw new Error(
          "Please select UG or PG."
        );
      }

      if (!form.year) {
        throw new Error(
          "Please select your year."
        );
      }

      /* -----------------------------------------------
         FIREBASE
      ------------------------------------------------ */

      const result =
        await registerForNexIt({
          name: form.name,
          registerNumber:
            form.registerNumber,
          email: form.email,
          phone: form.phone,
          department:
            form.department,
          program: form.program,
          year: form.year,
          event: form.event,
        });

      if (!result.success) {
        throw new Error(
          "Registration failed"
        );
      }

      /* -----------------------------------------------
         SUCCESS
      ------------------------------------------------ */

      setShowForm(false);

      setShowSuccess(true);

      setForm(initialForm);

    } catch (error) {
      console.error(
        "NEX IT registration error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

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
              Techno Feast 2026
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

          </motion.div>

        </div>
      </section>

      {/* =================================================
          EVENTS
      ================================================= */}

      <section className="px-5 pb-24 sm:px-8">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mb-10 text-center"
          >

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neon-cyan">
              NEX IT
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Events
            </h2>

          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

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
                    delay: index * 0.05,
                  }}
                  className="group glass-card rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-glow-cyan"
                >

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 text-lg font-bold text-neon-cyan">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <h3 className="min-h-[56px] text-lg font-bold">
                    {event.name}
                  </h3>

                  <p className="mt-2 text-xs text-paper-100/50">
                    NEX IT Event
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
          REGISTRATION FORM
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

            <div className="mx-auto max-w-3xl">

              <div className="glass-card rounded-3xl border border-white/10 p-6 shadow-glow sm:p-10">

                {/* FORM HEADER */}

                <div className="mb-8">

                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan">
                    NEX IT Registration
                  </p>

                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                    {selectedEvent}
                  </h2>

                  <p className="mt-2 text-sm text-paper-100/50">
                    Fill in your details to register.
                  </p>

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="grid gap-5 sm:grid-cols-2"
                >

                  {/* FULL NAME */}

                  <Field
                    label="Full Name"
                    required
                    value={form.name}
                    onChange={(value) =>
                      updateField(
                        "name",
                        value
                      )
                    }
                  />

                  {/* REGISTER NUMBER */}

                  <Field
                    label="Register Number"
                    required
                    value={
                      form.registerNumber
                    }
                    onChange={(value) =>
                      updateField(
                        "registerNumber",
                        value
                      )
                    }
                  />

                  {/* EMAIL */}

                  <Field
                    label="Email Address"
                    type="email"
                    required
                    value={form.email}
                    onChange={(value) =>
                      updateField(
                        "email",
                        value
                      )
                    }
                  />

                  {/* PHONE */}

                  <Field
                    label="Mobile Number"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(value) =>
                      updateField(
                        "phone",
                        value
                      )
                    }
                  />

                  {/* DEPARTMENT */}

                  <Field
                    label="Department"
                    required
                    value={
                      form.department
                    }
                    placeholder="e.g. B.Sc IT"
                    onChange={(value) =>
                      updateField(
                        "department",
                        value
                      )
                    }
                  />

                  {/* =================================================
                      PROGRAM — UG / PG
                  ================================================= */}

                  <div>

                    <label className="mb-1 block text-xs font-medium text-paper-100/70">

                      Program

                      <span className="text-red-400">
                        {" "}*
                      </span>

                    </label>

                    <select
                      required
                      value={form.program}
                      onChange={(e) => {

                        updateField(
                          "program",
                          e.target.value
                        );

                        /* Reset year when program changes */

                        updateField(
                          "year",
                          ""
                        );
                      }}
                      className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-100 outline-none transition focus:border-neon-cyan/60 focus:shadow-glow-cyan"
                    >

                      <option
                        value=""
                        className="bg-ink-800"
                      >
                        Select Program
                      </option>

                      <option
                        value="UG"
                        className="bg-ink-800"
                      >
                        UG
                      </option>

                      <option
                        value="PG"
                        className="bg-ink-800"
                      >
                        PG
                      </option>

                    </select>

                  </div>

                  {/* =================================================
                      YEAR
                  ================================================= */}

                  <div>

                    <label className="mb-1 block text-xs font-medium text-paper-100/70">

                      Year

                      <span className="text-red-400">
                        {" "}*
                      </span>

                    </label>

                    <select
                      required
                      value={form.year}
                      disabled={!form.program}
                      onChange={(e) =>
                        updateField(
                          "year",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-100 outline-none transition focus:border-neon-cyan/60 focus:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      <option
                        value=""
                        className="bg-ink-800"
                      >
                        {form.program
                          ? "Select Year"
                          : "Select Program First"}
                      </option>

                      {/* UG */}

                      {form.program === "UG" && (
                        <>
                          <option
                            value="1st Year"
                            className="bg-ink-800"
                          >
                            1st Year
                          </option>

                          <option
                            value="2nd Year"
                            className="bg-ink-800"
                          >
                            2nd Year
                          </option>

                          <option
                            value="3rd Year"
                            className="bg-ink-800"
                          >
                            3rd Year
                          </option>
                        </>
                      )}

                      {/* PG */}

                      {form.program === "PG" && (
                        <>
                          <option
                            value="1st Year"
                            className="bg-ink-800"
                          >
                            1st Year
                          </option>

                          <option
                            value="2nd Year"
                            className="bg-ink-800"
                          >
                            2nd Year
                          </option>
                        </>
                      )}

                    </select>

                  </div>

                  {/* EVENT */}

                  <div className="sm:col-span-2">

                    <label className="mb-1 block text-xs font-medium text-paper-100/70">
                      Event
                    </label>

                    <select
                      required
                      value={form.event}
                      onChange={(e) =>
                        updateField(
                          "event",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-100 outline-none focus:border-neon-cyan/60"
                    >

                      <option
                        value=""
                        className="bg-ink-800"
                      >
                        Select Event
                      </option>

                      {events.map(
                        (event) => (

                          <option
                            key={event.id}
                            value={event.name}
                            className="bg-ink-800"
                          >
                            {event.name}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                  {/* ERROR */}

                  {error && (

                    <div className="sm:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4">

                      <p className="text-sm text-red-400">
                        {error}
                      </p>

                    </div>

                  )}

                  {/* BUTTONS */}

                  <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row">

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-bold transition-all hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
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
                      disabled={submitting}
                      onClick={() => {
                        setShowForm(false);
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
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
              className="relative w-full max-w-md rounded-3xl border border-neon-cyan/30 bg-ink-900 p-8 text-center shadow-[0_0_80px_rgba(34,211,238,0.25)]"
            >

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setShowSuccess(false)
                }
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-paper-100/50 transition hover:bg-white/10 hover:text-white"
              >
                <FiX />
              </button>

              {/* SUCCESS ICON */}

              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neon-cyan/10"
              >

                <FiCheckCircle className="text-5xl text-neon-cyan" />

              </motion.div>

              <h2 className="mt-6 text-2xl font-black">
                Registration Successful!
              </h2>

              <p className="mt-3 text-sm leading-6 text-paper-100/60">
                Your NEX IT registration has
                been successfully submitted.
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

              {/* PROGRAM + YEAR */}

              <div className="mt-3 grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">

                  <p className="text-[10px] uppercase tracking-widest text-paper-100/40">
                    Program
                  </p>

                  <p className="mt-1 font-bold text-neon-cyan">
                    {form.program || "Saved"}
                  </p>

                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">

                  <p className="text-[10px] uppercase tracking-widest text-paper-100/40">
                    Year
                  </p>

                  <p className="mt-1 font-bold text-neon-cyan">
                    {form.year || "Saved"}
                  </p>

                </div>

              </div>

              <p className="mt-5 text-xs text-paper-100/40">
                Your registration details have
                been saved to Firebase.
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowSuccess(false)
                }
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

/* =========================================================
   FIELD COMPONENT
========================================================= */

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-1 block text-xs font-medium text-paper-100/70">

        {label}

        {required && (
          <span className="text-red-400">
            {" "}*
          </span>
        )}

      </label>

      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper-100 outline-none transition placeholder:text-white/25 focus:border-neon-cyan/60 focus:shadow-glow-cyan"
      />

    </div>
  );
}