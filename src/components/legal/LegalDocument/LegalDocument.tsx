import { PUBLISHED_DATE_FORMAT } from "../../../constants/common";
import PageHeader from "../../shared/PageHeader/PageHeader";
import Reveal from "../../shared/Reveal/Reveal";
import { LAST_UPDATED_LABEL } from "./LegalDocument.constants";
import type { LegalSection } from "./LegalDocument.types";
import LegalDocumentSection from "./LegalDocumentSection/LegalDocumentSection";

interface Props {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

const LegalDocument = ({ title, description, updatedAt, sections }: Props) => {
  return (
    <>
      <Reveal>
        <PageHeader title={title} description={description} />
      </Reveal>
      <div className="flex flex-col gap-10 rounded-4xl border border-gi-ash bg-background/90 px-6 py-8 shadow-md sm:px-12 sm:py-12">
        <p className="text-gi-dark-gray text-sm">
          {LAST_UPDATED_LABEL}{" "}
          <time dateTime={updatedAt}>
            {PUBLISHED_DATE_FORMAT.format(new Date(updatedAt))}
          </time>
        </p>
        {sections.map((section) => (
          <Reveal key={section.title}>
            <LegalDocumentSection {...section} />
          </Reveal>
        ))}
      </div>
    </>
  );
};

export default LegalDocument;
