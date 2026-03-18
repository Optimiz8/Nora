import { test, expect } from '@playwright/test';

const CRITICAL_PAGES = [
  { path: '/index.html', name: 'Accueil' },
  { path: '/recap.html', name: 'Récap de crise' },
  { path: '/carte.html', name: "Carte d'urgence" },
  { path: '/coherence.html', name: 'Cohérence cardiaque' },
];

test.describe('Offline — Service Worker', () => {
  test('le Service Worker s\'enregistre sans erreur', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));

    await page.goto('/index.html');
    await page.evaluate(() => navigator.serviceWorker.ready);

    const swRegistered = await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      return !!reg;
    });

    expect(swRegistered).toBe(true);
    expect(errors).toHaveLength(0);
  });

  test('les pages critiques se chargent correctement en ligne', async ({ page }) => {
    for (const p of CRITICAL_PAGES) {
      const errors = [];
      page.removeAllListeners('pageerror');
      page.on('pageerror', e => errors.push(e.message));

      await page.goto(p.path);
      await expect(page).not.toHaveTitle('', { timeout: 3000 });
      expect(errors).toHaveLength(0);
    }
  });

  test('les pages critiques sont présentes dans le cache SW', async ({ page }) => {
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    // navigator.serviceWorker.ready se résout quand le SW est activé,
    // ce qui garantit que l'install (et le pré-cache) est terminé
    await page.evaluate(() => navigator.serviceWorker.ready);

    const cached = await page.evaluate(async (paths) => {
      const results = {};
      for (const p of paths) {
        const match = await caches.match(location.origin + p);
        results[p] = !!match;
      }
      return results;
    }, CRITICAL_PAGES.map(p => p.path));

    for (const p of CRITICAL_PAGES) {
      expect(cached[p.path], `${p.name} doit être dans le cache SW`).toBe(true);
    }
  }, { timeout: 30000 });
});
