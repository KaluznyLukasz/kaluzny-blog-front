import type { RevealDirection } from "./Reveal.types";

export const REVEAL_THRESHOLD = 0.15;

export const REVEAL_DIRECTION_CLASSES: Record<RevealDirection, string> = {
  bottom: "slide-in-from-bottom-8",
  left: "slide-in-from-bottom-8 lg:slide-in-from-left-6",
  right: "slide-in-from-bottom-8 lg:slide-in-from-right-6",
};
