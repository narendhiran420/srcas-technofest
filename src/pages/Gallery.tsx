import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';

// Replace these with real photo paths in /public/assets/gallery/
const photos = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  src: `/assets/gallery/photo-${(i % 6) + 1}.jpg`,
  tall: i % 3 === 0,
}));

export default function Gallery() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SEO title="Gallery | Dept. of B.Sc. IT, SRCAS" description="Photos from campus life, laboratories, and department events at the Dept. of B.Sc. Information Technology, SRCAS Coimbatore." />
      <Reveal className="text-center">
        <span className="section-eyebrow">Moments Captured</span>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Gallery</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-paper-100/65">
          Campus life, laboratories, and highlights from previous department events.
        </p>
      </Reveal>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
            whileHover={{ scale: 1.02 }}
            className={`glass-card overflow-hidden ${p.tall ? 'h-80' : 'h-56'}`}
          >
            <img
              src={p.src}
              alt="Department gallery"
              onError={(e) => ((e.target as HTMLImageElement).src = '/assets/gallery/placeholder.jpg')}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
