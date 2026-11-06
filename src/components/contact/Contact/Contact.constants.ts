import type { ContactKind } from "../../shared/SiteFooter/ContactList/ContactList.types";

export const CONTACT_DESCRIPTION =
  "Have an app idea, a question or just want to talk about mobile development? Send me a message, I'd love to hear from you.";

export const CONTACT_CHANNELS_TITLE = "Find me elsewhere";

export const CONTACT_CARD_REVEAL_STEP = 80;

export const CONTACT_HINTS: Record<ContactKind, string> = {
  email: "Write to me directly",
  github: "Browse the code I write",
  linkedin: "Let's connect professionally",
  facebook: "Say hi on Facebook",
  instagram: "See what I do outside of code",
  website: "Visit my website",
};
