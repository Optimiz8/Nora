# Nora — Architecture & Fonctionnement technique

> Document de référence pour comprendre les choix d'implémentation qui ne se lisent pas directement dans le code.
> À mettre à jour à chaque décision technique significative.
> Dernière mise à jour : mars 2026 — couvre jusqu'à v2.16

---

## Structure générale

Nora est une **PWA (Progressive Web App)** en HTML/CSS/JS vanilla, sans framework ni bundler.

- Chaque page est un fichier `.html` autonome avec ses `<style>` et `<script>` embarqués
- Les styles partagés (variables CSS, header, footer, bouton retour) sont dans `nora-common.css`
- Toutes les données utilisateur sont stockées en **localStorage** (pas de serveur, pas de compte)
- Hébergée sur **GitHub Pages** à l'adresse `https://optimiz8.github.io/Nora-2/`

---

## Arborescence des pages

### Vue arbre (texte)

```
index.html (Accueil)
│
├── 🆘 Aide & communication
│   ├── carte.html                    Carte d'urgence (affichage)
│   ├── cartes-communication.html     Grille de cartes
│   ├── contacts-urgence.html         Liste des contacts
│   └── timer.html                    Timer visuel
│
├── 😮 S'apaiser
│   ├── coherence.html                Exercices de respiration
│   ├── sons.html ──► playlist.html   Sons & ambiances + playlist
│   ├── fidgets.html
│   │   ├── Pop-it.html
│   │   ├── Slider.html
│   │   └── cliqueur.html
│   ├── harmonie-visuelle.html
│   └── conseils.html
│
├── 🔴 Flux de crise (bouton "Je suis en crise")
│   ├── capacites.html
│   ├── besoins.html
│   ├── etats.html
│   └── recap.html ──► enregistrement-crise.html
│
├── 📓 Journal & analyse
│   ├── journal.html ◄──► enregistrement-crise.html
│   ├── stats.html ◄──► stats-approfondie.html
│   └── profil-crise.html
│
└── ⚙️ Paramètres
    ├── parametres.html
    │   ├── contextes-liste.html
    │   │   ├── contexte-detail.html
    │   │   └── contexte-commun.html
    │   ├── carte-config.html
    │   ├── cartes-com-config.html
    │   ├── mon-profil.html
    │   ├── infos-medicales.html
    │   └── tutoriel.html
    └── a-propos.html
        ├── faq.html
        └── confidentialite.html

Pages autonomes (pas dans la navigation principale)
    ├── recap-exemple.html            Démonstration du récapitulatif
    └── 404.html                      Page d'erreur
```

---

## Icônes de navigation — SVG via data URI CSS (V2.15)

### Principe

Les icônes des boutons de navigation (retour, accueil, paramètres, journal) sont implémentées comme `background-image` SVG data URI dans `nora-common.css`, via des sélecteurs `aria-label` :

```css
.back-button                    { background-image: url("data:image/svg+xml,..."); font-size: 0; }
button[aria-label="Accueil"]    { background-image: url("data:image/svg+xml,..."); font-size: 0; }
button[aria-label="Paramètres"] { background-image: url("data:image/svg+xml,..."); font-size: 0; }
button[aria-label="Journal"]    { background-image: url("data:image/svg+xml,..."); font-size: 0; }
```

### Pourquoi cette approche

Les 28+ pages HTML utilisent toutes des emojis (`⬅️`, `🏠`…) dans leurs boutons. Modifier chaque fichier individuellement est coûteux. En masquant l'emoji (`font-size: 0`) et en injectant un SVG via `background-image`, une seule règle CSS couvre toutes les pages.

### Contraintes

- Les SVG data URI ne supportent pas les variables CSS — les couleurs sont hardcodées en hex dans le CSS (exception justifiée et contenue dans `nora-common.css`)
- Les SVG inline dans le HTML (`index.html`, `tutoriel.html`) utilisent des couleurs hex explicites (pas de `var()`) car les data URI ne supportent pas les variables CSS — exception justifiée et documentée
- `button[aria-label="Paramètres"]` cible uniquement le bouton header de `index.html` — les autres ⚙️ en contexte textuel restent en emoji

### Icônes SVG inline (V2.16)

Les icônes des deux boutons d'accueil et des checkboxes du tutoriel sont des SVG inline dans le HTML (pas dans `nora-common.css`), car elles varient selon le contexte de fond :

