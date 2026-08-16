import { useState } from 'react';

import Reveal from '../components/Reveal';
import EventCard from '../components/EventCard';
import SEO from '../components/SEO';
import { technoFeastEvents } from '../data/events';

const categories = [
  'All',
  'Technical',
  'Non-Technical',
] as const;

export default function Events() {
  const [filter, setFilter] =
    useState<(typeof categories)[number]>('All');

  const filteredEvents =
    filter === 'All'
      ? technoFeastEvents
      : technoFeastEvents.filter(
          (event) => event.category === filter
        );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">

      <SEO
        title="Events | Techno Feast 2026 — Dept. of B.Sc. IT, SRCAS"
        description="Explore Techno Feast 2026 technical and non-technical events."
      />

      {/* PAGE HEADER */}
      <Reveal className="text-center">

        <span className="section-eyebrow">
          Techno Feast 2026
        </span>

        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Event Gallery
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-paper-100/65">
          Explore every Techno Feast event and register individually.
        </p>

      </Reveal>

      {/* FILTER */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">

        {categories.map((category) => (

          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
              filter === category
                ? 'bg-aurora text-white shadow-glow'
                : 'border border-white/15 text-paper-100/70 hover:border-neon-cyan/60'
            }`}
          >
            {category}
          </button>

        ))}

      </div>

      {/* TECHNO FEAST */}
      <Reveal className="mt-16 text-center">

        <span className="section-eyebrow">
          EVENT
        </span>

        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          TECHNO FEAST
        </h2>

        <p className="mt-2 text-sm text-paper-100/60">
          Technical &amp; Non-Technical Events
        </p>

      </Reveal>

      {/* EVENT CARDS */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {filteredEvents.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            index={index}
          />
        ))}

      </div>

      {/* NO EVENTS */}
      {filteredEvents.length === 0 && (
        <div className="mt-12 text-center text-sm text-paper-100/60">
          No events found in this category.
        </div>
      )}

    </div>
  );
}