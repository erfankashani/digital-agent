import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scroll to an in-page target. Use "#" (or "") for the top of the
 * page, or "#some-id" for a specific section. Reliable single-click scrolling
 * without depending on the router's hash handling.
 */
export function scrollToHash(hash: string) {
  if (hash === "#" || hash === "") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
