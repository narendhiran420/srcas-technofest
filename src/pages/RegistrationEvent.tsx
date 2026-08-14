import { useParams, Navigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import RegistrationForm from '../components/RegistrationForm';
import { getEventById } from '../data/events';

export default function RegistrationEvent() {
  const { eventId } = useParams();
  const event = eventId ? getEventById(eventId) : undefined;

  if (!event) return <Navigate to="/registration" replace />;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Reveal className="text-center">
        <span className="section-eyebrow">Register</span>
        <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{event.name}</h1>
        <p className="mt-2 text-sm text-paper-100/60">{event.date} · {event.time} · {event.venue}</p>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <RegistrationForm event={event} />
      </Reveal>
    </div>
  );
}
