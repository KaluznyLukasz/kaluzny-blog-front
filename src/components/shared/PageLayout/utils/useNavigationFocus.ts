import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { focusMainContent } from "./focusMainContent";

// After an in-app navigation, keyboard and screen reader users would stay on
// the link they used, so move them to the new content and name the new page.
export const useNavigationFocus = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (pathname === previousPathname.current) return;

    previousPathname.current = pathname;
    focusMainContent();
    setAnnouncement(document.title);
  }, [pathname]);

  return announcement;
};
