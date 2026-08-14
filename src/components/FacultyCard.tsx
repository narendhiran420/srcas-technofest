import { motion } from 'framer-motion';
import { FiMail, FiAward } from 'react-icons/fi';
import { FacultyMember } from '../data/faculty';

export default function FacultyCard({ member, index = 0 }: { member: FacultyMember; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="glass-card flex flex-col items-center p-6 text-center"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/10">
        <img
          src={member.photo}
          alt={member.name}
          onError={(e) => ((e.target as HTMLImageElement).src = '/assets/faculty/placeholder.jpg')}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-4 font-display text-base font-bold">{member.name}</h3>
      <p className="mt-1 text-xs font-medium text-neon-cyan">{member.designation}</p>
      <p className="mt-2 text-xs text-paper-100/60">{member.qualification}</p>
      <div className="mt-4 flex flex-col gap-1.5 text-xs text-paper-100/60">
        <p className="flex items-center justify-center gap-2"><FiMail className="text-neon-blue" /> {member.email}</p>
        <p className="flex items-center justify-center gap-2"><FiAward className="text-neon-purple" /> {member.experience} experience</p>
      </div>
    </motion.div>
  );
}
