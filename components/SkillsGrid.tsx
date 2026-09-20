"use client";

import { content } from "@/lib/content";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/ui";
import { TechIcon } from "@/components/TechIcon";
import { Handwritten } from "@/components/Decor";

export function SkillsGrid() {
  const { skills } = content;

  return (
    <div id="skills" className="relative mx-auto max-w-6xl scroll-mt-[72px] px-5 py-12 sm:px-8 sm:py-16">
      <FadeIn>
        <PageHeader
          eyebrow={skills.eyebrow}
          title={skills.title}
          description={skills.description}
        />
      </FadeIn>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {skills.categories.map((category, index) => (
          <FadeIn key={category.id} delay={index * 0.08}>
            <article className="h-full rounded-[24px] border border-ink/6 bg-white p-6 shadow-[0_12px_36px_rgba(28,22,18,0.04)] sm:p-7">
              <div className="mb-6 flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
                  <TechIcon name={category.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {category.name}
                  </h2>
                  {category.description ? (
                    <p className="mt-1 text-sm text-muted">{category.description}</p>
                  ) : null}
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="group flex items-center gap-3 rounded-2xl border border-ink/6 bg-cream/70 px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-terracotta/30 hover:bg-white">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-[0_4px_12px_rgba(28,22,18,0.06)]"
                        style={{ color: skill.color ?? "#C45A38" }}
                      >
                        <TechIcon name={skill.icon} color={skill.color} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium text-ink">{skill.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-10 flex justify-end">
        <Handwritten className="rotate-[-6deg]">{skills.handwritten}</Handwritten>
      </FadeIn>
    </div>
  );
}
