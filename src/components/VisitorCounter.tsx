import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import { doc, getDoc, increment, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const SESSION_KEY = 'srcas-visited-session';
const STATS_DOC = 'site-stats/visitors';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function trackVisit() {
      const alreadyCounted = sessionStorage.getItem(SESSION_KEY);
      try {
        const ref = doc(db, STATS_DOC);
        if (!alreadyCounted) {
          await setDoc(ref, { count: increment(1) }, { merge: true });
          sessionStorage.setItem(SESSION_KEY, '1');
        }
        const snap = await getDoc(ref);
        setCount(snap.exists() ? (snap.data().count as number) : 1);
      } catch {
        // Firebase not configured yet — fall back to a local-only counter
        // so the UI still works before real credentials are added.
        const local = Number(localStorage.getItem('srcas-visitor-fallback') || 1200);
        const next = alreadyCounted ? local : local + 1;
        localStorage.setItem('srcas-visitor-fallback', String(next));
        sessionStorage.setItem(SESSION_KEY, '1');
        setCount(next);
      }
    }
    trackVisit();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card inline-flex items-center gap-2 px-4 py-2 text-xs text-paper-100/70"
    >
      <FiUsers className="text-neon-cyan" />
      {count === null ? 'Loading visitors…' : `${count.toLocaleString()} visitors so far`}
    </motion.div>
  );
}
