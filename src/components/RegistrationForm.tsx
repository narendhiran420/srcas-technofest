import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  FiCheckCircle,
  FiLoader,
  FiX,
} from "react-icons/fi";

import type {
  EventItem,
} from "../data/events";

import {
  submitRegistration,
} from "../firebase/registration";

/* =====================================================
   PROPS
===================================================== */

interface RegistrationFormProps {
  event: EventItem;
}

/* =====================================================
   MEMBER FORM
===================================================== */

interface MemberForm {
  name: string;
  registerNumber: string;
  phone: string;
  department: string;
  year: string;
  program: "UG" | "PG" | "";
}

/* =====================================================
   FORM DATA
===================================================== */

interface FormData {
  email: string;

  teamName: string;

  member1: MemberForm;

  member2: MemberForm;
}

/* =====================================================
   INITIAL MEMBER
===================================================== */

const initialMember: MemberForm = {
  name: "",
  registerNumber: "",
  phone: "",
  department: "",
  year: "",
  program: "",
};

/* =====================================================
   INITIAL FORM
===================================================== */

const initialForm: FormData = {
  email: "",
  teamName: "",
  member1: {
    ...initialMember,
  },
  member2: {
    ...initialMember,
  },
};

/* =====================================================
   COMPONENT
===================================================== */

