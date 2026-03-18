# Audit Nora-2 — Mars 2026

> Audits réalisés sur la base du code en état V2.8.3

---

## Audit 1 — Manifest & Installabilité PWA

### Champs du manifest — État général ✅

| Champ | Valeur | Statut |
|-------|--------|--------|
| `name` | "Nora - Aide de crise" | ✅ |
| `short_name` | "Nora" | ✅ |
| `description` | présente | ✅ |
| `start_url` | `"./index.html"` | ✅ |
| `scope` | `"./"` | ✅ |
| `display` | `"standalone"` | ✅ |
| `background_color` | `#384657` | ✅ |
| `theme_color` | `#384657` | ✅ |
| `lang` | `"fr"` | ✅ |
| `orientation` | `"any"` | ✅ |
| `shortcuts` | 4 raccourcis (Urgence, Cartes, Respiration, Timer) | ✅ |

### Problèmes identifiés

**🔴 Icône 192×192 absente — bloque l'installation sur Android/Chrome**

Chrome exige au minimum une icône 192×192 et une icône 512×512 pour déclencher la bannière d'installation. Le manifest ne déclare que deux icônes 512×512 — l'icône 192×192 est absente.

```json
// manifest actuel — incomplet
"icons": [
  { "src": "assets/images/favicone.png", "sizes": "512x512", ... },  // ❌ déclaré 512, fichier réel = 1024
  { "src": "assets/images/logo.png",     "sizes": "512x512", ... }   // ❌ déclaré 512, fichier réel = 1024
]
```

**🟠 Taille déclarée ≠ taille réelle des fichiers**

Les deux fichiers PNG font **1024×1024** en réalité, mais sont déclarés `"sizes": "512x512"`. Ce mismatch peut provoquer des avertissements dans Lighthouse et un rendu flou sur certains appareils.

**🟠 `apple-touch-icon` — taille non spécifiée**

Dans `index.html` :
```html
<link rel="apple-touch-icon" href="assets/images/logo.png">
```
iOS s'attend à une image **180×180** (ou redimensionne depuis une grande taille). La taille n'est pas précisée dans la balise. Sans `sizes="180x180"`, Safari peut ignorer l'icône sur certaines versions.

**🟡 `manifest.webmanifest` absent de `profil-crise.html`**

35 pages sur 36 ont le lien manifest — `profil-crise.html` est la seule à ne pas le déclarer.

**🟡 Pas de favicon `16×16` / `32×32` pour desktop**

`index.html` déclare un seul favicon (1024px). Sur desktop (onglet navigateur), un PNG sans taille `16x16`/`32x32` est redimensionné — souvent flou. Mineur pour une app pensée mobile-first.

### Points positifs ✅
- `<meta name="theme-color">` présent dans `index.html`
- 4 raccourcis clavier déclarés avec icônes PNG + SVG
- `display: standalone` correct
- Icône `maskable` déclarée (importante pour Android pour éviter les bords blancs)

### Récapitulatif

| Priorité | Problème |
|----------|---------|
| 🔴 P0 | Icône 192×192 absente → installation PWA non déclenchée sur Android |
| 🟠 P1 | Taille déclarée (`512`) ≠ taille réelle (`1024`) dans le manifest |
| 🟠 P1 | `apple-touch-icon` sans `sizes="180x180"` |
| 🟡 P2 | `manifest.webmanifest` absent de `profil-crise.html` |
| 🟡 P3 | Pas de favicon 16×16/32×32 pour desktop |

---

## Audit 2 — Scripts obligatoires

Chaque page doit terminer son `<body>` par `nora-scroll.js` puis `sw-register.js`.

**3 pages manquent `nora-scroll.js` :**

| Page | sw-register.js | nora-scroll.js |
|------|:-:|:-:|
| `harmonie-visuelle.html` | ✅ | ❌ |
| `profil-crise.html` | ✅ | ❌ |
| `404.html` | ✅ | ❌ |

