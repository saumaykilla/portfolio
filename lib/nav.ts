export const NAV_OFFSET = 72;

const SECTION_IDS = [
  "home",
  "projects",
  "work",
  "skills",
  "achievements",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

const PATH_TO_SECTION: Record<string, SectionId> = {
  "/": "home",
  "/projects": "projects",
  "/work": "work",
  "/skills": "skills",
  "/achievements": "achievements",
  "/contact": "contact",
};

export function sectionIdFromHref(href: string): SectionId | null {
  const trimmed = href.trim();
  if (trimmed.startsWith("#")) {
    const id = trimmed.slice(1);
    return SECTION_IDS.includes(id as SectionId) ? (id as SectionId) : null;
  }

  try {
    const url = new URL(trimmed, "http://local.invalid");
    if (url.hash) {
      const id = url.hash.slice(1);
      if (SECTION_IDS.includes(id as SectionId)) return id as SectionId;
    }
    return PATH_TO_SECTION[url.pathname] ?? null;
  } catch {
    return PATH_TO_SECTION[trimmed] ?? null;
  }
}

export function hashForSection(id: SectionId) {
  return id === "home" ? "/" : `/#${id}`;
}
