import LegalNotice from "../components/legal/LegalNotice/LegalNotice";
import {
  LEGAL_NOTICE_DESCRIPTION,
  LEGAL_NOTICE_TITLE,
} from "../components/legal/LegalNotice/LegalNotice.constants";
import { SITE_NAME } from "../constants/common";
import { createMeta } from "../utils/createMeta";
import type { Route } from "./+types/legal";

export const meta = (() =>
  createMeta(
    `${LEGAL_NOTICE_TITLE} · ${SITE_NAME}`,
    LEGAL_NOTICE_DESCRIPTION,
  )) satisfies Route.MetaFunction;

const LegalPage = () => {
  return <LegalNotice />;
};

export default LegalPage;
