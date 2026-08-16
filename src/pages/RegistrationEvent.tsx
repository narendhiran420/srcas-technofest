import { useParams, Navigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import RegistrationForm from '../components/RegistrationForm';
import { getEventById } from '../data/events';

export default function RegistrationEvent() {
  const { eventId } = useParams<{
    eventId: string;
  }>();

  const event = eventId
    ? getEventById(eventId)
    : undefined;

  if (!event) {
    return <Navigate to="/registration" replace />;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      <Reveal className="text-center">

        <span className="section-eyebrow">
          TECHNO FEAST 2026
        </span>

        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          {event.name}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-paper-100/65">
          {event.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            {event.category}
          </span>

          <span className="rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-4 py-2 text-neon-cyan">
            {event.fee}
          </span>

        </div>

      </Reveal>

      <div className="mt-10">
        <RegistrationForm event={event} />
      </div>

    </div>
  );
}