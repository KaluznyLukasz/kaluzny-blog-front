import Contact from "../components/contact/Contact/Contact";
import { CONTACT_DESCRIPTION } from "../components/contact/Contact/Contact.constants";
import { SITE_NAME } from "../constants/common";
import { createMeta } from "../utils/createMeta";
import type { Route } from "./+types/contact";

export const meta = (() =>
  createMeta(
    `Contact · ${SITE_NAME}`,
    CONTACT_DESCRIPTION,
  )) satisfies Route.MetaFunction;

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
