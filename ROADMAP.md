# Nora — Roadmap

> Dernière mise à jour : mars 2026 — V2.8
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

## V3 — Publication & Accessibilité élargie

### Nouvelles fonctionnalités confirmées V3

#### Export sélectif des crises
Permettre à l'utilisatrice de choisir quelles crises exporter (filtre par date, contexte, etc.) au lieu d'un export global.

#### Bibliothèque de scripts sociaux
Phrases types à réutiliser dans des situations sociales courantes (refus, demande d'aide, signalement de surcharge…).
À définir : format, catégories, possibilité de personnalisation.

#### Mini stats — exercices de respiration
Suivi du temps passé sur les exercices de respiration : durée totale, nombre de sessions, programme le plus utilisé, évolution sur les dernières semaines. Accessible depuis la page respiration ou les statistiques.

#### FAQ — début et fin d'une crise autistique
Ajouter dans `faq.html` une entrée : *"Comment déterminer le début et la fin d'une crise autistique ?"* — question fréquente qui a un impact direct sur la qualité des données enregistrées dans le journal.

#### Export chiffré avec rappel de sauvegarde
- Export protégé par mot de passe (chiffrement côté client)
- Message de rappel automatique tous les X crises : "Pense à sauvegarder ton journal"
- À creuser : quelle librairie de chiffrement ? Gestion du mot de passe oublié ?

### Ordre recommandé

```
1. Tests à faire avant de continuer
   - Tester App Shortcuts Android (raccourcis appui long)
   - Tester import / export / sauvegarde des données complètes
2. Tutoriel V2                               [🔜 PROCHAIN CHANTIER — améliorations à définir]
3. Service Worker / offline garanti ✅       [livré en V2.8 — prérequis pour Capacitor]
4. FAQ — début et fin d'une crise autistique
5. Export sélectif des crises
6. Bibliothèque de scripts sociaux
7. Mini stats — exercices de respiration
8. Export chiffré + rappel sauvegarde
9. App Shortcuts V2 (enrichis si besoin)
10. Capacitor + stores                       [probable, pas acté]
11. Multi-langue (anglais)                   [en dernier absolu]
```

### Détail

#### 1. Service Worker / offline garanti ✅
Script background qui met toute l'app en cache local.
Garantit le fonctionnement sans réseau, même après mise à jour.
**Prérequis pour Capacitor.**

Livré en V2.8 : `sw.js` + `sw-register.js`. Voir `ARCHITECTURE.md` pour le détail du fonctionnement.
Stratégie : stale-while-revalidate pour les pages, cache-first pour l'audio. Sons des préréglages pré-cachés au lancement.

#### 2. Tutoriel V2
Améliorations à définir selon les retours d'usage.

#### 4. FAQ — début et fin d'une crise autistique
Ajouter une entrée dans `faq.html` : *"Comment déterminer le début et la fin d'une crise autistique ?"*
Question fréquente qui a un impact direct sur la qualité des données enregistrées dans le journal (durée, heure).

#### 5. Export sélectif des crises
Permettre de choisir quelles crises exporter : filtre par date, contexte, intensité.
Actuellement l'export est global — cette fonctionnalité est utile pour partager uniquement une période en thérapie.

#### 6. Bibliothèque de scripts sociaux
Phrases types pour situations courantes : refus, demande d'aide, signalement de surcharge, besoin de silence…
À définir : format (liste simple ou par catégorie), possibilité de personnalisation, lien avec les cartes de communication.

#### 7. Mini stats — exercices de respiration
Suivi du temps passé sur les exercices : durée totale, nombre de sessions, programme le plus utilisé.
À définir : où afficher ces stats (page respiration ? section stats globale ?).

#### 6. App Shortcuts V2
Enrichissement si de nouvelles fonctionnalités le justifient.

#### 7. Capacitor + stores
Envelopper la PWA dans une coque native pour Play Store et App Store.
Pas de réécriture — le HTML/CSS/JS existant est conservé.
Fort probable mais pas définitivement acté.

#### 8. Multi-langue
Uniquement quand tous les textes sont stables. Priorité : anglais.

---

## En réflexion (pas de version assignée)

- **Notifications push** — décision non prise, à reconsidérer en V4.
- **Playlists multiples** (jusqu'à 5).
- **Partage de profil entre appareils** — très lointain (pas avant V4).
- **Numéros d'urgence rapides** — 3114, 15, 114, 18. Accès depuis l'accueil ou la carte d'urgence. Questions à trancher avant de coder.
- **Post-crise guidé** — Remplacer les notes libres post-crise par 3 questions fixes : "Qu'est-ce qui a aidé ?", "Qu'est-ce qui a aggravé ?", "Qu'aurais-tu aimé différent ?" → exploitable en TCC.
- **Mood tracker autisme** — Suivi des états émotionnels entre les crises, côté autisme (à définir : format, fréquence, données collectées).
- **Théorie des cuillères / jauge d'énergie** — Représentation du "capital énergie" journalier, inspirée de la métaphore des cuillères. À définir : format, intégration avec le journal existant.
- **Outils utilisés pendant la crise** — Ajouter au questionnaire post-crise : ce qui a été utilisé (sons, respiration, cartes…) et si ça a aidé. Permettrait des stats sur l'efficacité des outils.
- **Guide meltdown / shutdown** — Page éducative pour aider à identifier et distinguer un meltdown d'un shutdown. Exemples guidés, descriptions sensorielles et comportementales.
- **Tracking des surcharges (hors crise)** — On peut être en surcharge sans faire de crise. Pouvoir enregistrer ces états permettrait un suivi plus fin du niveau d'énergie global et des patterns de risque.
- **Carte "qui je suis en tant qu'autiste"** — Synthèse personnelle : mes déclencheurs principaux, mes signaux d'alarme, mes besoins de régulation. À faire évoluer automatiquement à partir des stats.
- **Profil automatique après X crises** — Générer un profil de données à partir des statistiques accumulées (déclencheurs dominants, moments à risque, intensité moyenne par contexte…).
- **Exclusion de crises du profil** — Permettre d'exclure certaines crises atypiques ou aberrantes du calcul du profil (ex. : crise liée à un événement exceptionnel), sans les supprimer du journal.
- **Contexte décalé** — Réflexion ouverte : quand une crise est déclenchée par le travail mais se produit à la maison, dans quel contexte l'enregistrer ? Pas de solution simple.
- **Axe psychoéducatif — identification des déclencheurs** — Modules courts d'aide à la reconnaissance des déclencheurs (sensoriels vs cognitifs vs sociaux, etc.) pour les profils qui ont beaucoup de "déclencheur flou ou non identifié".
- **Scripts sociaux générés par IA** — L'utilisatrice décrit une situation, l'IA génère un script de conversation adapté. Variante dynamique et personnalisée de la bibliothèque statique prévue en V3. Nécessite une clé API (voir "Questions IA" ci-dessous).
- **Compagnon conversationnel post-crise** — L'IA pose les 3 questions post-crise et aide à identifier un déclencheur flou par questions ciblées. Lié aux pistes "post-crise guidé" et "axe psychoéducatif". Nécessite une clé API.

### Questions à trancher avant de coder (IA)
1. **Clé API** : usage perso (clé côté client, acceptable) ou app publique (clé côté serveur — sort du vanilla pur) ? Option intermédiaire : chaque utilisatrice entre sa propre clé dans les paramètres.
2. **Prompt système** : définir le caractère de Nora côté IA — ton bienveillant, phrases courtes, jamais condescendant, jamais de diagnostic.

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
