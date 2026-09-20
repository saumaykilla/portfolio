"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hashForSection, type SectionId } from "@/lib/nav";

export function SectionRedirect({ id }: { id: SectionId }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(hashForSection(id));
  }, [id, router]);

  return null;
}
