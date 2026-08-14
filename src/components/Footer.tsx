import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-900/60 px-6 py-14 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aurora text-white">IT</span>
            <span className="gradient-text">B.Sc. IT · SRCAS</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-paper-100/60">
            Department of B.Sc. Information Technology, Sri Ramakrishna College of Arts and Science, Coimbatore.
          </p>
          <div className="mt-5 flex gap-3">
            {[FiInstagram, FiLinkedin, FiYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:border-neon-cyan/60 hover:text-neon-cyan"
                aria-label="Social link"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="section-eyebrow">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-paper-100/70">
            <li><Link to="/technofeast" className="hover:text-neon-cyan">Techno Feast 2026</Link></li>
            <li><Link to="/events" className="hover:text-neon-cyan">Events</Link></li>
            <li><Link to="/registration" className="hover:text-neon-cyan">Registration</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="section-eyebrow">Department Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-paper-100/70">
            <li className="flex items-center gap-2"><FiMapPin className="text-neon-purple" /> Nava India, Avinashi Road, Peelamedu, Coimbatore - 641006</li>
            <li className="flex items-center gap-2"><FiPhone className="text-neon-blue" /> +91 95001 12040</li>
            <li className="flex items-center gap-2"><FiMail className="text-neon-cyan" /> office@srcas.ac.in</li>
          </ul>
        </div>

        <div>
          <h4 className="section-eyebrow">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-paper-100/70">
            <li><a href="#" className="hover:text-neon-cyan">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-neon-cyan">Terms &amp; Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-paper-100/50 sm:flex-row">
        <p>© {new Date().getFullYear()} Department of B.Sc. Information Technology, SRCAS Coimbatore. All rights reserved.</p>
        <p>Designed &amp; developed by the B.Sc. IT Web Team</p>
      </div>
    </footer>
  );
}
