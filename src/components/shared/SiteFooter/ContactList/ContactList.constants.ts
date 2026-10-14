import { Github, Globe, type LucideIcon, Mail } from "lucide-react";
import type { ContactKind } from "./ContactList.types";

export const CONTACT_ICONS: Record<ContactKind, LucideIcon> = {
  email: Mail,
  github: Github,
  website: Globe,
};
