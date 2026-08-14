import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiClock,
  FiMapPin,
  FiTag,
} from 'react-icons/fi';
import { EventItem } from '../data/events';

interface EventCardProps {
  event: EventItem;
  index?: number;
}

export default function EventCard({
  event,
  index = 0,
}: EventCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -8,
      }}
      className="glass-card group flex flex-col overflow-hidden"
    >
      {/* ================= IMAGE ================= */}

      <div className="relative h-56 w-full overflow-hidden bg-black/20">
        <img
          src={event.image}
          alt={`${event.name} - Techno Feast 2026`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            console.error(
              `Failed to load image: ${event.image}`
            );

            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Category */}

        <div className="absolute left-3 top-3">
          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {event.category}
          </span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="flex flex-1 flex-col p-5">

        {/* Event Name */}

        <h3 className="font-display text-lg font-bold text-white">
          {event.name}
        </h3>

        {/* Description */}

        <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-100/65">
          {event.shortDescription}
        </p>

        {/* ================= EVENT INFO ================= */}

        <div className="mt-4 space-y-2 text-xs text-paper-100/60">

          {/* Date + Time */}

          <p className="flex items-start gap-2">
            <FiClock className="mt-0.5 shrink-0 text-neon-blue" />

            <span>
              {event.date} · {event.time}
            </span>
          </p>

          {/* Venue */}

          <p className="flex items-start gap-2">
            <FiMapPin className="mt-0.5 shrink-0 text-neon-purple" />

            <span>
              {event.venue}
            </span>
          </p>

          {/* Fee */}

          <p className="flex items-center gap-2">
            <FiTag className="shrink-0 text-neon-cyan" />

            <span>
              {event.fee}
            </span>
          </p>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="mt-5 flex gap-2">

          <Link
            to={`/events/${event.id}`}
            className="btn-outline flex-1 !px-4 !py-2 text-center text-xs"
          >
            Details
          </Link>

          <Link
            to={`/registration/${event.id}`}
            className="btn-glow flex-1 !px-4 !py-2 text-center text-xs"
          >
            Register
          </Link>

        </div>

      </div>
    </motion.div>
  );
}