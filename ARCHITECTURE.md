# Nora — Architecture & Fonctionnement technique

> Document de référence pour comprendre les choix d'implémentation qui ne se lisent pas directement dans le code.
> À mettre à jour à chaque décision technique significative.
> Dernière mise à jour : mars 2026 — couvre jusqu'au commit `857e83d` (v2.8.0)

---

## Structure générale

Nora est une **PWA (Progressive Web App)** en HTML/CSS/JS vanilla, sans framework ni bundler.

- Chaque page est un fichier `.html` autonome avec ses `<style>` et `<script>` embarqués
- Les styles partagés (variables CSS, header, footer, bouton retour) sont dans `nora-common.css`
- Toutes les données utilisateur sont stockées en **localStorage** (pas de serveur, pas de compte)
- Hébergée sur **GitHub Pages** à l'adresse `https://optimiz8.github.io/Nora-2/`

---

## Service Worker — fonctionnement offline (V2.8)

### Fichiers concernés
- `sw.js` — le Service Worker
- `sw-register.js` — enregistrement du SW, inclus dans les 36 pages HTML

### Pourquoi un Service Worker ?
Nora est utilisée en situation de crise, potentiellement sans réseau (sous-sol, zone blanche, avion, panique avec téléphone en mode avion). L'objectif est que l'app soit **toujours disponible**, quelle que soit la connexion.

### Ce qui se passe au premier lancement (avec réseau)

1. Le SW s'installe silencieusement en arrière-plan
2. Il pré-cache en parallèle toutes les ressources statiques :
   - Les 36 pages HTML
   - `nora-common.css` et `manifest.webmanifest`
   - Toutes les images (`assets/images/`) — ~9 Mo
   - Les animations Lottie/webm (`assets/*.json`, `assets/*.webm`)
   - **Total : ~15 Mo**
3. Si l'utilisatrice a des **préréglages enregistrés dans le mixeur**, `sw-register.js` lit le localStorage, extrait les sons utilisés dans ces préréglages et les envoie au SW via `postMessage` — ils sont mis en cache silencieusement

> **Les sons ne sont PAS pré-cachés en bloc** : les fichiers audio font jusqu'à 42 Mo chacun (233 Mo au total). Les pré-cacher tous au premier lancement bloquerait l'installation plusieurs minutes et userait le stockage téléphone.

### Ce qui se passe lors des utilisations suivantes

**En ligne :**
- Les pages s'affichent **instantanément depuis le cache** (pas d'attente réseau)
- En arrière-plan, le SW vérifie si une version plus récente existe et la télécharge pour la prochaine ouverture
- C'est la stratégie **stale-while-revalidate** : "sers le cache, mets à jour en fond"

**Hors-ligne :**
- Tout fonctionne normalement : toutes les pages, le CSS, les images
- Les sons **déjà joués** au moins une fois (et donc mis en cache) fonctionnent aussi
- Les sons **jamais joués** et pas dans un préréglage ne sont pas disponibles

### Stratégies de cache par type de ressource

| Ressource | Stratégie | Pourquoi |
|---|---|---|
| Pages HTML, CSS, manifest | **Stale-while-revalidate** | Se mettent à jour avec les nouvelles versions de l'app |
| Images, animations | **Stale-while-revalidate** | Rarement modifiées mais peuvent évoluer |
| Sons (`assets/audio/`) | **Cache-first** | Fichiers immuables, ne changent jamais |

### Mise à jour de l'app

Quand une nouvelle version est déployée sur GitHub Pages :
1. Le nouveau SW est téléchargé mais **ne remplace pas l'ancien immédiatement**
2. Il attend que toutes les fenêtres/onglets Nora soient fermés
3. À la prochaine ouverture complète, le nouveau SW s'active et nettoie les anciens caches

> Ce comportement évite qu'une mise à jour interrompe une session en cours (ex : pendant une crise).

### Versioning du cache

La constante `CACHE_VERSION` dans `sw.js` (ex : `'nora-v2.8.0'`) détermine le nom des caches.
**À mettre à jour à chaque nouvelle version déployée** pour forcer le rechargement des ressources mises à jour.

```js
const CACHE_VERSION = 'nora-v2.8.0';
```

### Cas particulier : sons des préréglages mixeur

