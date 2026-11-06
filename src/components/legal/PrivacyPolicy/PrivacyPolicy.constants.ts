import { CONTACT_PATH, SITE_NAME } from "../../../constants/common";
import type {
  LegalLink,
  LegalSection,
} from "../LegalDocument/LegalDocument.types";

export const PRIVACY_POLICY_TITLE = "Privacy policy";

export const PRIVACY_POLICY_DESCRIPTION =
  "What happens to your data when you visit this website: as little as possible.";

export const PRIVACY_POLICY_UPDATED_AT = "2026-11-06";

export const SUPERVISORY_AUTHORITY_URL = "https://uodo.gov.pl/en";

const CONTACT_LINK: LegalLink = { label: "Contact page", to: CONTACT_PATH };

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    title: "Who is responsible for your data",
    paragraphs: [
      `This website is run by ${SITE_NAME}, a private person based in Poland. I am the controller of the personal data described in this policy, as defined by the General Data Protection Regulation (GDPR).`,
      "If you have a question about your data or want to use any of your rights, write to me through any of the channels on the contact page.",
    ],
    links: [CONTACT_LINK],
  },
  {
    title: "In short",
    paragraphs: ["This website is built to collect as little as possible:"],
    items: [
      "There are no accounts, comments or newsletters.",
      "The contact form sends nothing to this website: it only prepares an email in your own email app, and you decide whether to send it.",
      "It sets no cookies and keeps nothing in your browser's storage, so there is nothing to consent to.",
      "There is no analytics, advertising or tracking of any kind.",
      "Images, styles and scripts are served together with the website itself, and it uses the fonts already on your device, so your browser does not contact Google or any other third party while you read it.",
      "Your data is never sold, and it is not used for automated decisions or profiling.",
    ],
  },
  {
    title: "When you open a page",
    paragraphs: [
      "Like every website, this one is sent to you by a server. When you open a page, or when the blog loads its articles, your browser automatically sends technical data to the servers that host this website and its blog: your IP address, the date and time of the request, the address of the page or file you asked for, the address of the page you came from, and the name and version of your browser and operating system.",
      "The servers need this data to send the page to your browser, and they may keep it for a short time in log files to keep the website secure and running, for example to detect and block attacks. I do not combine it with any other data and I do not use it to find out who you are. Log files are deleted once they are no longer needed for these purposes.",
      "The legal basis is my legitimate interest in running a working and secure website (Article 6(1)(f) GDPR). You do not have to provide this data, but without it the website cannot be shown to you.",
    ],
  },
  {
    title: "Who else receives your data",
    paragraphs: [
      "The servers are run by a hosting provider, which processes the data only on my behalf and on my instructions, under a data processing agreement (Article 28 GDPR). Messages you write to me also reach the companies named in the next section. Apart from that, I share your data with no one, unless the law requires me to.",
      "If a provider processes the data outside the European Economic Area, it does so only with the safeguards required by the GDPR, such as the standard contractual clauses approved by the European Commission.",
    ],
  },
  {
    title: "When you write to me",
    paragraphs: [
      "If you write to me by email or through one of the channels on the contact page, I receive what you send me, such as your name, your contact details and your message. I use it only to reply to you and keep it for as long as our conversation needs it. The legal basis is my legitimate interest in answering your message (Article 6(1)(f) GDPR).",
      "Gmail, which I use for email, GitHub, LinkedIn, Facebook and Instagram are run by other companies, which process your data as separate controllers under their own privacy policies and may do so outside the European Economic Area.",
    ],
  },
  {
    title: "Links to other websites",
    paragraphs: [
      "This website links to other websites, such as GitHub, LinkedIn, Facebook, Instagram, the App Store and Google Play. Nothing is loaded from them until you open a link. Once you do, the privacy policy of that website applies.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: ["Under the GDPR, you have the right to:"],
    items: [
      "access your data and get a copy of it (Article 15),",
      "have incorrect data corrected (Article 16),",
      "have your data deleted (Article 17),",
      "restrict how your data is processed (Article 18),",
      "receive your data in a portable format (Article 20),",
      "object at any time to processing based on my legitimate interest (Article 21).",
    ],
  },
  {
    title: "Questions and complaints",
    paragraphs: [
      "To use any of your rights, or if you have a question about this policy, write to me through the contact page. I will reply within one month.",
      "You also have the right to lodge a complaint with a data protection authority. In Poland, this is the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warsaw.",
    ],
    links: [
      CONTACT_LINK,
      {
        label: "Personal Data Protection Office",
        to: SUPERVISORY_AUTHORITY_URL,
      },
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "If the way this website handles data changes, I will update this policy and the date at the top of this page.",
    ],
  },
];
