import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [burst, setBurst] = useState(false);

  function handleClick() {
    setBurst(true);
    toggleTheme();
    setTimeout(() => setBurst(false), 700);
  }

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Toggle dark and light theme"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all hover:border-neon-cyan/60 hover:shadow-glow-cyan"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.35 }}
            className="text-lg"
          >
            {theme === 'dark' ? <FiMoon className="text-neon-purple" /> : <FiSun className="text-amber-500" />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Full-screen glow morph burst on toggle */}
      <AnimatePresence>
        {burst && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[9997] bg-aurora"
            initial={{ clipPath: 'circle(0% at 95% 5%)', opacity: 0.55 }}
            animate={{ clipPath: 'circle(150% at 95% 5%)', opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
