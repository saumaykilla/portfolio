import { content } from "@/lib/content";
import { TechIcon } from "@/components/TechIcon";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-ink/8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
        <p className="text-sm text-muted">{content.site.footer}</p>
        <div className="flex items-center gap-3">
          {content.site.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={item.name}
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink/70 transition hover:border-terracotta hover:text-terracotta"
            >
              <TechIcon name={item.icon} className="h-4 w-4" title={item.name} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
