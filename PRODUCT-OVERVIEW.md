# Nora — Vision & Stratégie Produit

> **Document vivant.** À mettre à jour à chaque évolution significative : nouvelle fonctionnalité aboutie, décision de déploiement, changement de cap. Demander à Claude Code de le mettre à jour en fin de session si nécessaire.
> Dernière mise à jour : mars 2026 — couvre jusqu'à v2.12 · entrée en phase alpha · protocole tests dans TESTS-ALPHA.md

---

## 1. L'application en une phrase

**Nora est un compagnon discret pour les moments de crise autistique** : communication sans parole, outils de régulation sensorielle, journal de crise et analyse des patterns — tout en local, sans compte, sans connexion requise.

---

## 2. Publics cibles

### Utilisatrice principale (phase 1 — en cours)
Marine, personne autiste SDI (Sans Déficience Intellectuelle). Nora est née d'un besoin personnel réel : avoir sous la main, en pleine crise, les bons outils sans avoir à chercher, expliquer ou parler.

### Utilisateurs cibles (phase 2 — tests)
Autres personnes autistes adultes, principalement SDI ou avec un haut niveau d'autonomie. L'app suppose une capacité à configurer soi-même ses outils (cartes, contextes, profil) hors de la crise.

### Distribution large (phase 3 — conditionnelle)
Si les retours des tests utilisateurs sont positifs, diffusion plus large auprès de la communauté autiste francophone.

### Ce que Nora n'est PAS
- Un outil de diagnostic
- Une application clinique ou thérapeutique
- Un outil conçu pour les parents ou accompagnants (même s'ils peuvent en bénéficier indirectement via la carte d'urgence ou le récapitulatif)
- Un réseau social ou service communautaire
- Une application connectée (pas de compte, pas de serveur)

---

## 3. Valeurs & positionnement

*Valeurs déduites de l'ensemble des choix de conception — elles n'ont pas été formalisées a priori mais transparaissent dans chaque décision.*

### Ce qui définit Nora

**Confidentialité totale**
Aucun compte, aucun serveur, aucune donnée transmise. Tout reste sur l'appareil (localStorage). C'est un choix structurant non négociable : les données de crise sont intimes et sensibles.

**Offline-first**
L'app fonctionne sans connexion. Installable comme une vraie application (PWA). Une crise ne prévient pas — l'outil doit être là, tout le temps, même en sous-sol ou en zone blanche. Garanti depuis V2.8 par un Service Worker qui met toute l'app en cache local dès le premier lancement.

**Conçue pour la crise, pas pour le bureau**
L'interface doit être lisible en quelques secondes sous stress cognitif élevé. Grande typographie, peu de choix, navigation évidente. Ce n'est pas une app qu'on consulte posément — c'est un outil de secours.

**Autonomie sans la parole**
Communiquer ses besoins, son état, ses consignes d'urgence — sans avoir à articuler une phrase. C'est le cœur de la proposition de valeur.

**Par et pour**
Créée par une personne autiste pour ses propres besoins, à partir de l'expérience du terrain. Pas une app conçue par des neurotypiques avec de bonnes intentions.

**Non-médicalisée**
Nora ne diagnostique pas, ne prescrit pas, ne remplace pas un suivi. C'est un outil de soutien quotidien et de régulation, pas un dispositif médical.

### Ce qui la différencie

- Pensée pour être utilisée *pendant* la crise, pas seulement *après*
- Tout-en-un : communication, régulation, journal — sans switcher d'app
- Les données appartiennent à l'utilisateur et restent sur son appareil
- Interface francophone, tutoiement, ton bienveillant mais non condescendant
- Niveau de personnalisation élevé (contextes, cartes, contacts, profil)

---

## 4. Architecture actuelle — vue fonctionnelle

L'app est organisée autour de **trois piliers** accessibles depuis l'accueil, plus un système de profil/configuration transversal.

---

### Pilier 0 — Profil & configuration (hors crise)
Tout ce qui se configure calmement, avant, pour que ça soit prêt en crise.

