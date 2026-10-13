import type { ReactNode } from "react";
import { Outlet, Scripts } from "react-router";

import "./index.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Łukasz Kałużny</title>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
