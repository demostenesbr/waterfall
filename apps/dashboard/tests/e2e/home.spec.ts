import { expect, test } from "@playwright/test";

test("the dashboard application responds", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("WaterfallLab");
});