- **Communication** : bulle pleine dark (`#2E3A59`) + 3 points rose sur fond crème (`index.html`) ; bulle outline crème + 3 points rose sur fond sombre (`tutoriel.html`)
- **Apaisement** : fleur 5 pétales symétriques (positions calculées à 72° exact) rose + couronne crème + centre #384657 — même SVG partout (rose visible sur tous les fonds)
- **Checkbox tutoriel** : SVG injecté via JS — carré outline crème (vide) ou carré accent + coche dark (coché)

---

## Service Worker — fonctionnement offline (V2.8)

### Fichiers concernés
- `sw.js` — le Service Worker
- `sw-register.js` — enregistrement du SW, inclus dans les 37 pages HTML

### Pourquoi un Service Worker ?
Nora est utilisée en situation de crise, potentiellement sans réseau (sous-sol, zone blanche, avion, panique avec téléphone en mode avion). L'objectif est que l'app soit **toujours disponible**, quelle que soit la connexion.

### Ce qui se passe au premier lancement (avec réseau)

1. Le SW s'installe silencieusement en arrière-plan
2. Il pré-cache en parallèle toutes les ressources statiques :
   - Les 37 pages HTML
   - `nora-common.css` et `manifest.webmanifest`
   - Toutes les images (`assets/images/`) — ~9 Mo
   - Les animations Lottie/webm (`assets/*.json`, `assets/*.webm`)
   - **Total : ~15 Mo**
3. Si l'utilisatrice a des **préréglages enregistrés dans le mixeur**, `sw-register.js` lit le localStorage, extrait les sons utilisés dans ces préréglages et les envoie au SW via `postMessage` — ils sont mis en cache silencieusement

> **Les sons sont pré-cachés au chargement de `sons.html`** : 3 secondes après l'ouverture de la page, tous les fichiers audio (69 Mo au total en Opus) sont envoyés au SW pour mise en cache en arrière-plan. Ce délai évite de concurrencer le chargement initial de la page. Les sons des préréglages mixeur enregistrés sont eux mis en cache dès le premier lancement de l'app (via `sw-register.js`).

### Ce qui se passe lors des utilisations suivantes

**En ligne :**
- Les pages s'affichent **instantanément depuis le cache** (pas d'attente réseau)
- En arrière-plan, le SW vérifie si une version plus récente existe et la télécharge pour la prochaine ouverture
- C'est la stratégie **stale-while-revalidate** : "sers le cache, mets à jour en fond"

**Hors-ligne :**
- Tout fonctionne normalement : toutes les pages, le CSS, les images
- Les sons fonctionnent tous : au chargement de `sons.html`, tous les fichiers audio sont mis en cache en arrière-plan (voir ci-dessous)

### Stratégies de cache par type de ressource

| Ressource | Stratégie | Pourquoi |
|---|---|---|
| Pages HTML, CSS, manifest | **Stale-while-revalidate** | Se mettent à jour avec les nouvelles versions de l'app |
| Images, animations | **Stale-while-revalidate** | Rarement modifiées mais peuvent évoluer |
| Sons (`assets/audio/`) | **Cache-first** | Fichiers immuables, ne changent jamais |

### Mise à jour de l'app

Quand une nouvelle version est déployée sur GitHub Pages :
1. Le nouveau SW est téléchargé mais **ne remplace pas l'ancien immédiatement**
2. Il attend que toutes les fenêtres/onglets Nora soient fermés
3. À la prochaine ouverture complète, le nouveau SW s'active et nettoie les anciens caches

> Ce comportement évite qu'une mise à jour interrompe une session en cours (ex : pendant une crise).

### Versioning du cache

La constante `CACHE_VERSION` dans `sw.js` (ex : `'nora-v2.8.0'`) détermine le nom des caches.
**À mettre à jour à chaque nouvelle version déployée** pour forcer le rechargement des ressources mises à jour.

```js
const CACHE_VERSION = 'nora-v2.8.0';
```

### Cas particulier : sons des préréglages mixeur

Structure des préréglages dans localStorage (`mixerPresets`) :
```json
[
  {
    "id": "1234567890",
    "name": "Soir calme",
    "volumes": {
      "pluie sur la fenêtre": 60,
      "feu de cheminée": 40,
      "doux ronronnements": 0
    }
  }
]
```

Au chargement de n'importe quelle page, `sw-register.js` :
1. Lit `mixerPresets` dans localStorage
2. Collecte tous les sons avec `volume > 0`
3. Envoie `{ type: 'CACHE_AUDIO', urls: [...] }` au SW
4. Le SW les télécharge et les met en cache dans `AUDIO_CACHE`

### Cas particulier : pre-cache complet depuis sons.html (v2.9)

