# Nora — Changelog

> Dernière mise à jour : mars 2026 — couvre jusqu'à v2.9.4

Toutes les modifications notables sont documentées ici.
Format : [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
Versionnage : `MAJEUR.MINEUR.PATCH`
- MAJEUR = refonte ou nouvelle version majeure (V2, V3…)
- MINEUR = nouvelle fonctionnalité
- PATCH = correction de bug ou ajustement

---

## [2.9.4] — mars 2026

### Corrigé
- **index.html** — listeners manquants : boutons "Non, elle est toujours en cours" (style secondary + navigation retour) et "Non, m'apaiser" (retour ferme la modale) corrigés
- **index.html** — suppression de l'enregistrement automatique (`autoRegisterCrise`) : remplacé par une modale proposant d'enregistrer la crise précédente en mode dégradé si une nouvelle crise démarre avant la fin de la précédente
- **stats.html / stats-approfondie.html** — filtres avancés : synchronisation inter-onglets et gel des filtres au chargement stabilisés
- **confidentialite.html** — accordéons repliés par défaut ; chemin de suppression des données corrigé
- **recap.html** — champ d'enregistrement automatique supprimé (feature retirée)
- **nora-scroll.js** — seuil d'affichage de l'indicateur scroll : 80 → 100 px (élimine un faux positif sur `cartes-communication.html`)
- **parametres.html** — toggle "Enregistrement automatique" supprimé

---

## [2.9.3] — mars 2026

### Corrigé
- **index.html** — 10+ listeners manquants sur les boutons des modales crise, questionnaire PCM, déclencheurs et durée
- **index.html** — croix de fermeture (×) des modales `contextModal`, `precrisisModal`, `triggersModal` corrigées
- **index.html** — bouton retour physique (Android) : ferme désormais les modales `helpModal`, `calmModal`, `contextModal` au lieu de quitter la page
- **coherence.html** — suppression du bouton retour redondant affiché en bas de l'écran d'exercice
- **coherence.html** — bouton retour physique pendant l'exercice → retour à l'écran de paramétrage (via `pushState` + `popstate` + `pageshow` pour le cache bfcache)

---

## [2.9.2] — mars 2026

### Corrigé
- **stats.html / stats-approfondie.html** — filtres avancés : passage de `localStorage` à `sessionStorage` — les filtres ne persistent plus entre sessions, mais restent synchronisés entre les deux onglets dans la même session
- **stats.html / stats-approfondie.html** — badge ⚙️ Filtres affiché au démarrage si un filtre est restauré depuis la session en cours
- **stats.html** — "Erreur de chargement" au changement d'onglet corrigée (causée par des filtres périmés stockés en localStorage)
- **stats.html** — bouton 👤 Profil ajouté dans le footer (visible dès 5 crises enregistrées)
- **stats.html** — espace vide excessif en bas du footer réduit
- **sons.html** — bug scroll sliders : heuristique de détection direction revue — scroll vertical détecté dès 6 px, slider exige 12 px horizontaux ET ratio 2:1 sur le vertical (élimine les faux positifs sur scrolls diagonaux)
- **coherence.html** — espacement entre animation prévisualisation et boutons Cercle/Bulle augmenté
- **coherence.html** — lien "↗ voir" remplacé par "Détails" (souligné, style lien)
- **coherence.html** — taille texte modale historique : 13 px → 14 px
- **recap.html** — titres de sections "Avant la crise" / "La crise" : 13 px → 15 px
- **profil-crise.html** — padding manquant sur `main-content` ajouté (contenu collé aux bords corrigé)
- **profil-crise.html** — tailles de texte augmentées (baseline 13→14 px, titres sections 12→13 px)
- **nora-scroll.js** — indicateur de scroll démarre caché (élimine le flash furtif au chargement sur les pages non-scrollables)
- **Pop-it.html / Slider.html / cliqueur.html** — `html { overflow: hidden }` ajouté (corrige le scroll parasite / rebond iOS)
- **besoins.html / etats.html** — style de sélection : fond crème conservé + contour bleu marine + ombre légère (remplace le fond rose)

### Amélioré
- Taille de police des textes descriptifs augmentée sur 6 pages : `sons.html`, `index.html`, `recap.html`, `stats.html`, `profil-crise.html`, `coherence.html`

---

## [2.9] — mars 2026

### Ajouté
- **Export journal filtré** (`journal.html`) : nouvelle modale d'export avec filtres période (Tout / Ce mois / 3 mois / Cette année / Personnalisé) et contexte — compteur live "X crises sélectionnées"
- **Export CSV** : nouveau format tableur (séparateur `;`, BOM UTF-8, compatible Excel), 16 colonnes (date, heure, contexte, origine, type, intensité, durée, énergie, CM, CS, déclencheurs, besoins, états, capacités impossibles, difficiles, remarques)
- **Mini stats respiration** (`coherence.html`) : chaque session complète est enregistrée en localStorage (`breathingSessions`)
- Modale de fin d'exercice enrichie : animation de félicitations (anneaux + ✓), stats "Ce mois-ci" et "Au total" (sessions + minutes)
- Messages d'encouragement variés selon le programme : Cohérence cardiaque (focus régulation/VFC), Apaisement (focus nerf vague), Personnalisé
- **Paliers/badges** : 6 paliers de sessions (1, 5, 10, 25, 50, 100) et 4 paliers de temps (30 min, 1h, 5h, 10h) — banderole dans la modale au franchissement uniquement
- Info modale programmes : ajout "Les effets d'une session durent environ 3 à 6 heures" dans la description Cohérence cardiaque

### Corrigé
- **sons.html** — bug slider anti-scroll : remplacé l'heuristique JS fragile (détection d'angle) par `touch-action: pan-x` sur les sliders du mixeur, qui délègue la discrimination horizontal/vertical au navigateur de façon fiable
- **sons.html** — sons silencieux hors-ligne : au chargement de la page, tous les fichiers audio sont maintenant mis en cache en arrière-plan via le Service Worker (`CACHE_AUDIO`), ce qui garantit leur disponibilité lors de la prochaine utilisation hors-ligne

### Corrigé — Audit sécurité & performance
- **Manifest PWA** : icône 192×192 ajoutée (obligatoire pour l'installation Android), tailles corrigées (1024 déclarées au lieu de 512), `apple-touch-icon` 180×180, favicon 32×32 desktop
- **XSS** (`contacts-urgence.html`) : `escapeHtml()` appliquée sur `nom`, `lien`, `téléphone` et `remarque` des contacts
- **Dépendance CDN supprimée** : `qrcodejs` téléchargé localement (`assets/js/qrcode.min.js`) — la carte QR fonctionne désormais hors-ligne
- **Performance** : `defer` ajouté sur `<script src="nora-data.js">` dans les 16 pages qui l'incluent — le rendu n'est plus bloqué
- **Audio MP3 → Opus** : tous les fichiers audio convertis au format Opus (−70% de taille, 233 Mo → 69 Mo), avec détection automatique et fallback MP3 pour Safari iOS < 17
- **CLS** (`sons.html`) : attributs `width`/`height` ajoutés sur les images des cartes sons et du mixeur
- **Compatibilité Safari** (`coherence.html`) : `-webkit-backdrop-filter` ajouté
- **Manifest** (`profil-crise.html`) : lien `manifest.webmanifest` manquant ajouté
- **Confidentialité** : mention explicite dans `confidentialite.html` que les données en localStorage sont lisibles par toute personne ayant accès au navigateur déverrouillé

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
