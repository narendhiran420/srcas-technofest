import { useState } from 'react';

import Reveal from '../components/Reveal';
import EventCard from '../components/EventCard';
import SEO from '../components/SEO';

import {
  technoFeastEvents,
  NexITEvents,
} from '../data/events';

const categories = [
  'All',
  'Technical',
  'Non-Technical',
] as const;

export default function Events() {
  const [filter, setFilter] =
    useState<(typeof categories)[number]>(
      'All'
    );

  const filterEvents = (
    eventList: typeof technoFeastEvents
  ) => {
    if (filter === 'All') {
      return eventList;
    }

    return eventList.filter(
      (event) =>
        event.category === filter
    );
  };

  const technoEvents =
    filterEvents(technoFeastEvents);

  const nexEvents =
    filterEvents(NexITEvents);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">

      <SEO
        title="Events | Techno Feast 2026 — Dept. of B.Sc. IT, SRCAS"
        description="Explore Techno Feast 2026 and NEX IT inter-department events."
      />

      {/* ========================================= */}
      {/* PAGE HEADER */}
      {/* ========================================= */}

      <Reveal className="text-center">

        <span className="section-eyebrow">
          Techno Feast 2026
        </span>

        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Event Gallery
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-paper-100/65">
          Explore every event and register
          individually.
        </p>

      </Reveal>

      {/* ========================================= */}
      {/* FILTER */}
      {/* ========================================= */}

      <div className="mt-8 flex flex-wrap justify-center gap-2">

        {categories.map((category) => (

          <button
            key={category}
            type="button"
            onClick={() =>
              setFilter(category)
            }
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

      {/* ========================================= */}
      {/* TECHNO FEAST */}
      {/* ========================================= */}

      <Reveal
        className="mt-16 text-center"
      >

        <span className="section-eyebrow">
          EVENT
        </span>

        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          TECHNO FEAST
        </h2>

        <p className="mt-2 text-sm text-paper-100/60">
          Technical & Non-Technical Events
        </p>

      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {technoEvents.map(
          (event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
            />
          )
        )}

      </div>

      {/* ========================================= */}
      {/* NEX IT */}
      {/* ========================================= */}

      <Reveal
        className="mt-24 text-center"
      >

        <span className="section-eyebrow">
          INTER-DEPARTMENT FUNCTION
        </span>

        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          NEX IT
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-paper-100/65">
          An inter-department function with
          free event registration.
        </p>

        <div className="mt-5 inline-flex rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-neon-cyan">
          FREE REGISTRATION
        </div>

      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {nexEvents.map(
          (event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
            />
          )
        )}

      </div>

    </div>
  );
}