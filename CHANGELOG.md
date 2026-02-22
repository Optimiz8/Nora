# Nora — Changelog

Toutes les modifications notables sont documentées ici.
Format : [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
Versionnage : `MAJEUR.MINEUR.PATCH`
- MAJEUR = refonte ou nouvelle version majeure (V2, V3…)
- MINEUR = nouvelle fonctionnalité
- PATCH = correction de bug ou ajustement

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
