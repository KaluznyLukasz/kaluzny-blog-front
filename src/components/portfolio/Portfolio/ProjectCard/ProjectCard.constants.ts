import { type LucideIcon, Play, Smartphone } from "lucide-react";
import type { StatusBadgeType } from "../../../shared/StatusBadge/StatusBadge.types";
import type { ProjectLinkKind, ProjectStatus } from "./ProjectCard.types";

export const PROJECT_LINKS: Record<
  ProjectLinkKind,
  { label: string; Icon: LucideIcon }
> = {
  "app-store": { label: "App Store", Icon: Smartphone },
  "google-play": { label: "Google Play", Icon: Play },
};

export const PROJECT_STATUS: Record<
  ProjectStatus,
  { label: string; badgeType: StatusBadgeType }
> = {
  live: { label: "Live", badgeType: "success" },
  "in-progress": { label: "In progress", badgeType: "info" },
};

export const PROJECT_TAGS_LABEL = "Platforms and technologies";
