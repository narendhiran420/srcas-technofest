import { useState, FormEvent } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Wire this up to EmailJS (see src/utils/emailjs.ts) or a Firebase Function.
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SEO title="Contact | Dept. of B.Sc. IT, SRCAS" description="Get in touch with the Department of B.Sc. Information Technology at Sri Ramakrishna College of Arts and Science, Coimbatore." />
      <Reveal className="text-center">
        <span className="section-eyebrow">Get in Touch</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Contact Us</h1>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal direction="left" className="glass-card overflow-hidden">
          <iframe
            title="Techno Feast 2026 Venue Map"
            src="https://www.google.com/maps?q=Nava+India+Avinashi+Road+Peelamedu+Coimbatore+641006&output=embed"
            className="h-72 w-full grayscale invert-[.92] contrast-[1.1] sm:h-full"
            loading="lazy"
          />
        </Reveal>

        <Reveal direction="right" className="glass-card p-6">
          {sent ? (
            <p className="py-10 text-center text-sm text-neon-cyan">Thanks! Your message has been noted — we'll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Your Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-neon-cyan/60" />
              <input required type="email" placeholder="Your Email" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-neon-cyan/60" />
              <textarea required placeholder="Your Message" rows={4} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-neon-cyan/60" />
              <button type="submit" className="btn-glow w-full">
                <FiSend /> Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ContactItem icon={FiMapPin} label="Address" value="Nava India, Avinashi Road, Peelamedu, Coimbatore - 641006, Tamil Nadu, India" />
        <ContactItem icon={FiPhone} label="Phone" value="+91 95001 12040" />
        <ContactItem icon={FiMail} label="Email" value="office@srcas.ac.in" />
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass-card flex items-start gap-3 p-5">
      <Icon className="mt-0.5 text-neon-cyan" />
      <div>
        <p className="text-xs uppercase tracking-wide text-paper-100/50">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
