import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  show: boolean;
}

export default function Loader({ show }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;

    setProgress(0);

    const timer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(timer);
          return 100;
        }

        return value + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [2200]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center overflow-hidden bg-[#030712]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.7 }}
        >
          {/* ================= BACKGROUND ================= */}

          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at center,
                  rgba(34,211,238,0.12),
                  transparent 32%
                ),
                radial-gradient(
                  circle at 15% 20%,
                  rgba(59,130,246,0.10),
                  transparent 25%
                ),
                radial-gradient(
                  circle at 85% 80%,
                  rgba(168,85,247,0.10),
                  transparent 25%
                )
              `,
            }}
          />

          {/* Background Grid */}

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,.5) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,.5) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "55px 55px",
            }}
          />

          {/* ================= PARTICLES ================= */}

          {[...Array(18)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyan-300/70"
              style={{
                left: `${5 + ((i * 17) % 90)}%`,
                top: `${8 + ((i * 23) % 82)}%`,
                boxShadow: "0 0 12px rgba(34,211,238,.8)",
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.15, 0.8, 0.15],
                scale: [0.6, 1.2, 0.6],
              }}
              transition={{
                duration: 2.5 + (i % 4),
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}

          {/* ================= MAIN CONTENT ================= */}

          <div className="relative z-10 flex flex-col items-center">

            {/* ================= 3D LOADER ================= */}

            <div
              className="
                relative
                flex
                h-[300px]
                w-[300px]
                items-center
                justify-center
                sm:h-[390px]
                sm:w-[390px]
              "
            >

              {/* Outer Glow */}

              <motion.div
                className="
                  absolute
                  h-[250px]
                  w-[250px]
                  rounded-full
                  bg-cyan-400/10
                  blur-[65px]
                  sm:h-[330px]
                  sm:w-[330px]
                "
                animate={{
                  scale: [0.85, 1.1, 0.85],
                  opacity: [0.35, 0.7, 0.35],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* ================= OUTER RING ================= */}

              <motion.div
                className="
                  absolute
                  h-[285px]
                  w-[285px]
                  rounded-full
                  border
                  border-cyan-300/20
                  sm:h-[365px]
                  sm:w-[365px]
                "
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >

                {/* Cyan Dot */}

                <div
                  className="
                    absolute
                    -top-2
                    left-1/2
                    h-4
                    w-4
                    -translate-x-1/2
                    rounded-full
                    bg-cyan-300
                    shadow-[0_0_25px_#22d3ee]
                  "
                />

                {/* Purple Dot */}

                <div
                  className="
                    absolute
                    -bottom-1
                    left-[18%]
                    h-2
                    w-2
                    rounded-full
                    bg-purple-400
                    shadow-[0_0_18px_#a855f7]
                  "
                />

              </motion.div>

              {/* ================= DASHED RING ================= */}

              <motion.div
                className="
                  absolute
                  h-[245px]
                  w-[245px]
                  rounded-full
                  border-2
                  border-dashed
                  border-blue-400/30
                  sm:h-[315px]
                  sm:w-[315px]
                "
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* ================= 3D TILTED RING ================= */}

              <motion.div
                className="
                  absolute
                  h-[220px]
                  w-[220px]
                  rounded-full
                  border-[3px]
                  border-transparent
                  sm:h-[285px]
                  sm:w-[285px]
                "
                style={{
                  borderTopColor: "rgba(34,211,238,.9)",
                  borderRightColor: "rgba(59,130,246,.55)",
                  borderBottomColor: "rgba(168,85,247,.7)",
                  transform: "rotateX(62deg) rotateZ(15deg)",
                  boxShadow:
                    "0 0 25px rgba(34,211,238,.35), inset 0 0 25px rgba(59,130,246,.12)",
                }}
                animate={{
                  rotateZ: [15, 375],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* ================= INNER RING ================= */}

              <motion.div
                className="
                  absolute
                  h-[185px]
                  w-[185px]
                  rounded-full
                  border-2
                  border-cyan-300/50
                  sm:h-[240px]
                  sm:w-[240px]
                "
                style={{
                  transform: "rotateX(65deg) rotateZ(-20deg)",
                  boxShadow:
                    "0 0 30px rgba(34,211,238,.18)",
                }}
                animate={{
                  rotateZ: [-20, -380],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* ================= CENTER GLASS CIRCLE ================= */}

              <motion.div
                className="
                  relative
                  flex
                  h-[145px]
                  w-[145px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/[0.06]
                  backdrop-blur-xl
                  sm:h-[175px]
                  sm:w-[175px]
                "
                animate={{
                  scale: [1, 1.035, 1],
                  boxShadow: [
                    "0 0 25px rgba(34,211,238,.12)",
                    "0 0 60px rgba(34,211,238,.3)",
                    "0 0 25px rgba(34,211,238,.12)",
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >

                {/* Inner Highlight */}

                <div
                  className="
                    absolute
                    inset-2
                    rounded-full
                    border
                    border-white/10
                    bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,.18),transparent_25%),radial-gradient(circle,rgba(34,211,238,.10),transparent_65%)]
                  "
                />

                {/* ================= DEPARTMENT LOGO ================= */}

                <motion.div
                  className="
                    relative
                    z-10
                    flex
                    h-[115px]
                    w-[115px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-2
                    border-cyan-300/60
                    bg-white
                    shadow-[0_0_30px_rgba(34,211,238,0.35)]
                    sm:h-[140px]
                    sm:w-[140px]
                  "
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >

                  <img
                    src="/assets/logo-department.png"
                    alt="B.Sc IT Department"
                    className="
                      h-full
                      w-full
                      rounded-full
                      object-contain
                      p-2
                    "
                  />

                </motion.div>

              </motion.div>

              {/* ================= ORBITING LIGHT ================= */}

              <motion.div
                className="
                  absolute
                  h-[205px]
                  w-[205px]
                  sm:h-[270px]
                  sm:w-[270px]
                "
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span
                  className="
                    absolute
                    -top-1
                    left-1/2
                    h-3
                    w-3
                    -translate-x-1/2
                    rounded-full
                    bg-white
                    shadow-[0_0_20px_#22d3ee]
                  "
                />
              </motion.div>

            </div>

            {/* ================= TECHNO FEAST ================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
              }}
              className="mt-1 text-center"
            >

              <h1
                className="
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-300
                  to-purple-400
                  bg-clip-text
                  text-4xl
                  font-black
                  tracking-[0.08em]
                  text-transparent
                  sm:text-5xl
                "
              >
                TECHNO FEAST
              </h1>

              <p
                className="
                  mt-2
                  text-xs
                  font-semibold
                  tracking-[0.55em]
                  text-white/50
                "
              >
                2026
              </p>

            </motion.div>

            {/* ================= PROGRESS BAR ================= */}

            <div className="mt-7 w-64 sm:w-80">

              <div
                className="
                  h-[2px]
                  overflow-hidden
                  rounded-full
                  bg-white/10
                "
              >

                <motion.div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-500
                    to-purple-500
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

              <div
                className="
                  mt-2
                  flex
                  justify-between
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/35
                "
              >

                <span>
                  Initializing
                </span>

                <span>
                  {progress}%
                </span>

              </div>

            </div>

            {/* ================= DEPARTMENT TEXT ================= */}

            <motion.p
              className="
                mt-5
                text-[9px]
                uppercase
                tracking-[0.35em]
                text-cyan-200/40
              "
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Department of B.Sc. Information Technology
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}