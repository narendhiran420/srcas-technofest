import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiDownload, FiMessageCircle, FiPhoneCall } from 'react-icons/fi';

const actions = [
  { icon: FiDownload, label: 'Brochure', href: '/assets/brochure.pdf' },
  { icon: FiMessageCircle, label: 'AI Assistant', href: '#ai-chat' },
  { icon: FiPhoneCall, label: 'Call Us', href: 'tel:+919000000000' },
];

export default function FloatingActionMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-5 z-[8500] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open &&
          actions.map((a, i) => (
            <motion.a
              key={a.label}
              href={a.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card flex items-center gap-2 px-4 py-2 text-xs font-medium hover:border-neon-cyan/60"
            >
              <a.icon className="text-neon-cyan" /> {a.label}
            </motion.a>
          ))}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Quick actions"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-aurora text-white shadow-glow"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }}>
          {open ? <FiX /> : <FiPlus />}
        </motion.span>
      </button>
    </div>
  );
}
