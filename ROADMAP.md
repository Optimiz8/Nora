# Nora — Roadmap

> Dernière mise à jour : février 2026
> Stack : HTML / CSS / JavaScript vanilla · PWA · GitHub Pages

---

## V1 — Aide de crise ✅ *publiée*

Application web d'aide en situation de crise autistique.
Fonctionnalités principales : flux de crise, récapitulatif partageable, outils d'apaisement, journal, profil par contexte.

### V1.1 — Corrections post-lancement ✅
- Favicon et logo intégrés, manifest PWA complet
- Titres harmonisés (suppression de "TSA App")
- Bug enregistrement crise corrigé
- Contacts sélectionnés par défaut dans le profil commun
- Champ allergies en textarea multi-lignes
- Ordre des sections Paramètres corrigé
- Toast d'enregistrement plus visible (4,5 sec)
- Suppression du "Quitter le site ?" intempestif
- Redirection vers l'accueil après fin de crise
- Wake lock 30 min sur Harmonie visuelle
- Redesign de la page Exercices de respiration
- Tutoiement généralisé dans toute l'interface

---

## V2 — Compagnon au quotidien 🔄 *en cours*

L'app ne se limite plus à la crise : elle devient un outil de vie.

### Règles de ton (à appliquer sur tous les nouveaux textes)

