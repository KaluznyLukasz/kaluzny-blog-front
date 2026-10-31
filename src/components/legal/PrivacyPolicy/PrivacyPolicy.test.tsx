import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import PrivacyPolicy from "./PrivacyPolicy";
import {
  PRIVACY_POLICY_SECTIONS,
  SUPERVISORY_AUTHORITY_URL,
} from "./PrivacyPolicy.constants";

const renderPolicy = () => render(<PrivacyPolicy />, { wrapper: MemoryRouter });

describe("<PrivacyPolicy />", () => {
  describe("when rendered", () => {
    it("shows the title as the main heading", () => {
      renderPolicy();

      expect(
        screen.getByRole("heading", { level: 1, name: "Privacy policy" }),
      ).toBeInTheDocument();
    });

    it("shows every section of the policy", () => {
      renderPolicy();

      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual(PRIVACY_POLICY_SECTIONS.map(({ title }) => title));
    });

    it("says who is responsible for the data and how to reach them", () => {
      renderPolicy();
      const section = screen.getByRole("region", {
        name: "Who is responsible for your data",
      });

      expect(section).toHaveTextContent("Łukasz Kałużny");
      expect(section).toHaveTextContent("controller");
      expect(
        screen.getAllByRole("link", { name: "Contact page" })[0],
      ).toHaveAttribute("href", "/contact");
    });

    it("says the site uses no cookies, analytics or third-party fonts", () => {
      renderPolicy();
      const section = screen.getByRole("region", { name: "In short" });

      expect(section).toHaveTextContent("no cookies");
      expect(section).toHaveTextContent("no analytics");
      expect(section).toHaveTextContent("does not contact Google");
    });

    it("explains what the servers receive, why, and on which legal basis", () => {
      renderPolicy();
      const section = screen.getByRole("region", {
        name: "When you open a page",
      });

      expect(section).toHaveTextContent("IP address");
      expect(section).toHaveTextContent("Article 6(1)(f) GDPR");
      expect(section).toHaveTextContent("deleted");
    });

    it("lists every right a visitor has under the GDPR", () => {
      renderPolicy();
      const section = screen.getByRole("region", { name: "Your rights" });

      for (const article of [15, 16, 17, 18, 20, 21]) {
        expect(section).toHaveTextContent(`(Article ${article})`);
      }
    });

    it("tells the visitor where they can complain", () => {
      renderPolicy();

      expect(
        screen.getByRole("link", { name: "Personal Data Protection Office" }),
      ).toHaveAttribute("href", SUPERVISORY_AUTHORITY_URL);
    });
  });
});
