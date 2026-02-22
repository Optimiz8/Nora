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
```

## Règle fondamentale UI
> **`--light` (blanc-crème) pour les états sélectionnés/actifs.**
> **`--accent` (rose/pêche) réservé aux boutons "Commencer", "Valider", actions primaires.**
> Ne jamais utiliser `--accent` comme couleur de sélection.

## Conventions de code
- En-têtes de section en CSS : `/* ---------- NOM SECTION ---------- */`
- Variables CSS pour couleurs et dimensions, jamais de valeurs hexadécimales en dur dans les pages
- Pas de commentaires dans le HTML/CSS sauf si la logique n'est pas évidente

## Conventions UI
- Interface entièrement en français, tutoiement
- Modales : `.classList.add('visible')` / `.classList.remove('visible')`

## Commits et versioning
Quand une session de travail représente une avancée significative (nouvelle fonctionnalité, refonte d'une page, lot de corrections), signaler proactivement qu'il serait bon de faire un commit.

Avant de le signaler :
1. Mettre à jour le numéro de version dans `a-propos.html`
2. Indiquer clairement ce qui a changé et quel numéro de version a été appliqué
3. Préciser à Marine de faire le commit et le push elle-même depuis VS Code

Schéma de versioning suggéré :
- `1.x` → nouvelle fonctionnalité ou changement UI significatif
- `1.x.y` → correction de bug ou ajustement visuel mineur

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
