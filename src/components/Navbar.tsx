import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';
import MusicToggle from './MusicToggle';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Department' },
  { to: '/technofeast', label: 'Techno Feast 2026' },
  { to: '/events', label: 'Events' },
  { to: '/registration', label: 'Registration' },
  { to: '/student-corner', label: 'Student Corner' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9000] transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-500 ${
          scrolled ? 'glass-card py-2' : 'bg-transparent py-2'
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2 font-display text-sm font-bold tracking-wide sm:text-base">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aurora text-white">IT</span>
          <span className="hidden gradient-text sm:inline">B.Sc. IT · SRCAS</span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-xs font-medium tracking-wide transition-colors xl:text-sm ${
                  isActive ? 'text-neon-cyan' : 'text-paper-100/70 hover:text-paper-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SearchBar />
          <MusicToggle />
          <NotificationBell />
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md lg:hidden"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card mx-4 mt-2 flex flex-col gap-1 p-4 lg:hidden"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive ? 'bg-white/10 text-neon-cyan' : 'text-paper-100/80'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
