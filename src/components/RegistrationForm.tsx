import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiCheckCircle } from 'react-icons/fi';

import { EventItem } from '../data/events';
import { submitRegistration } from '../firebase/registrations';
import { sendConfirmationEmail } from '../utils/emailjs';

interface FormState {
  fullName: string;
  registerNumber: string;
  department: string;
  year: string;
  collegeName: string;
  mobile: string;
  email: string;
  teamName: string;
  teamMembers: string;
}

const initialState: FormState = {
  fullName: '',
  registerNumber: '',
  department: '',
  year: '',
  collegeName: '',
  mobile: '',
  email: '',
  teamName: '',
  teamMembers: '',
};

export default function RegistrationForm({
  event,
}: {
  event: EventItem;
}) {
  const [form, setForm] = useState<FormState>(initialState);

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const [error, setError] = useState('');

  function update<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (status === 'submitting') {
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      // Save registration to Firebase
      await submitRegistration({
        fullName: form.fullName,
        registerNumber: form.registerNumber,
        department: form.department,
        year: form.year,
        collegeName: form.collegeName,
        mobile: form.mobile,
        email: form.email,
        teamName: form.teamName,
        teamMembers: form.teamMembers,
        eventName: event.name,
        eventId: event.id,
      });

      // Email is optional.
      // Registration remains successful even if EmailJS fails.
      try {
        await sendConfirmationEmail({
          to_name: form.fullName,
          to_email: form.email,
          event_name: event.name,
        });
      } catch (emailError) {
        console.warn(
          'Confirmation email failed:',
          emailError
        );
      }

      setForm(initialState);
      setStatus('success');
    } catch (firebaseError) {
      console.error(
        'Registration failed:',
        firebaseError
      );

      setError(
        'Registration failed. Please try again.'
      );

      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="glass-card flex flex-col items-center gap-4 p-10 text-center"
      >
        <FiCheckCircle
          className="text-5xl text-neon-cyan"
        />

        <h2 className="text-2xl font-bold">
          Registration Successful!
        </h2>

        <p className="text-paper-100/70">
          You're registered for{' '}
          <strong>{event.name}</strong>.
        </p>

        <p className="text-sm text-paper-100/60">
          Thank you for registering for Techno Feast
          2026!
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setError('');
          }}
          className="btn-outline mt-3 text-xs"
        >
          Register Another Participant
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 sm:grid-cols-2"
    >
      {/* EVENT */}

      <div className="sm:col-span-2">
        <p className="mb-1 text-xs font-medium text-paper-100/60">
          Event
        </p>

        <h2 className="mb-5 text-xl font-semibold">
          {event.name}
        </h2>
      </div>

      {/* FULL NAME */}

      <Field
        label="Full Name"
        required
        value={form.fullName}
        onChange={(value) =>
          update('fullName', value)
        }
      />

      {/* REGISTER NUMBER */}

      <Field
        label="Register Number"
        required
        value={form.registerNumber}
        onChange={(value) =>
          update('registerNumber', value)
        }
      />

      {/* DEPARTMENT */}

      <Field
        label="Department"
        required
        value={form.department}
        onChange={(value) =>
          update('department', value)
        }
      />

      {/* YEAR */}

      <Field
        label="Year"
        required
        placeholder="e.g. II Year"
        value={form.year}
        onChange={(value) =>
          update('year', value)
        }
      />

      {/* COLLEGE */}

      <Field
        label="College Name"
        required
        value={form.collegeName}
        onChange={(value) =>
          update('collegeName', value)
        }
      />

      {/* MOBILE */}

      <Field
        label="Mobile Number"
        required
        type="tel"
        value={form.mobile}
        onChange={(value) =>
          update('mobile', value)
        }
      />

      {/* EMAIL */}

      <Field
        label="Email Address"
        required
        type="email"
        value={form.email}
        className="sm:col-span-2"
        onChange={(value) =>
          update('email', value)
        }
      />

      {/* TEAM */}

      {event.teamEvent && (
        <>
          <Field
            label="Team Name"
            value={form.teamName}
            onChange={(value) =>
              update('teamName', value)
            }
          />

          <Field
            label="Team Members"
            value={form.teamMembers}
            placeholder="Comma-separated names"
            onChange={(value) =>
              update('teamMembers', value)
            }
          />
        </>
      )}

      {/* ERROR */}

      {status === 'error' && (
        <div className="sm:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-glow sm:col-span-2 flex w-full items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <FiLoader className="animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Registration'
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  type = 'text',
  placeholder,
  className = '',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-paper-100/70">
        {label}

        {required && (
          <span className="text-red-400">
            {' '}
            *
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
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper-100 outline-none transition focus:border-neon-cyan/60 focus:shadow-glow-cyan"
      />
    </div>
  );
}