**Toutes les 36 pages ont `sw-register.js`.**

---

## Audit 3 — Accessibilité mobile

### Boutons sans aria-label

| Fichier | Élément | Problème |
|---------|---------|---------|
| `sons.html:655` | `<button id="mixPlay">` + SVG | Aucune description pour lecteur d'écran |
| `sons.html:656` | `<button id="mixReset">↻</button>` | Emoji seul, pas de label |
| `timer.html:907` | `<div role="button" id="circleWrap">` | `role="button"` sans `aria-label` |

### Touch targets trop petits

| Fichier | Élément | Taille | Min recommandé |
|---------|---------|--------|----------------|
| `nora-common.css:53` | `.back-button` | 36×36px | 44px |
| `nora-common.css:118` | `.header-icon` | 36×36px | 44px |
| `cartes-com-config.html:133` | `.btn-icon` | 34×34px | 44px |
| `contacts-urgence.html:89` | `.action-btn` | ~24px | 44px |

### `outline: none` sans alternative de focus

Présent dans **18 fichiers** : `journal.html` (4×), `recap.html` (3×), `contexte-detail.html` (2×), `sons.html` (2×), `stats.html` (2×), `cartes-com-config.html` (2×), `cartes-communication.html` (2×), `contexte-commun.html` (2×), et 10 autres.

Pattern type :
```css
.form-input:focus { outline: none; border-color: var(--accent); } /* focus visible mais outline absent */
```

→ Remplacer `outline: none` par `box-shadow: 0 0 0 2px var(--accent)` pour cohérence.

### Points positifs ✅
- Toutes les modales ont `role="dialog"` et `aria-modal="true"`
- `Annuler` uniforme dans toutes les modales

---

## Audit 4 — localStorage

### Inventaire — 52 clés nommées + clés dynamiques

**Clés dynamiques :**
- `mixer_${fileName}` — une par fichier audio (~10 clés)
- `contexte_${id}` — une par contexte personnalisé

**Aucun doublon réel détecté.** Note : `medicalData` → `infosMedicales` est une migration déjà gérée dans `carte.html`.

### `setItem` sans try/catch — Risques quota

| Sévérité | Fichier | Clé | Notes |
|----------|---------|-----|-------|
| 🔴 Critique | `journal.html` | `journalCrises` | 7 emplacements sans protection |
| 🔴 Critique | `recap.html` | `journalCrises` | 5 emplacements sans protection |
| 🔴 Critique | `index.html` | Clés flux crise | 9 emplacements sans protection |
| 🟡 Moyen | `coherence.html:1202` | `customInhale`, `customExhale` | Pas de try/catch local |
| 🟡 Moyen | `sons.html:904` | `mixer_*` | Dans le handler change/input |

`journalCrises` est la clé la plus à risque : croissance non bornée, écrite sans try/catch par 3 fichiers différents. Un quota dépassé (5-10 Mo selon navigateur) provoque un crash silencieux — la crise n'est pas enregistrée.

**Pattern sûr recommandé :**
```js
try {
  localStorage.setItem('journalCrises', JSON.stringify(journal));
} catch (e) {
  // Afficher un toast d'erreur : "Impossible d'enregistrer (stockage plein)"
}
```

### `JSON.parse` sans try/catch

| Fichier | Occurrences | Risque |
|---------|-------------|--------|
| `contexte-detail.html` | 8 | JSON corrompu → page inutilisable |
| `contextes-liste.html` | 4 | Idem |
| `carte-config.html` | 2 | Idem |
| `cartes-communication.html` | non protégé | Idem |

Les fichiers protégés (avec try/catch) : `stats.html`, `profil-crise.html`, `stats-approfondie.html`, `tutoriel.html`, `parametres.html` (import global).

### Dépendances inter-pages notables (non documentées)

