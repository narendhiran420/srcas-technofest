import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';
import type { EventItem } from '../data/events';

interface RegistrationFormProps {
  event: EventItem;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  teamName: string;
  member2: string;
  member3: string;
}

export default function RegistrationForm({
  event,
}: RegistrationFormProps) {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    teamName: '',
    member2: '',
    member3: '',
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      /*
       * Keep your existing Firebase registration
       * logic here if you already have it.
       */

      console.log('Registration:', {
        event: event.name,
        ...formData,
      });

      setMessage(
        'Registration submitted successfully!'
      );

      setFormData({
        name: '',
        email: '',
        phone: '',
        college: '',
        department: '',
        year: '',
        teamName: '',
        member2: '',
        member3: '',
      });
    } catch (error) {
      console.error(error);

      setMessage(
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 sm:p-8"
    >

      {/* EVENT */}
      <div className="mb-8 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5">

        <p className="text-xs uppercase tracking-wider text-paper-100/50">
          Selected Event
        </p>

        <h2 className="mt-1 font-display text-xl font-bold">
          {event.name}
        </h2>

        <p className="mt-2 text-sm text-neon-cyan">
          {event.fee}
        </p>

      </div>

      {/* NAME */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
          placeholder="Enter your name"
        />
      </div>

      {/* EMAIL */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
          placeholder="Enter your email"
        />
      </div>

      {/* PHONE */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
          placeholder="Enter your phone number"
        />
      </div>

      {/* COLLEGE */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          College Name
        </label>

        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
          placeholder="Enter your college name"
        />
      </div>

      {/* DEPARTMENT */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Department
        </label>

        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
          placeholder="Enter your department"
        />
      </div>

      {/* YEAR */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Year
        </label>

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
        >
          <option value="">
            Select Year
          </option>

          <option value="I Year">
            I Year
          </option>

          <option value="II Year">
            II Year
          </option>

          <option value="III Year">
            III Year
          </option>
        </select>
      </div>

      {/* TEAM */}
      {event.teamEvent && (
        <>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Team Name
            </label>

            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
              placeholder="Enter team name"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Member 2
            </label>

            <input
              type="text"
              name="member2"
              value={formData.member2}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
              placeholder="Member 2 name"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">
              Member 3
            </label>

            <input
              type="text"
              name="member3"
              value={formData.member3}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-neon-cyan"
              placeholder="Member 3 name"
            />
          </div>
        </>
      )}

      {/* MESSAGE */}
      {message && (
        <div className="mb-5 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 p-4 text-sm text-neon-cyan">
          {message}
        </div>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-neon-cyan px-6 py-3 font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin" />
            Submitting...
          </>
        ) : (
          'Register Now'
        )}
      </button>

    </motion.form>
  );
}