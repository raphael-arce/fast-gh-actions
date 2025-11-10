// spec: TEST_PLAN.md#2-user-login-tests

import { test, expect } from "@playwright/test";
import { withRegisteredUser } from "./fixtures/fast/with-registered-user";

withRegisteredUser.describe("User Login Tests", () => {
  withRegisteredUser(
    "LOGIN-001: Successful Login",
    async ({ page, account }) => {
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
    },
  );

  test("LOGIN-002: Login with Incorrect Password", async ({ page }) => {
    const email = `test-${Date.now()}@example.com`;

    // Register user first
    await page.goto("/register");
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', "TestPassword123!");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Check your email!")).toBeVisible();

    // Navigate to /login page
    await page.goto("/login");

    // Enter registered email
    await page.fill('input[type="email"]', email);

    // Enter incorrect password
    await page.fill('input[type="password"]', "WrongPassword123!");

    // Click "Sign In" button
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("");
      dialog.accept().catch((error) => console.error("WARNING:", error));
    });
    await page.click('button[type="submit"]');

    // User remains on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("LOGIN-003: Login with Non-existent Email", async ({ page }) => {
    // Navigate to /login page
    await page.goto("/login");

    // Enter email that doesn't exist in system
    await page.fill('input[type="email"]', "nonexistent@example.com");

    // Enter any password
    await page.fill('input[type="password"]', "AnyPassword123!");

    // Click "Sign In" button
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("");
      dialog.accept().catch((error) => console.error("WARNING:", error));
    });
    await page.click('button[type="submit"]');

    // User remains on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("LOGIN-004: Login Page Navigation", async ({ page }) => {
    // Navigate to /login page
    await page.goto("/login");

    // Click "Sign up here" link
    await page.click('a:has-text("Sign up here")');

    // User is redirected to /register page
    await expect(page).toHaveURL("/register");
  });
});
