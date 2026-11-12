import PageHeader from "../../shared/PageHeader/PageHeader";
import Reveal from "../../shared/Reveal/Reveal";
import {
  CONTACT_CARD_REVEAL_STEP,
  CONTACT_DESCRIPTION,
} from "./Contact.constants";
import ContactForm from "./ContactForm/ContactForm";
import DirectContact from "./DirectContact/DirectContact";

const Contact = () => (
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
  </>
);

export default Contact;
