import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TARGET_DATE = new Date('2026-09-18T09:00:00+05:30').getTime();

function getTimeLeft() {
  const diff = Math.max(TARGET_DATE - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`flex gap-3 ${compact ? 'scale-90' : ''}`}>
      {units.map((u, i) => (
        <motion.div
          key={u.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass-card flex w-[68px] flex-col items-center py-3 sm:w-20"
        >
          <span className="font-display text-2xl font-bold gradient-text sm:text-3xl tabular-nums">
            {String(time[u.key]).padStart(2, '0')}
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper-100/60">
            {u.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