| Clé | Écrite par | Lue par | Rôle |
|-----|-----------|---------|------|
| `calmSource` | `recap.html` | `fidgets.html`, `sons.html`, `coherence.html`, `playlist.html`, `harmonie-visuelle.html`, `conseils.html` | Routing retour |
| `profilActuel` | `index.html` | `besoins.html`, `capacites.html`, `etats.html`, `journal.html` | Contexte de crise |
| `crisisStartTime` | `index.html`, `capacites.html` | `recap.html` | Calcul durée crise |
| `tutorielRetour` | `tutoriel.html`, `carte-config.html` | `carte-config.html`, `cartes-com-config.html` | Navigation tutoriel |

---

## Audit 5 — Service Worker / Offline

### Couverture cache : complète ✅

Tous les 36 fichiers HTML + 4 assets partagés + images + animations sont dans `STATIC_ASSETS`. Rien ne manque côté fichiers projet.

### Problèmes identifiés

**Pas de fallback 404.html automatique**
Si une URL non cachée est demandée hors-ligne, `staleWhileRevalidate` retourne `null` → page blanche, pas redirection vers `404.html`.

```js
// sw.js — comportement actuel
return cached || fetchPromise; // si les deux sont null → réponse vide
```

**`playwright.config.js`** non caché — sans importance fonctionnelle (fichier de test).

### Points positifs ✅
- Stratégie `staleWhileRevalidate` correcte pour pages/CSS/JS
- `cache-first` pour l'audio (sons chargés offline)
- Préchargement dynamique des presets mixer via `postMessage`
- Nettoyage des anciens caches à l'activation (pas de `skipWaiting` intempestif)
- Installation avec échec silencieux par asset (robuste)

---

## Audit 6 — Rétrocompatibilité données

### Fonctions normalize — Incohérence de valeur retournée

| Fonction | Fichier | Retourne si absent |
|----------|---------|-------------------|
| `normalizeEnergie()` | `journal.html` | `null` |
| `normEnergie()` | `stats.html`, `profil-crise.html` | `NaN` |

`null !== NaN` → les comparaisons entre pages peuvent diverger silencieusement. Choisir `null` (plus lisible) et l'uniformiser.

### `JSON.parse` sans try/catch — même liste qu'audit 4

Voir tableau audit 4. Risque : corruption localStorage (édition manuelle, bug SW, import foireux) → crash page.

### Accès tableau sans vérification de type

`journal.html:1836` — vérifie `.length` mais pas si c'est bien un `Array` :
```js
if (entry.capacites.impossible && entry.capacites.impossible.length)
  capLines.push(... entry.capacites.impossible.map(escapeHtml) ...)
// Si impossible = {length:5} (objet), .map() est undefined → TypeError
```

`stats.html:1447` — même risque sur `caps.impossible`.

### Migrations existantes ✅
- `medicalData` → `infosMedicales` : migration dans `carte.html`
- Ancien format `precrisis` (0-100) → énergie (1-10) : couvert par `normalizeEnergie()`
- Déclencheurs string[] → objets `{nom, intensite}` : couvert par `normalizeDeclencheurs()`
- Format contextes v1 → v2 dans `parametres.html:664`

---

## Audit 7 — Cohérence UX inter-pages

### `alert()` et `confirm()` natifs — Priorité haute

**15 pages utilisent `alert()` ou `confirm()` (50+ occurrences).**

Ces dialogues bloquants cassent l'UX mobile et sont incohérents avec les modales custom du design system.

Pages les plus touchées :

| Page | alert() | confirm() |
|------|:-------:|:---------:|
| `journal.html` | 10+ | 0 |
| `recap.html` | 8 | 2 |
| `contexte-commun.html` | 5 | 3 |
| `contexte-detail.html` | 6 | 2 |
| `contacts-urgence.html` | 7 | 0 |
| `stats.html` | 6 | 0 |
| `stats-approfondie.html` | 5 | 0 |
| `carte-config.html` | 1 | 1 |

### Navigation retour — 3 patterns coexistent