| Fonctionnalité | Fichier | État |
|---|---|---|
| Tutoriel guidé (7 étapes) | `tutoriel.html` | ✅ Fait |
| Mon profil (prénom, photo) | `mon-profil.html` | ✅ Fait |
| Informations médicales | `infos-medicales.html` | ✅ Fait |
| Capacités personnelles | `capacites.html` | ✅ Fait |
| Besoins | `besoins.html` | ✅ Fait |
| États | `etats.html` | ✅ Fait |
| Contextes de vie (liste) | `contextes-liste.html` | ✅ Fait |
| Contexte — détail complet | `contexte-detail.html` | ✅ Fait |
| Contexte — infos communes | `contexte-commun.html` | ✅ Fait |
| Paramètres généraux | `parametres.html` | ✅ Fait |
| À propos | `a-propos.html` | ✅ Fait |
| FAQ | `faq.html` | ✅ Fait |
| Politique de confidentialité | `confidentialite.html` | ✅ Fait |

---

### Pilier 1 — Communication & urgence (accès rapide en crise)
Ce qu'on montre ou utilise quand les mots ne viennent plus.

| Fonctionnalité | Fichier | État |
|---|---|---|
| Carte d'urgence (affichage) | `carte.html` | ✅ Fait |
| Carte d'urgence (configuration) | `carte-config.html` | ✅ Fait |
| Cartes de communication (grille) | `cartes-communication.html` | ✅ Fait |
| Cartes de communication (config) | `cartes-com-config.html` | ✅ Fait |
| Contacts d'urgence | `contacts-urgence.html` | ✅ Fait |
| Timer | `timer.html` | ✅ Fait |

**Détails notables :**
- La carte d'urgence affiche uniquement le prénom + les consignes + les contacts. Elle peut être montrée à une tierce personne sans explication.
- Les cartes de communication s'ouvrent en plein écran au tap pour faciliter la communication non-verbale.
- Le timer est accessible en raccourci PWA.

---

### Pilier 2 — Régulation & apaisement (pendant ou après la crise)
Des outils sensoriels pour redescendre.

| Fonctionnalité | Fichier | État |
|---|---|---|
| Exercices de respiration | `coherence.html` | ✅ Fait |
| Sons & ambiances sonores | `sons.html` + `playlist.html` | ✅ Fait |
| Fidget numérique — Pop-it | `Pop-it.html` | ✅ Fait |
| Fidget numérique — Slider | `Slider.html` | ✅ Fait |
| Fidget numérique — Cliqueur | `cliqueur.html` | ✅ Fait |
| Harmonie visuelle | `harmonie-visuelle.html` | ✅ Fait |
| Conseils personnalisés | `conseils.html` | ✅ Fait |
| Hub fidgets | `fidgets.html` | ✅ Fait |

**Détails notables :**
- Les exercices de respiration proposent plusieurs programmes (fréquences et durées, dont la cohérence cardiaque 5s/5s) avec animation visuelle + son optionnel. Un bouton ⓘ ouvre une modale de description scientifique de chaque programme. Une modale "Bien joué !" s'affiche à la fin avec la durée réalisée.
- La bibliothèque de sons contient 28 ambiances (nature, eau, feu, etc.) avec images évocatrices.
- Les fidgets numériques reproduisent la stimulation sensorielle sans objet physique.

---

### Pilier 3 — Journal & analyse (entre les crises)
Comprendre les patterns pour mieux les anticiper.

| Fonctionnalité | Fichier | État |
|---|---|---|
| Enregistrement de crise (formulaire unifié) | `enregistrement-crise.html` | ✅ Fait — V2.10 |
| Journal — liste des entrées | `journal.html` | ✅ Fait |
| Récapitulatif de crise | `recap.html` | ✅ Fait |
| Récapitulatif — exemple | `recap-exemple.html` | ✅ Fait |
| Statistiques synthétiques | `stats.html` | ✅ Fait |
| Analyse approfondie (≥5 crises) | `stats-approfondie.html` | ✅ Fait |
| Profil de crise (synthèse + insights) | `profil-crise.html` | ✅ Fait |

**Détails notables :**
- Le questionnaire est en deux temps : ce qui précédait (énergie, charges, déclencheurs) et la crise elle-même (date, origine, type, intensité, durée).
- Les déclencheurs sont catégorisés (Sensoriel, Social, Changement, Cadre, Cognitif, Divers) avec un niveau d'intensité par déclencheur.
- Le récapitulatif est exportable / partageable avec les personnes de confiance ou un·e thérapeute.
- L'analyse approfondie génère des insights automatiques (clusters, seuils critiques, capacités systématiquement impossibles…).

---

