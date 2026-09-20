import { AppLink } from "@/components/motion/AppLink";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-terracotta text-white shadow-[0_8px_24px_rgba(196,90,56,0.28)] hover:bg-terracotta-dark",
    secondary:
      "border border-ink/15 bg-transparent text-ink hover:border-terracotta hover:text-terracotta",
    ghost: "text-ink hover:text-terracotta",
  }[variant];

  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
    styles,
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <AppLink href={href} className={classes}>
      {children}
    </AppLink>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        {description}
      </p>
    </div>
  );
}
