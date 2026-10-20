import type { Badge } from "@gi-org-pl/athena";
import type { ComponentProps } from "react";
import type { RoadmapStatus } from "./LearningRoadmap.types";

interface RoadmapStatusStyle {
  label: string;
  badgeType: ComponentProps<typeof Badge>["type"];
  dotClassName: string;
}

export const ROADMAP_STATUS: Record<RoadmapStatus, RoadmapStatusStyle> = {
  done: {
    label: "Done",
    badgeType: "success",
    dotClassName: "bg-gi-green ring-gi-green/20",
  },
  "in-progress": {
    label: "In progress",
    badgeType: "info",
    dotClassName: "bg-gi-blue ring-gi-blue/20 motion-safe:animate-pulse",
  },
  next: {
    label: "Up next",
    badgeType: "default",
    dotClassName: "bg-gi-gray ring-gi-gray/20",
  },
};