### Raccourcis PWA (accès ultra-rapide)
Depuis l'écran d'accueil du téléphone (appui long sur l'icône) :
- Carte d'urgence
- Communication
- Exercices de respiration
- Timer

---

## 5. Identité visuelle & charte graphique

### Logo & favicon

| Élément | Fichier | Usage |
|---|---|---|
| Logo principal | `assets/images/logo.png` | Écran À propos, apple-touch-icon (iOS) |
| Favicon / icône PWA | `assets/images/favicone.png` | Onglet navigateur, icône installée (512×512) |

Le logo est utilisé en `maskable` dans le manifest (adaptatif aux formes d'icônes Android). La favicon est l'icône principale installée.

> **Note :** Le logo actuel est fonctionnel mais n'est pas nécessairement sa version définitive. Voir roadmap.

### Palette de couleurs

| Variable | Valeur hex | Rôle |
|---|---|---|
| `--bg` | `#384657` | Fond principal de toutes les pages |
| `--dark` | `#2E3A59` | Bleu marine — texte foncé, éléments sombres, headers |
| `--light` | `#F5E4CC` | Crème — texte clair, cartes, **états actifs/sélectionnés** |
| `--accent` | `#F7B89C` | Pêche/saumon — **boutons d'action primaire uniquement** |
| `--danger` | `rgba(255, 70, 70, 0.8)` | Rouge — **boutons destructeurs uniquement** (suppression) |

**Règle fondamentale :** `--light` pour les sélections/actifs. `--accent` uniquement pour les appels à l'action ("Commencer", "Valider"). `--danger` uniquement pour les actions destructrices irréversibles. Ne jamais inverser.

### Thème système

- `theme-color` et `background_color` : `#384657` (cohérence avec le fond de l'app)
- `color-scheme: only light` — l'app ne s'adapte pas au mode sombre du système (choix délibéré pour garder le contrôle sur les couleurs)

### Typographie

Police système (pas de font externe chargée — cohérent avec l'approche offline-first). Tailles pensées pour la lisibilité mobile sous stress : pas de texte en dessous de ~14px dans les zones critiques.

### Principes visuels

- Coins arrondis généreux (cartes : 12–32px)
- Ombres légères ou absentes — pas de complexité visuelle inutile
- Icônes emoji uniquement — pas de bibliothèque d'icônes externe
- Espacement généreux entre les éléments (fatigue cognitive réduite)
- Header et footer fixes, contenu scrollable — repères stables en crise

---

## 6. Choix UX structurants

### Ce qu'on a décidé et pourquoi

**Données 100% locales (localStorage)**
Choix non-négociable. Données de crise = données intimes. Aucun serveur ne doit les voir. Contrepartie assumée : pas de sync multi-appareils.

**Vanilla HTML/CSS/JS sans framework**
Zéro dépendance externe, zéro build step. L'app peut être ouverte sur n'importe quel appareil avec un navigateur. Simple à maintenir sur le long terme par une seule personne.

**PWA plutôt qu'app native**
Installable sur iOS et Android depuis le navigateur, sans passer par un store. Pas besoin de compte développeur, déploiement immédiat. Fonctionnalités limitées (pas de notifications push sur iOS, par ex.) mais suffisantes pour les besoins actuels.

**Une page = un fichier HTML autonome**
Pas de router, pas de composants. Chaque page est indépendante. Contrepartie : duplication de certains patterns. Avantage : debugging ultra-simple, aucune régression inter-pages.

**Interface en français, tutoiement**
Public francophone, relation directe avec l'utilisatrice. Le tutoiement crée une proximité sans condescendance.

**Pas de mode sombre**
La palette choisie (fond bleu-gris foncé, texte crème) constitue déjà une interface "dark" douce et confortable. Forcer le mode sombre du système créerait des incohérences avec les couleurs choisies.

**Onboarding obligatoire au premier lancement**
Le tutoriel en 7 étapes est non-contournable (ou presque) : il guide la configuration des éléments essentiels (carte d'urgence, cartes de communication) avant que la crise arrive.

### Ce qu'on a délibérément écarté

- Notifications push (trop intrusif, et peu fiable sur iOS PWA)
- Synchronisation cloud (complexité, coût, vie privée)
- Gamification (inappropriée pour un outil de crise)
- Mode multi-profils (hors scope — une app, une personne)
- Design system animé / chargé (contre-productif sous stress)

---

## 7. Roadmap globale

### État courant — mars 2026

L'application est **feature-complete pour la V2**. Toutes les fonctionnalités prévues ont été livrées (V1 → V2.10). Le projet entre en **phase alpha** : tests en conditions réelles par un groupe restreint de personnes autistes adultes, avant toute diffusion plus large. Le protocole de tests est défini dans [TESTS-ALPHA.md](TESTS-ALPHA.md).

Les développements V3 (post-crise guidé, axe psychoéducatif, nouveaux insights stats) sont identifiés mais non engagés — ils seront priorisés après synthèse des retours alpha.

---

### ✅ Fait (V1 → V2.9)

**Fonctionnel**
- [x] Toutes les pages de l'app (voir section 4)
- [x] Questionnaire de crise V2 (déclencheurs catégorisés + intensité, 6 catégories)
- [x] Statistiques synthétiques + analyse approfondie avec insights automatiques (règles A–Q)
- [x] Profil de crise (`profil-crise.html`) — synthèse en phrases, patterns, partage
- [x] Export / partage des rapports de crise (graphique + CSV + PDF)
- [x] Export / Import global des données (journal, profil, cartes, sons, playlist)
- [x] **Export journal filtré** — filtre période + contexte, compteur live, formats PDF / partage / JSON / CSV (V2.9)
- [x] **Mini stats respiration** — suivi sessions + temps, badges/paliers, modale de fin enrichie (V2.9)
- [x] **Page d'enregistrement unifiée** — `enregistrement-crise.html` remplace 3 modales distinctes ; formulaire identique depuis index.html, recap.html et journal.html (V2.10)
- [x] Tutoriel guidé en 7 étapes
- [x] FAQ + Politique de confidentialité
- [x] Installation PWA (manifest, raccourcis app shortcuts avec icônes SVG)
- [x] **Service Worker offline** — app disponible sans réseau depuis V2.8

**Design & identité**
- [x] Charte graphique définie et appliquée (5 variables CSS, 0 couleur en dur)
- [x] Logo créé
- [x] Favicon créée
- [x] `nora-common.css` — système de styles partagés (header, footer, toast, reset)
- [x] Icônes SVG pour raccourcis PWA

**Contenu**
- [x] ~29 ambiances sonores avec images associées
- [x] Mixeur de sons avec préréglages (jusqu'à 4)
- [x] Bibliothèque de fidgets (pop-it, slider, cliqueur)

---

### 🔄 En réflexion / En cours

**Fonctionnel**
- [ ] Post-crise guidé : remplacer les notes libres par 3 questions fixes (cf. ROADMAP.md — V3 cibles)
- [ ] Axe psychoéducatif : aide à l'identification des déclencheurs (modules courts, exemples guidés)

**Design & identité**
- [ ] Finalisation du logo — version définitive ? variantes ?
- [ ] Cohérence visuelle inter-pages à revoir si nécessaire après tests

**Produit & stratégie**
- [ ] Définir la stratégie de déploiement (voir section 8)
- [x] Construire un protocole de test utilisateur (recrutement, méthode, critères) ✅ → voir [TESTS-ALPHA.md](TESTS-ALPHA.md)

---

### 💡 Pistes identifiées (pas encore priorisées)

- [ ] Support multilingue (anglais en priorité si diffusion internationale envisagée)
- [ ] Distribution via PWA stores (Play Store via PWABuilder, App Store via Capacitor ?)
- [ ] Mode "accompagnant" : vue simplifiée de la carte d'urgence pour une tierce personne
- [ ] Amélioration des insights stats (nouvelles règles d'analyse)
- [ ] Personnalisation des sons (possibilité d'en ajouter)

---

### 🚫 Hors scope (décisions actées)

- Compte utilisateur / authentification
- Synchronisation cloud ou backup automatique
- Application native (React Native, Flutter, etc.)
- Backend serveur
- Diagnostic ou recommandation médicale
- Outil conçu principalement pour les accompagnants / parents

---

## 8. Déploiement & distribution

### Situation actuelle (mars 2026 — phase alpha)

- **Hébergement :** GitHub Pages — déploiement automatique à chaque push sur `main`
- **URL :** https://optimiz8.github.io/Nora-2/
- **Format :** PWA installable depuis le navigateur mobile (Chrome/Safari)
- **Accès :** restreint pendant l'alpha — `robots.txt` actif (non indexé), mot de passe JS à implémenter
- **Coût d'infrastructure :** 0€

### Ce qui fonctionne bien
- Déploiement instantané, sans friction
- Pas de build, pas de CI/CD complexe
- Accessible immédiatement depuis n'importe quel appareil

### Décisions prises pour la phase alpha

- **Partage :** lien direct envoyé aux testeurs recrutés + mot de passe JS
- **Indexation :** bloquée via `robots.txt` pendant toute la phase alpha (à supprimer avant diffusion large)
- **Protocole complet :** voir [TESTS-ALPHA.md](TESTS-ALPHA.md)

### Questions ouvertes (post-alpha)

- Faut-il une landing page d'explication avant d'arriver sur l'app ?
- Quid de la découvrabilité (référencement, réseaux, communautés autistes) ?
- PWA Builder (Microsoft) : packaging pour le Play Store sans code natif — à évaluer
- App Store iOS : nécessite un compte développeur Apple (99€/an) + wrapper natif — à évaluer
- Quel modèle économique si diffusion large ? (gratuit, don, freemium ?)
- Faut-il un nom de domaine dédié ? (ex. `nora-app.fr`)
- Comment gérer les mises à jour une fois l'app installée sur des appareils tiers ?

---

## 9. To-do — par ordre de priorité

> Cette section couvre les décisions **produit & stratégie** (tests utilisateurs, communication, déploiement).
> Pour les tâches **fonctionnelles et techniques** (relectures, bugs, features), voir [ROADMAP.md](ROADMAP.md) — section "To-do list".
> Pour le protocole de tests alpha complet (questionnaire, consentement, recrutement, calendrier), voir [TESTS-ALPHA.md](TESTS-ALPHA.md).

### 🔴 Priorité 1 — Avant de faire tester à quiconque

- [ ] Vérifier l'installation PWA depuis l'URL publique sur téléphone (iOS + Android) — s'assurer que les raccourcis fonctionnent, que l'app s'installe correctement
- [ ] Finaliser le logo (version définitive — bloquant pour toute présentation externe)
- [ ] Tester soi-même l'app en conditions réelles sur plusieurs semaines — noter ce qui bloque, ce qui manque

### 🟠 Priorité 2 — Avant les tests alpha

> Protocole complet dans [TESTS-ALPHA.md](TESTS-ALPHA.md).

- [ ] Implémenter le mot de passe JS d'accès (avec mémorisation `localStorage`) — contrôle d'accès pendant l'alpha
- [ ] Créer le fichier `robots.txt` à la racine — empêche Google d'indexer l'URL pendant l'alpha
- [ ] Ajouter la mention "Version alpha — ne pas rediffuser" sur la page d'accueil
- [ ] Créer l'écran de consentement au premier lancement (version alpha, pas d'outil clinique, données locales, engagement à remplir le questionnaire)
- [ ] Créer le Google Forms (questionnaire de retour — cf. TESTS-ALPHA.md §6)
- [ ] Rédiger le document d'accueil testeur avec guide d'installation iOS + Android
- [ ] Recruter 5 à 8 testeurs (profil : autiste adulte SDI, francophone, smartphone Android ou iOS)
- [ ] Définir les dates de début et de fin de l'alpha (durée recommandée : 3 à 6 semaines)
- [ ] Vérifier la cohérence visuelle inter-pages sur plusieurs tailles d'écran

### 🟡 Priorité 3 — Après retours positifs des tests alpha

- [ ] **Supprimer ou vider `robots.txt`** — tant qu'il contient `Disallow: /`, Nora n'apparaît dans aucun résultat Google
- [ ] Synthétiser les retours questionnaire → liste priorisée de corrections
- [ ] Définir la stratégie de déploiement large (stores ? nom de domaine ? modèle économique ?)
- [ ] Créer une landing page d'explication (pour les personnes qui arrivent sur l'URL sans contexte)
- [ ] Axe psychoéducatif — aide à l'identification des déclencheurs

### ⚪ Priorité 4 — Si diffusion large confirmée

- [ ] Nom de domaine dédié (ex. `nora-app.fr`)
- [ ] Distribution via PWABuilder (Play Store) et/ou App Store iOS
- [ ] Support multilingue (anglais)
- [ ] Définir comment gérer les mises à jour sur appareils tiers installés
