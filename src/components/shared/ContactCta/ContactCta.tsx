import { Mail } from "lucide-react";
import { useId } from "react";
import { CONTACT_PATH } from "../../../constants/common";
import ButtonLink from "../ButtonLink/ButtonLink";
import Reveal from "../Reveal/Reveal";
import { CONTACT_CTA_MESSAGES } from "./ContactCta.constants";

const ContactCta = () => {
  const headingId = useId();

  return (
    <Reveal>
      <section
        aria-labelledby={headingId}
        className="flex flex-col items-center gap-4 rounded-4xl bg-linear-to-br from-gi-primary to-gi-secondary px-6 py-10 text-center text-white shadow-md sm:px-12 sm:py-14"
      >
        <h2 id={headingId} className="font-extrabold text-3xl sm:text-4xl">
          {CONTACT_CTA_MESSAGES.title}
        </h2>
        <p className="max-w-xl text-lg text-white/90 leading-relaxed">
          {CONTACT_CTA_MESSAGES.text}
        </p>
        <ButtonLink
          to={CONTACT_PATH}
          variant="inverted"
          LeftIcon={<Mail />}
          className="mt-2"
        >
          {CONTACT_CTA_MESSAGES.action}
        </ButtonLink>
      </section>
    </Reveal>
  );
};

export default ContactCta;
