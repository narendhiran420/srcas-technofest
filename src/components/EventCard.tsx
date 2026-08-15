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

  const isNexIT =
    event.section === 'NEX IT';

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

      {/* ======================================= */}
      {/* IMAGE */}
      {/* ======================================= */}

      <div className="relative h-56 w-full overflow-hidden bg-black/20">

        <img
          src={event.image}
          alt={`${event.name} - ${event.section}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display =
              'none';
          }}
        />

        {/* CATEGORY */}

        <div className="absolute left-3 top-3">

          <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {event.category}
          </span>

        </div>

        {/* NEX IT */}

        {isNexIT && (

          <div className="absolute right-3 top-3">

            <span className="rounded-full border border-neon-cyan/30 bg-black/70 px-3 py-1 text-xs font-bold text-neon-cyan backdrop-blur-md">
              NEX IT
            </span>

          </div>

        )}

      </div>

      {/* ======================================= */}
      {/* CONTENT */}
      {/* ======================================= */}

      <div className="flex flex-1 flex-col p-5">

        <h3 className="font-display text-lg font-bold text-white">
          {event.name}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-100/65">
          {event.shortDescription}
        </p>

        {/* INFO */}

        <div className="mt-4 space-y-2 text-xs text-paper-100/60">

          {/* DATE */}

          <p className="flex items-start gap-2">

            <FiClock className="mt-0.5 shrink-0 text-neon-blue" />

            <span>
              {event.date}
              {' · '}
              {event.time}
            </span>

          </p>

          {/* VENUE */}

          <p className="flex items-start gap-2">

            <FiMapPin className="mt-0.5 shrink-0 text-neon-purple" />

            <span>
              {event.venue}
            </span>

          </p>

          {/* FEE */}

          <p className="flex items-center gap-2">

            <FiTag className="shrink-0 text-neon-cyan" />

            {isNexIT ? (

              <span className="font-bold text-neon-cyan">
                FREE REGISTRATION
              </span>

            ) : (

              <span>
                {event.fee}
              </span>

            )}

          </p>

        </div>

        {/* BUTTONS */}

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