import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCounter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <motion.div ref={ref} className="glass-card px-6 py-8 text-center" whileHover={{ y: -6 }}>
      <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-paper-100/60">{label}</p>
    </motion.div>
  );
}
