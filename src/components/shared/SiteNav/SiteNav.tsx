import { NavLink } from "react-router";
import { SITE_NAV_ITEMS } from "./SiteNav.constants";

const SiteNav = () => {
  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {SITE_NAV_ITEMS.map(({ label, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              className="block whitespace-nowrap rounded-full px-3 py-2 sm:px-4 font-medium text-gi-primary text-sm transition-colors hover:bg-gi-ash focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2 aria-[current=page]:bg-gi-primary aria-[current=page]:text-white forced-colors:aria-[current=page]:underline forced-colors:aria-[current=page]:underline-offset-4"
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SiteNav;
