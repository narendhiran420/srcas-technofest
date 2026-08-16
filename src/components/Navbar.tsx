import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiVolume2,
  FiVolumeX,
  FiBell,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import MusicToggle from "./MusicToggle";

/* =========================================================
   NAVIGATION LINKS
========================================================= */

const links = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/technofeast",
    label: "Techno Feast",
  },
  {
    to: "/events",
    label: "Events",
  },
  {
    to: "/nex-it",
    label: "NEX IT",
  },
  {
    to: "/student-corner",
    label: "Student Corner",
  },
  {
    to: "/contact",
    label: "Contact",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-[9999]
          w-full
          border-b
          border-white/10
          bg-[#05050d]/95
          backdrop-blur-xl
        "
      >

        <nav
          className="
            mx-auto
            flex
            h-[68px]
            w-full
            max-w-[1600px]
            items-center
            px-3
            sm:h-[76px]
            sm:px-5
            lg:px-8
          "
        >

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <NavLink
            to="/"
            onClick={closeMenu}
            className="
              flex
              min-w-0
              flex-1
              items-center
              gap-2
              sm:gap-3
            "
          >

            {/* =================================================
                SRCAS LOGO
            ================================================= */}

            <div
              className="
                flex
                h-[46px]
                w-[46px]
                flex-shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-white
                p-1
                shadow-[0_0_20px_rgba(34,211,238,0.15)]
                sm:h-[52px]
                sm:w-[52px]
              "
            >
              <img
                src="/assets/srcas-logo.png"
                alt="SRCAS Logo"
                className="
                  h-full
                  w-full
                  object-contain
                "
                onError={(e) => {
                  /*
                   * If your project uses another logo path,
                   * this prevents a broken-image icon.
                   */
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            </div>

            {/* =================================================
                SRCAS TECHNO FEAST 2026
            ================================================= */}

            <div
              className="
                flex
                min-w-0
                flex-col
                justify-center
                leading-none
              "
            >

              {/* SRCAS */}

              <span
                className="
                  whitespace-nowrap
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-400
                  to-purple-400
                  bg-clip-text
                  text-[12px]
                  font-black
                  tracking-[0.12em]
                  text-transparent
                  sm:text-[15px]
                  lg:text-[17px]
                "
              >
                SRCAS
              </span>

              {/* TECHNO FEAST */}

              <span
                className="
                  mt-[4px]
                  whitespace-nowrap
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white/55
                  sm:text-[9px]
                  lg:text-[10px]
                "
              >
                TECHNO FEAST 2026
              </span>

            </div>

          </NavLink>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div
            className="
              hidden
              items-center
              gap-1
              lg:flex
            "
          >

            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `
                  relative
                  rounded-full
                  px-3
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "text-cyan-300"
                      : "text-white/65 hover:text-white"
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="
                          absolute
                          bottom-0
                          left-1/2
                          h-[2px]
                          w-5
                          -translate-x-1/2
                          rounded-full
                          bg-cyan-400
                          shadow-[0_0_10px_rgba(34,211,238,0.8)]
                        "
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </div>

          {/* =================================================
              RIGHT CONTROLS
          ================================================= */}

          <div
            className="
              ml-2
              flex
              flex-shrink-0
              items-center
              gap-1.5
              sm:ml-4
              sm:gap-2
            "
          >

            {/* SEARCH */}

            <button
              type="button"
              onClick={() =>
                setSearchOpen(true)
              }
              aria-label="Search"
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/5
                text-white/60
                transition
                hover:border-cyan-400/40
                hover:text-cyan-300
                sm:flex
              "
            >
              <FiSearch size={17} />
            </button>

            {/* MUSIC */}

            <div className="hidden sm:block">
              <MusicToggle />
            </div>

            {/* NOTIFICATION */}

            <div className="hidden sm:block">
              <NotificationBell />
            </div>

            {/* THEME */}

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-white/10
                bg-white/5
              "
            >
              <ThemeToggle />
            </div>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              onClick={() =>
                setMenuOpen(
                  (value) => !value
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/5
                text-white
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:text-cyan-300
                lg:hidden
              "
            >

              {menuOpen ? (
                <FiX size={22} />
              ) : (
                <FiMenu size={22} />
              )}

            </button>

          </div>

        </nav>

        {/* ===================================================
            MOBILE MENU
        =================================================== */}

        <AnimatePresence>
          {menuOpen && (

            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                overflow-hidden
                border-t
                border-white/10
                bg-[#05050d]/98
                backdrop-blur-2xl
                lg:hidden
              "
            >

              <div
                className="
                  mx-auto
                  max-w-[1600px]
                  px-4
                  py-4
                "
              >

                {/* MOBILE SEARCH */}

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    closeMenu();
                  }}
                  className="
                    mb-2
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-white/70
                  "
                >

                  <FiSearch size={18} />

                  <span>
                    Search
                  </span>

                </button>

                {/* MOBILE LINKS */}

                <div className="space-y-1">

                  {links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `
                        block
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        transition
                        ${
                          isActive
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }
                        `
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}

                </div>

                {/* MOBILE TOOLS */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-3
                    border-t
                    border-white/10
                    pt-4
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

      {/* ===================================================
          SEARCH OVERLAY
      =================================================== */}

      <AnimatePresence>
        {searchOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[10000]
              flex
              items-start
              justify-center
              bg-black/70
              px-4
              pt-24
              backdrop-blur-md
            "
            onClick={() =>
              setSearchOpen(false)
            }
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
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                w-full
                max-w-xl
                rounded-2xl
                border
                border-white/10
                bg-[#080812]
                p-4
                shadow-2xl
              "
            >

              <div className="mb-3 flex items-center justify-between">

                <h3 className="font-bold text-white">
                  Search
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white/5
                    text-white/60
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