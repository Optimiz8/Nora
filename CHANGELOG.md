# Nora — Changelog

> Dernière mise à jour : mars 2026 — couvre jusqu'au commit `0a5a00a` (v2.8.0)

Toutes les modifications notables sont documentées ici.
Format : [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
Versionnage : `MAJEUR.MINEUR.PATCH`
- MAJEUR = refonte ou nouvelle version majeure (V2, V3…)
- MINEUR = nouvelle fonctionnalité
- PATCH = correction de bug ou ajustement

---

## [2.8.0] — mars 2026

### Ajouté
- **Service Worker** (`sw.js`) : mise en cache complète de l'application pour un fonctionnement garanti hors-ligne
- **`sw-register.js`** : script partagé d'enregistrement du Service Worker, inclus dans les 36 pages HTML
- Pré-cache au premier lancement : toutes les pages HTML, le CSS, les images, les animations Lottie/webm (~15 Mo)
- Cache à la demande pour les sons : chaque son est caché la première fois qu'il est joué
- Cache prioritaire pour les sons des préréglages mixeur : au chargement, les sons des préréglages enregistrés sont envoyés au SW pour pré-cache silencieux
- Stratégie **stale-while-revalidate** pour les pages et ressources statiques (affichage instantané depuis le cache, mise à jour en arrière-plan)
- Stratégie **cache-first** pour les fichiers audio (immuables, pas besoin de vérifier le réseau)
- Nettoyage automatique des anciens caches à chaque mise à jour de version
- Activation différée : le nouveau SW entre en service uniquement quand toutes les fenêtres de l'app sont fermées (pas de coupure en pleine session)

---

## [2.7.2] — mars 2026

### Ajouté
- Icônes SVG dédiées pour les 4 raccourcis PWA : `shortcut-cartes.svg`, `shortcut-coherence.svg`, `shortcut-timer.svg`, `shortcut-urgence.svg`
- Versions PNG 192×192 de ces icônes
- `scope: "./"` ajouté dans `manifest.webmanifest`

### Modifié
- Timer : améliorations visuelles mineures
- Corrections mineures sur `conseils.html`, `index.html`, `recap.html`, `tutoriel.html`

---

## [2.7.1] — mars 2026

### Modifié
- Footer : couleur de fond unifiée à `var(--bg)` sur toutes les pages
- `nora-common.css` : toast commun centralisé (`var(--dark)` opaque), `border-top` du footer supprimé
- Timer : toast centré dans la page, texte en mode pause plus lisible, segments plus grands en paysage
- `recap.html` / `recap-exemple.html` : couleurs actives codées en dur remplacées par variables CSS
- `contexte-commun.html` : background footer codé en dur → `var(--bg)`
- Blocs `.toast` locaux supprimés de 6 pages (`carte-config`, `contexte-detail`, `parametres`, `cartes-communication`, `cartes-com-config`, `contexte-commun`)

---

## [2.7] — mars 2026

### Modifié
- `coherence.html` : refonte de l'interface de configuration — onglets animation/son indépendants, grande prévisualisation de l'animation, stepper de durée (remplace le carousel)
- `harmonie-visuelle.html` : refonte du mode Paillettes — pluie de losanges scintillants avec effets burst
- `sons.html` : modale de confirmation avant la suppression d'un préréglage
- `timer.html` : améliorations visuelles mineures

---

## [2.6.1] — mars 2026

### Ajouté
- Gestes tactiles (swipe gauche/droite) pour naviguer entre `stats.html` et `stats-approfondie.html`

---

## [2.6] — mars 2026

### Ajouté
- `profil-crise.html` : nouvelle page autonome — synthèse du profil de crise en phrases d'insight, moyennes explicites, section "Schémas récurrents", boutons Partager et Exporter
- `--danger: rgba(255, 70, 70, 0.8)` : 5e variable officielle du design system, ajoutée dans `nora-common.css`
- Stats : export enrichi — CSV téléchargeable + option Imprimer/PDF
- Stats : flèches ↗ / ↘ pour les variations (remplace ⬆ / ⬇)
- `stats-approfondie.html` : jauges moyennes "Avant la crise" ajoutées au-dessus du graphique SVG
- Journal : `minimum-scale=0.5` dans le viewport pour autoriser le dézoom du tableau

### Corrigé
- `journal.html` : bug accolade manquante dans `openFormModal()` qui vidait le tableau au chargement
- Stats : colonne "Préc." masquée quand pas de période précédente
- `profil-crise.html` : parsing de la durée corrigé (1h30 → 90 min)

### Modifié
- `stats-approfondie.html` : profil de crise déplacé dans page dédiée ; filtre avancé repositionné au-dessus de la période
- `stats.html` : filtre avancé pleine largeur, repositionné au-dessus de la période
- `contexte-detail.html` : toutes les couleurs en dur remplacées par variables CSS
- `journal.html` : couleurs codées en dur remplacées par variables CSS
- Stats : emojis de contexte supprimés dans les textes d'insights

---

## [2.5] — mars 2026

### Ajouté
- Export/Import global enrichi : ambiances sonores (presets + volumes), playlist, version `2.5` dans le JSON
- `harmonie-visuelle.html` : mode Paillettes (canvas glitter), Wake Lock réduit à 15 min
- Cohérence cardiaque : bouton ⓘ → modale avec descriptions scientifiques des programmes
- Cohérence cardiaque : modale "Bien joué !" avec durée dynamique (Recommencer / Terminer)
- Timer : alertes ajoutées aux seuils 2h et 1h30
- Stats vue d'ensemble : section "Avant la crise — Moyennes" + min/max
- Accueil : bouton "Non, je ne souhaite pas" dans la modale d'enregistrement de crise
- `journal.html` : section optionnelle besoins/états/capacités, déclencheurs repliables, anti-scroll sur les sliders

### Corrigé
- Cohérence cardiaque : correction de la pause (gel au frame courant, reprise depuis la position exacte)
- Sons : bug du slider mixeur au scroll corrigé (approche "restore" au `touchstart`)

### Modifié
- `besoins.html` / `etats.html` / `capacites.html` : support du retour vers `journal.html` après sélection
- `conseils.html` : "cohérence cardiaque" → "exercice de respiration" dans le lien
- Sons : lazy loading des images

---

## [2.4] — mars 2026

### Ajouté
- Stats : export graphique partageable — modale de choix (Vue d'ensemble / Analyse / Les deux)
- `stats-approfondie.html` : bouton 🏠 avec `location.replace` (ne pollue pas l'historique)

---

## [2.3] — mars 2026

### Ajouté
- Stats : génération automatique d'insights (`buildInsights`, règles A–Q) : clusters de crises, déclencheur le plus intense, seuils critiques énergie/charges, capacité systématiquement impossible
- `stats-approfondie.html` : page d'analyse approfondie (graphiques, moyennes, insights)

---

## [2.2] — mars 2026

### Modifié
- Refactoring général du code pour lisibilité et maintenabilité

---

## [2.1] — mars 2026

### Corrigé
- Suppression des fonctions `normalize` dupliquées entre pages

### Modifié
- Questionnaire de crise V2 : énergie, charges mentale et sociale sur échelle 1–10
- Déclencheurs : format objet `{nom, intensite}` avec slider 1–10 ; 6 catégories (Sensoriel, Social, Changement, Cadre, Cognitif, Divers)
- Options "Indéterminé" pour origine et type de crise

---

## [2.0] — mars 2026 — *V2 publiée*

### Ajouté
- Cartes de communication (`cartes-communication.html`, `cartes-com-config.html`)
- Timer visuel (`timer.html`) : cercle SVG, alertes sonores aux seuils, snooze, Wake Lock
- Tutoriel guidé en 7 étapes (`tutoriel.html`)
- Statistiques synthétiques (`stats.html`) avec filtres
- Raccourcis PWA : Carte d'urgence, Cartes de communication, Cohérence cardiaque, Timer
- Export / Import global des données (journal, profil, cartes, sons, playlist)

---

## [1.1.0] — février 2026

### Ajouté
- Favicon (`favicone.png`) et logo (`logo.png`) intégrés dans les 26 pages HTML
- Icônes PWA déclarées dans `manifest.webmanifest`
- `apple-touch-icon` sur toutes les pages
- Wake lock 30 minutes sur Harmonie visuelle (Screen Wake Lock API)
- Redirection automatique vers l'accueil après fin de crise

### Corrigé
- `contexte-detail.html` restauré depuis git (supprimé par erreur)
- Bug enregistrement crise : `crisisConfirmModal` inexistant causait une erreur JS et des doubles enregistrements
- Contacts non sélectionnés par défaut dans le profil commun → auto-sélection jusqu'à 3 contacts
- Champ "Autres allergies" : `<input type="text">` remplacé par `<textarea>` (support des sauts de ligne)
- Suppression du `beforeunload` qui déclenchait "Quitter le site ?" à chaque navigation
- Toast de confirmation crise : durée 2,8s → 4,5s, taille et contraste augmentés
- Flux d'enregistrement crise : "Enregistrer" ouvre maintenant le questionnaire détaillé au lieu de sauvegarder silencieusement

### Modifié
- Titres de toutes les pages : "TSA App" remplacé par "Nora"
- Ordre des sections dans Paramètres : Paramètres des contextes avant Journal de crises
- Padding des cartes Paramètres réduit (70px → 52px de hauteur min)
- Espacement entre sections Paramètres réduit
- Page Exercices de respiration : redesign complet du CSS (carousels, bouton, écran de respiration)
- À propos : logo affiché (180×80px recadré), description et objectif mis à jour, FAQ enrichie (8 questions)
- Tutoiement généralisé dans toute l'interface

---

## [1.0.0] — février 2026 — *Première publication*

### Ajouté
- Flux de crise complet : sélection contexte → capacités → besoins → états → récapitulatif
- Récapitulatif de crise partageable (Web Share API, clipboard, géolocalisation optionnelle)
- Bandeau "crise en cours" avec chronomètre sur l'accueil
- Journal de crises avec questionnaire détaillé (type, intensité, déclencheurs, durée, remarques)
- Enregistrement automatique des crises (toggle)
- Profil utilisateur : prénom, texte de présentation, contacts d'urgence, informations médicales
- Carte d'urgence numérique configurable
- 4 contextes de base + profils personnalisés illimités
- Paramétrage par contexte : capacités, besoins, états, contacts visibles
- Sons relaxants : 29 ambiances avec jaquettes visuelles et player
- Exercices de respiration : 3 programmes, 2 animations, son optionnel, durée réglable
- Harmonie visuelle : animation générative apaisante
- Fidgets : Pop-it, Cliqueur, Slider
- Playlist apaisante : liens personnalisables
- Conseils de régulation
- Export / import des données (JSON)
- Réinitialisation complète
- Page À propos avec FAQ
- PWA installable (manifest, icônes, thème)
- Hébergement GitHub Pages