export default function RegistrationForm({
  event,
}: RegistrationFormProps) {
  const [formData, setFormData] =
    useState<FormData>(
      initialForm
    );

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  /* =================================================
     MEMBER CHANGE
  ================================================= */

  function updateMember(
    member: "member1" | "member2",
    field: keyof MemberForm,
    value: string
  ) {
    setFormData((current) => ({
      ...current,

      [member]: {
        ...current[member],
        [field]: value,
      },
    }));
  }

  /* =================================================
     SUBMIT
  ================================================= */

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      /* =============================================
         COMMON EMAIL
      ============================================= */

      if (!formData.email.trim()) {
        throw new Error(
          "Please enter your email."
        );
      }

      /* =============================================
         MEMBER 1
      ============================================= */

      if (
        !formData.member1.name.trim()
      ) {
        throw new Error(
          "Please enter Member 1 name."
        );
      }

      if (
        !formData.member1.registerNumber.trim()
      ) {
        throw new Error(
          "Please enter Member 1 register number."
        );
      }

      if (
        !formData.member1.phone.trim()
      ) {
        throw new Error(
          "Please enter Member 1 phone number."
        );
      }

      if (
        !formData.member1.department.trim()
      ) {
        throw new Error(
          "Please enter Member 1 department."
        );
      }

      if (
        !formData.member1.year
      ) {
        throw new Error(
          "Please select Member 1 year."
        );
      }

      if (
        !formData.member1.program
      ) {
        throw new Error(
          "Please select Member 1 UG/PG."
        );
      }

      /* =============================================
         MEMBER 2 FOR TEAM EVENT
      ============================================= */

      let member2;

      if (event.teamEvent) {
        if (!formData.teamName.trim()) {
          throw new Error(
            "Please enter team name."
          );
        }

        if (
          !formData.member2.name.trim()
        ) {
          throw new Error(
            "Please enter Member 2 name."
          );
        }

        if (
          !formData.member2.registerNumber.trim()
        ) {
          throw new Error(
            "Please enter Member 2 register number."
          );
        }

        if (
          !formData.member2.phone.trim()
        ) {
          throw new Error(
            "Please enter Member 2 phone number."
          );
        }

        if (
          !formData.member2.department.trim()
        ) {
          throw new Error(
            "Please enter Member 2 department."
          );
        }

        if (
          !formData.member2.year
        ) {
          throw new Error(
            "Please select Member 2 year."
          );
        }

        if (
          !formData.member2.program
        ) {
          throw new Error(
            "Please select Member 2 UG/PG."
          );
        }

        member2 = {
          name:
            formData.member2.name,

          registerNumber:
            formData.member2
              .registerNumber,

          phone:
            formData.member2.phone,

          department:
            formData.member2
              .department,

          year:
            formData.member2.year,

          program:
            formData.member2
              .program as "UG" | "PG",
        };
      }

      /* =============================================
         FIREBASE
      ============================================= */

      await submitRegistration({
        eventName: event.name,

        eventId: event.id,

        section: event.section,

        fee: event.fee,

        email:
          formData.email,

        teamName:
          event.teamEvent
            ? formData.teamName
            : "",

        member1: {
          name:
            formData.member1.name,

          registerNumber:
            formData.member1
              .registerNumber,

          phone:
            formData.member1.phone,

          department:
            formData.member1
              .department,

          year:
            formData.member1.year,

          program:
            formData.member1
              .program as "UG" | "PG",
        },

        member2,
      });

      setSuccess(true);

      setMessage(
        "Registration submitted successfully!"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =================================================
     RENDER
  ================================================= */

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="glass-card rounded-3xl border border-white/10 p-6 shadow-glow sm:p-10"
      >
        {/* ===========================================
            EVENT
        =========================================== */}

        <div className="mb-8 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-5">
          <p className="text-xs uppercase tracking-widest text-paper-100/50">
            Selected Event
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {event.name}
          </h2>

          <p className="mt-2 text-sm text-neon-cyan">
            {event.fee}
          </p>
        </div>

        {/* ===========================================
            COMMON EMAIL
        =========================================== */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Common Email ID
            <span className="ml-1 text-red-400">
              *
            </span>
          </label>

          <input
            type="email"
            value={formData.email}
            required
            onChange={(e) =>
              setFormData(
                (current) => ({
                  ...current,
                  email:
                    e.target.value,
                })
              )
            }
            placeholder="Enter common email ID"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-neon-cyan"
          />

          <p className="mt-2 text-xs text-paper-100/40">
            This email will be used for the entire registration.
          </p>
        </div>

        {/* ===========================================
            TEAM NAME
        =========================================== */}

        {event.teamEvent && (
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">
              Team Name
              <span className="ml-1 text-red-400">
                *
              </span>
            </label>

            <input
              type="text"
              value={formData.teamName}
              required
              onChange={(e) =>
                setFormData(
                  (current) => ({
                    ...current,
                    teamName:
                      e.target.value,
                  })
                )
              }
              placeholder="Enter team name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-neon-cyan"
            />
          </div>
        )}

        {/* ===========================================
            MEMBER 1
        =========================================== */}

        <MemberSection
          title="Member 1"
          member={formData.member1}
          onChange={(field, value) =>
            updateMember(
              "member1",
              field,
              value
            )
          }
        />

        {/* ===========================================
            MEMBER 2
        =========================================== */}

        {event.teamEvent && (
          <MemberSection
            title="Member 2"
            member={formData.member2}
            onChange={(field, value) =>
              updateMember(
                "member2",
                field,
                value
              )
            }
          />
        )}

        {/* ===========================================
            MESSAGE
        =========================================== */}

        {message && (
          <div
            className={`mb-5 rounded-xl border p-4 text-sm ${
              success
                ? "border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan"
                : "border-red-500/20 bg-red-500/5 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* ===========================================
            SUBMIT
        =========================================== */}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-4 font-bold transition hover:scale-[1.01] hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Registering...
            </>
          ) : (
            "Register Now"
          )}
        </button>
      </motion.form>

      {/* =============================================
          SUCCESS POPUP
      ============================================= */}

      {success && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="relative w-full max-w-md rounded-3xl border border-neon-cyan/30 bg-ink-900 p-8 text-center shadow-glow"
          >
            <button
              type="button"
              onClick={() =>
                setSuccess(false)
              }
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
            >
              <FiX />
            </button>

            <FiCheckCircle className="mx-auto text-6xl text-neon-cyan" />

            <h2 className="mt-5 text-2xl font-black">
              Registration Successful!
            </h2>

            <p className="mt-3 text-sm text-paper-100/60">
              Your registration has been successfully saved.
            </p>

            <p className="mt-5 font-bold text-neon-cyan">
              {event.name}
            </p>

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setFormData(
                  initialForm
                );
                setMessage("");
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-5 py-3 font-bold"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}

/* =====================================================
   MEMBER SECTION
===================================================== */

function MemberSection({
  title,
  member,
  onChange,
}: {
  title: string;
  member: MemberForm;
  onChange: (
    field: keyof MemberForm,
    value: string
  ) => void;
}) {
  return (
    <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <h3 className="mb-6 text-xl font-bold text-neon-cyan">
        {title}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* NAME */}

        <Input
          label="Name"
          value={member.name}
          required
          placeholder={`Enter ${title} name`}
          onChange={(value) =>
            onChange(
              "name",
              value
            )
          }
        />

        {/* REGISTER NUMBER */}

        <Input
          label="Register Number"
          value={
            member.registerNumber
          }
          required
          placeholder="Enter register number"
          onChange={(value) =>
            onChange(
              "registerNumber",
              value
            )
          }
        />

        {/* PHONE */}

        <Input
          label="Phone Number"
          type="tel"
          value={member.phone}
          required
          placeholder="Enter phone number"
          onChange={(value) =>
            onChange(
              "phone",
              value
            )
          }
        />

        {/* DEPARTMENT */}

        <Input
          label="Department"
          value={
            member.department
          }
          required
          placeholder="e.g. B.Sc IT"
          onChange={(value) =>
            onChange(
              "department",
              value
            )
          }
        />

        {/* PROGRAM */}

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
              member.program
            }
            onChange={(e) =>
              onChange(
                "program",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 outline-none focus:border-neon-cyan"
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
            value={member.year}
            onChange={(e) =>
              onChange(
                "year",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 outline-none focus:border-neon-cyan"
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
        placeholder={placeholder}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/25 focus:border-neon-cyan"
      />
    </div>
  );
}