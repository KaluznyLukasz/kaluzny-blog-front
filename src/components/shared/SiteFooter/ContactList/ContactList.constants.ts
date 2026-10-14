import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  type LucideIcon,
  Mail,
} from "lucide-react";
import type { ContactKind } from "./ContactList.types";

export const CONTACT_ICONS: Record<ContactKind, LucideIcon> = {
  email: Mail,
  facebook: Facebook,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  website: Globe,
};
