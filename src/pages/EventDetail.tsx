import { useParams, Link, Navigate } from 'react-router-dom';
import { FiClock, FiMapPin, FiTag, FiAward, FiUser } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import { getEventById } from '../data/events';

export default function EventDetail() {
  const { eventId } = useParams();
  const event = eventId ? getEventById(eventId) : undefined;

  if (!event) return <Navigate to="/events" replace />;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <span className="section-eyebrow">{event.category}</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{event.name}</h1>
        <p className="mt-4 text-sm leading-relaxed text-paper-100/70">{event.shortDescription}</p>
      </Reveal>

      <Reveal delay={0.1} className="glass-card mt-8 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
        <Info icon={FiClock} label="Date & Time" value={`${event.date} · ${event.time}`} color="text-neon-blue" />
        <Info icon={FiMapPin} label="Venue" value={event.venue} color="text-neon-purple" />
        <Info icon={FiTag} label="Registration Fee" value={event.fee} color="text-neon-cyan" />
        <Info icon={FiAward} label="Prizes" value={event.prize} color="text-neon-pink" />
      </Reveal>

      <Reveal delay={0.2} className="mt-8">
        <h2 className="font-display text-lg font-bold">Rules & Regulations</h2>
        <ul className="mt-4 space-y-2">
          {event.rules.map((r, i) => (
            <li key={i} className="glass-card flex gap-3 px-4 py-3 text-sm text-paper-100/70">
              <span className="text-neon-purple">▹</span> {r}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.3} className="mt-8">
        <h2 className="font-display text-lg font-bold">Coordinators</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {event.coordinators.map((c, i) => (
            <div key={i} className="glass-card p-4 text-sm text-paper-100/70">
              <p className="flex items-center gap-2"><FiUser className="text-neon-blue" /> Faculty: {c.faculty}</p>
              <p className="mt-1 flex items-center gap-2"><FiUser className="text-neon-cyan" /> Student: {c.student}</p>
              <p className="mt-1 text-xs text-paper-100/50">{c.phone}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.4} className="mt-10 flex justify-center">
        <Link to={`/registration/${event.id}`} className="btn-glow">
          Register for {event.name}
        </Link>
      </Reveal>
    </div>
  );
}

function Info({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className={`mt-0.5 ${color}`} />
      <div>
        <p className="text-xs uppercase tracking-wide text-paper-100/50">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
