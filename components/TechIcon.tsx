"use client";

import type { IconType } from "react-icons";
import { FaAws, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  SiAnthropic,
  SiCss,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiLangchain,
  SiLivekit,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiRedux,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { cn } from "@/lib/cn";

const SIMPLE_ICONS: Record<string, IconType> = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  nodedotjs: SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  amazonaws: FaAws,
  amazonwebservices: FaAws,
  aws: FaAws,
  awslambda: FaAws,
  fastapi: SiFastapi,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  html5: SiHtml5,
  css3: SiCss,
  css: SiCss,
  expo: SiExpo,
  express: SiExpress,
  graphql: SiGraphql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  redis: SiRedis,
  supabase: SiSupabase,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  googlegemini: SiGooglegemini,
  gemini: SiGooglegemini,
  anthropic: SiAnthropic,
  claude: SiAnthropic,
  langchain: SiLangchain,
  langgraph: SiLangchain,
  livekit: SiLivekit,
  jest: SiJest,
  git: SiGit,
  github: SiGithub,
  linkedin: FaLinkedin,
  redux: SiRedux,
  terraform: SiTerraform,
  pytorch: SiPytorch,
  socketdotio: SiSocketdotio,
  websockets: SiSocketdotio,
  konva: SiReact,
};

function HashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M10 3 8 21M16 3l-2 18M4.5 9h16M3.5 15h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LayoutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9.5h18M9.5 9.5V20" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="7" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 18h10.5a4.5 4.5 0 0 0 .4-9 6 6 0 0 0-11.4-1.5A4 4 0 0 0 7 18Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3 13.6 9.4 20 11 13.6 12.6 12 19 10.4 12.6 4 11l6.4-1.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 12h4l2.5 7 5-14 2.5 7H21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3 19 6.5v5.2c0 4.2-2.8 7.9-7 9.3-4.2-1.4-7-5.1-7-9.3V6.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 17 10 11l3.5 3.5L20 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4.5L15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M13 3 5 14h6l-1 7 9-12h-6l1-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function StrategyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8 16 16M14 6h4v4M6 14v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function RestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 8h16M4 12h10M4 16h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 14h4l-3 6h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OpenAiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.28 9.73a5.07 5.07 0 0 0-.55-4.75 5.18 5.18 0 0 0-5.58-2.18 5.18 5.18 0 0 0-8.3-1.1 5.18 5.18 0 0 0-3.47 5.93 5.07 5.07 0 0 0-3.4 5.65 5.18 5.18 0 0 0 5.58 2.18 5.18 5.18 0 0 0 8.3 1.1 5.18 5.18 0 0 0 3.47-5.93 5.07 5.07 0 0 0 3.95-5.9ZM12.8 20.1a3.85 3.85 0 0 1-2.46-.87l.03-.02 4.16-2.4a.68.68 0 0 0 .34-.58v-5.86l1.76 1.02a.07.07 0 0 1 .03.05v4.87a3.86 3.86 0 0 1-3.86 3.8Zm8.1-3.47a3.84 3.84 0 0 1-4.72 1.33v-4.81a.67.67 0 0 0-.34-.58l-4.15-2.4v-2.03l2.45-1.41a.07.07 0 0 1 .07 0l4.16 2.4a3.86 3.86 0 0 1 1.53 5.5Zm1.1-9.13-.03.02-4.16 2.4a.68.68 0 0 0-.2.94l.2.2v4.8l-1.76 1.02a.07.07 0 0 1-.06 0l-2.45-1.41V8.02a3.86 3.86 0 0 1 6.46-2.92ZM8.25 16.3l-1.76-1.02v-4.87a.67.67 0 0 0-.34-.58L2 7.44a3.86 3.86 0 0 1 6.32 4.17v5.86a.07.07 0 0 1-.07.05Zm-1.05-9.8 4.16-2.4a.07.07 0 0 1 .07 0l4.16 2.4v2.03l-2.45 1.41a.07.07 0 0 1-.07 0L8.9 7.54a.67.67 0 0 0-1 .38l-.2.2V5.3a3.84 3.84 0 0 1-.5 1.2Zm10.3 3.76L12.8 7.85v-4.8A3.86 3.86 0 0 1 18.5 6.2a3.83 3.83 0 0 1-1 4.06Z" />
    </svg>
  );
}

function PineconeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3 7 8.2 12 21 17 8.2 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.2 9.5h7.6M9.4 13h5.2M10.6 16.5h2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SpacetimeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="9" ry="4.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlaywrightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="12" r="1.4" fill="currentColor" />
      <circle cx="15" cy="12" r="1.4" fill="currentColor" />
      <path d="M8 16c.8.8 2.2 1.2 4 1.2s3.2-.4 4-1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ExcelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M3 14h18M9 4v16" stroke="currentColor" strokeWidth="1.6" />
      <path d="m11.2 10.2 2.3 3.6 2.3-3.6M13.5 13.8v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const CUSTOM_ICONS: Record<string, IconType> = {
  email: MdEmail,
  layout: LayoutIcon,
  server: ServerIcon,
  cloud: CloudIcon,
  spark: SparkIcon,
  activity: ActivityIcon,
  shield: ShieldIcon,
  trend: TrendIcon,
  clock: ClockIcon,
  zap: ZapIcon,
  search: SearchIcon,
  strategy: StrategyIcon,
  rest: RestIcon,
  openai: OpenAiIcon,
  pinecone: PineconeIcon,
  spacetimedb: SpacetimeIcon,
  spacetime: SpacetimeIcon,
  playwright: PlaywrightIcon,
  microsoftexcel: ExcelIcon,
  excel: ExcelIcon,
};

function resolveIcon(name: string): IconType {
  const key = name.toLowerCase().replace(/[\s./]/g, "");
  return SIMPLE_ICONS[key] ?? CUSTOM_ICONS[key] ?? HashIcon;
}

type TechIconProps = {
  name: string;
  color?: string;
  className?: string;
  title?: string;
};

export function TechIcon({ name, color, className, title }: TechIconProps) {
  const Icon = resolveIcon(name);
  return (
    <Icon
      className={cn("shrink-0", className)}
      style={color ? { color } : undefined}
      title={title ?? name}
    />
  );
}
