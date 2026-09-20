export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  name: string;
  href: string;
  icon: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type TechItem = {
  name: string;
  icon: string;
  color?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  categories: string[];
  tags: string[];
  technologies: TechItem[];
  learnings: string[];
  highlights?: string[];
  year: string;
  preview: "canvas" | "documents" | "insights" | "charts" | "platform" | "cloud" | "mobile" | "agent";
  image?: string;
  links?: ProjectLink[];
};

export type ProjectFilter = {
  id: string;
  label: string;
};

export type Experience = {
  id: string;
  company: string;
  logo: string;
  logoColor: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  technologies: TechItem[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  location?: string;
  start?: string;
  end?: string;
};

export type Skill = TechItem & {
  note?: string;
};

export type SkillCategory = {
  id: string;
  name: string;
  icon: string;
  description?: string;
  skills: Skill[];
};

export type Achievement = {
  id: string;
  value: string;
  label: string;
  context?: string;
  icon: string;
};

export type ContactField = {
  name: "name" | "email" | "subject" | "message";
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  required: boolean;
};

export type SiteContent = {
  site: {
    name: string;
    firstName: string;
    role: string;
    location: string;
    email: string;
    photo: string;
    headline: string;
    headlineAccent: string;
    bio: string;
    handwritten: string;
    ctaPrimary: Cta;
    ctaSecondary: Cta;
    navCta: Cta;
    navigation: NavItem[];
    social: SocialLink[];
    techStack: TechItem[];
    footer: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    filters: ProjectFilter[];
    items: Project[];
  };
  work: {
    eyebrow: string;
    title: string;
    description: string;
    items: Experience[];
    education?: Education[];
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    handwritten: string;
    categories: SkillCategory[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    description: string;
    items: Achievement[];
    banner: string;
    quote: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    handwritten: string;
    fields: ContactField[];
    submitLabel: string;
    successTitle: string;
    successMessage: string;
  };
};
