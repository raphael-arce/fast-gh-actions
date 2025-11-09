// spec: TEST_PLAN.md#4-mark-todo-as-completed-tests

import { expect } from "@playwright/test";
import { withLoggedInUser } from "./fixtures/fast/with-logged-in-user";

withLoggedInUser.describe("Mark Todo as Completed Tests", () => {
  withLoggedInUser(
    "TODO-COMPLETE-001: Mark Single Todo as Completed",
    async ({ page }) => {
      await page.goto("/");

      // Add a pending todo
      await page.fill('input[name="todo"]', "Complete this task");
      await page.click('button[type="submit"]:has-text("Add Todo")');

      // Locate a pending todo
      const todoItem = page.locator("text=Complete this task").locator("..");

      // Click the circular checkbox button (left side of todo)
      const checkbox = todoItem.locator("button").first();
      await checkbox.click();

      // Checkbox fills with green color and shows checkmark
      await expect(checkbox).toHaveClass(/bg-green-500/);

      // Todo text gets strikethrough style
      await expect(page.locator("text=Complete this task")).toHaveClass(
        /line-through/,
      );

      // Todo moves to "Completed Todos" section
      await expect(
        page
          .locator("text=Completed Todos")
          .locator("..")
          .locator("text=Complete this task"),
      ).toBeVisible();

      // Stats update: pending count decreases by 1, completed count increases by 1
      await expect(page.locator("text=/0.*pending/i")).toBeVisible();
      await expect(page.locator("text=/1.*completed/i")).toBeVisible();
    },
  );

  withLoggedInUser(
    "TODO-COMPLETE-002: Mark Multiple Todos as Completed",
    async ({ page }) => {
      await page.goto("/");

      // Add 3 pending todos
      const todos = ["First task", "Second task", "Third task"];
      for (const todo of todos) {
        await page.fill('input[name="todo"]', todo);
        await page.click('button[type="submit"]:has-text("Add Todo")');
      }

      // Mark first todo as completed
      await page
        .locator("text=First task")
        .locator("..")
        .locator("button")
        .first()
        .click();

      // Mark second todo as completed
      await page
        .locator("text=Second task")
        .locator("..")
        .locator("button")
        .first()
        .click();

      // Mark third todo as completed
      await page
        .locator("text=Third task")
        .locator("..")
        .locator("button")
        .first()
        .click();

      // All three todos move to completed section
      const completedSection = page
        .locator("text=Completed Todos")
        .locator("..");
      await expect(completedSection.locator("text=First task")).toBeVisible();
      await expect(completedSection.locator("text=Second task")).toBeVisible();
      await expect(completedSection.locator("text=Third task")).toBeVisible();

      // Stats correctly reflect 3 completed todos
      await expect(page.locator("text=/3.*completed/i")).toBeVisible();
      await expect(page.locator("text=/0.*pending/i")).toBeVisible();
    },
  );
});
