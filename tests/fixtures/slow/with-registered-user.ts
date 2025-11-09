import { expect, test as baseTest } from "@playwright/test";

type WithRegisteredUser = {
  account: {
    email: string;
    password: string;
  };
};

const TEST_MAILPIT_URL = process.env.TEST_MAILPIT_URL;

if (!TEST_MAILPIT_URL) {
  throw new Error("Missing TEST_MAILPIT_URL environment variable");
}

export const withRegisteredUser = baseTest.extend<WithRegisteredUser>({
  account: [
    async ({}, use) => {
      const email = `${crypto.randomUUID()}@example.com`;
      const password = "123456";

      await use({ email, password });
    },
    { scope: "test", auto: true },
  ],

  page: async ({ page, account }, use) => {
    await page.goto("/register");

    const { email, password } = account;

    await page.fill("#email", email);

    await page.fill("#password", password);

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Check your email!")).toBeVisible();

    await expect(
      page.locator("text=We've sent you a confirmation link"),
    ).toBeVisible();

    await page.goto(TEST_MAILPIT_URL);
    await page
      .getByRole("link", { name: `Admin To: ${email}` })
      .first()
      .click();

    const popupEvent = page.waitForEvent("popup");
    await page
      .locator("#preview-html")
      .contentFrame()
      .getByRole("link", { name: "Confirm your email address" })
      .click();
    const page1 = await popupEvent;

    await page1.waitForLoadState("networkidle");

    await expect(page1.locator("text=✨ Todo App")).toBeVisible();

    await page1.locator('button:has-text("Logout")').click();

    await expect(
      page1.getByRole("heading", { name: "Welcome back!" }),
    ).toBeVisible();

    use(page1);
  },
});