| Pattern | Pages | Problème |
|---------|-------|---------|
| `history.back()` | `cartes-communication.html`, `profil-crise.html` | Casse si historique vide |
| `history.back()` + fallback `index.html` | `carte.html`, `journal.html` | Meilleur, mais incohérent |
| `location.href` fixe | 30+ pages | Cohérent, prévisible |

→ Standardiser sur `location.href` fixe (ou le pattern avec fallback) partout.

### Toasts — Variante display vs opacity

| Fichier | Classe | Approche |
|---------|--------|---------|
| Standard (`nora-common.css`) | `.toast` | `opacity` ✅ |
| `mon-profil.html` | `.success-toast` | `display:none → block` ❌ |
| `infos-medicales.html` | `.success-toast` | `display:none → block` ❌ |
| `playlist.html` | `.success-message` | `display:none → block` ❌ |
| `timer.html` | `.timer-toast` | `opacity` ✅ |

### Libellés — Valider vs Enregistrer

Même action de sauvegarde exprimée de 3 façons :
- **"Valider"** — `journal.html`, `recap.html`, `contexte-detail.html`
- **"Enregistrer"** — `carte-config.html`, `cartes-communication.html`, `mon-profil.html`
- **"OK"** — modales de confirmation dans `besoins.html`, `capacites.html`, `etats.html`

Pas bloquant, mais à harmoniser à l'occasion.

---

## Récapitulatif priorités

| Priorité | Problème | Fichiers |
|----------|---------|---------|
| 🔴 P0 | `setItem('journalCrises')` sans try/catch | `journal.html`, `recap.html`, `index.html` |
| 🔴 P0 | `JSON.parse` sans try/catch sur données critiques | `contexte-detail.html`, `contextes-liste.html` |
| 🟠 P1 | `nora-scroll.js` manquant | `harmonie-visuelle.html`, `profil-crise.html`, `404.html` |
| 🟠 P1 | `alert()` / `confirm()` natifs (50+ occurrences) | 15 pages |
| 🟠 P1 | `aria-label` manquant sur 3 boutons | `sons.html`, `timer.html` |
| 🟡 P2 | Incohérence `null` vs `NaN` dans normalize | `stats.html`, `profil-crise.html` |
| 🟡 P2 | `outline: none` sans alternative focus | 18 fichiers |
| 🟡 P2 | Toasts display vs opacity | `mon-profil.html`, `infos-medicales.html`, `playlist.html` |
| 🟢 P3 | Touch targets < 44px | `nora-common.css`, `cartes-com-config.html`, `contacts-urgence.html` |
| 🟢 P3 | `history.back()` sans fallback | `cartes-communication.html`, `profil-crise.html` |
| 🟢 P3 | Fallback 404.html dans SW hors-ligne | `sw.js` |

---

## Audit 9 — Sécurité

### HTTPS ✅

GitHub Pages fournit HTTPS automatiquement — prérequis rempli. Le Service Worker est bien restreint à l'origine (pas de `scope` élargi).

### Headers de sécurité — Absents (limitation hébergeur)

GitHub Pages (plan gratuit) ne permet pas de configurer des headers HTTP personnalisés. Les headers suivants sont donc absents :

| Header | Rôle | Impact |
|--------|------|--------|
| `Content-Security-Policy` | Restreindre les ressources autorisées | Absence = XSS non bloqué au niveau navigateur |
| `X-Frame-Options` | Empêcher l'embedding en iframe (clickjacking) | Faible risque (app locale, pas de transactions) |
| `X-Content-Type-Options: nosniff` | Empêcher le MIME sniffing | Faible risque |

→ **Non corrigeable sans migrer vers un hébergeur supportant les headers** (Netlify, Vercel, Cloudflare Pages). Pour GitHub Pages, la seule alternative partielle est une balise `<meta http-equiv="Content-Security-Policy">` dans chaque page HTML — coût élevé, couverture incomplète.

### XSS — `innerHTML` sans échappement

**`escapeHtml()` est bien définie et utilisée dans la majorité des pages (56 usages).** Mais `contacts-urgence.html` injecte des données utilisateur non échappées dans `innerHTML` :

