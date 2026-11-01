import { CONTACTS } from "../../../constants/contacts";
import PageHeader from "../../shared/PageHeader/PageHeader";
import Reveal from "../../shared/Reveal/Reveal";
import {
  CONTACT_CARD_REVEAL_STEP,
  CONTACT_DESCRIPTION,
  CONTACT_HINTS,
} from "./Contact.constants";
import ContactCard from "./ContactCard/ContactCard";

const Contact = () => {
  return (
    <>
      <Reveal>
        <PageHeader title="Contact" description={CONTACT_DESCRIPTION} />
      </Reveal>
      <ul className="grid gap-4 sm:grid-cols-2">
        {CONTACTS.map((contact, index) => (
          <li key={contact.href}>
            <Reveal delay={index * CONTACT_CARD_REVEAL_STEP} className="h-full">
              <ContactCard {...contact} hint={CONTACT_HINTS[contact.kind]} />
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Contact;
