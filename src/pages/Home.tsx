import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import ParticlesBackground from '../components/ParticlesBackground';
import CountdownTimer from '../components/CountdownTimer';
import Reveal from '../components/Reveal';
import StatCounter from '../components/StatCounter';
import EventCard from '../components/EventCard';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import VisitorCounter from '../components/VisitorCounter';
import { events } from '../data/events';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <SEO
        title="Department of B.Sc. Information Technology — SRCAS Coimbatore"
        description="Official website of the Department of B.Sc. Information Technology, Sri Ramakrishna College of Arts and Science, Coimbatore. Techno Feast 2026 on 18 September 2026."
      />
      {/* HERO */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <ParticlesBackground />
        <div className="absolute inset-0 -z-20 bg-grid-glow" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-4"
        >
          <img src="/assets/logo-college.png" alt="SRCAS College Logo" className="h-14 w-14 rounded-full object-contain bg-white/10 p-1" />
          <span className="h-8 w-px bg-white/20" />
          <img src="/assets/logo-department.png" alt="Department of B.Sc. IT Logo" className="h-14 w-14 rounded-full object-contain bg-white/10 p-1" />
        </motion.div>

        <Reveal>
          <span className="section-eyebrow">Sri Ramakrishna College of Arts and Science, Coimbatore</span>
        </Reveal>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-4 max-w-4xl font-display text-3xl font-black leading-tight sm:text-5xl lg:text-6xl"
        >
          Department of <span className="gradient-text">B.Sc. Information</span> Technology
        </motion.h1>

        <Reveal delay={0.3}>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-paper-100/60 sm:text-base">
            Official Department Website
          </p>
        </Reveal>

        <Reveal delay={0.4} className="mt-8">
          <div className="glass-card inline-flex flex-col items-center gap-4 px-8 py-6">
            <p className="flex items-center gap-2 font-display text-lg font-bold sm:text-xl">
              <FiCalendar className="text-neon-cyan" /> TECHNO FEAST 2026 · 18 September 2026
            </p>
            <CountdownTimer />
          </div>
        </Reveal>

        <Reveal delay={0.55} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <MagneticButton className="btn-glow" onClick={() => navigate('/registration')}>
            Register Now <FiArrowRight />
          </MagneticButton>
          <MagneticButton className="btn-outline" onClick={() => navigate('/events')}>
            Explore Events
          </MagneticButton>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCounter value={6} suffix="+" label="Events" />
          <StatCounter value={1500} suffix="+" label="Students Expected" />
          <StatCounter value={20} suffix="+" label="Coordinators" />
        </div>
        <div className="mt-6 flex justify-center">
          <VisitorCounter />
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal className="mb-10 flex flex-col items-center text-center">
          <span className="section-eyebrow">What's on</span>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Featured Events</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((ev, i) => (
            <EventCard key={ev.id} event={ev} index={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/events" className="btn-outline">
            View All Events <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
