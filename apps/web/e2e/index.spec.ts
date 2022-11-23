import { test, expect } from '@playwright/test'

test('Navigate to courses page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.click('text=Find courses')
  await expect(page).toHaveURL('http://localhost:3000/courses')
  await expect(page.locator('#__next > div > div > div > h1')).toContainText('Last searched courses')
})