```js
// contacts-urgence.html:484 — SANS escapeHtml
const nomComplet = contact.nom || 'Contact';       // donnée utilisateur
const lien = contact.lien ? ` (${contact.lien})` : '';  // donnée utilisateur
const telephone = contact.telephone ? ` - ${contact.telephone}` : '';

card.innerHTML = `...${nomComplet}${lien}...${telephone.replace(' - ', '')}...`;
```

Un attaquant contrôlant localStorage (ex. via une autre extension malveillante, ou un import de fichier piégé) pourrait injecter du HTML arbitraire.

`contact.remarque` est également injecté sans escapeHtml (via un `.replace()` avec regex, pas une sanitisation).

**Risque réel :** faible en pratique (il faut déjà contrôler le device ou l'import), mais le vecteur existe.

**Pages protégées correctement :** `carte.html`, `journal.html`, `recap.html`, `stats.html`, `cartes-com-config.html` utilisent `escapeHtml` systématiquement. ✅

### Dépendance CDN externe — SRI absente

`carte.html` charge une bibliothèque depuis un CDN externe sans attribut `integrity` :

```html
<!-- carte.html:455 — SANS integrity -->
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
```

Sans [Subresource Integrity (SRI)](https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity), si jsDelivr est compromis ou si la version `@1.0.0` est modifiée rétroactivement, du code malveillant s'exécuterait dans l'app avec accès au localStorage (données médicales, journal, contacts).

**Correction :** ajouter `integrity` + `crossorigin` :
```html
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"
        integrity="sha256-[hash_à_calculer]"
        crossorigin="anonymous"></script>
```

Ou mieux : **télécharger `qrcode.min.js` localement** dans `assets/js/` pour éliminer la dépendance réseau et le risque CDN en une seule étape.

### `eval()` — Absent ✅

Aucun usage d'`eval()` dans le codebase. ✅

### Données sensibles en localStorage — Risque accepté, documenté

Les données suivantes sont stockées en clair dans localStorage :

| Clé | Nature |
|-----|--------|
| `infosMedicales`, `carteMedical` | Informations médicales |
| `journalCrises` | Journal détaillé de crises (intensité, déclencheurs, remarques) |
| `carteContacts`, `contactsUrgence` | Noms et numéros de téléphone |
| `userNom`, `userPrenom` | Identité |
| `cartePresentation`, `carteConsignes` | Textes personnels |

**localStorage n'offre pas de chiffrement natif.** Le chiffrement côté JS (ex. WebCrypto) est techniquement possible mais complexe (gestion de clé, UX de déverrouillage) et hors scope pour une app vanilla offline-first.

→ **Risques réels :**
- Accès physique au device déverrouillé
- Extension navigateur malveillante avec accès à l'origine
- XSS (voir section ci-dessus)

→ **Atténuants :** app purement locale (pas de serveur, pas de transit réseau), données non exportées vers tiers, politique de confidentialité existante (`confidentialite.html`).

→ **Recommandation :** documenter explicitement dans `confidentialite.html` que les données restent sur l'appareil et peuvent être lues par toute personne ayant accès au navigateur.

### Récapitulatif

| Priorité | Problème | Fichier |
|----------|---------|---------|
| 🟠 P1 | `innerHTML` sans `escapeHtml` sur données utilisateur | `contacts-urgence.html:484` |
| 🟠 P1 | Dépendance CDN sans SRI (qrcodejs) | `carte.html:455` |
| 🟡 P2 | Headers de sécurité absents (limitation GitHub Pages) | Hébergeur |
| 🟢 P3 | Données sensibles en localStorage sans chiffrement | Comportement documenté, acceptable |

---

## Audit 8 — Performance / Core Web Vitals

### Contexte

Nora est une PWA offline-first, mobile-first. La performance critique est celle du **premier chargement** (cold start) et de la **navigation entre pages**. Le Service Worker met les assets en cache dès l'installation — les chargements suivants sont quasi-instantanés.

### `nora-data.js` render-blocking — 16 pages

`nora-data.js` (16 KB) est chargé dans `<head>` sans `defer` sur 16 pages. Tant que ce fichier n'est pas parsé, le navigateur bloque le rendu.

```html
<!-- Dans <head>, sans defer — bloquant -->
<script src="nora-data.js"></script>
```

La correction est simple : ajouter `defer`. Sur 20 des 36 pages, `nora-data.js` n'est même pas inclus (il n'y est pas utile).

