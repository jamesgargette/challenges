import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("should not have any automatically detectable accessibility issues", async ({
  page,
}) => {
  const books = page.locator("a.book");

  await expect(books).toHaveCount(12, { timeout: 5000 });

  const count = await books.count();
  expect(count).toBe(12);

  await page.screenshot({ path: "screenshot.png" });
  await page.waitForSelector("h1");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
