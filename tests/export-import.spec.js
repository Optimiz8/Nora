import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Données de base réalistes pour les tests
const SEED_DATA = {
  userPrenom: 'Alice',
  userNom: 'Dupont',
  journalCrises: [
    {
      horodatage: '2024-03-10T14:30:00',
      profil: 'maison',
      typeCrise: 'Sensoriel',
      typeManifestation: 'Retrait',
      intensite: 7,
      duree: '30 min',
      declencheurs: [{ nom: 'Sensoriel — Auditif', intensite: 8 }],
      remarques: 'Test remarque',
      besoins: [{ label: 'Silence', icon: '🤫' }],
      etats: [{ label: 'Anxieux', icon: '😰' }],
      capacites: { impossible: ['Parler'], difficile: [], possible: [], incertain: [] },
      energie: 4,
      chargeMentale: 6,
      chargeSociale: 3,
    },
  ],
  cartesCommunication: [
    { id: 'test1', emoji: '🚫', text: 'Ne me touchez pas', sousTexte: '' },
  ],
  cartesShowIcons: 'true',
  carteConsignes: 'Rester calme',
  carteInformations: 'Autiste',
  infosMedicales: { groupeSanguin: 'A+', traitements: '' },
};

test.describe('Export / Import', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/parametres.html');
    // Injecter des données de base dans localStorage
    await page.evaluate((data) => {
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      });
    }, SEED_DATA);
  });

  test('export produit un fichier JSON valide', async ({ page }) => {
    await page.goto('/parametres.html');

    // Déclencher l'export et intercepter le téléchargement
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.evaluate(() => {
        // Appel direct à la fonction exportData (évite de cliquer sur la modale)
        exportData();
      }),
    ]);

    const filePath = path.join(os.tmpdir(), download.suggestedFilename());
    await download.saveAs(filePath);

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    expect(content.version).toBeTruthy();
    expect(content.prenom).toBe('Alice');
    expect(content.nom).toBe('Dupont');
    expect(Array.isArray(content.journalCrises)).toBe(true);
    expect(content.journalCrises).toHaveLength(1);
    expect(Array.isArray(content.cartesCommunication)).toBe(true);

    fs.unlinkSync(filePath);
  });

  test('import restaure les données correctement', async ({ page }) => {
    await page.goto('/parametres.html');

    // Construire un fichier d'export valide
    const exportData = {
      version: '2.5',
      prenom: 'Bob',
      nom: 'Martin',
      contacts: [],
      carteContacts: [],
      carteConsignes: 'Ne pas toucher',
      carteInformations: '',
      carteRemarques: '',
      cartePresentation: '',
      carteShowIdentity: 'true',
      carteShowPresentation: 'true',
      carteShowConsignes: 'true',
      carteShowInformations: 'true',
      carteShowContacts: 'true',
      carteShowRemarques: 'false',
      carteMedical: 'true',
      carteContactsInitialized: 'false',
      carteContactsNote: '',
      infosMedicales: { groupeSanguin: 'B+' },
      contextes: {
        messageUnique: false,
        liste: [],
        commun: {},
        configs: {},
      },
      journalCrises: [
        {
          horodatage: '2024-05-01T10:00:00',
          profil: 'exterieur',
          typeCrise: 'Social',
          intensite: 5,
          duree: '15 min',
          declencheurs: [],
          remarques: '',
        },
      ],
      autoRegisterCrise: 'false',
      cartesCommunication: [
        { id: 'c1', emoji: '✋', text: 'Stop', sousTexte: '' },
      ],
      cartesShowIcons: 'true',
      mixerPresets: [],
      mixerVolumes: {},
      playlistName: '',
      lienPlaylist: '',
      breathingSessions: [],
      customInhale: '',
      customExhale: '',
      listeConseils: null,
      timerLastDuration: '',
      timerSonMode: '',
      timerFinMode: '',
      timerStyle: '',
    };

    // Simuler la sélection d'un fichier
    const buffer = Buffer.from(JSON.stringify(exportData));
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.evaluate(() => {
        // Ouvrir directement importData() sans passer par la modale
        importData();
      }),
    ]);

    await fileChooser.setFiles({
      name: 'nora-export.json',
      mimeType: 'application/json',
      buffer,
    });

    // Attendre le toast de succès et le reload
    await expect(page.locator('#toast')).toContainText('importées avec succès', { timeout: 5000 });

    await page.waitForFunction(() => {
      return localStorage.getItem('userPrenom') === 'Bob';
    }, { timeout: 5000 });

    const stored = await page.evaluate(() => ({
      prenom: localStorage.getItem('userPrenom'),
      nom: localStorage.getItem('userNom'),
      journal: JSON.parse(localStorage.getItem('journalCrises') || '[]'),
      cartes: JSON.parse(localStorage.getItem('cartesCommunication') || '[]'),
    }));

    expect(stored.prenom).toBe('Bob');
    expect(stored.nom).toBe('Martin');
    expect(stored.journal).toHaveLength(1);
    expect(stored.cartes).toHaveLength(1);
    expect(stored.cartes[0].text).toBe('Stop');
  });

  test('import rejette un JSON malformé sans crasher', async ({ page }) => {
    await page.goto('/parametres.html');

    const badData = Buffer.from('{ pas du json valide !!!');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.evaluate(() => { importData(); }),
    ]);
    await fileChooser.setFiles({
      name: 'bad.json',
      mimeType: 'application/json',
      buffer: badData,
    });

    await expect(page.locator('#toast')).toContainText('corrompu', { timeout: 5000 });
    // Les données précédentes doivent être intactes
    const prenom = await page.evaluate(() => localStorage.getItem('userPrenom'));
    expect(prenom).toBe('Alice');
  });

  test('import ignore les balises HTML dans les champs texte (anti-XSS)', async ({ page }) => {
    await page.goto('/parametres.html');

    const xssData = {
      version: '2.5',
      prenom: '<script>window.__xss=1</script>Alice',
      nom: '<img src=x onerror="window.__xss=2">Dupont',
      contacts: [],
      carteContacts: [],
      infosMedicales: {},
      contextes: { messageUnique: false, liste: [], commun: {}, configs: {} },
      journalCrises: [],
      cartesCommunication: [],
      mixerPresets: [],
      mixerVolumes: {},
      breathingSessions: [],
      listeConseils: null,
    };

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.evaluate(() => { importData(); }),
    ]);
    await fileChooser.setFiles({
      name: 'xss.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(xssData)),
    });

    await page.waitForFunction(() => {
      const p = localStorage.getItem('userPrenom');
      return p !== null && p !== 'Alice';
    }, { timeout: 5000 });

    const stored = await page.evaluate(() => ({
      prenom: localStorage.getItem('userPrenom'),
      nom: localStorage.getItem('userNom'),
      xss: window.__xss,
    }));

    // Les balises HTML doivent avoir été supprimées (pas de < ou > dans les valeurs stockées)
    expect(stored.prenom).not.toContain('<');
    expect(stored.prenom).not.toContain('>');
    expect(stored.nom).not.toContain('<');
    expect(stored.nom).not.toContain('>');
    // Le script ne doit pas s'être exécuté
    expect(stored.xss).toBeUndefined();
  });
});
