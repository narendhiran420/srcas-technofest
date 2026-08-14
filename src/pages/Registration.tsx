import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import { events } from '../data/events';

export default function Registration() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Reveal className="text-center">
        <span className="section-eyebrow">Techno Feast 2026</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Choose an Event to Register</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-paper-100/65">
          Every event has its own dedicated registration form. Pick an event below to get started.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.05}>
            <Link
              to={`/registration/${ev.id}`}
              className="glass-card flex items-center justify-between px-6 py-5 transition hover:border-neon-cyan/50"
            >
              <div>
                <p className="font-display font-bold">{ev.name}</p>
                <p className="mt-1 text-xs text-paper-100/55">{ev.category} · {ev.fee}</p>
              </div>
              <FiArrowRight className="text-neon-cyan" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
