import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiX, FiCommand } from 'react-icons/fi';
import { events } from '../data/events';

interface SearchItem {
  label: string;
  path: string;
  group: 'Pages' | 'Events';
}

const pages: SearchItem[] = [
  { label: 'Home', path: '/', group: 'Pages' },
  { label: 'About Department', path: '/about', group: 'Pages' },
  { label: 'Techno Feast 2026', path: '/technofeast', group: 'Pages' },
  { label: 'Events', path: '/events', group: 'Pages' },
  { label: 'Registration', path: '/registration', group: 'Pages' },
  { label: 'Faculty', path: '/faculty', group: 'Pages' },
  { label: 'Gallery', path: '/gallery', group: 'Pages' },
  { label: 'Student Corner', path: '/student-corner', group: 'Pages' },
  { label: 'Contact', path: '/contact', group: 'Pages' },
];

const eventItems: SearchItem[] = events.map((e) => ({
  label: e.name,
  path: `/events/${e.id}`,
  group: 'Events',
}));

const allItems = [...pages, ...eventItems];

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return allItems;
    return allItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  function go(path: string) {
    navigate(path);
    setOpen(false);
    setQuery('');
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="hidden h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-xs text-paper-100/60 backdrop-blur-md transition hover:border-neon-blue/60 sm:flex"
      >
        <FiSearch />
        <span className="hidden lg:inline">Search</span>
        <span className="hidden items-center gap-0.5 rounded border border-white/15 px-1.5 py-0.5 text-[10px] lg:flex">
          <FiCommand size={10} />K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9500] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-lg overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <FiSearch className="text-neon-cyan" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, events..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-paper-100/40"
                />
                <button onClick={() => setOpen(false)} aria-label="Close search">
                  <FiX className="text-paper-100/50" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-paper-100/50">No results found.</p>
                )}
                {(['Pages', 'Events'] as const).map((group) => {
                  const items = results.filter((r) => r.group === group);
                  if (items.length === 0) return null;
                  return (
                    <div key={group} className="mb-2">
                      <p className="px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper-100/40">{group}</p>
                      {items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => go(item.path)}
                          className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm hover:bg-white/10"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
