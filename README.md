# Muhammad Wahaj Portfolio

Production-ready React + TypeScript portfolio for Muhammad Wahaj.

## Stack
- React 19 + TypeScript + Vite
- Tailwind CSS
- GSAP + Framer Motion + SplitType
- React Router
- React Hook Form + Zod
- React Helmet Async
- EmailJS/Formspree contact integration
- Vercel Analytics

## Setup
```bash
npm install
npm run dev
```

## Environment variables
Create `.env` for contact form provider:

```bash
# Option A: Formspree
VITE_FORMSPREE_ENDPOINT=

# Option B: EmailJS
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

## Build
```bash
npm run lint
npm run build
```

## Notes
- Replace `public/resume.pdf` with your real resume file.
- Update `src/data/` for future CMS-style content migration.
