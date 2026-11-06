import type { ContactFormValues } from "./ContactForm.types";

export const CONTACT_FORM_MESSAGES = {
  title: "Send me a message",
  name: "Your name",
  topic: "What is it about?",
  message: "Your message",
  submit: "Continue in email app",
  note: "Your email app opens with this message ready to send. Nothing is stored on this website.",
  handedOff:
    "Your email app should be open now. If nothing happened, copy my address and write from anywhere you like.",
  privacy: "Read how I handle your message in the",
  privacyLink: "privacy policy",
  newTab: "(opens in a new tab)",
};

export const CONTACT_TOPICS = ["App idea", "Job or collaboration", "Question"];

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  name: "",
  topic: "",
  message: "",
};

export const NAME_MAX_LENGTH = 100;

// Browsers and email apps cut off very long mailto links without a warning
export const MESSAGE_MAX_LENGTH = 1000;
