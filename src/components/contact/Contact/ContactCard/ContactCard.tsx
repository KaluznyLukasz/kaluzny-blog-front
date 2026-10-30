import { ArrowUpRight } from "lucide-react";
import { CONTACT_ICONS } from "../../../shared/SiteFooter/ContactList/ContactList.constants";
import type { Contact } from "../../../shared/SiteFooter/ContactList/ContactList.types";

type Props = Contact & {
  hint: string;
};

const ContactCard = ({ kind, label, href, hint }: Props) => {
  const Icon = CONTACT_ICONS[kind];

  return (
    <a
      href={href}
      className="group flex h-full items-center gap-4 rounded-3xl border border-gi-ash bg-background/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gi-dark-ash hover:shadow-md focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gi-ash text-gi-primary transition-colors group-hover:bg-gi-primary group-hover:text-white"
      >
        <Icon className="size-6" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col wrap-anywhere">
        <span className="font-bold text-gi-primary text-lg">{label}</span>{" "}
        <span className="text-gi-dark-gray text-sm">{hint}</span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-5 shrink-0 text-gi-secondary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </a>
  );
};

export default ContactCard;
