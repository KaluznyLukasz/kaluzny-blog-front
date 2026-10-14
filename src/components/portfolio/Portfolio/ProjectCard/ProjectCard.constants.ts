import { type LucideIcon, Play, Smartphone } from "lucide-react";
import type { ProjectLinkKind } from "./ProjectCard.types";

export const PROJECT_LINKS: Record<
  ProjectLinkKind,
  { label: string; Icon: LucideIcon }
> = {
  "app-store": { label: "App Store", Icon: Smartphone },
  "google-play": { label: "Google Play", Icon: Play },
};
