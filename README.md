# Saumay Killa — Portfolio

Live: [saumay-portfolio.vercel.app](https://saumay-portfolio.vercel.app)

This is a personal site, not a template. The goal is to let someone understand the work in under a minute, then talk to an on-site agent or book a call without leaving the page.

## Thought process

Most portfolios dump a résumé onto a webpage. That fails two ways: it is hard to scan, and it is a dead end. If someone wants to know whether you have shipped realtime AI, they should not hunt through six cards. If they want a conversation, they should not bounce to LinkedIn and wait.

So the site is built around three bets.

**1. Content is data, not components.**  
`info.json` is the source of truth for copy, projects, jobs, skills, and numbers. Adding a project should not require touching React. The pages are just views over that file. That keeps the design system honest: if a new job does not look right, the layout is wrong, not the content.

**2. Motion should feel like the page is listening, not performing.**  
Scroll is smoothed, sections ease in as they enter, and overlays lock the background so a modal never fights the page. The hero skills strip runs as an infinite marquee because a static grid of logos reads as filler. Nothing should animate just to prove Framer Motion is installed.

**3. The agent is a concierge, not a chatbot bolted on.**  
The bottom-right widget is chat plus voice, powered by LiveKit and Gemini Live. It only answers from a local knowledge file. It never hands out email, phone, or socials. If someone wants time, it checks real Cal.com availability and books only those slots. Let’s Talk on the navbar opens the same calendar as a popup, so the agent and the site agree.

That last part is the hard one. Language models like to be helpful. They will say 3pm is free because 3:15 is free, or they will confirm a time and then fail to book it. The booking tools are written to stop that: a named clock time is checked exactly, a miss returns the next closest real slot, and a booking only goes through if Cal.com still has that start.

Jailbreaks get a short joke and a redirect back to the work. The agent has no name on purpose. It is furniture for the portfolio, not a character.

## What you are looking at

A Next.js App Router site with a single long homepage and matching section routes. Navbar jumps are in-page. Content lives in `info.json`. Company and school marks live in `public/company`.

| Piece | Why it is there |
| --- | --- |
| `info.json` | Edit copy without rewriting components |
| `components/` | Hero, work, projects, skills, contact, Cal.com modal, agent widget |
| `agent/` | LiveKit worker: knowledge search, slot lookup, booking |
| `app/api/livekit/token` | Short-lived room token, rate-limited |
| Let’s Talk / Cal.com embed | Same 45-minute event the agent books against |

The agent’s time windows, in the visitor’s timezone:

- Morning 9:00–12:00
- Afternoon 12:00–16:00
- Evening 16:00–18:00

It offers at most three times, asks if another window would help, and only says a clock time is free when that exact start exists.

## Run the site

```bash
npm install
npm run dev
```

Copy `.env` from the keys you already use for LiveKit and Cal.com. Do not commit env files.

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_CAL_LINK` | Let’s Talk popup (`username/event-slug`) |
| `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` | Token route and agent widget |
| `CALCOM_USERNAME`, `CALCOM_EVENT_SLUG`, `CALCOM_API_KEY` | Agent availability and booking |
| `GOOGLE_API_KEY` | Gemini Live on the worker |

## Run the agent

The worker is a Python LiveKit agent in `agent/`. Cloud deploy is what production uses; local is for iteration.

```bash
cd agent
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
lk agent deploy --secrets-file .secrets.env --yes
```

A new chat session is required after a deploy. Closing the widget keeps the current room; a refresh starts clean.

## Update content

Edit `info.json`. A new project, job, skill, or achievement shows up on the matching section. Skill `icon` values are Simple Icons slugs (`react`, `nextdotjs`, `amazonaws`). Put org logos in `public/company` and point `logo` at them.

If the agent should know a new fact, add it to `agent/knowledge.md` and redeploy the worker. Keep contact details out of that file.

## Deploy

Pushing `main` deploys the Next.js app on Vercel. The LiveKit agent is separate: it only updates when you deploy from `agent/`. Both have to be current or the widget will talk to an old booking policy.
