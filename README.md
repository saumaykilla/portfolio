# Portfolio 🎨💼

**Modern, Responsive Portfolio Website Showcasing Projects and Skills**

A beautifully designed, fully responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion featuring smooth animations and interactive components.

---

## 🌟 Features

- ✨ **Smooth Animations** - Framer Motion powered transitions
- 📱 **Responsive Design** - Looks great on all devices
- 🎨 **Modern UI** - Clean and professional design
- 🔝 **Performance** - Optimized and fast loading
- 🎯 **Project Showcase** - Highlight your best work
- 📊 **Skills Section** - Display technical expertise
- 🎓 **Timeline** - Professional journey visualization
- 📞 **Contact Form** - Easy visitor communication
- 🎭 **Custom Cursor** - Unique interactive elements
- 📈 **Scroll Progress** - Visual scroll indicator

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15+ with React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Shadcn UI components
- React Hook Form
- React Query

**Utilities:**
- Vercel Analytics
- Custom hooks

---

## 📊 Language Composition

```
TypeScript: 90.6%
CSS: 8.3%
JavaScript: 1.1%
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/saumaykilla/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Run Locally

```bash
# Development server
npm run dev

# Open browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── HeroSection.tsx    # Hero section
│   ├── Projects.tsx       # Projects showcase
│   ├── Skills.tsx         # Skills display
│   ├── Timeline.tsx       # Career timeline
│   ├── Contact.tsx        # Contact form
│   ├── Header.tsx         # Navigation
│   ├── Footer.tsx         # Footer
│   └── ui/               # Reusable UI components
├── hooks/
│   ├── useScroll.ts      # Scroll hooks
│   └── useMouse.ts       # Mouse tracking
├── lib/
│   ├── utils.ts          # Helper functions
│   └── constants.ts      # Constants
├── styles/
│   └── animations.css    # Animation definitions
├── public/               # Static assets
├── package.json
└── tsconfig.json
```

---

## 🎯 Sections

### Hero Section
- Eye-catching introduction
- Call-to-action buttons
- Gradient background
- Animated text

### Projects Showcase
- Project cards with images
- Technology tags
- Live and GitHub links
- Filterable by category

### Skills Section
- Organized by category (Frontend, Backend, Tools)
- Skill badges
- Interactive tabs
- Proficiency indicators

### Timeline
- Career progression
- Key milestones
- Education
- Achievements

### Contact Section
- Contact form
- Social media links
- Email information
- Response handling

---

## 🎨 Components

### Page Navigation

```tsx
const SECTIONS: sections[] = [
  "home",
  "projects",
  "timeline",
  "skills",
  "contact",
];
```

### Project Data Structure

```tsx
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  repo?: string;
}
```

### Skills Organization

```tsx
const SKILLS = {
  frontend: [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    // ...
  ],
  backend: [
    "Node.js",
    "PostgreSQL",
    // ...
  ],
  tools: [
    "Docker",
    "GitHub Actions",
    // ...
  ],
};
```

---

## ✨ Features Implementation

### Custom Cursor

```tsx
<motion.div
  className="fixed w-8 h-8 rounded-full border-2 border-indigo-500"
  style={{ x: mouseX, y: mouseY }}
  animate={cursorVariant}
/>
```

### Scroll Progress Bar

```tsx
<motion.div
  className="fixed top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
  style={{ scaleX }}
/>
```

### Smooth Section Navigation

```tsx
const scrollTo = (id: sections) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
};
```

### Scroll Spy Navigation

```tsx
useEffect(() => {
  const handleScroll = () => {
    const current = SECTIONS.find((section) => {
      const element = document.getElementById(section);
      const rect = element?.getBoundingClientRect();
      return rect && rect.top <= 150 && rect.bottom >= 150;
    });
    if (current) setActiveSection(current);
  };
  window.addEventListener("scroll", handleScroll);
}, []);
```

---

## 🎬 Animations

### Framer Motion Setup

```tsx
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInVariants}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## 📦 Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
vercel deploy --prod
```

The easiest way to deploy is with [Vercel Platform](https://vercel.com).

---

## 🔧 Configuration

### Update Projects

Edit `components/Projects.tsx`:

```tsx
const PROJECTS = [
  {
    id: 1,
    title: "Your Project",
    category: "Full Stack",
    description: "Description...",
    tech: ["React", "Node.js"],
    image: "/project-image.png",
    link: "https://...",
    repo: "https://github.com/.../",
  },
  // ...
];
```

### Update Skills

Edit `components/Skills.tsx`:

```tsx
const SKILLS = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "Python", "PostgreSQL"],
  tools: ["Docker", "Git", "AWS"],
};
```

### Update Timeline

Edit `components/Timeline.tsx`:

```tsx
const TIMELINE = [
  {
    year: 2023,
    title: "Achievement",
    description: "Description...",
  },
  // ...
];
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
max-width: 640px

/* Tablet */
max-width: 768px

/* Desktop */
max-width: 1024px

/* Large Desktop */
max-width: 1280px
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/Enhancement`)
3. Commit changes (`git commit -m 'Add Enhancement'`)
4. Push to branch (`git push origin feature/Enhancement`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Email: [saumay.killa@gmail.com](mailto:saumay.killa@gmail.com)

---

## 🔗 Links

- **Live Demo**: [https://saumay-portfolio.vercel.app](https://saumay-portfolio.vercel.app)
- **GitHub**: [https://github.com/saumaykilla/portfolio](https://github.com/saumaykilla/portfolio)

---

<div align="center">

**Your Professional Presence Online**

Made with ❤️ by Saumay Killa

[⬆ back to top](#portfolio-)

</div>
