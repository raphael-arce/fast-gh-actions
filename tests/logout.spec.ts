// spec: TEST_PLAN.md#7-logout-tests

import { expect } from "@playwright/test";
import { withLoggedInUser } from "./fixtures/slow/with-logged-in-user";

withLoggedInUser.describe("Logout Tests", () => {
  withLoggedInUser("LOGOUT-001: Successful Logout", async ({ page }) => {
    // Navigate to Todo App home page (already there)
    await expect(page).toHaveURL("/");

    // Locate "Logout" button in header
    const logoutButton = page.locator('button:has-text("Logout")');
    await expect(logoutButton).toBeVisible();

    // Click "Logout" button
    await logoutButton.click();

    // User is redirected to login page
    await expect(page).toHaveURL("/login");

    // Any attempt to access protected routes redirects to login
    await page.goto("/");
    await expect(page).toHaveURL("/login");
  });

  withLoggedInUser(
    "LOGOUT-002: Logout with Unsaved Changes",
    async ({ page }) => {
      // Add several todos (they are auto-saved to Supabase)
      const todos = ["Task A", "Task B", "Task C"];
      for (const todo of todos) {
        await page.fill('input[name="todo"]', todo);
        await page.click('button[type="submit"]:has-text("Add Todo")');
      }

      // Click "Logout" button
      await page.click('button:has-text("Logout")');

      // Logout succeeds
      await expect(page).toHaveURL("/login");
    },
  );

  withLoggedInUser(
    "LOGOUT-003: Access Protected Route After Logout",
    async ({ page }) => {
      // Complete logout
      await page.click('button:has-text("Logout")');
      await expect(page).toHaveURL("/login");

      // Manually navigate to / (Todo App route)
      await page.goto("/");

      // User is redirected to /login page
      await expect(page).toHaveURL("/login");

      // Protected content is not accessible
      await expect(page.locator("text=✨ Todo App")).not.toBeVisible();
    },
  );
});
