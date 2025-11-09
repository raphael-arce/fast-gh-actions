// spec: TEST_PLAN.md#7-logout-tests

import { test as baseTest, expect } from "@playwright/test";
import { withLoggedInUser } from "./fixtures/fast/with-logged-in-user";

withLoggedInUser.describe("Logout Tests", () => {
  withLoggedInUser("LOGOUT-001: Successful Logout", async ({ page }) => {
    await page.goto("/");

    // Locate "Logout" button in header
    const logoutButton = page.locator('button:has-text("Logout")');
    await expect(logoutButton).toBeVisible();

    // Click "Logout" button
    await logoutButton.click();

    // User is redirected to login page
    await expect(page).toHaveURL("/login");
  });

  withLoggedInUser(
    "LOGOUT-002: Logout with Unsaved Changes",
    async ({ page }) => {
      await page.goto("/");

      // Add several todos (they are auto-saved to Supabase)
      const todos = ["Task A", "Task B", "Task C"];
      for (const todo of todos) {
        await page.fill('input[name="todo"]', todo);
        await page.click('button[type="submit"]:has-text("Add Todo")');
      }

      // Complete logout and wait for navigation
      await page.click('button:has-text("Logout")');

      // Logout succeeds
      await expect(page).toHaveURL("/login");
    },
  );

  baseTest(
    "LOGOUT-003: Access Protected Route Without Session",
    async ({ page }) => {
      // Manually navigate to / (Todo App route)
      await page.goto("/");

      // User is redirected to /login page
      await expect(page).toHaveURL("/login");

      // Protected content is not accessible
      await expect(page.locator("text=✨ Todo App")).not.toBeVisible();
    },
  );
});