Au chargement de `sons.html`, tous les fichiers audio (28 sons) sont envoyés au SW via le même message `CACHE_AUDIO`. Cela garantit que tous les sons sont disponibles hors-ligne après une première visite en ligne, même s'ils n'ont jamais été joués.

### Format audio — Opus avec fallback MP3

Les sons sont stockés en deux formats :
- **Opus** (`.opus`) — format principal, ~70% plus léger que MP3 — supporté par Chrome, Firefox, Safari iOS 17+
- **MP3** (`.mp3`) — fallback pour Safari iOS < 17

Au démarrage de `sons.html`, une détection `canPlayType('audio/ogg; codecs=opus')` détermine l'extension à utiliser (`AUDIO_EXT`). Tous les chargements audio utilisent cette variable — aucun fichier en dur.

---

## Données utilisateur — localStorage

Toutes les données sont stockées localement, jamais envoyées à un serveur.

| Clé | Contenu |
|---|---|
| `journalCrises` | Journal des crises (array JSON) |
| `mixerPresets` | Préréglages du mixeur de sons |
| `mixer_[nom]` | Volume individuel de chaque son du mixeur |
| `cartesCommunication` | Cartes de communication personnalisées |
| `cartesShowIcons` | Affichage des icônes sur les cartes |
| `playlistName` / `lienPlaylist` | Playlist personnalisée |
| `profil_*` | Données du profil utilisateur |
| `breathingSessions` | Sessions de respiration (array `{date, programme, dureeMin}`) — V2.9 |
| `tutorielRetour` | Flag de navigation dans le tutoriel |
| `carteConfigured` | Flag de configuration de la carte d'urgence |
| `criseEnCours` | Flag booléen — crise active en cours |
| `crisisStartTime` | Timestamp du début de crise |
| `currentCapacites` / `currentBesoins` / `currentEtats` | Sélections faites pendant le flux de crise |
| `criseATraiter` | Flag — crise précédente à enregistrer avant d'en démarrer une nouvelle |

Export/import géré dans `parametres.html` (version du format : `'2.9'`).

**Sauvegarde hors du téléphone** (V2.14, `parametres.html`) : bouton "Sauvegarder hors du téléphone" utilisant la **Web Share API** (`navigator.share({ files: [...] })`). Ouvre le panneau de partage natif du téléphone (iCloud Drive, Google Drive, Mail…). Affiché uniquement si `navigator.canShare` est disponible — invisible sur les navigateurs non supportés. La construction des données est factorisée dans `buildExportData()`, partagée avec l'export JSON classique.

**Filtres avancés des stats** (V2.9.2) : `statsNavFilters` stocké en `sessionStorage` (et non `localStorage`) — les filtres sont réinitialisés à chaque nouvelle session navigateur, mais partagés entre `stats.html` et `stats-approfondie.html` dans la même session. La période (days/from/to) reste en `localStorage` et persiste entre sessions.

**Export filtré du journal** (V2.9, `journal.html`) : la modale d'export embarque ses propres filtres (période + contexte). Toutes les fonctions d'export (`exportPDF`, `exportJSON`, `shareJournal`, `exportCSV`) acceptent un tableau en paramètre et sont appelées par `doExport()` avec le résultat de `getExportFilteredJournal()`. Le CSV utilise le séparateur `;` et un BOM UTF-8 pour la compatibilité Excel France.

**Suppression de l'enregistrement automatique** (post-V2.9.3) : la clé `autoRegisterCrise` et le toggle associé dans `parametres.html` ont été supprimés. Cette feature enregistrait les crises au journal sans passer par le formulaire de recap, produisant des entrées sans intensité, type, déclencheurs, énergie ni durée — dégradant la qualité des données d'analyse. Elle a été remplacée par une protection dans `startCrisis()` : si une crise est déjà en cours quand l'utilisatrice en démarre une nouvelle, une modale lui propose d'enregistrer la précédente en mode dégradé (données disponibles + `remarques = "Enregistrement automatique"`, durée vide) avant de continuer. Cette approche préserve la trace de la crise oubliée sans jamais bloquer l'accès à l'app.

---

## Page dédiée d'enregistrement de crise (V2.10)

### Pourquoi une page et non une modale

Avant V2.10, l'enregistrement d'une crise existait en trois versions distinctes (modales dans `index.html`, `recap.html` et `journal.html`) avec des structures et comportements légèrement différents. Toute correction devait être répercutée à trois endroits. La décision de créer `enregistrement-crise.html` comme page dédiée permet de centraliser toute la logique en un seul fichier.

