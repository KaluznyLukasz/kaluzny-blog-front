import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import favicon from "./assets/images/favicon.png";
import PageLayout from "./components/shared/PageLayout/PageLayout";
import { SITE_NAME } from "./constants/common";

import "./index.css";

export const meta: Route.MetaFunction = () => [{ title: SITE_NAME }];

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: favicon },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
