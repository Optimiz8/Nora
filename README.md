# Nora

**Application web d'aide à la communication et à la régulation en situation de surcharge ou de crise autistique.**

Créée par Marine, personne autiste SDI — pour les moments où les mots ne viennent plus.

---

## À quoi ça sert ?

Quand on est en pleine surcharge sensorielle ou en crise autistique, parler devient difficile ou impossible. Nora permet de :

- **Montrer son téléphone** plutôt que de parler — le récapitulatif de crise dit tout à ta place
- **Indiquer ses capacités actuelles** (parler, bouger, lire…) et ses besoins immédiats
- **Communiquer avec des cartes personnalisées** (pictogrammes, texte, plein écran)
- **Accéder rapidement à des outils de régulation** : sons, respiration, fidgets, harmonie visuelle, timer visuel
- **Enregistrer et suivre ses crises** dans un journal personnel avec statistiques et profil de crise
- **Configurer des profils par contexte** (maison, extérieur, travail, secours)

---

## Accès

🌐 **[Ouvrir l'application](https://optimiz8.github.io/Nora-2/)**

L'app est installable sur Android et iOS via le navigateur (option "Ajouter à l'écran d'accueil").

---

## Stack technique

| | |
|---|---|
| Langages | HTML5, CSS3, JavaScript vanilla |
| Architecture | 37 pages HTML autonomes, aucun framework |
| Données | localStorage (100% local, aucun serveur) |
| PWA | manifest.webmanifest, Service Worker, installable |
| Hébergement | GitHub Pages (statique, gratuit) |
| Dépendances | Aucune bibliothèque externe |

---

## Fonctionnement hors ligne

Dès la première ouverture, un **Service Worker** met en cache toutes les pages, le CSS et les images. Les sons sont mis en cache en arrière-plan au chargement de la page Sons. L'app fonctionne ensuite entièrement sans connexion internet.

---

## Confidentialité

Toutes les données sont stockées **localement sur ton appareil**.
Rien n'est envoyé vers un serveur. Aucun compte, aucune inscription.

---

## Roadmap

Voir [ROADMAP.md](ROADMAP.md) pour le détail des fonctionnalités prévues.

## Historique des versions

Voir [CHANGELOG.md](CHANGELOG.md).

---

## Statut du projet

| Version | Statut |
|---|---|
| V1 | ✅ Publiée |
| V1.1 | ✅ Corrections post-lancement |
| V2 | ✅ Publiée — dernière version : 2.10 (mars 2026) |
| V3 | 📋 Planifiée |
