import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const expectNoAccessibilityViolations = async (page: Page) => {
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    const summary = results.violations.map((violation) => ({
        rule: violation.id,
        impact: violation.impact,
        targets: violation.nodes.map((node) => node.target.join(' ')),
    }));
    expect(summary).toEqual([]);
};

const expectNoHorizontalScroll = async (page: Page) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
};

test.describe('home', () => {
    test('opens a project case from the project list', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        const projectLinks = page.locator('#ux-lab a[href^="/case/"]');
        await expect(projectLinks.first()).toBeVisible();
        const href = await projectLinks.first().getAttribute('href');

        await projectLinks.first().click();
        await expect(page).toHaveURL(href!);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expectNoHorizontalScroll(page);
    });

    test('meets WCAG 2.1 AA checks', async ({ page }) => {
        await page.goto('/');
        await expectNoAccessibilityViolations(page);
        await expectNoHorizontalScroll(page);
    });
});

test('project case meets WCAG 2.1 AA checks', async ({ page }) => {
    await page.goto('/case/1');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expectNoAccessibilityViolations(page);
});

test.describe('articles', () => {
    test('opens an article from the list', async ({ page }) => {
        await page.goto('/artigos');
        const firstCard = page.getByRole('article').first();
        const title = (await firstCard.getByRole('heading').textContent())!.trim();

        await firstCard.getByRole('link').click();
        await expect(page).toHaveURL(/\/artigos\/[a-z0-9-]+$/);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
        await expect(page).toHaveTitle(new RegExp(title));
        await expectNoHorizontalScroll(page);

        await page.getByRole('link', { name: /ARTIGOS/ }).first().click();
        await expect(page).toHaveURL(/\/artigos$/);
    });

    test('list and article meet WCAG 2.1 AA checks', async ({ page }) => {
        await page.goto('/artigos');
        await expectNoAccessibilityViolations(page);

        await page.getByRole('article').first().getByRole('link').click();
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expectNoAccessibilityViolations(page);
    });
});

test('unknown routes show the not-found page', async ({ page }) => {
    await page.goto('/rota-que-nao-existe');
    await expect(page.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});
