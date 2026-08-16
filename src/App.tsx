import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import BackToTop from "./components/BackToTop";
import FloatingActionMenu from "./components/FloatingActionMenu";
import AIChatAssistant from "./components/AIChatAssistant";

import Home from "./pages/Home";
import About from "./pages/About";
import TechnoFeast from "./pages/TechnoFeast";
import Events from "./pages/Events";
import NexIT from "./pages/NexIT";
import EventDetail from "./pages/EventDetail";
import Registration from "./pages/Registration";
import RegistrationEvent from "./pages/RegistrationEvent";
import StudentCorner from "./pages/StudentCorner";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/* =========================================================
   PAGE TRANSITION
========================================================= */

function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -12,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen pt-[68px] sm:pt-24"
    >
      {children}
    </motion.main>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  /* =======================================================
     INITIAL WEBSITE LOADER
     
     IMPORTANT:
     [] means loader runs ONLY when website is opened/refreshed.
     It will NOT run when changing routes.
  ======================================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =======================================================
     SCROLL TO TOP WHEN ROUTE CHANGES
  ======================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* ===================================================
          INITIAL LOADER
          
          Appears only when website is opened/refreshed.
      =================================================== */}

      <Loader show={loading} />

      {/* ===================================================
          GLOBAL UI
      =================================================== */}

      <ScrollProgress />

      <CustomCursor />

      <Navbar />

      {/* ===================================================
          ROUTES + PAGE TRANSITIONS
      =================================================== */}

      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <Routes
          location={location}
          key={location.pathname}
        >

          {/* =================================================
              HOME
          ================================================= */}

          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          {/* =================================================
              ABOUT
          ================================================= */}

          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />

          {/* =================================================
              TECHNO FEAST
          ================================================= */}

          <Route
            path="/technofeast"
            element={
              <PageTransition>
                <TechnoFeast />
              </PageTransition>
            }
          />

          {/* =================================================
              EVENTS
          ================================================= */}

          <Route
            path="/events"
            element={
              <PageTransition>
                <Events />
              </PageTransition>
            }
          />

          {/* =================================================
              NEX IT
          ================================================= */}

          <Route
            path="/nex-it"
            element={
              <PageTransition>
                <NexIT />
              </PageTransition>
            }
          />

          {/* =================================================
              EVENT DETAIL
          ================================================= */}

          <Route
            path="/events/:eventId"
            element={
              <PageTransition>
                <EventDetail />
              </PageTransition>
            }
          />

          {/* =================================================
              REGISTRATION
          ================================================= */}

          <Route
            path="/registration"
            element={
              <PageTransition>
                <Registration />
              </PageTransition>
            }
          />

          {/* =================================================
              EVENT REGISTRATION
          ================================================= */}

          <Route
            path="/registration/:eventId"
            element={
              <PageTransition>
                <RegistrationEvent />
              </PageTransition>
            }
          />

          {/* =================================================
              STUDENT CORNER
          ================================================= */}

          <Route
            path="/student-corner"
            element={
              <PageTransition>
                <StudentCorner />
              </PageTransition>
            }
          />

          {/* =================================================
              CONTACT
          ================================================= */}

          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />

          {/* =================================================
              404
          ================================================= */}

          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />

        </Routes>
      </AnimatePresence>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <Footer />

      {/* ===================================================
          FLOATING COMPONENTS
      =================================================== */}

      <BackToTop />

      <FloatingActionMenu />

      <AIChatAssistant />
    </>
  );
}