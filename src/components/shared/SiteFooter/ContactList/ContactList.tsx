import { Tooltip } from "@gi-org-pl/athena";
import { CONTACT_ICONS } from "./ContactList.constants";
import type { Contact } from "./ContactList.types";

interface Props {
  contacts: Contact[];
}

const ContactList = ({ contacts }: Props) => {
  return (
    <ul className="flex flex-wrap gap-3">
      {contacts.map(({ kind, label, href }) => {
        const Icon = CONTACT_ICONS[kind];

        return (
          <li key={href}>
            <Tooltip content={label}>
              <a
                href={href}
                className="flex size-11 items-center justify-center rounded-full bg-gi-ash text-gi-primary transition-colors hover:bg-gi-primary hover:text-white focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
              >
                <Icon aria-hidden="true" className="size-5" />
                <span className="sr-only">{label}</span>
              </a>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
