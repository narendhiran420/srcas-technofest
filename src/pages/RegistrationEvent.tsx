import { useParams, Navigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import RegistrationForm from '../components/RegistrationForm';
import { getEventById } from '../data/events';

export default function RegistrationEvent() {
  const { eventId } = useParams();

  const event = eventId
    ? getEventById(eventId)
    : undefined;

  if (!event) {
    return <Navigate to="/registration" replace />;
  }

  const isNexIT = event.section === 'NEX IT';

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">

      {/* Event Header */}
      <Reveal className="text-center">

        {/* Section */}
        <span className="section-eyebrow">
          {isNexIT
            ? 'NEX IT'
            : 'TECHNO FEAST'}
        </span>

        {/* Event Name */}
        <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          {event.name}
        </h1>

        {/* Date / Time / Venue */}
        <p className="mt-2 text-sm text-paper-100/60">
          {event.date} · {event.time}
        </p>

        <p className="mt-1 text-xs text-paper-100/50">
          {event.venue}
        </p>

        {/* NEX IT FREE REGISTRATION */}
        {isNexIT && (
          <div className="mt-5 inline-flex rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-neon-cyan">
            FREE REGISTRATION
          </div>
        )}

      </Reveal>

      {/* Registration Form */}
      <Reveal
        delay={0.15}
        className="mt-8"
      >
        <RegistrationForm event={event} />
      </Reveal>

    </div>
  );
}