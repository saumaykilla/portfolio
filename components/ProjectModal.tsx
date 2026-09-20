"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { TechIcon } from "@/components/TechIcon";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Button } from "@/components/ui";
import { useMotion } from "@/components/motion/MotionProvider";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { setOverlay } = useMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOverlay(project ? "modal" : "none");
    return () => setOverlay("none");
  }, [project, setOverlay]);

  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="pointer-events-auto fixed inset-0 z-[10000] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            className="absolute inset-0 bg-[rgba(28,22,18,0.45)]"
            onClick={onClose}
          />
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            data-native-scroll
            initial={{ y: 48, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
          >
            <ProjectPreview project={project} className="rounded-t-3xl" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink shadow-sm"
              aria-label="Close"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>

            <div className="px-6 py-7 sm:px-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {project.year}
              </p>
              <h2 id="project-title" className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-1 text-terracotta">{project.subtitle}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-terracotta/10 px-3 py-1 text-xs font-medium text-terracotta"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-muted">
                {project.longDescription}
              </p>

              {project.highlights?.length ? (
                <ul className="mt-5 space-y-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ink/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              <section className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
                  Technologies
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/8 bg-white px-3 py-1.5 text-sm text-ink"
                    >
                      <TechIcon name={tech.icon} color={tech.color} className="h-4 w-4" />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
                  Learnings
                </h3>
                <ol className="mt-3 space-y-3">
                  {project.learnings.map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-terracotta/10 text-[11px] font-semibold text-terracotta">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </section>

              {project.links?.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <Button key={link.href} href={link.href} variant="secondary" external>
                      {link.label}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
