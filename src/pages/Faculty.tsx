import Reveal from '../components/Reveal';
import FacultyCard from '../components/FacultyCard';
import SEO from '../components/SEO';
import { faculty } from '../data/faculty';

export default function Faculty() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SEO title="Faculty | Dept. of B.Sc. IT, SRCAS" description="Meet the faculty team of the Department of B.Sc. Information Technology at Sri Ramakrishna College of Arts and Science, Coimbatore." />
      <Reveal className="text-center">
        <span className="section-eyebrow">Meet the Team</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Our Faculty</h1>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {faculty.map((f, i) => (
          <FacultyCard key={f.id} member={f} index={i} />
        ))}
      </div>
    </div>
  );
}
