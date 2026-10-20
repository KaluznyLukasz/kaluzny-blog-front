import Portfolio from "../components/portfolio/Portfolio/Portfolio";
import { SITE_NAME } from "../constants/common";
import type { Route } from "./+types/portfolio";

export const meta: Route.MetaFunction = () => [
  { title: `Portfolio · ${SITE_NAME}` },
];

const PortfolioPage = () => {
  return <Portfolio />;
};

export default PortfolioPage;
