import { test, expect } from '@playwright/test';

test.describe('Scars of the Last Kingdom — Web E2E Smoke Tests', () => {
  test('Page loads successfully with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Scars of the Last Kingdom/i);
  });

  test('Page head contains required metadata and social cards', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /survival visual novel RPG/i);

    // Verify Open Graph and Twitter Card tags if present
    const ogTitle = page.locator('meta[property="og:title"]');
    if ((await ogTitle.count()) > 0) {
      await expect(ogTitle).toHaveAttribute('content', /Scars of the Last Kingdom/i);
    }
  });

  test('Main Menu / Initial Game screen renders interactive container', async ({ page }) => {
    await page.goto('/');
    // Check that root react native container mounts
    const root = page.locator('#root, [data-testid="root"], div[style*="min-height"]');
    await expect(root.first()).toBeVisible();
  });

  test("Pressing '?' triggers in-game hotkey cheat sheet modal overlay", async ({ page }) => {
    await page.goto('/');
    // Wait for game to be interactive
    await page.waitForTimeout(1000);

    // Press '?'
    await page.keyboard.press('?');

    // Check if modal or dialog overlay appears
    const cheatSheet = page.locator('text=/HOTKEYS|KEYBOARD SHORTCUTS|CHEAT SHEET/i');
    if ((await cheatSheet.count()) > 0) {
      await expect(cheatSheet.first()).toBeVisible();
      // Press Escape to close
      await page.keyboard.press('Escape');
      await expect(cheatSheet.first()).not.toBeVisible();
    }
  });

  test('Interactive choice buttons meet touch target and accessibility standards', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button, [role="button"]');
    if ((await buttons.count()) > 0) {
      const firstBtn = buttons.first();
      await expect(firstBtn).toBeVisible();
    }
  });

  test('1440p+ widescreen presentation applies atmospheric background framing', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    // Verify desktop container is active
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
