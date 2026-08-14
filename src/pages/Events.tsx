import { useState } from 'react';
import Reveal from '../components/Reveal';
import EventCard from '../components/EventCard';
import SEO from '../components/SEO';
import { events } from '../data/events';

const categories = ['All', 'Technical', 'Non-Technical'] as const;

export default function Events() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const filtered = filter === 'All' ? events : events.filter((e) => e.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SEO
        title="Events | Techno Feast 2026 — Dept. of B.Sc. IT, SRCAS"
        description="Browse all Techno Feast 2026 events — technical and non-technical — and register individually for each one."
      />
      <Reveal className="text-center">
        <span className="section-eyebrow">Techno Feast 2026</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Event Gallery</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-paper-100/65">
          Explore every event, and register individually — each event has its own dedicated registration form.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
              filter === c ? 'bg-aurora text-white shadow-glow' : 'border border-white/15 text-paper-100/70 hover:border-neon-cyan/60'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ev, i) => (
          <EventCard key={ev.id} event={ev} index={i} />
        ))}
      </div>
    </div>
  );
}
