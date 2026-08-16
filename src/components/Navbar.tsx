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

  // NEX IT
  { to: '/nex-it', label: 'NEX IT' },

  { to: '/registration', label: 'Registration' },
  { to: '/student-corner', label: 'Student Corner' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
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
        {/* ================================
            SRCAS LOGO + BRAND
        ================================= */}
        <NavLink
          to="/"
          className="flex items-center gap-3 font-display font-bold tracking-wide"
        >
          {/* Circular SRCAS Logo */}
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-2
              border-white/20
              bg-white
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              hover:border-white/40
              sm:h-14
              sm:w-14
            "
          >
            <img
              src="/assets/logo-college.png"
              alt="SRCAS Logo"
              className="h-full w-full object-contain p-1"
            />
          </div>

          {/* Brand Text */}
          <div className="hidden sm:block">
            <span className="block gradient-text text-sm font-bold sm:text-base">
              B.Sc. IT · SRCAS
            </span>

            <span className="block text-[10px] font-medium tracking-wider text-paper-100/60">
              TECHNO FEAST 2026
            </span>
          </div>
        </NavLink>

        {/* ================================
            DESKTOP NAVIGATION
        ================================= */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-xs font-medium tracking-wide transition-colors xl:text-sm ${
                  isActive
                    ? 'text-neon-cyan'
                    : 'text-paper-100/70 hover:text-paper-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ================================
            RIGHT SIDE CONTROLS
        ================================= */}
        <div className="flex items-center gap-2">
          <SearchBar />

          <MusicToggle />

          <NotificationBell />

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((previous) => !previous)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/5
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-white/10
              lg:hidden
            "
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* ================================
          MOBILE MENU
      ================================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="glass-card mx-4 mt-2 flex flex-col gap-1 p-4 lg:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-neon-cyan'
                      : 'text-paper-100/80 hover:bg-white/5 hover:text-paper-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}