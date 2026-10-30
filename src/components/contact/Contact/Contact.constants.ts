import type { ContactKind } from "../../shared/SiteFooter/ContactList/ContactList.types";

export const CONTACT_DESCRIPTION =
  "Have a question, an idea or just want to say hi? Pick the channel you like best.";

export const CONTACT_CARD_REVEAL_STEP = 80;

export const CONTACT_HINTS: Record<ContactKind, string> = {
  email: "Write to me directly",
  github: "Browse the code I write",
  linkedin: "Let's connect professionally",
  facebook: "Say hi on Facebook",
  instagram: "See what I do outside of code",
  website: "Visit my website",
};
