import { test, expect } from '@playwright/test';

test('catalog loads with images and fits the viewport', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.product-card')).toHaveCount(4);
  await expect(page).toHaveTitle(/Shop everyday/);
  // Visit each image so native lazy loading is exercised on long mobile pages.
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0))
      .toBe(true);
  }
  await expect
    .poll(() =>
      page
        .locator('img')
        .evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)),
    )
    .toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `test-results/home-${testInfo.project.name}.png`, fullPage: true });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});

test('category filtering, favorites and persistent bag work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Women Explore collection' }).click();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(page.locator('.product-card h3')).toHaveText('Classic Leather Handbag');
  await page.getByRole('button', { name: 'Save Classic Leather Handbag to favorites' }).click();
  await page
    .getByRole('button', { name: 'Add Classic Leather Handbag to bag', exact: true })
    .click();
  const bag = page.getByRole('dialog', { name: 'Your bag (1)' });
  await expect(bag).toBeVisible();
  await expect(bag.locator('.cart-summary strong')).toHaveText('$59.99');
  await page.getByRole('button', { name: 'Increase quantity of Classic Leather Handbag' }).click();
  await expect(page.locator('.cart-summary strong')).toHaveText('$119.98');
  await expect(page.locator('.shipping-message')).toContainText('qualifies for free shipping');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Open shopping bag, 2 items' }).click();
  await expect(page.locator('.cart-summary strong')).toHaveText('$119.98');
  await page.getByRole('button', { name: 'Remove Classic Leather Handbag from bag' }).click();
  await expect(page.getByRole('dialog')).toContainText('Your bag is empty');
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('button', { name: 'Show favorites, 1 saved products' }).click();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(page.locator('.product-card h3')).toHaveText('Classic Leather Handbag');
});

test('search, empty results, and newsletter preview are clear', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search products', exact: true }).click();
  await page.getByRole('searchbox').fill('headphones');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(page.locator('.product-card h3')).toHaveText('Studio Wireless Headphones');
  await page.getByRole('searchbox').fill('nothing matches this');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByText('No finds just yet.')).toBeVisible();
  await page.getByRole('button', { name: 'Explore all products' }).click();
  await expect(page.locator('.product-card')).toHaveCount(8);
  await page.getByRole('textbox', { name: 'Your email address' }).fill('test@example.com');
  await page.getByRole('button', { name: 'Join the newsletter' }).click();
  await expect(page.getByRole('status')).toContainText('no email was submitted');
});

test('failed catalog requests can be retried', async ({ page }) => {
  let fail = true;
  await page.route('**/data/catalog.json', (route) =>
    fail ? route.fulfill({ status: 503, body: 'Unavailable' }) : route.continue(),
  );
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText('We couldn’t load the collection');
  fail = false;
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page.locator('.product-card')).toHaveCount(4);
});

test('hero collection and offer links lead to working shopping actions', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('section[aria-labelledby="hero-title"]');
  await page.getByRole('button', { name: 'Women Explore collection' }).click();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await hero.getByRole('button', { name: 'Explore collection', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(4);
  await expect(
    page.getByRole('heading', { name: 'Fresh finds. Instant favorites.' }),
  ).toBeInViewport();
  await hero.getByRole('button', { name: /Explore the essentials/ }).click();
  await expect(page.locator('#collection')).toBeInViewport();
  await hero.getByRole('link', { name: 'Discover the offers' }).click();
  await expect(page.locator('#deal')).toBeInViewport();
  await page.getByRole('button', { name: 'Shop the deal', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Your bag (1)' })).toContainText(
    'Everyday Smart Watch',
  );
  await expect(page.locator('.cart-summary strong')).toHaveText('$59.99');
});

test('navigation filters products and the mobile menu closes after selection', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  if (isMobile) {
    await expect(navigation).toBeHidden();
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(navigation).toBeVisible();
  }
  await navigation.getByRole('button', { name: 'Men', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(2);
  await expect(page.locator('.product-card h3')).toHaveText([
    'Everyday Cotton Shirt',
    'Everyday Sport Sneakers',
  ]);
  if (isMobile) {
    await expect(navigation).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  }
});

test('dialogs support keyboard dismissal, focus restoration, and reopening', async ({ page }) => {
  await page.goto('/');
  const cartButton = page.getByRole('button', { name: 'Open shopping bag, 0 items' });
  await cartButton.click();
  await expect(page.getByRole('dialog', { name: 'Your bag (0)' })).toBeVisible();
  await page.keyboard.press('Tab');
  expect(
    await page.evaluate(() =>
      document.querySelector('dialog[open]').contains(document.activeElement),
    ),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(cartButton).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await cartButton.click();
  await expect(page.getByRole('dialog', { name: 'Your bag (0)' })).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await page.getByRole('button', { name: 'Privacy policy', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Privacy policy' })).toContainText(
    'does not transmit your email address',
  );
  await page.getByRole('button', { name: 'Got it' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('invalid saved browser data does not prevent shopping', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('shopease:cart', '{broken-json');
    localStorage.setItem('shopease:favorites', JSON.stringify({ unexpected: true }));
  });
  await page.goto('/');
  await expect(page.locator('.product-card')).toHaveCount(4);
  await expect(page.getByRole('button', { name: 'Open shopping bag, 0 items' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Show favorites, 0 saved products' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Add Everyday Cotton Shirt to bag', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Your bag (1)' })).toBeVisible();
  await expect(page.locator('.cart-summary strong')).toHaveText('$39.99');
});
