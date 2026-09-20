"use client";

import Image from "next/image";
import { content } from "@/lib/content";
import { Button } from "@/components/ui";
import { LoopDoodle } from "@/components/Decor";
import { TechIcon } from "@/components/TechIcon";
import { FadeIn } from "@/components/FadeIn";

export function Hero() {
  const { site } = content;

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[calc(100dvh-72px)] max-w-6xl scroll-mt-[72px] flex-col overflow-hidden px-5 py-5 sm:px-8 sm:py-8 lg:py-10"
    >
      <div className="grid min-h-0 flex-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative min-w-0">
          <LoopDoodle className="pointer-events-none absolute -left-20 top-10 hidden h-40 w-32 opacity-70 xl:block" />
          <FadeIn eager>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
              {site.role}
            </p>
          </FadeIn>
          <FadeIn eager delay={0.08}>
            <h1 className="font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.15rem]">
              {site.headline}
              <span className="mt-1 block text-terracotta">{site.headlineAccent}</span>
            </h1>
          </FadeIn>
          <FadeIn eager delay={0.16}>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-base">
              {site.bio}
            </p>
          </FadeIn>
          <FadeIn eager delay={0.24} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Button href={site.ctaPrimary.href}>{site.ctaPrimary.label}</Button>
            <Button href={site.ctaSecondary.href} variant="secondary">
              {site.ctaSecondary.label}
            </Button>
          </FadeIn>
        </div>

        <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[380px] lg:max-w-none">
          <Image
            src={site.photo}
            alt={`${site.name}, software developer and AI engineer in New York`}
            width={900}
            height={900}
            priority
            className="h-auto max-h-[32vh] w-full select-none object-contain sm:max-h-[min(52vh,520px)]"
          />
        </div>
      </div>

      <FadeIn eager delay={0.3} className="mt-4 w-full sm:mt-6">
        <div className="flex w-full flex-nowrap items-center gap-x-4 overflow-x-auto whitespace-nowrap pb-2 sm:gap-x-6 lg:gap-x-8">
          {site.techStack.map((tech) => (
            <div key={tech.name} className="flex shrink-0 items-center gap-2 text-ink/55">
              <TechIcon name={tech.icon} color={tech.color} className="h-6 w-6" title={tech.name} />
              <span className="hidden text-sm font-medium sm:inline">{tech.name}</span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
