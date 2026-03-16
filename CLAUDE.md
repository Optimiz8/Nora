# CLAUDE.md — Nora-2

## Contexte projet
Application mobile de soutien en crise autistique, utilisée sur téléphone. Interface en français, conçue pour être lisible rapidement sous stress. Chaque décision de design doit servir la clarté et la simplicité.

## Stack technique
- HTML/CSS/JS vanilla uniquement — aucun framework, aucun build step
- Chaque page est un fichier HTML autonome avec `<style>` et `<script>` embarqués
- Les styles partagés sont dans `nora-common.css` (variables CSS, header, footer, back-button)
- Ne jamais introduire de framework, bibliothèque externe ou bundler

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
Quand une session de travail représente une avancée significative (nouvelle fonctionnalité, refonte d'une page, lot de corrections), signaler proactivement qu'il serait bon de faire un commit.

Avant de le signaler :
1. Mettre à jour le numéro de version dans `a-propos.html`
2. Indiquer clairement ce qui a changé et quel numéro de version a été appliqué
3. Préciser à Marine de faire le commit et le push elle-même depuis VS Code

Schéma de versioning suggéré :
- `1.x` → nouvelle fonctionnalité ou changement UI significatif
- `1.x.y` → correction de bug ou ajustement visuel mineur

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
