import { CONTACT_EMAIL } from "../../../../../constants/contacts";
import type { ContactFormValues } from "../ContactForm.types";

// Line breaks in a mailto link have to be CRLF (RFC 6068)
const toCrlf = (text: string) => text.replace(/\r?\n/g, "\r\n");

export const buildMailtoHref = ({
  name,
  topic,
  message,
}: ContactFormValues) => {
  const subject = topic ? `${topic} from ${name}` : `Message from ${name}`;
  const body = toCrlf(`${message}\n\n${name}`);

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
