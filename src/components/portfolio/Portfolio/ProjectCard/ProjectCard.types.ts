import type { SectionImageSource } from "../../../shared/ZigZagSection/SectionImage/SectionImage.types";

export type ProjectLinkKind = "app-store" | "google-play";

export type ProjectStatus = "live" | "in-progress";

export interface ProjectLink {
  kind: ProjectLinkKind;
  href: string;
}

export interface Project {
  name: string;
  description: string;
  status?: ProjectStatus;
  tags?: string[];
  links?: ProjectLink[];
  image?: SectionImageSource;
}
