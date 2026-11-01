import type { ButtonLinkVariant } from "./ButtonLink.types";

export const BUTTON_LINK_CLASSES =
  "group inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2";

export const BUTTON_LINK_VARIANT_CLASSES: Record<ButtonLinkVariant, string> = {
  primary:
    "border-gi-primary bg-gi-primary text-white hover:border-gi-primary-hover hover:bg-gi-primary-hover",
  outlined: "border-gi-primary text-gi-primary hover:bg-gi-ash",
  inverted:
    "border-white bg-white text-gi-primary hover:border-gi-ash hover:bg-gi-ash focus-visible:outline-white",
};
