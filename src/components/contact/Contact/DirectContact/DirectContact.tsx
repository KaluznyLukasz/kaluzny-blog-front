import { Avatar } from "@gi-org-pl/athena";
import { MapPin } from "lucide-react";
import { useId } from "react";
import { CONTACT_EMAIL } from "../../../../constants/contacts";
import { PROFILE } from "../../../about-me/AboutMe/AboutMe.constants";
import CopyEmailButton from "./CopyEmailButton/CopyEmailButton";
import { DIRECT_CONTACT_MESSAGES } from "./DirectContact.constants";

const DirectContact = () => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="flex h-full flex-col gap-6 rounded-4xl bg-linear-to-br from-gi-primary to-gi-secondary p-6 text-white shadow-md sm:p-8"
    >
      <div className="flex items-center gap-4 lg:flex-col lg:items-start">
        <div className="shrink-0 rounded-full bg-white/30 p-1">
          <Avatar
            src={PROFILE.photo}
            name={PROFILE.name}
            fallback="initials"
            size="large"
            className="size-16 text-xl lg:size-28 lg:text-3xl"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <p className="font-bold text-lg">{PROFILE.name}</p>
          <p className="text-sm">{PROFILE.role}</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-3">
        <h2 id={headingId} className="font-extrabold text-2xl">
          {DIRECT_CONTACT_MESSAGES.title}
        </h2>
        <p className="leading-relaxed">{DIRECT_CONTACT_MESSAGES.text}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-sm font-bold text-lg underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          {CONTACT_EMAIL}
        </a>
        <CopyEmailButton />
      </div>
      <p className="mt-auto inline-flex items-center gap-2 text-sm">
        <MapPin aria-hidden="true" className="size-4 shrink-0" />
        {DIRECT_CONTACT_MESSAGES.location}
      </p>
    </section>
  );
};

export default DirectContact;
