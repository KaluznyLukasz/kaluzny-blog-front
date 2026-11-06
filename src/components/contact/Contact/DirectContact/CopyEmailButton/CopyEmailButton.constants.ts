import { Check, Copy, type LucideIcon, TriangleAlert } from "lucide-react";
import type { CopyStatus } from "../../../../../utils/useCopyToClipboard";

export const COPY_EMAIL_STATUS: Record<
  CopyStatus,
  { label: string; Icon: LucideIcon }
> = {
  idle: { label: "Copy email", Icon: Copy },
  copied: { label: "Email copied", Icon: Check },
  failed: { label: "Could not copy", Icon: TriangleAlert },
};
