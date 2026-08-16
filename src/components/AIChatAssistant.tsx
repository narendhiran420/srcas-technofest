import { useState, FormEvent, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { events, FEAST_VENUE } from '../data/events';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const WELCOME: Message = {
  role: 'bot',
  text: "Hi! I'm the Techno Feast 2026 assistant. Ask me about event dates, fees, venues, or registration.",
};

/**
 * Lightweight, fully client-side FAQ assistant — matches keywords in the
 * question against the events dataset and a few feast-wide facts. No
 * external API key required, so it works out of the box. To upgrade this
 * to a real LLM-powered assistant, swap `answerQuestion` for a call to
 * your backend / the Anthropic API (see README for guidance).
 */
function answerQuestion(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('date') && !q.match(/[a-z-]+ ?event/)) {
    return 'Techno Feast 2026 takes place on 18 September 2026 at ' + FEAST_VENUE + '.';
  }
  if (q.includes('register') || q.includes('registration')) {
    return 'Each event has its own registration form. Go to the Registration page, pick your event, and fill in your details — you\'ll get a confirmation email after submitting.';
  }
  if (q.includes('venue') || q.includes('where')) {
    return 'Techno Feast 2026 is held at ' + FEAST_VENUE + '.';
  }
  if (q.includes('contact') || q.includes('coordinator')) {
    return 'You can find faculty and student coordinator details on each event\'s detail page, or reach the department directly at +91 95001 12040 / office@srcas.ac.in via the Contact page.';
  }

  const matched = events.find((e) => q.includes(e.name.toLowerCase()) || q.includes(e.id.replace('-', ' ')));
  if (matched) {
    return `${matched.name}: ${matched.date}, ${matched.time} at ${matched.venue}. Fee: ${matched.fee}. Prize: ${matched.prize}.`;
  }

  if (q.includes('fee') || q.includes('cost') || q.includes('price')) {
    return 'Registration fees vary by event — most range from ₹50 to ₹500. Check the specific event\'s detail page for the exact fee.';
  }
  if (q.includes('prize')) {
    return 'Each event has its own prize details. Open the specific event page to see its prize information.';
  }

  return "I'm not sure about that one yet — try asking about a specific event, dates, fees, venue, or registration. You can also check the Techno Feast 2026 page for full details.";
}

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const botMsg: Message = { role: 'bot', text: answerQuestion(input) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput('');
  }

  return (
    <div id="ai-chat" className="fixed bottom-24 right-5 z-[8600] sm:bottom-8 sm:right-24">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card mb-3 flex h-96 w-80 flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-display text-sm font-bold gradient-text">Feast Assistant</p>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <FiX className="text-paper-100/50" />
              </button>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    m.role === 'bot'
                      ? 'bg-white/10 text-paper-100/80'
                      : 'ml-auto bg-aurora text-white'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an event..."
                className="flex-1 rounded-full bg-white/5 px-3 py-2 text-xs outline-none placeholder:text-paper-100/40"
              />
              <button type="submit" aria-label="Send" className="flex h-8 w-8 items-center justify-center rounded-full bg-aurora text-white">
                <FiSend size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI chat assistant"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-aurora text-white shadow-glow-purple"
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
}
