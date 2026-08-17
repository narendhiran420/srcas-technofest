import Reveal from '../components/Reveal';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SEO title="About Department | Dept. of B.Sc. IT, SRCAS" description="Learn about the PG & Research Department Information Technology at Sri Ramakrishna College of Arts &  Science, Coimbatore — vision, mission, and values." />
      <Reveal className="text-center">
        <span className="section-eyebrow">Who We Are</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">About the Department</h1>
      </Reveal>

      <Reveal delay={0.15} className="glass-card mt-10 p-8 leading-relaxed text-paper-100/75">
        <p>
          The PG & Research Department Information Technology at Sri Ramakrishna College of Arts &  Science, Coimbatore,
          is committed to building industry-ready technologists through a curriculum that blends strong fundamentals
          with hands-on exposure to modern software development, cloud computing, data science, and emerging
          technologies.
        </p>
        <p className="mt-4">
          With well-equipped laboratories, an experienced faculty team, and strong industry connections, the
          department nurtures analytical thinking, problem-solving, and innovation among students — preparing them
          for careers in software engineering, IT consulting, research, and entrepreneurship.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { title: 'Vision', body: 'To be a center of excellence in Information Technology education, producing globally competent professionals.' },
          { title: 'Mission', body: 'To deliver quality IT education through innovative teaching, research, and industry collaboration.' },
          { title: 'Values', body: 'Integrity, innovation, and a culture of continuous learning drive everything the department does.' },
        ].map((item, i) => (
          <Reveal key={item.title} delay={i * 0.1} className="glass-card p-6">
            <h3 className="font-display font-bold text-neon-cyan">{item.title}</h3>
            <p className="mt-2 text-sm text-paper-100/65">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
