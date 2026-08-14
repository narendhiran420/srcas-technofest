import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="relative h-20 w-20"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-blue border-r-neon-purple border-b-neon-cyan" />
          </motion.div>
          <motion.p
            className="mt-6 font-display text-sm tracking-[0.4em] text-paper-100/80"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            TECHNO FEAST 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
