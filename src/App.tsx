import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import FloatingActionMenu from './components/FloatingActionMenu';
import AIChatAssistant from './components/AIChatAssistant';

import Home from './pages/Home';
import About from './pages/About';
import TechnoFeast from './pages/TechnoFeast';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Registration from './pages/Registration';
import RegistrationEvent from './pages/RegistrationEvent';
import StudentCorner from './pages/StudentCorner';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen pt-24"
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <>
      <Loader show={loading} />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/technofeast" element={<PageTransition><TechnoFeast /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/events/:eventId" element={<PageTransition><EventDetail /></PageTransition>} />
          <Route path="/registration" element={<PageTransition><Registration /></PageTransition>} />
          <Route path="/registration/:eventId" element={<PageTransition><RegistrationEvent /></PageTransition>} />
          <Route path="/student-corner" element={<PageTransition><StudentCorner /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      <Footer />
      <BackToTop />
      <FloatingActionMenu />
      <AIChatAssistant />
    </>
  );
}
