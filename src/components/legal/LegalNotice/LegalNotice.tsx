import LegalDocument from "../LegalDocument/LegalDocument";
import {
  LEGAL_NOTICE_DESCRIPTION,
  LEGAL_NOTICE_SECTIONS,
  LEGAL_NOTICE_TITLE,
  LEGAL_NOTICE_UPDATED_AT,
} from "./LegalNotice.constants";

const LegalNotice = () => {
  return (
    <LegalDocument
      title={LEGAL_NOTICE_TITLE}
      description={LEGAL_NOTICE_DESCRIPTION}
      updatedAt={LEGAL_NOTICE_UPDATED_AT}
      sections={LEGAL_NOTICE_SECTIONS}
    />
  );
};

export default LegalNotice;
