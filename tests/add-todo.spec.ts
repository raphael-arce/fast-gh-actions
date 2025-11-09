// spec: TEST_PLAN.md#3-add-todo-tests

import { expect } from "@playwright/test";
import { withLoggedInUser } from "./fixtures/slow/with-logged-in-user";

withLoggedInUser.describe("Add Todo Tests", () => {
  withLoggedInUser("TODO-ADD-001: Add Single Todo", async ({ page }) => {
    // Navigate to Todo App main page
    await page.goto("/");

    // Locate the "What needs to be done?" input field
    const todoInput = page.locator('input[name="todo"]');

    // Enter todo text
    await todoInput.fill("Buy groceries");

    // Click "Add Todo" button
    await page.click('button[type="submit"]:has-text("Add Todo")');

    // Form is cleared after submission
    await expect(todoInput).toHaveValue("");

    // New todo appears in the "Pending Todos" section
    const todoItem = page.locator("text=Buy groceries").first();
    await expect(todoItem).toBeVisible();

    // Todo has an unchecked checkbox
    const checkbox = page.locator('button[class*="border-2"]').first();
    await expect(checkbox).toBeVisible();

    // Delete button (red X) is visible
    const deleteButton = page.locator('button[class*="bg-red-50"]').first();
    await expect(deleteButton).toBeVisible();

    // Stats are updated to reflect new pending todo
    await expect(page.locator("text=/1.*pending/i")).toBeVisible();
  });

  withLoggedInUser("TODO-ADD-002: Add Multiple Todos", async ({ page }) => {
    // Navigate to Todo App main page
    await page.goto("/");

    const todoInput = page.locator('input[name="todo"]');
    const addButton = page.locator(
      'button[type="submit"]:has-text("Add Todo")',
    );

    // Add first todo: "Task 1"
    await todoInput.fill("Task 1");
    await addButton.click();

    // Add second todo: "Task 2"
    await todoInput.fill("Task 2");
    await addButton.click();

    // Add third todo: "Task 3"
    await todoInput.fill("Task 3");
    await addButton.click();

    // All three todos appear in pending section
    await expect(page.locator("text=Task 1")).toBeVisible();
    await expect(page.locator("text=Task 2")).toBeVisible();
    await expect(page.locator("text=Task 3")).toBeVisible();

    // Stats show 3 pending todos
    await expect(page.locator("text=/3.*pending/i")).toBeVisible();
  });

  withLoggedInUser(
    "TODO-ADD-003: Add Todo with Empty Input",
    async ({ page }) => {
      const todoInput = page.locator('input[name="todo"]');

      // Leave todo input field empty
      await todoInput.fill("");

      // Click "Add Todo" button
      const addButton = page.locator(
        'button[type="submit"]:has-text("Add Todo")',
      );
      await addButton.click();

      // HTML5 validation prevents submission (required attribute)
      await expect(todoInput).toHaveAttribute("required", "");
    },
  );

  withLoggedInUser(
    "TODO-ADD-004: Add Todo with Special Characters",
    async ({ page }) => {
      const todoInput = page.locator('input[name="todo"]');

      // Enter todo with special characters
      const specialTodo = "Buy @groceries & cook! #dinner 🍕";
      await todoInput.fill(specialTodo);

      // Click "Add Todo" button
      await page.click('button[type="submit"]:has-text("Add Todo")');

      // Todo is added successfully with all special characters intact
      await expect(page.locator(`text=${specialTodo}`)).toBeVisible();
    },
  );
});
