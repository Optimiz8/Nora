# Analyse des données — Nora V2.2.1

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
- Jour de la semaine, moment de la journée
- Tendance sur le temps (hausse/baisse)
- Corrélations croisées entre variables
- Distribution des intensités (légère 1–4 / modérée 5–7 / sévère 8–10)
- Clusters (plusieurs crises en peu de jours)

---

## 2. Insights pour l'utilisateur

*Pour mieux se comprendre au quotidien.*

### Patterns temporels
- Intervalle moyen entre deux crises ("Tu as en moyenne une crise tous les X jours")
- Mois ou saison où les crises sont plus fréquentes
- Cluster détecté ("Tu as eu X crises en X jours — période difficile")

### Déclencheurs
- Déclencheur qui provoque les crises les **plus intenses** (≠ le plus fréquent)
- Nombre total de déclencheurs différents identifiés sur la période
- Déclencheur qui apparaît toujours en contexte [X] mais jamais en [Y]

### Pré-crisis
- Seuil d'énergie sous lequel les crises arrivent systématiquement ("Sous 4/10 d'énergie, X% de tes crises arrivent")
- Quel facteur est le meilleur prédicteur pour toi : énergie, charge mentale ou charge sociale ?

### Types
- Tes shutdowns durent en moyenne plus longtemps que tes meltdowns (ou l'inverse)
- Type de crise dominant dans chaque contexte ("à la maison = surtout shutdown ; au travail = surtout meltdown")

### Évolution
- Tendance d'intensité sur les 3 dernières périodes (en hausse, stable, en baisse)
- Tendance de durée (récupération plus rapide / plus lente)

### Besoins / états
- Besoin systématiquement absent dans certains contextes mais présent dans d'autres
- État qui co-apparaît toujours avec les crises les plus intenses

---

## 3. Insights pour le thérapeute / médecin

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
- Capacités "impossible" dans ≥50% des crises (fonctions à travailler en thérapie)
- Corrélation capacité impossible × type de crise (Meltdown = perte de contrôle moteur ; Shutdown = communication impossible)

### Signaux cliniques spécifiques
- Proportion de crises nocturnes (signal de fatigue chronique)
- Crises sans déclencheur identifiable (Indéterminé) — progression ou régression sur le temps
- Présence de clusters (plusieurs crises en <72h) — signe de surcharge prolongée

---

## 4. Tableau des insights à implémenter

| Priorité | Règle | Logique | Statut |
|----------|-------|---------|--------|
| 🔴 Haute | Cluster détecté | ≥3 crises en ≤5 jours | ✅ Implémenté |
| 🔴 Haute | Déclencheur le plus intense | Celui avec avgIntensity le plus élevé (≠ plus fréquent) | ✅ Implémenté |
| 🔴 Haute | Seuil énergie (fréquence) | ≥40% des crises avec énergie ≤3/10 | ✅ Implémenté |
| 🟠 Moyen | Seuil charge mentale (fréquence) | ≥40% des crises avec charge ≥7/10 | ✅ Implémenté |
| 🟠 Moyen | Seuil charge sociale (fréquence) | ≥40% des crises avec charge ≥7/10 | ✅ Implémenté |
| 🟡 Bas | Capacité systématiquement impossible | Dans ≥50% des crises avec données capacités | ✅ Implémenté |
| 🔴 Haute | Intervalle moyen entre crises | (dernier - premier) / (total - 1) | À faire |
| 🟠 Moyen | Shutdown > Meltdown en durée | avgDuration Shutdown vs Meltdown | À faire |
| 🟠 Moyen | Tendance intensité | Comparer 1ère moitié vs 2ème moitié des entrées | À faire |
| 🟠 Moyen | Crises nocturnes élevées | Nuit ≥30% → signal fatigue | À faire |
| 🟡 Bas | Crises sans déclencheur | ≥30% avec 0 déclencheur identifié | À faire |
