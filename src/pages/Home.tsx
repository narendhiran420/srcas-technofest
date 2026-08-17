import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

import ParticlesBackground from '../components/ParticlesBackground';
import CountdownTimer from '../components/CountdownTimer';
import Reveal from '../components/Reveal';
import StatCounter from '../components/StatCounter';
import EventCard from '../components/EventCard';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import VisitorCounter from '../components/VisitorCounter';

import { events } from '../data/events';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">

      {/* =========================================================
          SEO
      ========================================================= */}

      <SEO
        title="PG & Research Department of Information Technology — SRCAS Coimbatore"
        description="Official website of the PG & Research Department Information Technology, Sri Ramakrishna College of Arts & Science, Coimbatore. Techno Feast 2026 on 18 September 2026."
      />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative
          flex
          min-h-[92vh]
          flex-col
          items-center
          justify-center
          overflow-hidden
          px-6
          text-center
        "
      >

        {/* Existing particle background */}
        <ParticlesBackground />

        {/* Grid */}
        <div className="absolute inset-0 -z-30 bg-grid-glow" />

        {/* =====================================================
            FLOATING BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

          {/* LEFT GLOW */}

          <motion.div
            className="
              absolute
              -left-40
              top-10
              h-[450px]
              w-[450px]
              rounded-full
              bg-cyan-400/[0.05]
              blur-[120px]
            "
            animate={{
              x: [0, 80, -30, 0],
              y: [0, 50, -20, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* RIGHT GLOW */}

          <motion.div
            className="
              absolute
              -right-40
              top-10
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-500/[0.05]
              blur-[130px]
            "
            animate={{
              x: [0, -70, 30, 0],
              y: [0, 40, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* =====================================================
              B.Sc IT - SMALL
          ===================================================== */}

          <motion.span
            className="
              absolute
              left-[5%]
              top-[15%]
              font-display
              text-2xl
              font-black
              tracking-wider
              text-cyan-300/[0.08]
              sm:text-4xl
            "
            animate={{
              x: [0, 25, -15, 0],
              y: [0, -20, 15, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            B.Sc IT
          </motion.span>

          {/* =====================================================
              TECHNO FEAST - SMALL
          ===================================================== */}

          <motion.span
            className="
              absolute
              right-[4%]
              top-[42%]
              font-display
              text-xl
              font-black
              tracking-[0.15em]
              text-blue-300/[0.07]
              sm:text-3xl
            "
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 20, -15, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            TECHNO FEAST
          </motion.span>

          {/* =====================================================
              IT - SMALL
          ===================================================== */}

          <motion.span
            className="
              absolute
              left-[10%]
              bottom-[18%]
              font-display
              text-4xl
              font-black
              tracking-widest
              text-cyan-200/[0.06]
              sm:text-6xl
            "
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -25, 20, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            IT
          </motion.span>

          {/* =====================================================
              TECHNO FEAST 2026 - SMALL
          ===================================================== */}

          <motion.span
            className="
              absolute
              right-[15%]
              bottom-[10%]
              font-mono
              text-sm
              font-bold
              tracking-[0.3em]
              text-blue-200/[0.07]
              sm:text-xl
            "
            animate={{
              x: [0, -20, 15, 0],
              y: [0, 15, -15, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            TECHNO FEAST 2026
          </motion.span>

          {/* =====================================================
              ARRAY
          ===================================================== */}

          <motion.span
            className="
              absolute
              left-[4%]
              top-[7%]
              whitespace-nowrap
              font-mono
              text-[20px]
              font-bold
              text-cyan-200/[0.07]
              sm:text-[32px]
            "
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            [ array ]
          </motion.span>

          {/* =====================================================
              CODE SYMBOL
          ===================================================== */}

          <motion.span
            className="
              absolute
              left-[28%]
              top-[21%]
              font-mono
              text-[22px]
              font-bold
              text-blue-300/[0.07]
              sm:text-[32px]
            "
            animate={{
              x: [0, -15, 20, 0],
              y: [0, 20, -10, 0],
              rotate: [0, -2, 1, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            &lt; / &gt;
          </motion.span>

          {/* =====================================================
              IMPORT
          ===================================================== */}

          <motion.span
            className="
              absolute
              right-[12%]
              top-[7%]
              font-mono
              text-[22px]
              font-bold
              text-cyan-200/[0.07]
              sm:text-[32px]
            "
            animate={{
              x: [0, -20, 10, 0],
              y: [0, 15, -15, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            import
          </motion.span>

          {/* =====================================================
              BRACKETS
          ===================================================== */}

          <motion.span
            className="
              absolute
              right-[4%]
              top-[30%]
              font-mono
              text-[28px]
              font-bold
              text-blue-300/[0.06]
              sm:text-[42px]
            "
            animate={{
              x: [0, 15, -20, 0],
              y: [0, -20, 10, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {'{ }'}
          </motion.span>

          {/* =====================================================
              CONST
          ===================================================== */}

          <motion.span
            className="
              absolute
              left-[4%]
              top-[43%]
              font-mono
              text-[20px]
              font-bold
              text-cyan-200/[0.06]
              sm:text-[30px]
            "
            animate={{
              x: [0, 25, -10, 0],
              y: [0, -15, 20, 0],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            const
          </motion.span>

          {/* =====================================================
              REACT
          ===================================================== */}

          <motion.span
            className="
              absolute
              right-[18%]
              bottom-[25%]
              font-mono
              text-[22px]
              font-bold
              text-blue-300/[0.07]
              sm:text-[32px]
            "
            animate={{
              x: [0, -20, 15, 0],
              y: [0, 20, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            React
          </motion.span>

          {/* =====================================================
              FUNCTION
          ===================================================== */}

          <motion.span
            className="
              absolute
              left-[12%]
              bottom-[10%]
              font-mono
              text-[20px]
              font-bold
              text-cyan-200/[0.06]
              sm:text-[28px]
            "
            animate={{
              x: [0, 15, -15, 0],
              y: [0, -20, 10, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            function
          </motion.span>

          {/* =====================================================
              RETURN
          ===================================================== */}

          <motion.span
            className="
              absolute
              left-[45%]
              bottom-[7%]
              font-mono
              text-[20px]
              font-bold
              text-blue-300/[0.06]
              sm:text-[28px]
            "
            animate={{
              x: [0, -15, 15, 0],
              y: [0, 15, -15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            return
          </motion.span>

          {/* =====================================================
              LARGE FLOATING CIRCLE
          ===================================================== */}

          <motion.div
            className="
              absolute
              left-[38%]
              top-[3%]
              h-[280px]
              w-[280px]
              rounded-full
              border
              border-cyan-400/[0.10]
              sm:h-[430px]
              sm:w-[430px]
            "
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 25, 0],
              rotate: [0, 30, -20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* =====================================================
              DASHED CIRCLE
          ===================================================== */}

          <motion.div
            className="
              absolute
              left-[40%]
              top-[7%]
              h-[230px]
              w-[230px]
              rounded-full
              border
              border-dashed
              border-blue-400/[0.12]
              sm:h-[360px]
              sm:w-[360px]
            "
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* =====================================================
              BOTTOM RIGHT CIRCLE
          ===================================================== */}

          <motion.div
            className="
              absolute
              right-[8%]
              bottom-[10%]
              h-[180px]
              w-[180px]
              rounded-full
              border
              border-cyan-400/[0.10]
              sm:h-[280px]
              sm:w-[280px]
            "
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 20, -20, 0],
              rotate: [0, -20, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* =====================================================
              SMALL FLOATING CIRCLES
          ===================================================== */}

          <motion.div
            className="
              absolute
              left-[23%]
              top-[34%]
              h-8
              w-8
              rounded-full
              border
              border-cyan-400/30
            "
            animate={{
              y: [0, -25, 0, 25, 0],
              x: [0, 15, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="
              absolute
              right-[25%]
              top-[26%]
              h-4
              w-4
              rounded-full
              border
              border-blue-400/30
            "
            animate={{
              y: [0, 20, 0, -20, 0],
              x: [0, -10, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="
              absolute
              left-[8%]
              bottom-[30%]
              h-5
              w-5
              rounded-full
              border
              border-cyan-400/25
            "
            animate={{
              y: [0, -30, 0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="
              absolute
              right-[38%]
              bottom-[18%]
              h-6
              w-6
              rounded-full
              border
              border-blue-400/25
            "
            animate={{
              x: [0, 20, -15, 0],
              y: [0, -15, 15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* =====================================================
              FLOATING DOTS
          ===================================================== */}

          {Array.from({ length: 20 }).map((_, index) => (
            <motion.span
              key={index}
              className="
                absolute
                h-1
                w-1
                rounded-full
                bg-cyan-300/30
              "
              style={{
                left: `${5 + ((index * 19) % 90)}%`,
                top: `${5 + ((index * 31) % 88)}%`,
              }}
              animate={{
                y: [0, -15, 0, 15, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.7, 1.4, 0.7],
              }}
              transition={{
                duration: 4 + (index % 4),
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}

        </div>

        {/* =========================================================
            DEPARTMENT LOGO
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative z-10 mb-6"
        >

          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              border-2
              border-cyan-300/40
              bg-white/10
              p-3
              shadow-[0_0_45px_rgba(34,211,238,0.25)]
              backdrop-blur-md
              sm:h-28
              sm:w-28
            "
          >

            <img
              src="/assets/logo-department.png"
              alt="B.Sc IT Department Logo"
              className="
                h-full
                w-full
                rounded-full
                object-contain
              "
            />

          </div>

        </motion.div>

        {/* =========================================================
            COLLEGE NAME
        ========================================================= */}

        <Reveal>

          <span className="section-eyebrow">
            Sri Ramakrishna College of Arts & Science, Coimbatore
          </span>

        </Reveal>

        {/* =========================================================
            MAIN TITLE
        ========================================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
          }}
          className="
            relative
            z-10
            mt-4
            max-w-4xl
            font-display
            text-3xl
            font-black
            leading-tight
            sm:text-5xl
            lg:text-6xl
          "
        >
          Department of{' '}

          <span className="gradient-text">
            B.Sc. Information
          </span>{' '}

          Technology
        </motion.h1>

        {/* =========================================================
            SUBTITLE
        ========================================================= */}

        <Reveal delay={0.3}>

          <p
            className="
              relative
              z-10
              mt-4
              text-sm
              uppercase
              tracking-[0.3em]
              text-paper-100/60
              sm:text-base
            "
          >
            Official Department Website
          </p>

        </Reveal>

        {/* =========================================================
            TECHNO FEAST CARD
        ========================================================= */}

        <Reveal
          delay={0.4}
          className="relative z-10 mt-8"
        >

          <div
            className="
              glass-card
              inline-flex
              flex-col
              items-center
              gap-4
              px-8
              py-6
            "
          >

            <p
              className="
                flex
                items-center
                gap-2
                font-display
                text-lg
                font-bold
                sm:text-xl
              "
            >

              <FiCalendar className="text-neon-cyan" />

              TECHNO FEAST 2026 · 18 September 2026

            </p>

            <CountdownTimer />

          </div>

        </Reveal>

        {/* =========================================================
            BUTTONS
        ========================================================= */}

        <Reveal
          delay={0.55}
          className="
            relative
            z-10
            mt-10
            flex
            flex-col
            gap-4
            sm:flex-row
          "
        >

          <MagneticButton
            className="btn-glow"
            onClick={() => navigate('/registration')}
          >
            Register Now

            <FiArrowRight />

          </MagneticButton>

          <MagneticButton
            className="btn-outline"
            onClick={() => navigate('/events')}
          >
            Explore Events
          </MagneticButton>

        </Reveal>

      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="mx-auto max-w-6xl px-6 py-16">

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-4
          "
        >

          <StatCounter
            value={6}
            suffix="+"
            label="Events"
          />

          <StatCounter
            value={1500}
            suffix="+"
            label="Students Expected"
          />

          <StatCounter
            value={20}
            suffix="+"
            label="Coordinators"
          />

        </div>

        <div className="mt-6 flex justify-center">

          <VisitorCounter />

        </div>

      </section>

      {/* =========================================================
          FEATURED EVENTS
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <Reveal
          className="
            mb-10
            flex
            flex-col
            items-center
            text-center
          "
        >

          <span className="section-eyebrow">
            What's on
          </span>

          <h2
            className="
              mt-2
              font-display
              text-2xl
              font-bold
              sm:text-3xl
            "
          >
            Featured Events
          </h2>

        </Reveal>

        {/* EVENT CARDS */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {events.slice(0, 3).map((ev, i) => (
            <EventCard
              key={ev.id}
              event={ev}
              index={i}
            />
          ))}

        </div>

        {/* VIEW ALL */}

        <div className="mt-10 flex justify-center">

          <Link
            to="/events"
            className="btn-outline"
          >

            View All Events

            <FiArrowRight />

          </Link>

        </div>

      </section>

    </div>
  );
}