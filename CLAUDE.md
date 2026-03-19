# CLAUDE.md — Nora-2

## Contexte projet
Application mobile de soutien en crise autistique, utilisée sur téléphone. Interface en français, conçue pour être lisible rapidement sous stress. Chaque décision de design doit servir la clarté et la simplicité.

## Stack technique
- HTML/CSS/JS vanilla uniquement — aucun framework, aucun build step
- Chaque page est un fichier HTML autonome avec `<style>` et `<script>` embarqués
- Les styles partagés sont dans `nora-common.css` (variables CSS, header, footer, back-button)
- Ne jamais introduire de framework, bibliothèque externe ou bundler

## Scripts systématiquement présents en fin de `<body>`
Toute page HTML du projet doit se terminer par ces deux scripts, dans cet ordre :
```html
<script src="nora-scroll.js"></script>
<script src="sw-register.js"></script>
```
- `nora-scroll.js` — gestion du scroll natif
- `sw-register.js` — enregistrement du Service Worker (offline)

## Design system — Couleurs
```
--bg:     #384657  (fond principal)
--dark:   #2E3A59  (bleu marine — texte foncé, éléments sombres)
--light:  #F5E4CC  (crème — texte clair, état actif/sélectionné)
--accent: #F7B89C  (pêche/saumon — boutons d'action primaire uniquement)
--danger: rgba(255, 70, 70, 0.8)  (rouge — boutons destructeurs uniquement, ex. suppression)
```
Exception documentée : les 4 couleurs sémantiques d'état des capacités dans `journal.html` (vert/orange/rouge/gris en dégradé très transparent) sont hors-charte mais conservées pour leur utilité fonctionnelle.

## Règle fondamentale UI
> **`--accent` (rose/pêche) pour les items sélectionnés dans les listes (besoins, états) — avec `box-shadow:0 4px 8px rgba(0,0,0,0.2)`.**
> **`--accent` aussi pour les boutons d'action primaire ("Commencer", "Valider").**
> **`--light` (blanc-crème) pour le fond par défaut des items de liste (non sélectionnés).**

## Règle absolue — Couleurs
> **Toutes les couleurs du code doivent provenir exclusivement des 5 variables CSS du design system** (`--bg`, `--dark`, `--light`, `--accent`, `--danger`) ou de leurs déclinaisons `rgba()`.
> Aucune couleur hexadécimale, RGB ou nom de couleur CSS en dur dans les pages.
> Toute teinte de survol, focus, tap highlight, outline, accent de formulaire doit utiliser ces variables. Aucune invention de couleur, même "neutre".

## Conventions de code
- En-têtes de section en CSS : `/* ---------- NOM SECTION ---------- */`
- Variables CSS pour couleurs et dimensions, jamais de valeurs hexadécimales en dur dans les pages
- Pas de commentaires dans le HTML/CSS sauf si la logique n'est pas évidente

## Conventions UI
- Interface entièrement en français, tutoiement
- Modales : `.classList.add('visible')` / `.classList.remove('visible')`

## Docs de support — synchronisation

Les fichiers `.md` du projet sont appelés **docs de support** (ou "project docs"). Ils couvrent :
- `CHANGELOG.md` — historique des versions
- `ROADMAP.md` — feuille de route
- `PRODUCT-OVERVIEW.md` — vision & stratégie produit
- `ARCHITECTURE.md` — fonctionnement technique (Service Worker, localStorage, choix d'implémentation)
- `README.md` — présentation générale
- `analyse-donnees.md` — documentation des insights statistiques

**Chaque doc contient une ligne `> Dernière mise à jour : ... — couvre jusqu'au commit X (vY.Z)`**
→ En début de session, lire cette ligne et comparer avec `git log --oneline -10` pour savoir si des commits non documentés existent.
→ Si oui, proposer proactivement une mise à jour des docs avant de commencer le travail, ou en fin de session.

**Convention de mise à jour :**
Les docs doivent être mis à jour **en fin de session**, juste avant de signaler le commit à Marine.
L'ordre : 1) `a-propos.html` (version), 2) `CHANGELOG.md`, 3) `ROADMAP.md` si nécessaire, 4) `ARCHITECTURE.md` si modification technique, 5) `PRODUCT-OVERVIEW.md` si nouvelle fonctionnalité majeure.

## Commits et versioning

### Commandes de commit (mots-clés déclencheurs)

Ces mots-clés ne fonctionnent que si le message ne contient **que** le mot-clé (éventuellement avec un numéro de version), pas dans une phrase ordinaire. Tous les mots-clés sont **insensibles à la casse** (`#commit`, `#Commit`, `#COMMIT` sont équivalents).

**`#commit`** (ou **`#1`**) — Phase 1 : proposer
→ Répondre uniquement avec :
1. Le numéro de version proposé (selon le schéma ci-dessous)
2. Un message de commit court, prêt à copier-coller
Ne pas lister les docs à mettre à jour à cette étape.

**`#ok`** / **`#go`** (ou **`#2`**, insensible à la casse) — Phase 2 : valider
→ Mettre à jour le numéro de version dans `a-propos.html` ET dans `CACHE_VERSION` de `sw.js` (format `'nora-vX.Y.Z'`).
→ Confirmer, puis préciser à Marine de faire le commit et le push depuis VS Code.

**`#MAJ`** — Mise à jour complète
→ Mettre à jour tous les docs de support du projet dans l'ordre : `a-propos.html`, `CHANGELOG.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `PRODUCT-OVERVIEW.md`.

### Schéma de versioning
- `x.y` → nouvelle fonctionnalité ou changement UI significatif
- `x.y.z` → correction de bug ou ajustement visuel mineur

## Branches Git
Marine travaille directement sur `main` (seule développeuse, déploiement GitHub Pages automatique au push).
- Ne pas vérifier la branche ni suggérer de passer sur `dev`.
- Pas de workflow de merge à suivre.

## Ce qu'on ne fait pas
- Pas de refactoring non demandé
- Pas d'ajout de fonctionnalités non demandées
- Pas de commits automatiques
- Pas de README ou documentation sauf si demandé explicitement
- Pas d'arrondi ou de simplification silencieuse des comportements existants

## Workflow
- Lire le fichier avant toute modification
- Tester mentalement le comportement sur mobile (375px, tactile)
- Pour une inspiration externe (React, etc.) : adapter au pattern vanilla HTML existant, ne pas copier la structure React
- Si une modification touche `nora-common.css`, vérifier l'impact sur les autres pages
- **Si une demande contient des points flous ou plusieurs interprétations possibles, commencer par poser les questions nécessaires avant de coder.** Ne jamais supposer — valider d'abord.

## Limite de tokens — anti-boucle
Les fichiers volumineux (ex. `timer.html` > 80 KB) peuvent provoquer une erreur `API Error: response exceeded 32000 output token maximum` si trop de code est généré en une seule réponse. Pour éviter ça :
- Faire les modifications **une par une**, via l'outil `Edit` (diff seulement, pas réécriture complète)
- Ne jamais réécrire un fichier entier avec `Write` si >300 lignes
- Écrire des messages courts entre chaque modification, sans paraphraser chaque ligne de code
