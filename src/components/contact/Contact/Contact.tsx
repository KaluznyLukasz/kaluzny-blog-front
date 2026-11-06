import { useId } from "react";
import { CONTACTS } from "../../../constants/contacts";
import PageHeader from "../../shared/PageHeader/PageHeader";
import Reveal from "../../shared/Reveal/Reveal";
import {
  CONTACT_CARD_REVEAL_STEP,
  CONTACT_CHANNELS_TITLE,
  CONTACT_DESCRIPTION,
  CONTACT_HINTS,
} from "./Contact.constants";
import ContactCard from "./ContactCard/ContactCard";
import ContactForm from "./ContactForm/ContactForm";
import DirectContact from "./DirectContact/DirectContact";

const Contact = () => {
  const channelsHeadingId = useId();

  return (
    <>
      <Reveal>
        <PageHeader title="Contact" description={CONTACT_DESCRIPTION} />
      </Reveal>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <ContactForm />
        </Reveal>
        <Reveal delay={CONTACT_CARD_REVEAL_STEP} className="lg:col-span-2">
          <DirectContact />
        </Reveal>
      </div>
      <section
        aria-labelledby={channelsHeadingId}
        className="flex flex-col gap-4"
      >
        <h2
          id={channelsHeadingId}
          className="font-extrabold text-2xl text-gi-primary"
        >
          {CONTACT_CHANNELS_TITLE}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {CONTACTS.map((contact, index) => (
            <li key={contact.href}>
              <Reveal
                delay={index * CONTACT_CARD_REVEAL_STEP}
                className="h-full"
              >
                <ContactCard {...contact} hint={CONTACT_HINTS[contact.kind]} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Contact;
