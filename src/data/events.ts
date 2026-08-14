export interface EventItem {
  id: string;
  name: string;
  category: 'Technical' | 'Non-Technical';
  image: string;
  shortDescription: string;
  date: string;
  time: string;
  venue: string;
  fee: string;
  prize: string;
  rules: string[];
  coordinators: {
    faculty: string;
    student: string;
    phone: string;
  }[];
  teamEvent: boolean;
}

export const FEAST_VENUE =
  'Nava India, Avinashi Road, Peelamedu, Coimbatore - 641006, Tamil Nadu, India';

export const events: EventItem[] = [
  // ==================================================
  // 1. POSTER DESIGN
  // ==================================================
  {
    id: 'poster-design',
    name: 'Poster Design',
    category: 'Technical',
    image: '/assets/poster_design.png',

    shortDescription:
      'Design an eye-catching digital poster on a surprise tech theme within the given time limit.',

    date: '18 Sep 2026',
    time: '10:00 AM – 11:30 AM',
    venue: FEAST_VENUE,

    fee: '₹100 per head',
    prize: 'Certificates',

    rules: [
      'Individual participation only.',
      'Theme will be announced on the spot.',
      'Photoshop, Canva, or Illustrator may be used.',
      'Final poster must be submitted within the given time frame.',
    ],

    coordinators: [
      {
        faculty: 'Faculty Coordinator',
        student: 'Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: false,
  },

  // ==================================================
  // 2. PAPER PRESENTATION
  // ==================================================
  {
    id: 'paper-presentation',
    name: 'Paper Presentation',
    category: 'Technical',
    image: '/assets/paper_presentation.png',

    shortDescription:
      'Present original research or applied ideas on emerging technology themes to an expert panel.',

    date: '18 Sep 2026',
    time: '10:00 AM – 1:00 PM',
    venue: FEAST_VENUE,

    fee: '₹150 per team',
    prize: 'Certificates',

    rules: [
      'Teams of up to 2 members.',
      'Abstract submission required before the event.',
      '8 minutes presentation + 3 minutes Q&A.',
      'Topics: AI, Cloud, Cybersecurity, IoT, Sustainable Tech.',
    ],

    coordinators: [
      {
        faculty: 'Faculty Coordinator',
        student: 'Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: true,
  },

  // ==================================================
  // 3. AI PROMPT ENGINEERING
  // ==================================================
  {
    id: 'ai-prompt',
    name: 'AI Prompt Engineering',
    category: 'Technical',
    image: '/assets/ai_prompt_challenge.png',

    shortDescription:
      'Craft the most creative and effective AI prompts to solve on-the-spot challenges using generative AI tools.',

    date: '18 Sep 2026',
    time: '11:30 AM – 1:00 PM',
    venue: FEAST_VENUE,

    fee: '₹100 per head',
    prize: 'Certificates',

    rules: [
      'Individual participation only.',
      'Challenges revealed at the start of the round.',
      'Judged on creativity, accuracy, and prompt efficiency.',
      'Use of unauthorized external help is not allowed.',
    ],

    coordinators: [
      {
        faculty: 'Faculty Coordinator',
        student: 'Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: false,
  },

  // ==================================================
  // 4. DEBUGGING
  // ==================================================
  {
    id: 'debugging',
    name: 'Debugging',
    category: 'Technical',
    image: '/assets/debugging.png',

    shortDescription:
      'Race against the clock to spot and fix bugs in broken code snippets across multiple languages.',

    date: '18 Sep 2026',
    time: '1:30 PM – 3:00 PM',
    venue: FEAST_VENUE,

    fee: '₹100 per head',
    prize: 'Certificates',

    rules: [
      'Individual participation only.',
      'Languages: C, C++, Java, Python.',
      'Multiple rounds of increasing difficulty.',
      'Fastest correct fix in each round scores highest.',
    ],

    coordinators: [
      {
        faculty: 'Faculty Coordinator',
        student: 'Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: false,
  },

  // ==================================================
  // 5. CONNECTIONS
  // ==================================================
  {
    id: 'connection',
    name: 'Connections',
    category: 'Non-Technical',
    image: '/assets/connections.png',

    shortDescription:
      'A fun guessing game where teams connect clues, images, and hints to identify the hidden theme.',

    date: '18 Sep 2026',
    time: '1:30 PM – 3:00 PM',
    venue: FEAST_VENUE,

    fee: '₹100 per team',
    prize: 'Certificates',

    rules: [
      'Teams of up to 3 members.',
      'Clues revealed one at a time — early correct guesses score more.',
      'No use of phones or external help.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'Faculty Coordinator',
        student: 'Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: true,
  },

  // ==================================================
  // 6. COOKING WITHOUT FIRE
  // ==================================================
  {
    id: 'cooking-without-fire',
    name: 'Cooking Without Fire',
    category: 'Non-Technical',
    image: '/assets/cooking_without_fire.png',

    shortDescription:
      'Whip up a creative, delicious dish without using any flame — judged on taste, presentation, and hygiene.',

    date: '18 Sep 2026',
    time: '11:00 AM – 12:30 PM',
    venue: FEAST_VENUE,

    fee: '₹150 per team',
    prize: 'Certificates',

    rules: [
      'Teams of up to 2 members.',
      'No open flame or induction cooking allowed.',
      'Ingredients and equipment to be arranged by participants.',
      'Judged on taste, presentation, hygiene, and creativity.',
    ],

    coordinators: [
      {
        faculty: 'Faculty Coordinator',
        student: 'Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: true,
  },
];

// ==================================================
// GET EVENT BY ID
// ==================================================

export function getEventById(
  id: string
): EventItem | undefined {
  return events.find((event) => event.id === id);
}