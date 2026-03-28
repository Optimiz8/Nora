# Analyse des données — Nora

> Dernière mise à jour : mars 2026 — couvre jusqu'à v2.10

---

## 1. Données brutes disponibles

### Par entrée de crise

| Catégorie | Champs |
|-----------|--------|
| **Temporel** | Horodatage complet (date, heure), durée (parsée en minutes) |
| **Contexte** | Profil/contexte (maison, travail, extérieur…) |
| **Classification** | Origine : Anticipatoire / Réactionnelle / Mixte / Indéterminé |
| | Type de manifestation : Meltdown / Shutdown / Mixte / Indéterminé |
| | Intensité (0–10) |
| **Pré-crisis** | Énergie (0–10), Charge mentale (0–10), Charge sociale (0–10) |
| **Déclencheurs** | Nom + intensité propre (0–10) par déclencheur, nombre par crise |
| **États** | Liste des états ressentis |
| **Besoins** | Liste des besoins exprimés |
| **Capacités** | Impossible / Difficile / Possible / Incertain (listes nommées) |
| **Texte libre** | Remarques (non exploitables directement en stats) |

### Données dérivables par calcul

- Fréquence (crises/semaine, crises/mois)
- Intervalle moyen entre crises
- Jour de la semaine, moment de la journée (Matin / Après-midi / Soir / Nuit)
- Tendance sur le temps (hausse/baisse)
- Corrélations croisées entre variables
- Distribution des intensités (légère 1–4 / modérée 5–7 / sévère 8–10)
- Clusters (plusieurs crises en peu de jours)

---

## 2. Insights automatiques — `buildInsights` (stats.html)

La fonction `buildInsights` génère jusqu'à **8 insights** par ordre de priorité (1 = le plus important).
Les règles sont identifiées par une lettre (A–Q) dans le code source.

### Tableau complet des règles

| Règle | Priorité | Icône | Condition de déclenchement | Statut |
|-------|----------|-------|---------------------------|--------|
| **A** | 2 | 🎯 | Déclencheur le plus **fréquent** ≥30% des crises ET ≥3 occurrences | ✅ Implémenté |
| **B** | 2 | 🕐 | Moment dominant ≥45% des crises (Matin / Après-midi / Soir / Nuit) | ✅ Implémenté |
| **C** | 2 | 📍 | Contexte dominant ≥40% des crises (si plusieurs contextes présents) | ✅ Implémenté |
| **D/E** | 1 | 🔴/🔵 | Type dominant : Meltdown OU Shutdown ≥65% des crises typées | ✅ Implémenté |
| **F** | 1 | ⚡ | Énergie basse (≤3/10) → intensité moy. ≥1 pt au-dessus de la moy. globale | ✅ Implémenté |
| **G** | 1 | ⬆️/⬇️ | Variation du nombre de crises ≥±20% vs période précédente | ✅ Implémenté |
| **H** | 2 | 🧠 | Charge mentale élevée (≥7/10) → intensité moy. ≥1 pt au-dessus de la moy. globale | ✅ Implémenté |
| **I** | 2 | 👥 | Charge sociale élevée (≥7/10) → intensité moy. ≥1 pt au-dessus de la moy. globale | ✅ Implémenté |
| **J** | 3 | 💬 | Besoin le plus exprimé ≥40% des crises | ✅ Implémenté |
| **K** | 1 | ✨ | Amélioration : ≤−20% de crises vs période précédente | ✅ Implémenté |
| **L** | 1 | ⚠️ | Cluster détecté : ≥3 crises en ≤5 jours | ✅ Implémenté |
| **M** | 2 | 🔥 | Déclencheur le plus **intense** (avgIntensity ≥6) ≠ déclencheur le plus fréquent | ✅ Implémenté |
| **N** | 2 | ⚡ | Énergie basse **fréquence** : ≥40% des crises avec énergie ≤3/10 | ✅ Implémenté |
| **O** | 2 | 🧠 | Charge mentale haute **fréquence** : ≥40% des crises avec CM ≥7/10 | ✅ Implémenté |
| **P** | 2 | 👥 | Charge sociale haute **fréquence** : ≥40% des crises avec CS ≥7/10 | ✅ Implémenté |
| **Q** | 2 | ⛔ | Capacité systématiquement impossible dans ≥50% des crises (avec données capacités) | ✅ Implémenté |
| **R** | 2 | 📅 | Intervalle moyen entre deux crises : `(last - first) / (total - 1)` en jours, si ≥3 crises et avg ≥1 jour | ✅ Implémenté |

