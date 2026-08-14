import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBell } from 'react-icons/fi';

const notifications = [
  { id: 1, text: 'Techno Feast 2026 registrations are now open!', time: '2h ago', unread: true },
  { id: 2, text: 'Code Storm slots are filling up fast — register soon.', time: '1d ago', unread: true },
  { id: 3, text: 'Faculty coordinator list updated for all events.', time: '3d ago', unread: false },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition hover:border-neon-purple/60 sm:flex"
      >
        <FiBell />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-neon-pink px-1 font-mono text-[9px] text-white animate-pulse-glow">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[8900]" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              className="glass-card absolute right-0 top-12 z-[8901] w-72 overflow-hidden p-2"
            >
              <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-paper-100/40">
                Notifications
              </p>
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-white/10">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.unread ? 'bg-neon-cyan' : 'bg-white/20'}`} />
                  <div>
                    <p className="text-paper-100/80">{n.text}</p>
                    <p className="mt-0.5 text-[10px] text-paper-100/40">{n.time}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
