import NotFound from "../components/shared/NotFound/NotFound";
import { SITE_DESCRIPTION, SITE_NAME } from "../constants/common";
import { createMeta } from "../utils/createMeta";
import type { Route } from "./+types/$";

export const meta = (() => [
  ...createMeta(`Page not found · ${SITE_NAME}`, SITE_DESCRIPTION),
  { name: "robots", content: "noindex" },
]) satisfies Route.MetaFunction;

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
