import { expect, type Page, test } from "@playwright/test";

const TITLE = "Contact · Łukasz Kałużny";
const PHONE = { width: 360, height: 800 };
const EMAIL = "lukaszkaluzny09@gmail.com";

// A text field draws its outline on the box around it, a topic on its pill
const showsFocusOutline = (page: Page) =>
  page.evaluate(() => {
    const drawnOn: (Element | null)[] = [];
    for (
      let element = document.activeElement;
      element && element.tagName !== "FORM";
      element = element.parentElement
    ) {
      drawnOn.push(element, element.nextElementSibling);
    }

    return drawnOn.some((element) => {
      if (!element) return false;
      const { outlineStyle, outlineWidth } = getComputedStyle(element);

      return outlineStyle !== "none" && outlineWidth !== "0px";
    });
  });

test.describe("Given a visitor on the home page", () => {
  test.describe("when they choose Contact in the navigation", () => {
    test("then the contact page opens and is marked as the current page", async ({
      page,
    }) => {
      await page.goto("/");
      const navigation = page.getByRole("navigation", { name: "Main" });

      await navigation.getByRole("link", { name: "Contact" }).click();

      await expect(page).toHaveURL("/contact");
      await expect(page).toHaveTitle(TITLE);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Contact",
      );
      await expect(
        navigation.getByRole("link", { name: "Contact" }),
      ).toHaveAttribute("aria-current", "page");
    });
  });
});

test.describe("Given a visitor on the contact page", () => {
  test.describe("when they look for a way to reach me", () => {
    test("then the email address can be opened and copied", async ({
      page,
      context,
    }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.goto("/contact");
      const main = page.getByRole("main");

      await expect(main.getByRole("link", { name: EMAIL })).toHaveAttribute(
        "href",
        `mailto:${EMAIL}`,
      );

      await main.getByRole("button", { name: "Copy email" }).click();

      await expect(
        main.getByRole("button", { name: "Email copied" }),
      ).toBeVisible();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        EMAIL,
      );
    });
  });

  test.describe("when they fill in the message form", () => {
    test("then their email app is opened and what they wrote stays on the page", async ({
      page,
    }) => {
      await page.goto("/contact");
      const form = page.getByRole("form", { name: "Send me a message" });

      await form.getByRole("textbox", { name: /Your name/ }).fill("Anna");
      await form.getByText("App idea").click();
      await form
        .getByRole("textbox", { name: "Your message" })
        .fill("Hello there");
      await form.getByRole("button", { name: "Continue in email app" }).click();

      await expect(form.getByRole("status")).toHaveText(
        /Your email app should be open now/,
      );
      await expect(page).toHaveURL("/contact");
      await expect(
        form.getByRole("textbox", { name: "Your message" }),
      ).toHaveValue("Hello there");
    });

    // The privacy policy promises this
    test("then nothing they wrote is sent to any server", async ({ page }) => {
      await page.goto("/contact");
      const form = page.getByRole("form", { name: "Send me a message" });
      await expect(form).toBeVisible();
      const requests: string[] = [];
      page.on("request", (request) => {
        requests.push(request.url());
      });

      await form.getByRole("textbox", { name: /Your name/ }).fill("Anna");
      await form
        .getByRole("textbox", { name: "Your message" })
        .fill("Hello there");
      await form.getByRole("button", { name: "Continue in email app" }).click();

      await expect(form.getByRole("status")).toHaveText(
        /Your email app should be open now/,
      );
      expect(requests.filter((url) => url.startsWith("http"))).toEqual([]);
    });
  });

  test.describe("when they submit the form without a message", () => {
    test("then the browser asks for it and no email is prepared", async ({
      page,
    }) => {
      await page.goto("/contact");
      const form = page.getByRole("form", { name: "Send me a message" });

      await form.getByRole("textbox", { name: /Your name/ }).fill("Anna");
      await form.getByRole("button", { name: "Continue in email app" }).click();

      await expect(form.getByRole("status")).toHaveText(
        /Your email app opens with this message/,
      );
      await expect(
        form.getByRole("textbox", { name: "Your message" }),
      ).toBeFocused();
    });
  });

  test.describe("when they move through the form with the keyboard", () => {
    test("then every field is reached, in order, with a visible focus outline", async ({
      page,
    }) => {
      await page.goto("/contact");
      const form = page.getByRole("form", { name: "Send me a message" });
      const fields = [
        form.getByRole("textbox", { name: /Your name/ }),
        form.getByRole("radio", { name: "App idea" }),
        form.getByRole("textbox", { name: "Your message" }),
        form.getByRole("button", { name: "Continue in email app" }),
      ];
      await expect(form).toBeVisible();
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Contact" })
        .focus();

      for (const field of fields) {
        await page.keyboard.press("Tab");

        await expect(field).toBeFocused();
        await expect.poll(() => showsFocusOutline(page)).toBe(true);
      }
    });
  });

  test.describe("when they hover over the copy button", () => {
    test("then it stays where it is", async ({ page }) => {
      await page.goto("/contact");
      const button = page.getByRole("button", { name: "Copy email" });
      await expect(button).toBeVisible();
      await page.evaluate(() =>
        Promise.all(
          document.getAnimations().map((animation) => animation.finished),
        ),
      );
      const before = (await button.boundingBox())?.y;

      await button.hover();
      await page.evaluate(() =>
        Promise.all(
          document.getAnimations().map((animation) => animation.finished),
        ),
      );

      expect((await button.boundingBox())?.y).toBe(before);
    });
  });

  test.describe("when they use a phone screen, 360 px wide", () => {
    test.use({ viewport: PHONE, isMobile: true, hasTouch: true });

    // The layout clips what sticks out, so the page itself never scrolls
    test("then the form and the email address are not cut off", async ({
      page,
    }) => {
      await page.goto("/contact");
      const main = page.getByRole("main");

      for (const section of [
        main.getByRole("form", { name: "Send me a message" }),
        main.getByRole("region", { name: "Or email me directly" }),
      ]) {
        const box = await section.boundingBox();

        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(
          PHONE.width,
        );
      }
    });

    test("then the whole navigation fits and the page never scrolls sideways", async ({
      page,
    }) => {
      await page.goto("/contact");
      const navigation = page.getByRole("navigation", { name: "Main" });

      for (const name of ["About me", "Portfolio", "Blog", "Contact"]) {
        await expect(navigation.getByRole("link", { name })).toBeInViewport({
          ratio: 1,
        });
      }
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth,
        ),
      ).toBe(false);
    });
  });
});