Structure des préréglages dans localStorage (`mixerPresets`) :
```json
[
  {
    "id": "1234567890",
    "name": "Soir calme",
    "volumes": {
      "pluie sur la fenêtre": 60,
      "feu de cheminée": 40,
      "doux ronronnements": 0
    }
  }
]
```

Au chargement de n'importe quelle page, `sw-register.js` :
1. Lit `mixerPresets` dans localStorage
2. Collecte tous les sons avec `volume > 0`
3. Envoie `{ type: 'CACHE_AUDIO', urls: ['./assets/audio/pluie sur la fenêtre.mp3', ...] }` au SW
4. Le SW les télécharge et les met en cache dans `AUDIO_CACHE`

---

## Données utilisateur — localStorage

Toutes les données sont stockées localement, jamais envoyées à un serveur.

| Clé | Contenu |
|---|---|
| `journalCrises` | Journal des crises (array JSON) |
| `mixerPresets` | Préréglages du mixeur de sons |
| `mixer_[nom]` | Volume individuel de chaque son du mixeur |
| `cartesCommunication` | Cartes de communication personnalisées |
| `cartesShowIcons` | Affichage des icônes sur les cartes |
| `playlistName` / `lienPlaylist` | Playlist personnalisée |
| `profil_*` | Données du profil utilisateur |
| `tutorielRetour` | Flag de navigation dans le tutoriel |
| `carteConfigured` | Flag de configuration de la carte d'urgence |

Export/import géré dans `parametres.html` (version du format : `'2.5'`).

---

## Animations Lottie

Certaines pages utilisent des animations Lottie (format JSON + webm de fallback) :
- `Glitter-Star` — effet paillettes dans Harmonie visuelle
- `Space-Man` — illustration de chargement
- `Search-Empty404` / `SearchEmpty404` — page 404 et états vides
- `Sunrise - Breathe in Breathe out` — animation de cohérence cardiaque

> Note : les noms de fichiers JSON et webm sont légèrement inconsistants (`Search-Empty404.webm` vs `SearchEmpty404.json`). Ne pas renommer sans vérifier toutes les références.

---

## GitHub Pages — considérations de déploiement

L'app est servie depuis `https://optimiz8.github.io/Nora-2/` (sous-répertoire, pas la racine).
Le `manifest.webmanifest` et `sw.js` utilisent des chemins relatifs (`./`) pour fonctionner quel que soit le chemin de base — pas de configuration spécifique nécessaire.

Push sur `main` → déploiement automatique GitHub Pages.

---

## Docs de support — synchronisation avec git

### Le problème
Claude Code n'a pas de mémoire entre deux sessions. À chaque nouvelle conversation, il repart de zéro et ne sait pas si des commits ont eu lieu depuis la dernière fois qu'on a travaillé ensemble.

### La solution : marqueur de version dans chaque doc

Chaque doc de support contient une ligne de ce type :
```
> Dernière mise à jour : mars 2026 — couvre jusqu'au commit `857e83d` (v2.8.0)
```

Ce marqueur indique jusqu'à quel commit le doc a été mis à jour.

### Ce que Claude fait en début de session

1. Il lit le marqueur dans les docs de support
2. Il lance `git log --oneline -10` pour voir les commits récents
3. Il compare : est-ce que le commit référencé dans le marqueur est le plus récent, ou y a-t-il des commits plus récents ?
4. Si oui → il propose de mettre les docs à jour (en début ou fin de session)

### Ce que Marine n'a pas à faire

Rien. Elle commit et push depuis VS Code comme d'habitude. Claude détecte automatiquement le décalage et propose la mise à jour.

### Convention de mise à jour en fin de session

L'ordre de mise à jour des docs avant un commit :
1. `a-propos.html` — numéro de version
2. `CHANGELOG.md` — entrée pour la nouvelle version
3. `ROADMAP.md` — si une fonctionnalité est livrée ou planifiée
4. `ARCHITECTURE.md` — si un choix technique a été fait
5. `PRODUCT-OVERVIEW.md` — si une fonctionnalité majeure a été ajoutée

Après la mise à jour, le marqueur `couvre jusqu'au commit X` est mis à jour avec le nouveau hash de commit (récupéré via `git log --oneline -1` après le commit).
