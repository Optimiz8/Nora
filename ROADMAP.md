# Nora — Roadmap

> Dernière mise à jour : mars 2026 — V2.12
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

## V2 — Compagnon au quotidien ✅ *publiée (2.8)*

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
0. Relecture et harmonisation de tous les textes   ✅ [livré]
1. Cartes de communication ✅                      [livré]
2. Timer visuel anti-cécité temporelle ✅          [livré]
3. Tutoriel (onboarding) ✅                        [livré]
4. Journal — statistiques ✅                       [livré — vue synthétique + analyse approfondie + graphiques + insights]
5. App Shortcuts V1 ✅                             [livré]
6. Export / Import des données ✅                  [livré en V2.5 — global : journal, profil, cartes, sons, playlist]
7. Harmonie visuelle enrichie ✅                   [livré — mode Paillettes, Wake Lock 15 min]
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

#### 3. Journal — statistiques ✅
Vue synthétique (stats.html) + analyse approfondie (stats-approfondie.html).
Filtres : contexte, origine, type, intensité, moment de la journée.
Graphiques, moyennes avant-crise, insights automatiques (règles A–Q).
Export graphique partageable (vue d'ensemble / analyse / les deux).
Suppression d'entrées individuelles.

#### 4. App Shortcuts V1
Raccourcis Android via appui long sur l'icône.
Livré : 4 raccourcis — Carte d'urgence · Communication · Exercices de respiration · Timer. Icônes SVG dédiées.

---

## To-do list — Avant présentation (mars 2026)

> Cette section couvre les tâches **fonctionnelles et techniques** (tests, relectures, features).
> Pour les décisions **produit & stratégie** (tests utilisateurs, déploiement, communication), voir [PRODUCT-OVERVIEW.md](PRODUCT-OVERVIEW.md) — section 9.
> Pour le protocole de tests alpha complet, voir [TESTS-ALPHA.md](TESTS-ALPHA.md).

### Tests à valider

#### V2.11.1 — Relecture textes (vérifications visuelles)
- [ ] `faq.html` — Q11 et Q12 s'ouvrent/ferment correctement au tap
- [ ] `stats.html` — Texte chapeau "Ces observations…" s'affiche sous "À retenir" sans casser la mise en page (nécessite des données)
- [ ] `recap.html` — Modale "Qu'est-ce qu'une crise autistique ?" : nouvelle définition lisible, meltdown/shutdown en gras
- [ ] `enregistrement-crise.html` + `recap.html` — Dropdown type de crise : libellé "Meltdown (réaction extériorisée, involontaire)"
- [ ] `coherence.html` — Modale ℹ️ : texte reformulé lisible et cohérent

#### Tests fonctionnels antérieurs
- [ ] `tutoriel.html` (V2.12) — parcours complet (tester en navigation privée)
  - [ ] Step 1 : saisir un prénom → vérifie qu'il apparaît dans les étapes suivantes
  - [ ] Steps 2–5 : navigation, indicateur 1/4…4/4 s'incrémente correctement
  - [ ] Step 6 (hub) : les 3 items apparaissent sans coche au premier lancement
  - [ ] Step 7 → carte-config.html → sauvegarder → retour automatique sur le **hub** (pas step 7), coche carte apparaît
  - [ ] Step 8 : basculer simplifié ↔ personnalisé, vérifier `contexte_messageUnique` en localStorage, bouton Continuer → retour hub
  - [ ] Step 9 → cartes-communication.html → retour → hub avec coche cartes com
  - [ ] Bouton hub sans rien configuré : libellé "Commencer ›" → va en step 7
  - [ ] Bouton hub partiellement configuré : libellé "Continuer ›" → va au premier non-complété
  - [ ] Bouton hub tout configuré : libellé "Voir le résumé ›" → va en step 10
  - [ ] Step 10 : titre "Nora est prête, [prénom] !" si tout configuré, "C'est parti, [prénom] !" si partiel
  - [ ] Bannière index.html : visible si rien configuré, disparaît après config carte
- [ ] Export / Import complet — jamais retesté depuis V2.5 (tester en navigation privée pour ne pas perdre les données)
- [ ] `enregistrement-crise.html` (V2.10) — parcours complet : nouveau + édition
- [ ] `enregistrement-crise.html` (V2.11.1) — modale déclencheurs : vérifier tous les items et catégories, nouveaux libellés ("Codes sociaux implicites / non-dits", "Épuisement du masking", "Appel téléphonique" dans Social), nouvelles descriptions ("Règle modifiée" / "Non-respect d'une règle établie"), sélection + slider intensité + sauvegarde
- [ ] `journal.html` (V2.11.1) — ouvrir détail d'une crise avec anciens déclencheurs → vérifier affichage correct (rétrocompat)
- [ ] Export sélectif des crises (`journal.html`) — fonctionnel mais pas encore testé
- [ ] App Shortcuts Android — désinstallation/réinstallation nécessaire pour valider les icônes SVG
- [ ] Sons sur Safari iOS < 17 — fallback MP3 (pas de matériel dispo, peut être différé)

### Relecture des textes (generés par IA, pas encore relus par Marine)

#### 🟠 Priorité moyenne
- [ ] `recap.html` — Texte partageable passants : envisager d'ajouter une section "Ce que tu peux faire" (3 actions concrètes)
- [x] `enregistrement-crise.html` — Vérifier manuellement la liste complète des déclencheurs (6 catégories, tous les libellés, doublons éventuels) ✅ audit complet + corrections V2.11.1

#### ✅ Déjà relu / validé
- `recap.html` — Modale "Qu'est-ce qu'une crise autistique ?" ✅ (définition réécrite : meltdown + shutdown distincts)
- `enregistrement-crise.html` — Descriptions Meltdown / Shutdown / Mixte ✅ ("perte de contrôle" → "réaction involontaire")
- `coherence.html` — Modales ℹ️ des programmes ✅ (durée reformulée, distinction effet immédiat / pratique régulière)
- `stats.html` — Insights A–Q ✅ (nuance K "Bonne nouvelle" supprimée, chapeau "tendances pas diagnostics" ajouté)
- `profil-crise.html` — Phrases d'insights dynamiques ✅ (formulations neutres, rien à corriger)
- `faq.html` — 12 réponses ✅ (Q11 stats ≠ diagnostic + Q12 multi-appareils ajoutées)
- `confidentialite.html` — Les accordéons ✅ (QR code reformulé)
- `coherence.html` — Messages de fin d'exercice ("Bien joué !" + messages par programme) ✅
- `conseils.html` — Liste par défaut ✅ (faute "Prenez" corrigée, liens fidgets + harmonie visuelle ajoutés)
- `faq.html` — Q8 "Comment identifier le début et la fin d'une crise ?" ✅

---

## V3 — Fonctionnalités cibles

> Phase d'utilisation réelle et de test avant d'engager de nouveaux développements majeurs.
> Les fonctionnalités ci-dessous sont des **cibles, pas une to-do list validée**.

### Déjà livré dans le cycle V3
- **Export sélectif des crises** ✅ *V2.9* — filtres période + contexte, compteur live, export PDF / JSON / CSV
- **Mini stats — exercices de respiration** ✅ *V2.9* — sessions, badges, modale fin enrichie
- **FAQ début et fin d'une crise** ✅ *V2.9* — Q8 dans `faq.html`
- **Page enregistrement-crise unifiée** ✅ *V2.10* — remplace 3 modales distinctes
- **Tutoriel V2** ✅ *V2.12* — onboarding 10 étapes : prénom, découverte (4 piliers), hub de config, résumé adaptatif

### Nouvelles règles d'insights stats à implémenter

> Détail technique dans `analyse-donnees.md`.

| Priorité | Insight | Logique |
|----------|---------|---------|
| 🔴 | Intervalle moyen entre crises | `(last - first) / (total - 1)` en jours |
| 🟠 | Shutdown > Meltdown en durée | avgDuration Shutdown vs Meltdown |
| 🟠 | Tendance intensité sur 3 périodes | Comparer moy. intensité P-2 / P-1 / P |
| 🟠 | Crises nocturnes élevées | Nuit ≥30% → signal fatigue chronique |
| 🟡 | Crises sans déclencheur | ≥30% avec 0 déclencheur identifié |
| 🟡 | Déclencheur contextuel | Apparaît dans contexte X mais jamais dans Y |

### Fonctionnalités envisagées (non engagées)

- **Post-crise guidé** — Remplacer les notes libres par 3 questions fixes : "Qu'est-ce qui a aidé ?", "Qu'est-ce qui a aggravé ?", "Qu'aurais-tu aimé différent ?" → exploitable en TCC. *Fonctionnalité la plus aboutie de la liste.*
- **Bibliothèque de scripts sociaux** — Phrases types pour situations courantes (refus, aide, surcharge…). *Standby — format et contenu à définir.*
- **Export chiffré + rappel de sauvegarde** — Export protégé par mot de passe, rappel automatique tous les X crises. *Décision non prise — librairie de chiffrement à choisir.*
- **Tutoriel V2** ✅ *V2.12* — Onboarding 10 étapes : prénom → découverte (4 piliers) → hub de configuration → résumé. *Implémenté, en attente relecture + test.*
- **App Shortcuts V2** — Enrichissement si de nouvelles fonctionnalités le justifient.
- **Capacitor + stores** — Envelopper la PWA pour Play Store / App Store. *Probable, pas acté.*
- **Multi-langue (anglais)** — Quand tous les textes sont stables. *En dernier absolu.*

---

## En réflexion (pas de version assignée)

- **Notifications push** — décision non prise, à reconsidérer en V4.
- **Playlists multiples** (jusqu'à 5).
- **Partage de profil entre appareils** — très lointain (pas avant V4).
- **Numéros d'urgence rapides** — 3114, 15, 114, 18. Accès depuis l'accueil ou la carte d'urgence. Questions à trancher avant de coder.
- **Mood tracker autisme** — Suivi des états émotionnels entre les crises (à définir : format, fréquence, données collectées).
- **Théorie des cuillères / jauge d'énergie** — Représentation du "capital énergie" journalier. À définir : format, intégration avec le journal existant.
- **Outils utilisés pendant la crise** — Ajouter au questionnaire post-crise : ce qui a été utilisé (sons, respiration, cartes…) et si ça a aidé. Permettrait des stats sur l'efficacité des outils.
- **Guide meltdown / shutdown** — Page éducative pour aider à identifier et distinguer un meltdown d'un shutdown. Exemples guidés, descriptions sensorielles et comportementales.
- **Tracking des surcharges (hors crise)** — Pouvoir enregistrer les états de surcharge sans crise permettrait un suivi plus fin du niveau d'énergie global.
- **Carte "qui je suis en tant qu'autiste"** — Synthèse personnelle : déclencheurs principaux, signaux d'alarme, besoins de régulation. À faire évoluer automatiquement à partir des stats.
- **Profil automatique après X crises** — Générer un profil de données à partir des statistiques accumulées.
- **Exclusion de crises du profil** — Exclure certaines crises atypiques du calcul du profil sans les supprimer du journal.
- **Contexte décalé** — Réflexion ouverte : quand une crise est déclenchée par le travail mais se produit à la maison, dans quel contexte l'enregistrer ?
- **Axe psychoéducatif — identification des déclencheurs** — Modules courts d'aide à la reconnaissance des déclencheurs (sensoriels vs cognitifs vs sociaux, etc.).

---

## Archivé / Abandonné

- **Palettes de couleurs** — le design actuel est l'identité de Nora, changer de thème diluerait ça.
- **Mode accompagnant** — mis de côté indéfiniment.
- **Widgets natifs Android** — nécessite une app native complète.
- **Écran STOP / isolement** — doublon avec les cartes de communication (une carte "STOP / J'ai besoin d'être seul" remplit ce rôle).
- **Détection pré-crise** — les 3 jauges (énergie, charges) ne sont renseignées qu'en enregistrant une crise terminée, donc pas exploitables en temps réel.
- **Séquence de décompression personnalisée** — pas assez proche du cœur de Nora.
- **Préparation aux transitions** — hors du cadre de l'app (gestion de crise / apaisement).
- **Interoception** — éventuellement à reconsidérer, pas prioritaire.
- **Scripts sociaux générés par IA** — Clé API trop complexe à gérer pour un projet de cette taille (côté client non acceptable en app publique, côté serveur sort du vanilla pur).
- **Compagnon conversationnel post-crise** — Même raison que ci-dessus. La version non-IA (post-crise guidé avec 3 questions fixes) est retenue à la place.
