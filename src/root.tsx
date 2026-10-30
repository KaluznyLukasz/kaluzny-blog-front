import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import favicon from "./assets/images/favicon.png";
import ErrorPage from "./components/shared/ErrorPage/ErrorPage";
import PageLayout from "./components/shared/PageLayout/PageLayout";
import {
  NO_SCRIPT_MESSAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "./constants/common";
import { createMeta } from "./utils/createMeta";

import "./index.css";

export const meta = (() =>
  createMeta(SITE_NAME, SITE_DESCRIPTION)) satisfies Route.MetaFunction;

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: favicon },
  { rel: "apple-touch-icon", href: favicon },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}

export function HydrateFallback() {
  return (
    <PageLayout>
      <noscript>{NO_SCRIPT_MESSAGE}</noscript>
    </PageLayout>
  );
}

export function ErrorBoundary() {
  return (
    <PageLayout>
      <ErrorPage />
    </PageLayout>
  );
}