> **Note :** Les règles G et K sont complémentaires (G = dégradation, K = amélioration). Elles ne s'affichent pas en même temps.

### Affichage

- Maximum **8 insights** affichés (`insights.slice(0, 8)`)
- Triés par priorité croissante (1 d'abord)
- Affichés dans la section "À retenir" de `stats.html`

---

## 3. Insights pour l'utilisateur — pistes non encore implémentées

*Pour mieux se comprendre au quotidien. À intégrer dans une version future.*

### Patterns temporels
- ~~Intervalle moyen entre deux crises~~ → **implémenté (règle R)**
- Mois ou saison où les crises sont plus fréquentes

### Déclencheurs
- Déclencheur qui apparaît toujours en contexte [X] mais jamais en [Y]

### Types
- Tes shutdowns durent en moyenne plus longtemps que tes meltdowns (ou l'inverse)
- Type de crise dominant dans chaque contexte ("à la maison = surtout shutdown")

### Évolution
- Tendance d'intensité sur les 3 dernières périodes (en hausse, stable, en baisse)
- Tendance de durée (récupération plus rapide / plus lente)

### Besoins / états
- Besoin systématiquement absent dans certains contextes mais présent dans d'autres
- État qui co-apparaît toujours avec les crises les plus intenses

---

## 4. Insights pour le thérapeute / médecin

*Données cliniquement pertinentes pour le suivi.*

### Fréquence et tendance
- Évolution chronologique sur 3, 6, 12 mois (graphique de tendance)
- Existence de cycles ou de périodicité
- Nombre de crises sévères (≥7) vs légères (≤4) sur la période

### Profil de crise
- Ratio Meltdown/Shutdown stable ou en évolution
- Distribution des intensités (histogramme 1–10)
- Durée médiane et variance (pas seulement la moyenne)

### Facteurs prédisposants
- Corrélation charge mentale × intensité de crise
- Niveau moyen des 3 variables pré-crisis lors des crises sévères vs légères
- Identification des seuils de vulnérabilité (ex : charge sociale ≥7 → 80% de crises intenses)

### Déclencheurs
- Cartographie complète avec fréquence + intensité déclenchée (cibles thérapeutiques)
- Déclencheurs nouveaux sur la période (apparus pour la première fois)
- Déclencheurs en diminution (signe possible d'adaptation ou d'évitement)

### Contexte
- Intensité moyenne par contexte de vie
- Type de crise dominant par contexte
- Heure la plus fréquente par contexte (ex : crises au travail surtout en fin de journée)

### Capacités systématiquement altérées
- Capacités "impossible" dans ≥50% des crises → **implémenté (règle Q)**
- Corrélation capacité impossible × type de crise (Meltdown = perte de contrôle moteur ; Shutdown = communication impossible)

### Signaux cliniques spécifiques
- Proportion de crises nocturnes (signal de fatigue chronique)
- Crises sans déclencheur identifiable (Indéterminé) — progression ou régression sur le temps
- Présence de clusters (plusieurs crises en <72h) → **implémenté (règle L)**

---

## 5. Insights à implémenter

> La liste des insights à implémenter est dans **[ROADMAP.md](ROADMAP.md)** — section "V3 / Nouvelles règles d'insights stats".
> Ce fichier documente la logique technique ; ROADMAP.md pilote les priorités.
