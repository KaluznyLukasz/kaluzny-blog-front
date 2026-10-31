import { useId } from "react";
import { Link } from "react-router";
import type { LegalSection } from "../LegalDocument.types";
import { LEGAL_LINK_CLASSES } from "./LegalDocumentSection.constants";

const LegalDocumentSection = ({
  title,
  paragraphs,
  items,
  links,
}: LegalSection) => {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-4">
      <h2
        id={headingId}
        className="font-extrabold text-2xl text-gi-primary sm:text-3xl"
      >
        {title}
      </h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="leading-7">
          {paragraph}
        </p>
      ))}
      {items && (
        <ul className="flex list-disc flex-col gap-2 pl-6 leading-7 marker:text-gi-secondary">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {links && (
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ label, to, reloadDocument }) => (
            <li key={to}>
              <Link
                to={to}
                reloadDocument={reloadDocument}
                className={LEGAL_LINK_CLASSES}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default LegalDocumentSection;
