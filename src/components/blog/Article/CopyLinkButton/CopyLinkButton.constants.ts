import { Check, Link2, type LucideIcon, TriangleAlert } from "lucide-react";
import type { CopyStatus } from "./CopyLinkButton.types";

export const COPY_FEEDBACK_MS = 2000;

export const COPY_STATUS: Record<
  CopyStatus,
  { label: string; Icon: LucideIcon }
> = {
  idle: { label: "Copy link", Icon: Link2 },
  copied: { label: "Link copied", Icon: Check },
  failed: { label: "Could not copy", Icon: TriangleAlert },
};
