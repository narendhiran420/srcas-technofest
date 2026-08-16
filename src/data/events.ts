export type EventSection =
  | 'TECHNO FEAST'
  | 'NEX IT';

export interface EventItem {
  id: string;
  name: string;

  category:
    | 'Technical'
    | 'Non-Technical';

  section: EventSection;

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
  // TECHNO FEAST
  // ==================================================

  {
    id: 'poster-design',
    name: 'Poster Design',
    category: 'Technical',
    section: 'TECHNO FEAST',

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

  {
    id: 'paper-presentation',
    name: 'Paper Presentation',
    category: 'Technical',
    section: 'TECHNO FEAST',

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

  {
    id: 'ai-prompt',
    name: 'AI Prompt Engineering',
    category: 'Technical',
    section: 'TECHNO FEAST',

    image: '/assets/ai_prompt_challenge.png',

    shortDescription:
      'Craft creative and effective AI prompts to solve on-the-spot challenges using generative AI tools.',

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

  {
    id: 'debugging',
    name: 'Debugging',
    category: 'Technical',
    section: 'TECHNO FEAST',

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

  {
    id: 'connection',
    name: 'Connections',
    category: 'Non-Technical',
    section: 'TECHNO FEAST',

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
      'Clues revealed one at a time.',
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

  {
    id: 'cooking-without-fire',
    name: 'Cooking Without Fire',
    category: 'Non-Technical',
    section: 'TECHNO FEAST',

    image: '/assets/cooking_without_fire.png',

    shortDescription:
      'Prepare a creative dish without using any flame.',

    date: '18 Sep 2026',

    time: '11:00 AM – 12:30 PM',

    venue: FEAST_VENUE,

    fee: '₹150 per team',

    prize: 'Certificates',

    rules: [
      'Teams of up to 2 members.',
      'No open flame or induction cooking allowed.',
      'Ingredients and equipment must be arranged by participants.',
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

  // ==================================================
  // NEX IT
  // INTER-DEPARTMENT FUNCTION
  // FREE REGISTRATION
  // ==================================================

  {
    id: 'nex-it-poster-design',
    name: 'Poster Design',
    category: 'Non-Technical',
    section: 'NEX IT',

    image: '/assets/poster_design.png',

    shortDescription:
      'Show your creativity and design skills through an exciting poster design challenge.',

    date: '18 Sep 2026',

    time: '10:00 AM – 11:30 AM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Individual participation.',
      'Topic will be provided by the organizers.',
      'Complete the poster within the given time.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: false,
  },

  {
    id: 'nex-it-paper-presentation',
    name: 'Paper Presentation',
    category: 'Technical',
    section: 'NEX IT',

    image: '/assets/paper_presentation.png',

    shortDescription:
      'Present innovative ideas, research concepts and emerging technology topics.',

    date: '18 Sep 2026',

    time: '10:00 AM – 1:00 PM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Individual or team participation.',
      'Presentation must be based on a relevant topic.',
      'Participants must follow the allotted time.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: true,
  },

  {
    id: 'nex-it-debugging',
    name: 'Debugging',
    category: 'Technical',
    section: 'NEX IT',

    image: '/assets/debugging.png',

    shortDescription:
      'Find and fix programming errors within the given time.',

    date: '18 Sep 2026',

    time: '1:30 PM – 3:00 PM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Individual participation.',
      'Programming errors will be provided.',
      'Participants must identify and correct the errors.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: false,
  },

  {
    id: 'nex-it-ai-prompting',
    name: 'AI Prompting',
    category: 'Technical',
    section: 'NEX IT',

    image: '/assets/ai_prompt_challenge.png',

    shortDescription:
      'Explore creative and effective ways to communicate with AI systems.',

    date: '18 Sep 2026',

    time: '11:30 AM – 1:00 PM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Individual participation.',
      'Prompts will be evaluated based on creativity and effectiveness.',
      'Participants must follow event instructions.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: false,
  },

  {
    id: 'nex-it-connections',
    name: 'Connections',
    category: 'Non-Technical',
    section: 'NEX IT',

    image: '/assets/connections.png',

    shortDescription:
      'Test your observation, thinking and connection skills.',

    date: '18 Sep 2026',

    time: '1:30 PM – 3:00 PM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Team participation.',
      'Questions and clues will be provided.',
      'Participants must identify the correct connection.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: true,
  },

  {
    id: 'nex-it-cooking-without-fire',
    name: 'Cooking Without Fire',
    category: 'Non-Technical',
    section: 'NEX IT',

    image: '/assets/cooking_without_fire.png',

    shortDescription:
      'Prepare creative dishes without using fire.',

    date: '18 Sep 2026',

    time: '11:00 AM – 12:30 PM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Team participation.',
      'No fire or heating equipment.',
      'Participants should bring required ingredients.',
      'Maintain cleanliness and hygiene.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: true,
  },

  {
    id: 'nex-it-wealth-out-of-waste',
    name: 'Wealth Out of Waste',
    category: 'Non-Technical',
    section: 'NEX IT',

    image: '/assets/wealth_out_of_waste.png',

    shortDescription:
      'Turn waste materials into useful and creative products.',

    date: '18 Sep 2026',

    time: '10:00 AM – 12:00 PM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Individual or team participation.',
      'Use recyclable or waste materials.',
      'Participants should bring their own materials.',
      'The final product will be evaluated for creativity and usefulness.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: true,
  },

  {
    id: 'nex-it-fake-virus-detection',
    name: 'Fake Virus Detection',
    category: 'Technical',
    section: 'NEX IT',

    image: '/assets/fake_virus_detection.png',

    shortDescription:
      'Test your cyber awareness by identifying fake virus alerts and suspicious scenarios.',

    date: '18 Sep 2026',

    time: '2:00 PM – 3:00 PM',

    venue: FEAST_VENUE,

    fee: 'FREE',

    prize: 'Certificates + Prizes',

    rules: [
      'Individual participation.',
      'Only simulated examples will be used.',
      'No real malware or harmful software will be used.',
      'Participants must identify suspicious indicators.',
      "Judges' decision is final.",
    ],

    coordinators: [
      {
        faculty: 'NEX IT Faculty Coordinator',
        student: 'NEX IT Student Coordinator',
        phone: '+91 95001 12040',
      },
    ],

    teamEvent: false,
  },
];

// ==================================================
// HELPERS
// ==================================================

export const technoFeastEvents =
  events.filter(
    (event) =>
      event.section === 'TECHNO FEAST'
  );

export const NexITEvents =
  events.filter(
    (event) =>
      event.section === 'NEX IT'
  );

export function getEventById(
  id: string
): EventItem | undefined {
  return events.find(
    (event) => event.id === id
  );
}