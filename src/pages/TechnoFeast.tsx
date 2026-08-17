import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCalendar, FiMapPin } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import CountdownTimer from '../components/CountdownTimer';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { FEAST_VENUE } from '../data/events';

const schedule = [
  { time: '9:00 AM', item: 'Inauguration & Welcome Address' },
  { time: '10:00 AM', item: 'Technical Events Begin — Poster Design, Paper Presentation' },
  { time: '11:00 AM', item: 'Cooking Without Fire' },
  { time: '11:30 AM', item: 'AI Prompt Engineering' },
  { time: '1:00 PM', item: 'Lunch Break' },
  { time: '1:30 PM', item: 'Debugging & Connection' },
  { time: '4:30 PM', item: 'Prize Distribution & Valedictory' },
];

const rules = [
  'Valid college ID card is mandatory for all participants.',
  'Registrations close 24 hours before the event start time.',
  'Spot registrations subject to seat availability.',
  'Decision of judges and coordinators is final and binding.',
  'Any form of malpractice leads to immediate disqualification.',
];

const faqs = [
  { q: 'Is Techno Feast 2026 open to other colleges?', a: 'Yes, students from other institutions are welcome to participate in most events unless stated otherwise.' },
  { q: 'How do I register for multiple events?', a: 'Each event has its own registration form — simply visit the Events page and register separately for each one.' },
  { q: 'Will certificates be provided?', a: 'Yes, all participants receive participation certificates, and winners receive prizes and merit certificates.' },
  { q: 'Is accommodation available?', a: 'Limited accommodation can be arranged on request — please contact the coordinators in advance.' },
];

export default function TechnoFeast() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SEO
        title="Techno Feast 2026 | Dept. of B.Sc. IT, SRCAS"
        description="Techno Feast 2026 — 18 September 2026 at Nava India, Avinashi Road, Peelamedu, Coimbatore. Schedule, rules, venue, coordinators, and prizes for the department's flagship technical festival."
      />
      <Reveal className="text-center">
        <span className="section-eyebrow">18 September 2026 · Nava India, Coimbatore</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">
          <span className="gradient-text">Techno Feast</span> 2026
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-paper-100/65">
          A one-day celebration of technology and creativity hosted by the PG & Research Department Information
          Technology — featuring poster design, paper presentation, AI prompt engineering, debugging, and fun
          non-technical events.
        </p>
        <div className="mt-8 flex justify-center">
          <CountdownTimer />
        </div>
        <div className="mt-8">
          <Link to="/registration" className="btn-glow">Register Now</Link>
        </div>
      </Reveal>

      {/* Venue */}
      <Reveal delay={0.1} className="glass-card mt-16 flex flex-col items-center gap-2 p-8 text-center">
        <FiMapPin className="text-2xl text-neon-purple" />
        <h2 className="font-display text-xl font-bold">Venue</h2>
        <p className="text-sm text-paper-100/65">{FEAST_VENUE}</p>
      </Reveal>

      {/* Schedule */}
      <section className="mt-16">
        <Reveal className="mb-8 text-center">
          <span className="section-eyebrow">Day Plan</span>
          <h2 className="mt-2 font-display text-2xl font-bold">Event Schedule</h2>
        </Reveal>
        <div className="glass-card divide-y divide-white/10 p-2">
          {schedule.map((s, i) => (
            <Reveal key={i} delay={i * 0.05} direction="left" className="flex items-center gap-4 px-5 py-4">
              <FiCalendar className="text-neon-cyan" />
              <span className="w-24 shrink-0 font-mono text-xs text-neon-cyan">{s.time}</span>
              <span className="text-sm text-paper-100/75">{s.item}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="mt-16">
        <Reveal className="mb-8 text-center">
          <span className="section-eyebrow">Read Before You Register</span>
          <h2 className="mt-2 font-display text-2xl font-bold">Rules & Regulations</h2>
        </Reveal>
        <div className="glass-card grid gap-3 p-6 sm:grid-cols-2">
          {rules.map((r, i) => (
            <Reveal key={i} delay={i * 0.05} className="flex gap-3 text-sm text-paper-100/70">
              <span className="text-neon-purple">▹</span> {r}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Prizes */}
      <Reveal className="glass-card mt-16 flex flex-col items-center gap-2 p-10 text-center">
        <h2 className="font-display text-2xl font-bold gradient-text">₹50,000+ in Prizes</h2>
        <p className="text-sm text-paper-100/65">Cash prizes, trophies, and certificates across all events — full breakdown on each event's page.</p>
      </Reveal>

      {/* FAQ */}
      <section className="mt-16">
        <Reveal className="mb-8 text-center">
          <span className="section-eyebrow">Need Help?</span>
          <h2 className="mt-2 font-display text-2xl font-bold">Frequently Asked Questions</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
              >
                {f.q}
                <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }}>
                  <FiChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5"
                  >
                    <p className="pb-4 text-sm text-paper-100/65">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
