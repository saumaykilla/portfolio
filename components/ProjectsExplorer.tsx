"use client";

import { useMemo, useState } from "react";
import { content } from "@/lib/content";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/cn";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/ui";
import { ProjectPreview } from "@/components/ProjectPreview";
import { ProjectModal } from "@/components/ProjectModal";

export function ProjectsExplorer() {
  const { projects } = content;
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(() => {
    if (filter === "all") return projects.items;
    return projects.items.filter((item) => item.categories.includes(filter));
  }, [filter, projects.items]);

  return (
    <div id="projects" className="mx-auto max-w-6xl scroll-mt-[72px] px-5 py-12 sm:px-8 sm:py-16">
      <FadeIn>
        <PageHeader
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.description}
        />
      </FadeIn>

      <FadeIn delay={0.08} className="mt-8 flex flex-wrap gap-2">
        {projects.filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition",
              filter === item.id
                ? "bg-terracotta text-white"
                : "bg-white text-muted ring-1 ring-ink/8 hover:text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </FadeIn>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-muted">No projects in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <FadeIn key={`${filter}-${project.id}`} delay={index * 0.06} className="h-full">
              <button
                type="button"
                onClick={() => setActive(project)}
                className="group h-full w-full overflow-hidden rounded-[22px] border border-ink/6 bg-white text-left shadow-[0_12px_40px_rgba(28,22,18,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(28,22,18,0.08)]"
              >
                <ProjectPreview project={project} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-ink">
                        {project.title}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>
                    </div>
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-terracotta text-white transition group-hover:bg-terracotta-dark">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      )}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
