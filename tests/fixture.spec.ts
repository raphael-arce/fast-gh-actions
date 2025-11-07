import { test, expect } from '@playwright/test';

test('register user with email and password', async ({ page }) => {
    await page.goto('/register');
    
    const email = `test-${Date.now()}@example.com`;
    const password = 'TestPassword123!';
    
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    
    await page.click('button[type="submit"]');
    
    // Assert successful registration (adjust selector based on your app)
    await expect(page).toHaveURL("/");
    // Or check for success message
    // await expect(page.locator('.success-message')).toBeVisible();
});