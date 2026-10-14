import { SITE_NAME } from "../../../constants/common";
import ContactList from "./ContactList/ContactList";
import { CONTACTS } from "./SiteFooter.constants";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-gi-ash border-t bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 wrap-anywhere sm:px-6">
        <p className="text-gi-dark-gray text-sm">
          © {year} {SITE_NAME}
        </p>
        <ContactList contacts={CONTACTS} />
      </div>
    </footer>
  );
};

export default SiteFooter;
