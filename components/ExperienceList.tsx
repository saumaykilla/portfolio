"use client";

import Image from "next/image";
import { content } from "@/lib/content";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/ui";
import { TechIcon } from "@/components/TechIcon";

function OrgLogo({
  src,
  alt,
  fallback,
  color,
}: {
  src?: string;
  alt: string;
  fallback?: string;
  color?: string;
}) {
  if (src?.startsWith("/")) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-ink/8 bg-white">
        <Image src={src} alt={alt} fill sizes="48px" className="object-contain p-1.5" />
      </div>
    );
  }

  return (
    <div
      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-semibold text-white"
      style={{ backgroundColor: color ?? "#C45A38" }}
    >
      {fallback ?? alt.slice(0, 1)}
    </div>
  );
}

export function ExperienceList() {
  const { work } = content;

  return (
    <div id="work" className="mx-auto max-w-6xl scroll-mt-[72px] px-5 py-12 sm:px-8 sm:py-16">
      <FadeIn>
        <PageHeader
          eyebrow={work.eyebrow}
          title={work.title}
          description={work.description}
        />
      </FadeIn>

      <div className="mt-12 space-y-5">
        {work.items.map((job, index) => (
          <FadeIn key={job.id} delay={index * 0.08} x={index % 2 === 0 ? -64 : 64}>
            <article className="rounded-[22px] border border-ink/6 bg-white p-5 shadow-[0_10px_32px_rgba(28,22,18,0.04)] sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <OrgLogo
                    src={job.logo}
                    alt={`${job.company} logo`}
                    fallback={job.logo}
                    color={job.logoColor}
                  />
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {job.company}
                    </h2>
                    <p className="text-sm text-terracotta">{job.role}</p>
                    {job.location ? (
                      <p className="mt-0.5 text-xs text-muted">{job.location}</p>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm text-muted sm:text-right">
                  {job.start} – {job.end}
                </p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>

              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink"
                  >
                    <TechIcon name={tech.icon} color={tech.color} className="h-3.5 w-3.5" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      {work.education?.length ? (
        <FadeIn className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">Education</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {work.education.map((school, index) => (
              <FadeIn key={school.id} x={index % 2 === 0 ? -40 : 40} delay={index * 0.08}>
                <article className="flex items-start gap-4 rounded-[20px] border border-ink/6 bg-white p-5">
                  <OrgLogo src={school.logo} alt={`${school.school} logo`} fallback={school.school} />
                  <div>
                    <p className="text-sm text-terracotta">{school.degree}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                      {school.school}
                    </h3>
                    <p className="text-sm text-muted">{school.field}</p>
                    {school.location ? (
                      <p className="mt-2 text-xs text-muted">{school.location}</p>
                    ) : null}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      ) : null}
    </div>
  );
}
