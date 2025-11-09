// spec: TEST_PLAN.md#1-user-registration-tests

import { test, expect } from "@playwright/test";

test.describe("User Registration Tests", () => {
  test("REG-001: Successful Registration", async ({ page }) => {
    // Navigate to /register page
    await page.goto("/register");

    // Enter a unique email address in the email field
    const email = `test-${Date.now()}@example.com`;
    await page.fill("#email", email);

    // Enter a valid password in the password field
    await page.fill("#password", "TestPassword123!");

    // Click the "Create Account" button
    await page.click('button[type="submit"]');

    // Success page is displayed with message "Check your email!"
    await expect(page.locator("text=Check your email!")).toBeVisible();

    // Confirmation message states: "We've sent you a confirmation link"
    await expect(
      page.locator("text=We've sent you a confirmation link"),
    ).toBeVisible();
  });

  test("REG-002: Registration with Invalid Email", async ({ page }) => {
    // Navigate to /register page
    await page.goto("/register");

    // Enter an invalid email (e.g., notanemail)
    await page.fill("#email", "notanemail");

    // Enter a valid password
    await page.fill("#password", "TestPassword123!");

    // Click "Create Account" button
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // HTML5 validation prevents form submission
    const emailInput = page.locator("#email");
    // Check that the input is invalid (validationMessage is non-empty)
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage,
    );
    expect(validationMessage).not.toBe("");
  });

  test("REG-003: Registration with Existing Email", async ({ page }) => {
    const existingEmail = "existing@example.com";

    // First, register the user
    await page.goto("/register");
    await page.fill("#email", existingEmail);
    await page.fill("#password", "TestPassword123!");
    await page.click('button[type="submit"]');

    // Wait for success
    await expect(page.locator("text=Check your email!")).toBeVisible();

    // Navigate back to register page
    await page.goto("/register");

    // Enter an email that is already registered
    await page.fill("#email", existingEmail);

    // Enter a valid password
    await page.fill("#password", "TestPassword123!");

    // Click "Create Account" button
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("");
      dialog.accept();
    });
    await page.click('button[type="submit"]');

    // User remains on registration page
    await expect(page).toHaveURL(/\/register/);
  });

  test("REG-004: Registration with Weak Password", async ({ page }) => {
    // Navigate to /register page
    await page.goto("/register");

    // Enter valid email
    await page.fill("#email", `test-${Date.now()}@example.com`);

    // Enter weak password (e.g., 123)
    await page.fill("#password", "123");

    // Click "Create Account" button
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain(
        "Password should be at least 6 characters.",
      );
      dialog.accept();
    });
    await page.click('button[type="submit"]');

    // Form does not submit successfully
    await expect(page).toHaveURL(/\/register/);
  });
});
