import type { SiteContent } from "./types";
import raw from "../info.json";

export const content = raw as SiteContent;

export function getProject(id: string) {
  return content.projects.items.find((project) => project.id === id);
}
