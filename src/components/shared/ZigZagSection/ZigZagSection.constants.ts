import type { ZigZagSide } from "./ZigZagSection.types";

export const IMAGE_REVEAL_DELAY = 150;

export const ZIG_ZAG_ROW_CLASSES: Record<ZigZagSide, string> = {
  left: "",
  right: "lg:flex-row-reverse",
};

export const ZIG_ZAG_SECTION_CLASSES: Record<ZigZagSide, string> = {
  left: "-rotate-[0.5deg] lg:-rotate-1",
  right: "rotate-[0.5deg] lg:rotate-1",
};

export const ZIG_ZAG_IMAGE_CLASSES: Record<ZigZagSide, string> = {
  left: "rotate-1 lg:rotate-2",
  right: "-rotate-1 lg:-rotate-2",
};

export const OPPOSITE_SIDE: Record<ZigZagSide, ZigZagSide> = {
  left: "right",
  right: "left",
};
