import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** True when the user has requested reduced motion */
export const reduced = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Shared scroll-triggered fade+rise reveal — wraps common pattern */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element | null,
  opts?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    delay?: number;
    scale?: number;
    x?: number;
  }
) {
  if (!trigger || reduced()) return;
  const {
    y = 36,
    duration = 0.72,
    stagger = 0,
    start = "top 82%",
    delay = 0,
    scale,
    x,
  } = opts ?? {};

  return gsap.from(targets, {
    opacity: 0,
    y,
    ...(scale !== undefined ? { scale } : {}),
    ...(x !== undefined ? { x } : {}),
    duration,
    delay,
    ease: "power2.out",
    stagger,
    scrollTrigger: { trigger, start, once: true },
  });
}