**A. Outils de crise** (flux de crise, carte d'urgence) → **Neutre Bienveillant**
Court, factuel, sans fioritures. Le cerveau est saturé.
> Exemple : "Choisis ton ressenti" plutôt que "Dis-moi comment tu te sens !"

**B. Outils d'apaisement + post-crise** → **Chaleureux Rassurant**
Enveloppant sans être mièvre. Validation émotionnelle.
> Exemple : "C'est fini. Prends le temps de respirer."

**C. Paramètres / Profil / Configuration** → **Partenaire de projet**
Complice, respectueux de l'autonomie.
> Exemple : "Configure tes contacts pour qu'ils sachent quoi faire si tu ne peux plus parler."

---

### Ordre de développement V2

```
0. Relecture et harmonisation de tous les textes   [non bloquant, en parallèle]
1. Cartes de communication ✅                      [livré]
2. Timer visuel anti-cécité temporelle ✅          [livré, à tester]
3. Tutoriel (onboarding) ✅                        [livré, à tester]
4. Journal — statistiques simples ✅               [livré]
5. App Shortcuts V1 ✅                             [livré, à tester]
```

### Détail des fonctionnalités V2

#### 0. Relecture des textes en dur
Harmonisation du tutoiement, application des 3 niveaux de ton, clarification des labels et messages.

#### 1. Cartes de communication ✅
Cartes à montrer dans les situations du quotidien (pas uniquement en crise).
Affichage plein écran, police large, fort contraste.
Cartes par défaut + création personnalisée + favoris.

#### 2. Timer visuel anti-cécité temporelle
Cercle SVG qui se vide progressivement, temps restant en chiffres au centre.
Alertes sonores (bip ou voix) aux seuils : 1h / 30 min / 15 min / 2 min.
Comportement de fin configurable : voix / vibration / flash / rien.
Snooze (+5/+15/+30 min) ou arrêt. Wake lock actif pendant le décompte.
Accès depuis la modale "J'ai besoin d'aide et de communiquer" (accueil).

#### 3. Journal — statistiques simples
Nombre de crises par semaine/mois, déclencheurs fréquents, intensité moyenne.
Suppression d'entrées individuelles.

#### 4. App Shortcuts V1
Raccourcis Android via appui long sur l'icône.
V1 : 2 raccourcis — "Démarrer une crise" + "Cartes de communication".
À faire en dernier (dépend des Cartes de communication).

---

## V3 — Publication & Accessibilité élargie

### Ordre recommandé

```
1. Service Worker / offline garanti          [prérequis pour Capacitor]
2. Onboarding / tutoriel premier lancement
3. Palettes de couleurs
4. App Shortcuts V2 (enrichis si besoin)
5. Capacitor + stores                        [probable, pas acté]
6. Multi-langue (anglais)                    [en dernier absolu]
```

### Détail

#### 1. Service Worker / offline garanti
Script background qui met toute l'app en cache local.
Garantit le fonctionnement sans réseau, même après mise à jour.
**Prérequis pour Capacitor.**

En clair : actuellement Nora charge depuis internet à chaque ouverture. Avec un Service Worker, une copie complète de l'app est stockée sur le téléphone — elle fonctionne même hors connexion et les mises à jour se téléchargent silencieusement en arrière-plan.

#### 2. Onboarding / tutoriel premier lancement ✅ *(livré en V2)*
Tutoriel en 7 étapes couvrant les deux piliers (aide & communication, apaisement), configuration de la carte d'urgence et des cartes de communication.
Accessible depuis Paramètres. Détection premier lancement à vérifier.

#### 3. Palettes de couleurs
Remplace l'idée de "mode sombre" — l'app actuelle est déjà sur un fond sombre, un mode sombre n'aurait pas de sens.

**Principe** : 3 palettes prédéfinies, choisissables dans Paramètres (et présentées dès le tutoriel).
Chaque palette redéfinit les 4 variables CSS globales : `--bg`, `--dark`, `--light`, `--accent`.
La classe de thème est appliquée sur `<body>` via le localStorage, au chargement de chaque page.

**Palettes envisagées :**
- **Standard** (actuelle) : fond bleu-ardoise, crème, pêche — ambiance nocturne
- **Clair neutre** : fond gris-beige clair, texte anthracite, accent gris-bleu — sobre et lisible
- **Clair pastel** : fond lavande très clair, texte violet foncé, accent lavande — doux et apaisant

**Périmètre d'application :**
Toutes les pages sauf les visuels spéciaux du timer (`kawaii` et `espace`) qui ont leur propre univers graphique indépendant et ne doivent pas être affectés.

**Travail requis avant d'implémenter :**
- Audit de tous les fichiers HTML : repérer les `rgba(46, 58, 89, …)` / `rgba(245, 228, 204, …)` codés en dur dans les `<style>` embarqués
- Migrer ces valeurs vers des variables CSS RGB channels (`--dark-rgb: 46, 58, 89`) pour permettre l'usage dans `rgba()`
- Ajouter un script de chargement de thème dans `nora-scroll.js` (ou fichier dédié)
- Ajouter le sélecteur de palette dans `parametres.html`
- Intégrer la présentation des palettes dans le tutoriel (step de personnalisation)

**Note** : les couleurs exactes des palettes "Clair neutre" et "Clair pastel" sont à définir quand les hex sont trouvés.

#### 4. App Shortcuts V2
Enrichissement si de nouvelles fonctionnalités le justifient.

#### 5. Capacitor + stores
Envelopper la PWA dans une coque native pour Play Store et App Store.
Pas de réécriture — le HTML/CSS/JS existant est conservé.
Fort probable mais pas définitivement acté.

#### 6. Multi-langue
Uniquement quand tous les textes sont stables. Priorité : anglais.

---

## En réflexion (pas de version assignée)

- **Notifications push** — décision non prise, pas avant V3.
- **Playlists multiples** (jusqu'à 5).
- **Partage de profil entre appareils** — très lointain (pas avant V4).
- **Numéros d'urgence rapides** — 3114, 15, 114, 18. Accès depuis l'accueil ou la carte d'urgence. Questions à trancher avant de coder.
- **Post-crise + Ancrage 5-4-3-2-1** — Page auto après enregistrement d'une crise + guide sensoriel. Pas en V2, à réévaluer.

---

## Archivé / Abandonné

- **Mode accompagnant** — mis de côté indéfiniment.
- **Widgets natifs Android** — nécessite une app native complète.
- **Théorie des cuillères** — en vrac, pas prioritaire.
- **Écran STOP / isolement** — doublon avec les cartes de communication (une carte "STOP / J'ai besoin d'être seul" remplit ce rôle).
