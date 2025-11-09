import { expect } from "@playwright/test";
import { withRegisteredUser } from "./with-registered-user";

export const withLoggedInUser = withRegisteredUser.extend({
  page: async ({ page, account }, use) => {
    const { email, password } = account;

    // Navigate to /login page
    await page.goto("/login");

    // Enter registered email in email field
    await page.fill('input[type="email"]', email);

    // Enter correct password in password field
    await page.fill('input[type="password"]', password);

    // Click "Sign In" button
    await page.click('button[type="submit"]');

    // User is redirected to / (Todo App main page)
    await expect(page).toHaveURL("/");

    // Header displays "✨ Todo App"
    await expect(page.locator("text=✨ Todo App")).toBeVisible();

    await use(page);
  },
});
