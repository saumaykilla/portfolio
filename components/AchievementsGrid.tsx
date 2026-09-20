"use client";

import { content } from "@/lib/content";
import { FadeIn } from "@/components/FadeIn";
import { PageHeader } from "@/components/ui";
import { TechIcon } from "@/components/TechIcon";
import { Handwritten } from "@/components/Decor";
import { CountUpValue } from "@/components/CountUp";

export function AchievementsGrid() {
  const { achievements } = content;

  return (
    <div id="achievements" className="mx-auto max-w-6xl scroll-mt-[72px] px-5 py-12 sm:px-8 sm:py-16">
      <FadeIn>
        <PageHeader
          eyebrow={achievements.eyebrow}
          title={achievements.title}
          description={achievements.description}
        />
      </FadeIn>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {achievements.items.map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.06}>
            <article className="h-full rounded-[22px] border border-ink/6 bg-white p-6 shadow-[0_10px_30px_rgba(28,22,18,0.04)]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
                <TechIcon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink">
                <CountUpValue value={item.value} />
              </p>
              <p className="mt-2 text-sm text-muted">{item.label}</p>
              {item.context ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-terracotta">
                  {item.context}
                </p>
              ) : null}
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.15} className="mt-8 overflow-hidden rounded-[24px] bg-terracotta px-6 py-8 text-center text-white sm:px-10">
        <p className="font-display text-2xl font-semibold sm:text-3xl">
          {achievements.banner}
        </p>
      </FadeIn>

      <FadeIn className="mt-12 flex justify-center">
        <blockquote className="max-w-md text-center">
          <Handwritten className="text-2xl sm:text-3xl">
            “{achievements.quote}”
          </Handwritten>
        </blockquote>
      </FadeIn>
    </div>
  );
}
