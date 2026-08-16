import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

import type { EventItem } from '../data/events';

interface EventCardProps {
  event: EventItem;
  index?: number;
}

export default function EventCard({
  event,
  index = 0,
}: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="glass-card group overflow-hidden"
    >
      {/* EVENT IMAGE */}
      <div className="relative h-56 w-full overflow-hidden bg-black/20">

        <img
          src={event.image}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* CATEGORY */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {event.category}
          </span>
        </div>

        {/* FEE */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-neon-cyan/30 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neon-cyan backdrop-blur-md">
            {event.fee}
          </span>
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* EVENT NAME */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
            Techno Feast 2026
          </span>

          <h3 className="mt-2 font-display text-xl font-bold text-white">
            {event.name}
          </h3>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-paper-100/60">
          {event.shortDescription}
        </p>

        {/* DATE */}
        <div className="mt-5 flex items-start gap-3 text-xs text-paper-100/60">
          <FiCalendar className="mt-0.5 shrink-0 text-neon-cyan" />

          <div>
            <p className="font-medium text-paper-100/80">
              {event.date}
            </p>

            <p className="mt-1">
              {event.time}
            </p>
          </div>
        </div>

        {/* VENUE */}
        <div className="mt-3 flex items-start gap-3 text-xs text-paper-100/60">
          <FiMapPin className="mt-0.5 shrink-0 text-neon-cyan" />

          <p className="leading-5">
            {event.venue}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">

          <Link
            to={`/events/${event.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold text-paper-100/80 transition hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            Details
          </Link>

          <Link
            to={`/registration/${event.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-aurora px-4 py-3 text-xs font-bold text-white transition hover:scale-[1.02]"
          >
            Register
            <FiArrowRight />
          </Link>

        </div>

      </div>
    </motion.article>
  );
}