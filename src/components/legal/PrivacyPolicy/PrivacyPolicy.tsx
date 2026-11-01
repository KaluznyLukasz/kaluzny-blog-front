import LegalDocument from "../LegalDocument/LegalDocument";
import {
  PRIVACY_POLICY_DESCRIPTION,
  PRIVACY_POLICY_SECTIONS,
  PRIVACY_POLICY_TITLE,
  PRIVACY_POLICY_UPDATED_AT,
} from "./PrivacyPolicy.constants";

const PrivacyPolicy = () => {
  return (
    <LegalDocument
      title={PRIVACY_POLICY_TITLE}
      description={PRIVACY_POLICY_DESCRIPTION}
      updatedAt={PRIVACY_POLICY_UPDATED_AT}
      sections={PRIVACY_POLICY_SECTIONS}
    />
  );
};

export default PrivacyPolicy;
