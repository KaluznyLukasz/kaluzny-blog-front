import { Link } from "react-router";
import { SITE_NAME } from "../../../constants/common";
import { CONTACTS } from "../../../constants/contacts";
import ContactList from "./ContactList/ContactList";
import { LEGAL_LINKS } from "./SiteFooter.constants";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-gi-ash border-t bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 wrap-anywhere sm:px-6">
        <div className="flex flex-col gap-1">
          <p className="text-gi-dark-gray text-sm">
            © {year} {SITE_NAME}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-4">
              {LEGAL_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-block rounded-sm py-1 text-gi-dark-gray text-sm underline underline-offset-4 transition-colors hover:text-gi-primary focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ContactList contacts={CONTACTS} />
      </div>
    </footer>
  );
};

export default SiteFooter;
