"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/cn";

function Chrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 truncate text-[10px] text-white/40">{title}</span>
    </div>
  );
}

function CanvasPreview() {
  return (
    <>
      <Chrome title="canvas.studio" />
      <div className="grid h-full grid-cols-[72px_1fr] gap-2 p-3">
        <div className="flex flex-col gap-2">
          {["Hero", "Card", "Nav", "Form"].map((item) => (
            <div key={item} className="rounded-md bg-white/6 px-2 py-1.5 text-[9px] text-white/50">
              {item}
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-lg bg-[#141820]">
          <div className="absolute left-4 top-4 h-8 w-28 rounded bg-terracotta/80" />
          <div className="absolute left-4 top-16 h-2 w-36 rounded bg-white/15" />
          <div className="absolute left-4 top-20 h-2 w-24 rounded bg-white/10" />
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
            <div className="h-12 rounded bg-white/8" />
            <div className="h-12 rounded bg-white/8" />
            <div className="h-12 rounded bg-terracotta/30" />
          </div>
        </div>
      </div>
    </>
  );
}

function DocumentsPreview() {
  return (
    <>
      <Chrome title="resume.studio" />
      <div className="grid h-full grid-cols-2 gap-3 p-3">
        <div className="rounded-md bg-white p-3">
          <div className="h-2 w-16 rounded bg-ink/80" />
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-full rounded bg-ink/15" />
            <div className="h-1.5 w-5/6 rounded bg-ink/10" />
            <div className="h-1.5 w-2/3 rounded bg-ink/10" />
          </div>
          <div className="mt-4 h-8 rounded bg-terracotta/20" />
        </div>
        <div className="space-y-2">
          {["ATS 92", "Keywords", "Export PDF"].map((label) => (
            <div key={label} className="rounded-md bg-white/8 px-3 py-2 text-[10px] text-white/70">
              {label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function InsightsPreview() {
  return (
    <>
      <Chrome title="segment.sight" />
      <div className="grid h-full grid-cols-2 gap-2 p-3">
        {[
          { t: "Strengths", c: "bg-emerald-400/20 text-emerald-200" },
          { t: "Weaknesses", c: "bg-rose-400/20 text-rose-200" },
          { t: "Opportunities", c: "bg-amber-400/20 text-amber-200" },
          { t: "Threats", c: "bg-sky-400/20 text-sky-200" },
        ].map((card) => (
          <div key={card.t} className={cn("rounded-lg p-2.5", card.c)}>
            <p className="text-[10px] font-medium">{card.t}</p>
            <div className="mt-2 space-y-1">
              <div className="h-1.5 w-full rounded bg-white/20" />
              <div className="h-1.5 w-3/4 rounded bg-white/15" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ChartsPreview() {
  const bars = [40, 70, 55, 90, 62, 80, 48, 75];
  return (
    <>
      <Chrome title="live.ticker" />
      <div className="flex h-full flex-col p-3">
        <div className="mb-3 flex gap-2">
          {["AAPL", "NVDA", "MSFT"].map((t) => (
            <span key={t} className="rounded-full bg-white/8 px-2 py-0.5 text-[9px] text-white/70">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-terracotta/80"
              style={{ height: `${h}%`, opacity: 0.45 + i * 0.06 }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function PlatformPreview() {
  return (
    <>
      <Chrome title="humainority.app" />
      <div className="grid h-full grid-cols-[88px_1fr] p-3">
        <div className="space-y-2 pr-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={cn("h-6 rounded", i === 0 ? "bg-terracotta/70" : "bg-white/8")} />
          ))}
        </div>
        <div className="rounded-lg bg-white/5 p-3">
          <div className="mb-3 h-2.5 w-28 rounded bg-white/40" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-14 rounded-md bg-white/8" />
            <div className="h-14 rounded-md bg-white/8" />
            <div className="h-14 rounded-md bg-terracotta/25" />
          </div>
          <div className="mt-3 h-8 rounded bg-white/6" />
        </div>
      </div>
    </>
  );
}

function CloudPreview() {
  return (
    <>
      <Chrome title="eventflow.aws" />
      <div className="flex h-full items-center justify-center gap-2 p-4">
        {["S3", "SQS", "λ", "DLQ"].map((node, i) => (
          <div key={node} className="flex items-center gap-2">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/8 text-[11px] font-medium text-white/80">
              {node}
            </div>
            {i < 3 ? <span className="h-px w-4 bg-terracotta/80" /> : null}
          </div>
        ))}
      </div>
    </>
  );
}

const PREVIEWS: Partial<Record<Project["preview"], () => ReactNode>> = {
  canvas: CanvasPreview,
  documents: DocumentsPreview,
  insights: InsightsPreview,
  charts: ChartsPreview,
  platform: PlatformPreview,
  cloud: CloudPreview,
};

export function ProjectPreview({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const Preview = PREVIEWS[project.preview];

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-[#0e1116] text-white",
        className,
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : Preview ? (
        <div className="absolute inset-0 flex flex-col">
          <Preview />
        </div>
      ) : null}
    </div>
  );
}
