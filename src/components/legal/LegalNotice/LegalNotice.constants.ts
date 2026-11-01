import {
  CONTACT_PATH,
  PRIVACY_PATH,
  SITE_NAME,
  THIRD_PARTY_LICENSES_PATH,
} from "../../../constants/common";
import type { LegalSection } from "../LegalDocument/LegalDocument.types";

export const LEGAL_NOTICE_TITLE = "Legal notice";

export const LEGAL_NOTICE_DESCRIPTION =
  "Who runs this website, who owns its content and the open-source software it is built with.";

export const LEGAL_NOTICE_UPDATED_AT = "2026-10-31";

export const LEGAL_NOTICE_SECTIONS: LegalSection[] = [
  {
    title: "Who runs this website",
    paragraphs: [
      `This is the personal, non-commercial website of ${SITE_NAME}, based in Poland. You can reach me through any of the channels on the contact page. How this website handles your data is explained in the privacy policy.`,
    ],
    links: [
      { label: "Contact page", to: CONTACT_PATH },
      { label: "Privacy policy", to: PRIVACY_PATH },
    ],
  },
  {
    title: "Copyright",
    paragraphs: [
      "Unless stated otherwise, the texts, photos and other content on this website are my own work and are protected by copyright. You are welcome to link to any page, or to quote a short passage with a link to its source. To use anything else, please ask me first.",
    ],
  },
  {
    title: "Content of this website",
    paragraphs: [
      "The articles and projects on this website describe my own experience and opinions. I write them with care, but I cannot promise that they are complete, correct or up to date, and they are not professional advice. Code examples are shared as they are, so check them before you use them in your own projects.",
    ],
  },
  {
    title: "Links to other websites",
    paragraphs: [
      "This website links to websites run by others. I checked them when I added the links, but I have no control over what they show later, and their owners are responsible for their content. If a link leads to something unlawful, let me know and I will remove it straight away.",
    ],
  },
  {
    title: "Trademarks",
    paragraphs: [
      "Apple, Apple Watch, iPad, iPhone, Swift and SwiftUI are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc. Android, Firebase and Google Play are trademarks of Google LLC.",
      "Other names of products and companies on this website may be trademarks of their owners. I use them only to name their products, which does not mean that their owners endorse me or this website.",
    ],
  },
  {
    title: "Open-source software",
    paragraphs: [
      "This website is built with open-source software, including React, React Router, Tailwind CSS and Lucide icons. The copyright notices and licences of the software it includes are listed in a separate file.",
    ],
    links: [
      {
        label: "Third-party licences",
        to: THIRD_PARTY_LICENSES_PATH,
        reloadDocument: true,
      },
    ],
  },
];
