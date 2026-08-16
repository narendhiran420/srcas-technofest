import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import MusicToggle from "./MusicToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/technofeast", label: "Techno Feast" },
  { to: "/events", label: "Events" },
  { to: "/nex-it", label: "NEX IT" },
  { to: "/student-corner", label: "Student Corner" },
  { to: "/contact", label: "Contact" },
];

function SRCASBrand() {
  return (
    <NavLink
      to="/"
      className="
        relative z-[100] flex min-w-0 shrink-0 items-center
        gap-2.5 overflow-visible sm:gap-3
      "
    >
      <div
        className="
          relative z-[100] flex h-[42px] w-[42px]
          min-h-[42px] min-w-[42px] shrink-0
          items-center justify-center overflow-hidden
          rounded-full bg-white
          sm:h-[50px] sm:w-[50px]
          sm:min-h-[50px] sm:min-w-[50px]
        "
      >
        <img
          src="/assets/clg.png"
          alt="SRCAS"
          className="block h-full w-full rounded-full object-contain"
          draggable={false}
        />
      </div>

      <div className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className="
            whitespace-nowrap bg-gradient-to-r
            from-cyan-300 via-blue-400 to-purple-500
            bg-clip-text text-[16px] font-black
            tracking-[0.05em] text-transparent sm:text-[18px]
          "
        >
          SRCAS
        </span>

        <span
          className="
            mt-[5px] whitespace-nowrap text-[8px]
            font-bold tracking-[0.06em] text-white/60 sm:text-[9px]
          "
        >
          TECHNO FEAST 2026
        </span>
      </div>
    </NavLink>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className="
          fixed left-0 right-0 top-0 z-[9999]
          px-2 pt-2 sm:px-4 sm:pt-3
        "
      >
        <nav
          className="
            relative z-[9999] mx-auto flex h-[64px] w-full
            max-w-[1500px] items-center rounded-2xl
            border border-white/[0.14] bg-[#080912]/70 px-3
            shadow-[0_8px_40px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl backdrop-saturate-150
            sm:h-[72px] sm:px-5 lg:px-6
          "
        >
          <div
            className="
              pointer-events-none absolute left-5 right-5 top-0
              h-px bg-gradient-to-r from-transparent
              via-white/40 to-transparent
            "
          />

          <SRCASBrand />

          <div
            className="
              relative z-[100] ml-auto hidden
              items-center gap-1 lg:flex
            "
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "relative rounded-xl px-3 py-2 text-[13px]",
                    "font-medium transition-all duration-300",
                    isActive
                      ? "bg-white/[0.08] text-cyan-300"
                      : "text-white/65 hover:bg-white/[0.05] hover:text-white",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="
                          absolute bottom-1 left-1/2 h-[2px]
                          w-5 -translate-x-1/2 rounded-full
                          bg-gradient-to-r from-cyan-400 to-purple-500
                        "
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div
            className="
              relative z-[100] ml-auto flex shrink-0
              items-center gap-1.5 lg:ml-3
            "
          >
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="
                hidden h-9 w-9 items-center justify-center
                rounded-xl border border-white/10
                bg-white/[0.05] text-white/70 transition
                hover:bg-cyan-400/10 hover:text-cyan-300 sm:flex
              "
            >
              <FiSearch size={16} />
            </button>

            <div className="hidden sm:block">
              <MusicToggle />
            </div>

            <div className="hidden sm:block">
              <NotificationBell />
            </div>

            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl border border-white/10 bg-white/[0.05]
              "
            >
              <ThemeToggle />
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-xl border border-white/10
                bg-white/[0.05] text-white/80 transition
                hover:bg-cyan-400/10 hover:text-cyan-300 lg:hidden
              "
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="
                relative z-[9998] mx-auto mt-2 w-full
                overflow-hidden rounded-2xl border border-white/10
                bg-[#080912]/90 shadow-2xl backdrop-blur-2xl lg:hidden
              "
            >
              <div className="p-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    closeMenu();
                  }}
                  className="
                    mb-2 flex w-full items-center gap-3
                    rounded-xl border border-white/10
                    bg-white/[0.05] px-4 py-3
                    text-sm text-white/70
                  "
                >
                  <FiSearch size={17} />
                  Search
                </button>

                <div className="space-y-1">
                  {links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "block rounded-xl px-4 py-3 text-sm",
                          "font-medium transition",
                          isActive
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "text-white/70 hover:bg-white/[0.05] hover:text-white",
                        ].join(" ")
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>

                <div
                  className="
                    mt-3 flex justify-center gap-3
                    border-t border-white/10 pt-3
                  "
                >
                  <MusicToggle />
                  <NotificationBell />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="
              fixed inset-0 z-[10000] flex items-start
              justify-center bg-black/70 px-4 pt-24
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.97,
              }}
              onClick={(event) => event.stopPropagation()}
              className="
                w-full max-w-xl rounded-2xl
                border border-white/10 bg-[#080912]/95
                p-4 shadow-2xl backdrop-blur-2xl
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-white">Search</h3>

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full bg-white/5 text-white/60
                    hover:text-white
                  "
                >
                  <FiX />
                </button>
              </div>

              <SearchBar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}