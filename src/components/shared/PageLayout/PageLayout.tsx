import type { ReactNode } from "react";
import { SITE_NAME } from "../../../constants/common";
import SiteFooter from "../SiteFooter/SiteFooter";
import SiteNav from "../SiteNav/SiteNav";
import { MAIN_CONTENT_ID } from "./PageLayout.constants";

interface Props {
  children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only rounded-full bg-gi-primary px-4 py-2 font-medium text-sm text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
      >
        Skip to content
      </a>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 size-80 rounded-full bg-gi-blue-lightest blur-3xl" />
        <div className="absolute top-1/3 -right-32 size-96 rounded-full bg-gi-orange/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 size-96 rounded-full bg-gi-green/10 blur-3xl" />
      </div>
      <header className="sticky top-0 z-10 border-gi-ash border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-3 sm:justify-between sm:px-6">
          <span className="hidden font-extrabold text-gi-primary sm:inline">
            {SITE_NAME}
          </span>
          <SiteNav />
        </div>
      </header>
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 wrap-anywhere outline-none sm:px-6 sm:py-16 lg:gap-14"
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};

export default PageLayout;
