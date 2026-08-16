import { QRCodeSVG } from 'qrcode.react';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { FiDownload, FiBell } from 'react-icons/fi';

const announcements = [
  { date: '05 Aug 2026', text: 'Techno Feast 2026 registrations are now open across all events.' },
  { date: '20 Aug 2026', text: 'Abstract submission deadline for Tech Paper Presentation.' },
  { date: '10 Sep 2026', text: 'Final event schedule and coordinator list will be published.' },
];

export default function StudentCorner() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SEO title="Student Corner | Dept. of B.Sc. IT, SRCAS" description="Announcements, brochure download, and quick resources for B.Sc. IT students at SRCAS Coimbatore." />
      <Reveal className="text-center">
        <span className="section-eyebrow">For Students</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Student Corner</h1>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="glass-card lg:col-span-2 p-6" direction="left">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <FiBell className="text-neon-cyan" /> Latest Announcements
          </h2>
          <ul className="mt-4 space-y-4">
            {announcements.map((a, i) => (
              <li key={i} className="border-l-2 border-neon-purple/50 pl-4 text-sm">
                <p className="font-mono text-xs text-neon-cyan">{a.date}</p>
                <p className="mt-1 text-paper-100/70">{a.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="right" className="glass-card flex flex-col items-center gap-4 p-6 text-center">
          <h2 className="font-display text-lg font-bold">Scan to Visit</h2>
          <div className="rounded-xl bg-white p-3">
            <QRCodeSVG value="https://srcas-bscit-technofeast.example.edu" size={140} />
          </div>
          <p className="text-xs text-paper-100/55">Share this site instantly on any device.</p>
        </Reveal>
      </div>

      <Reveal className="glass-card mt-8 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-display text-lg font-bold">Techno Feast 2026 Brochure</h2>
          <p className="mt-1 text-sm text-paper-100/60">Download the full event guide, schedule, and rulebook.</p>
        </div>
        <a href="/assets/brochure.pdf" download className="btn-glow shrink-0">
          <FiDownload /> Download PDF
        </a>
      </Reveal>
    </div>
  );
}