**Pages où `nora-data.js` est chargé :** `index.html`, `besoins.html`, `capacites.html`, `etats.html`, `journal.html`, `recap.html`, `stats.html`, `stats-approfondie.html`, `parametres.html`, `profil-crise.html`, `mon-profil.html`, `infos-medicales.html`, `carte-config.html`, `contexte-detail.html`, `contexte-commun.html`, `contextes-liste.html`.

### Taille des fichiers HTML — Pages lourdes

| Page | Taille | Impact |
|------|--------|--------|
| `stats.html` | 140 KB | Long parse JS au chargement |
| `journal.html` | 128 KB | Idem |
| `stats-approfondie.html` | 104 KB | Idem |
| `recap.html` | 100 KB | Idem |
| `timer.html` | 76 KB | Acceptable |
| `index.html` | 64 KB | Page d'entrée — critique |

Ces tailles sont la conséquence du pattern "CSS + JS embarqués dans chaque page" (choix architectural délibéré). Après compression gzip (GitHub Pages l'applique automatiquement), elles sont divisées par ~3. **Pas d'action à mener.**

### Images — Logo et icône surdimensionnés

| Fichier | Taille | Usage | Problème |
|---------|--------|-------|---------|
| `logo.png` | 1,1 MB | Icône maskable / apple-touch-icon | Trop lourd pour une icône |
| `favicone.png` | 700 KB | Icône PWA (1024×1024) | Idem |
| JPG sons (`assets/images/*.jpg`) | ~7 MB total | Fonds audio (29 fichiers) | `loading="lazy"` ✅ — OK |

`logo.png` et `favicone.png` ne sont pas affichés dans l'UI (uniquement utilisés comme icônes app), donc ils ne bloquent pas le rendu. Ils alourdissent néanmoins l'installation initiale du cache SW.

### CLS — Images sans dimensions explicites

`sons.html` injecte des images via `innerHTML` sans `width`/`height` :

```js
`<img src="assets/images/${fileName}.jpg" alt="${displayName}" loading="lazy">`
```

Sans dimensions déclarées, le navigateur ne peut pas réserver l'espace avant le chargement → saut de mise en page (CLS). Ajouter `width` et `height` (ou un ratio CSS fixe via `aspect-ratio`) résoudrait ça.

### Audio — 233 MB au total

Les fichiers audio sont volumineux mais ne sont **jamais préchargés** : ils sont chargés à la demande, mis en cache individuellement par le SW en `cache-first`. Ce comportement est correct pour une app de ce type. **Pas d'action à mener.**

### Animations JSON (Lottie)

| Fichier | Taille | Page |
|---------|--------|------|
| `Glitter-Star.json` | 292 KB | `harmonie-visuelle.html` |
| `Space-Man.json` | 92 KB | `404.html` |
| `Sunrise-Breathe.json` | 24 KB | `coherence.html` |

`Glitter-Star.json` à 292 KB est notable, mais chargé uniquement sur `harmonie-visuelle.html` et mis en cache SW. Pas critique.

### Points positifs ✅
- Compression gzip automatique (GitHub Pages)
- Service Worker : `staleWhileRevalidate` pour HTML/CSS/JS, `cache-first` pour audio
- Images sons : `loading="lazy"` systématique
- Aucune dépendance CDN externe (après correction Audit 9)
- Aucun framework JS, aucun bundle — parse time minimal

### Récapitulatif

| Priorité | Problème | Pages / Fichiers |
|----------|---------|-----------------|
| 🟠 P1 | `nora-data.js` sans `defer` dans `<head>` | 16 pages |
| 🟡 P2 | `logo.png` (1,1 MB) et `favicone.png` (700 KB) surdimensionnés | Icônes app |
| 🟡 P2 | Images `sons.html` sans `width`/`height` → CLS potentiel | `sons.html` |

---

## Audit 10 — Compatibilité navigateurs

### Cibles visées

| Navigateur | Version min | Part de marché mobile |
|-----------|-------------|----------------------|
| Chrome Android | 90+ | ~65% |
| Safari iOS | 16+ | ~25% |
| Samsung Internet | 15+ | ~5% |
| Firefox Android | 120+ | ~3% |

### 🔴 P0 — Opus non supporté sur Safari iOS < 17

**C'est la conséquence directe de la conversion MP3 → Opus.**

Safari iOS supporte Opus depuis iOS 17 (septembre 2023). Sur iOS 16 et antérieur, **aucun son ne jouera**. Les fichiers `.mp3` sont toujours présents dans le dépôt — il faut détecter le support Opus au runtime et basculer sur MP3 si nécessaire.

```js
// Détection à ajouter en haut du script de sons.html
const _a = new Audio();
const AUDIO_EXT = _a.canPlayType('audio/ogg; codecs=opus') !== '' ? 'opus' : 'mp3';
```

Puis remplacer les 3 occurrences de `` `.opus` `` par `` `.${AUDIO_EXT}` ``.

### APIs natives — État des gardes

| API | Utilisée dans | Safari iOS | Android | Garde en place |
|-----|--------------|-----------|---------|---------------|
| `navigator.wakeLock` | `coherence.html`, `harmonie-visuelle.html` | ✅ iOS 16.4+ | ✅ | ✅ `if (!('wakeLock' in navigator))` |
| `navigator.share` | `journal.html`, `recap.html`, `stats.html`, `stats-approfondie.html`, `profil-crise.html` | ✅ | ✅ | ✅ `if (navigator.share)` |
| `navigator.clipboard` | `journal.html`, `recap.html`, `profil-crise.html` | ✅ iOS 13.4+ | ✅ | ✅ `if (navigator.clipboard && ...)` |
| `navigator.vibrate` | `timer.html` | ❌ jamais supporté | ✅ Chrome | ✅ `navigator.vibrate && ...` |
| `navigator.contacts` | `contacts-urgence.html` | ❌ non supporté | ✅ Chrome 80+ | ✅ `if ('contacts' in navigator ...)` |
| `navigator.geolocation` | `recap.html` | ✅ | ✅ | ✅ `if (navigator.geolocation)` |

Toutes les APIs non-universelles sont correctement gardées. ✅

### CSS — `backdrop-filter` sans préfixe `-webkit-`

`coherence.html` utilise `backdrop-filter: blur(4px)` sans le préfixe `-webkit-backdrop-filter`. Les navigateurs modernes n'en ont plus besoin, mais Safari iOS < 15.4 pourrait ignorer la règle. Impact visuel mineur (flou de fond absent, pas de crash).

```css
/* coherence.html:391 — manque le préfixe pour vieilles versions Safari */
backdrop-filter: blur(4px);
/* à compléter : */
-webkit-backdrop-filter: blur(4px);
```

### CSS Custom Properties — ✅

`var(--bg)`, `var(--dark)`, etc. supportées par tous les navigateurs cibles. ✅

### Service Worker — ✅

Supporté depuis Safari iOS 11.3, Chrome 40, Firefox 44. Aucun problème pour les cibles visées. ✅

### Récapitulatif

| Priorité | Problème | Fichier |
|----------|---------|---------|
| 🔴 P0 | Opus non supporté iOS < 17 → silence total | `sons.html` |
| 🟡 P2 | `backdrop-filter` sans `-webkit-` | `coherence.html` |
