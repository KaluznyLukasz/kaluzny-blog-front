import PrivacyPolicy from "../components/legal/PrivacyPolicy/PrivacyPolicy";
import {
  PRIVACY_POLICY_DESCRIPTION,
  PRIVACY_POLICY_TITLE,
} from "../components/legal/PrivacyPolicy/PrivacyPolicy.constants";
import { SITE_NAME } from "../constants/common";
import { createMeta } from "../utils/createMeta";
import type { Route } from "./+types/privacy";

export const meta = (() =>
  createMeta(
    `${PRIVACY_POLICY_TITLE} · ${SITE_NAME}`,
    PRIVACY_POLICY_DESCRIPTION,
  )) satisfies Route.MetaFunction;

const PrivacyPage = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPage;
