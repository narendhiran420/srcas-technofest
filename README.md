# Dept. of B.Sc. Information Technology — SRCAS Techno Feast 2026

Premium, dark-themed (with animated light mode) official department website, built with
React + Vite + TypeScript + Tailwind CSS + Framer Motion + Three.js + Firebase + EmailJS.

## 1. Install

```bash
npm install
```

## 2. Configure Firebase (registrations database)

1. Create a project at https://console.firebase.google.com
2. Enable **Firestore Database** and **Storage** (for optional ID uploads).
3. Copy your web app config into `src/firebase/config.ts`, replacing the `YOUR_...` placeholders.
4. Recommended Firestore security rules (adjust as needed — this allows public writes for
   registration but blocks reads, so only you can view submissions via the console/admin SDK):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations_{eventId}/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

Each event automatically writes to its own collection, e.g. `registrations_code-storm`,
`registrations_robo-race`, etc. — see `src/firebase/registrations.ts`.

## 3. Configure EmailJS (confirmation emails)

1. Create an account at https://www.emailjs.com and set up an email service + template.
2. Your template should accept `to_name`, `to_email`, and `event_name` variables.
3. Fill in `SERVICE_ID`, `TEMPLATE_ID`, and `PUBLIC_KEY` in `src/utils/emailjs.ts`.

## 4. Add real content

- **Images**: drop files into `public/assets/events/`, `public/assets/faculty/`,
  `public/assets/gallery/`, plus `logo-college.png`, `logo-department.png`, and
  `brochure.pdf` in `public/assets/`.
- **Events**: edit `src/data/events.ts` — add a new object to the array and it automatically
  gets its own detail page, its own registration form, and its own Firestore collection.
- **Faculty**: edit `src/data/faculty.ts`.
- **PWA icons**: add `pwa-192x192.png` / `pwa-512x512.png` / `apple-touch-icon.png` to `public/`.

## 5. Run locally

```bash
npm run dev
```

## 6. Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Firebase Hosting, Vercel, or Netlify.

## Project structure

```
src/
  components/     Reusable UI (Navbar, Footer, EventCard, RegistrationForm, ...)
  context/        ThemeContext (dark/light mode)
  data/           events.ts, faculty.ts — edit these to update site content
  firebase/       config.ts (your credentials), registrations.ts (Firestore writes)
  pages/          One file per route (Home, TechnoFeast, Events, Registration, ...)
  utils/          emailjs.ts (confirmation email sender)
```

## Notes

- **AI Chat Assistant**: fully client-side FAQ bot (`src/components/AIChatAssistant.tsx`) —
  answers questions about events, fees, venues, and registration with no API key needed.
  To upgrade it to a real LLM, replace `answerQuestion()` with a call to your backend or
  the Anthropic API.
- **Search**: press `Cmd/Ctrl + K` or tap the search pill in the navbar to jump to any page
  or event instantly (`src/components/SearchBar.tsx`).
- **Notifications**: sample dropdown in the navbar (`src/components/NotificationBell.tsx`) —
  swap the static array for a Firestore collection to make it dynamic.
- **Visitor Counter**: increments a Firestore counter once per browser session, with an
  automatic local-only fallback if Firebase isn't configured yet
  (`src/components/VisitorCounter.tsx`).
- **Music Toggle**: silently no-ops until you add `public/assets/ambient-loop.mp3`.
- **Magnetic buttons & ripple clicks**: wrap any CTA in `<MagneticButton>` — already applied
  to the hero's "Register Now" / "Explore Events" buttons.
- The custom cursor auto-disables on touch devices.
- All animations respect `prefers-reduced-motion`.
- SEO: every page sets its own `<title>` and meta description via `src/components/SEO.tsx`
  (react-helmet-async).