### Routage par paramètres URL

La page reçoit ses instructions via paramètres d'URL :

```
enregistrement-crise.html?mode=nouveau&retour=index   → fin de crise (index.html)
enregistrement-crise.html?mode=nouveau&retour=recap   → ajout depuis recap.html
enregistrement-crise.html?mode=nouveau&retour=journal → ajout manuel depuis journal.html
enregistrement-crise.html?mode=edition&id=N&retour=journal → édition d'une entrée existante
```

- `mode` : `nouveau` (création) ou `edition` (modification)
- `id` : index dans `journalCrises` trié par date décroissante — la page trie elle-même avant d'indexer pour rester cohérente avec `journal.html`
- `retour` : détermine la page de destination après sauvegarde (`index.html` ou `journal.html`)

### Données pré-remplies en mode nouveau

En mode `nouveau` depuis `index.html`, la page lit dans localStorage :
- `crisisStartTime` → date, heure de début, durée estimée calculée automatiquement
- `currentCapacites`, `currentBesoins`, `currentEtats` → associés à l'entrée mais non affichés dans le formulaire (déjà remplis pendant la crise)
- `profilActuel` → pour associer le contexte à l'entrée

### Cleanup après sauvegarde

En mode `nouveau`, après sauvegarde, la page appelle `cleanupCrisisData()` qui supprime les clés temporaires de crise : `criseEnCours`, `crisisStartTime`, `currentCapacites`, `currentBesoins`, `currentEtats`, `lastCrisisCheck`, `criseATraiter`.

### Section conditionnelle "Mon état pendant la crise"

Cette section (capacités, besoins, états) n'est affichée qu'en mode `edition`. En mode `nouveau`, ces données proviennent du flux de crise (localStorage) — elles n'ont pas besoin d'être re-saisies.

---

## Animations Lottie

Certaines pages utilisent des animations Lottie (format JSON + webm de fallback) :
- `Glitter-Star` — effet paillettes dans Harmonie visuelle
- `Space-Man` — illustration de chargement
- `Search-Empty404` / `SearchEmpty404` — page 404 et états vides
- `Sunrise - Breathe in Breathe out` — animation de cohérence cardiaque

> Note : les noms de fichiers JSON et webm sont légèrement inconsistants (`Search-Empty404.webm` vs `SearchEmpty404.json`). Ne pas renommer sans vérifier toutes les références.

---

## GitHub Pages — considérations de déploiement

L'app est servie depuis `https://optimiz8.github.io/Nora-2/` (sous-répertoire, pas la racine).
Le `manifest.webmanifest` et `sw.js` utilisent des chemins relatifs (`./`) pour fonctionner quel que soit le chemin de base — pas de configuration spécifique nécessaire.

Push sur `main` → déploiement automatique GitHub Pages.

---

## Docs de support — synchronisation avec git

### Le problème
Claude Code n'a pas de mémoire entre deux sessions. À chaque nouvelle conversation, il repart de zéro et ne sait pas si des commits ont eu lieu depuis la dernière fois qu'on a travaillé ensemble.

### La solution : marqueur de version dans chaque doc

Chaque doc de support contient une ligne de ce type :
```
> Dernière mise à jour : mars 2026 — couvre jusqu'à v2.12.2
```

Ce marqueur indique jusqu'à quel commit le doc a été mis à jour.

### Ce que Claude fait en début de session

1. Il lit le marqueur dans les docs de support
2. Il lance `git log --oneline -10` pour voir les commits récents
3. Il compare : est-ce que le commit référencé dans le marqueur est le plus récent, ou y a-t-il des commits plus récents ?
4. Si oui → il propose de mettre les docs à jour (en début ou fin de session)

### Ce que Marine n'a pas à faire

Rien. Elle commit et push depuis VS Code comme d'habitude. Claude détecte automatiquement le décalage et propose la mise à jour.

### Convention de mise à jour en fin de session

L'ordre de mise à jour des docs avant un commit :
1. `a-propos.html` — numéro de version
2. `CHANGELOG.md` — entrée pour la nouvelle version
3. `ROADMAP.md` — si une fonctionnalité est livrée ou planifiée
4. `ARCHITECTURE.md` — si un choix technique a été fait
5. `PRODUCT-OVERVIEW.md` — si une fonctionnalité majeure a été ajoutée

Après la mise à jour, le marqueur `couvre jusqu'au commit X` est mis à jour avec le nouveau hash de commit (récupéré via `git log --oneline -1` après le commit).
