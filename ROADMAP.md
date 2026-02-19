# Nora - Roadmap

## V1 (actuelle) - Nora - Aide de crise
Application web d'aide en situation de crise autistique.
Publication sur GitHub Pages.

---

## V2 - Nora (tout court)
L'app ne serait plus limitee a la crise, mais deviendrait un compagnon au quotidien.

### Cartes de communication pre-enregistrees (prioritaire)
- Cartes pour situations du quotidien (pas uniquement en crise)
- Exemples : caisse, CMI, medecin, transports, travail, file d'attente
- Affichage plein ecran pour montrer le telephone
- Cartes par defaut + possibilite d'en creer des personnalisees
- Categories : Commerces, Sante, Transports, Travail/Ecole, Social, Urgences

### Message d'isolement plein ecran
- Ecran "STOP" simple et direct en cas de shutdown
- "Ne me parlez pas. Ne me touchez pas. Laissez-moi m'isoler."
- Accessible en 1 tap depuis l'accueil

### Accompagnement post-crise
- Page "Apres la crise" avec rappels : se reposer, manger, s'hydrater, ne pas culpabiliser
- Declenchee automatiquement apres la fin d'une crise enregistree
- Conseils personnalisables

### Journal - ameliorations
- Statistiques et graphiques (nombre de crises par semaine/mois, intensite moyenne, declencheurs frequents)
- Selection de crises specifiques pour export PDF (pas tout le journal)
- Filtres par periode, contexte, intensite

### Numeros de crise accessibles
- Acces rapide au 3114, 114 (SMS), 15
- Visible sur l'accueil ou la carte d'urgence

### Technique d'ancrage 5-4-3-2-1
- Guide interactif : 5 choses vues, 4 touchees, 3 entendues, 2 senties, 1 goutee
- Ajout aux outils d'apaisement

### Theorie des cuilleres (optionnel)
- Jauge d'energie quotidienne (1-10)
- Suggestions adaptees au niveau
- Utile pour la prevention, pas pour tout le monde

### Playlists multiples (jusqu'a 5)
- Possibilite de creer jusqu'a 5 playlists apaisantes
- Chaque playlist avec son propre nom et ses liens
- Selection rapide depuis les outils d'apaisement

### Chronometre de crise visible
- Afficher la duree ecoulee sur le recap
- Aide l'entourage a evaluer la situation

### Timer visuel anti-cecite temporelle
- Cercle SVG qui se vide progressivement (plus lisible cognitivement qu'une horloge classique)
- Alertes vocales a des seuils cles (30min, 15min, 10min, 5min, 1min) via speechSynthesis
- Prereglages rapides (15min, 30min, 1h...)
- Page autonome, accessible depuis les outils d'apaisement ou l'accueil
- Particulierement utile pour l'hyperfocus et la cecite temporelle (symptome TSA frequent)
- Complexite faible a moyenne : SVG + setInterval + speechSynthesis, pas de librairie externe

---

## V3 - Application native Android
Passage de web app a application native (ou hybride type PWA avancee / Capacitor).

### Widgets Android
- Widget "SOS" sur le bureau : lance directement le mode crise
- Widget "Carte de com" : affiche une carte pre-selectionnee en 1 tap
- Widget "Energie" : jauge rapide sans ouvrir l'app
- Widget "Contacts d'urgence" : appel/SMS en 1 tap

### Avantages d'une app native
- Notifications (rappels post-crise, check-in quotidien)
- Acces hors-ligne garanti (Service Worker avance)
- Meilleure integration systeme (vibration, son, plein ecran)
- Presence sur le Play Store (visibilite, confiance)

---

## Idees en vrac (a trier)
- Mode sombre (vrai, pas juste le theme actuel)
- Multi-langue (anglais, etc.)
- Partage de profil entre appareils (QR code d'import/export)
- Mode "accompagnant" (version simplifiee pour l'aidant)
