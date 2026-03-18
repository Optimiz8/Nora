import { test, expect } from '@playwright/test';

const JOURNAL_ENTRY = {
  horodatage: '2024-03-15T09:00:00',
  profil: 'maison',
  typeCrise: 'Sensoriel',
  typeManifestation: 'Retrait',
  intensite: 6,
  duree: '20 min',
  declencheurs: [
    { nom: 'Sensoriel — Auditif', intensite: 7 },
    { nom: 'Divers — bruit de foule', intensite: 5 },
  ],
  remarques: 'Beaucoup de bruit ce matin',
  besoins: [{ label: 'Silence', icon: '🤫' }, { label: 'Repos', icon: '😴' }],
  etats: [{ label: 'Anxieux', icon: '😰' }],
  capacites: {
    impossible: ['Parler'],
    difficile: ['Écrire / taper sur un clavier'],
    possible: ['Rester ici'],
    incertain: [],
  },
  energie: 3,
  chargeMentale: 7,
  chargeSociale: 8,
};

test.describe('Journal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/journal.html');
    await page.evaluate((entry) => {
      localStorage.setItem('journalCrises', JSON.stringify([entry]));
    }, JOURNAL_ENTRY);
    await page.reload();
  });

  const ENTRY_ROW = 'table tbody tr:not(.year-header-row)';

  test('affiche les entrées du journal', async ({ page }) => {
    await expect(page.locator(ENTRY_ROW)).toHaveCount(1, { timeout: 5000 });
  });

  test('ouvre le détail d\'une entrée sans crash', async ({ page }) => {
    await page.locator(ENTRY_ROW).first().click();
    await expect(page.locator('#detailModal')).toHaveClass(/visible/, { timeout: 3000 });
  });

  test('affiche les remarques dans le détail', async ({ page }) => {
    await page.locator(ENTRY_ROW).first().click();
    await expect(page.locator('#detailModal')).toHaveClass(/visible/, { timeout: 3000 });
    await expect(page.locator('#detailContent')).toContainText('Beaucoup de bruit ce matin');
  });

  test('affiche les déclencheurs dans le détail', async ({ page }) => {
    await page.locator(ENTRY_ROW).first().click();
    await expect(page.locator('#detailModal')).toHaveClass(/visible/, { timeout: 3000 });
    await expect(page.locator('#detailContent')).toContainText('Sensoriel');
  });

  test('affiche les capacités dans le détail', async ({ page }) => {
    await page.locator(ENTRY_ROW).first().click();
    await expect(page.locator('#detailModal')).toHaveClass(/visible/, { timeout: 3000 });
    await expect(page.locator('#detailContent')).toContainText('Parler');
  });

  test('journal vide affiche l\'état vide sans crash', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('journalCrises'));
    await page.reload();
    // La page ne doit pas crasher — pas d'erreur JS
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.waitForTimeout(1000);
    expect(errors).toHaveLength(0);
  });
});
