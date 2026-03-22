# Nora — Protocole de tests alpha

> Dernière mise à jour : mars 2026
> Statut : en préparation — phase alpha non encore lancée

---

## 1. Objectif des tests alpha

Valider que Nora est utilisable par des personnes autistes adultes (hors Marine) dans des conditions réelles, avant toute diffusion plus large.

Ce que les tests alpha permettent de mesurer :
- L'installation PWA se passe sans friction (étape la plus risquée)
- Le tutoriel est suffisant pour configurer les éléments essentiels seul·e
- Les fonctionnalités critiques (flux de crise, carte d'urgence, cartes de communication) sont compréhensibles sans explication externe
- Les blocages et confusions les plus fréquents
- Le niveau d'utilité perçue en conditions réelles

---

## 2. Qui recruter

### Profil cible
- Personne autiste adulte, SDI (Sans Déficience Intellectuelle) ou niveau d'autonomie élevé
- Capable de configurer elle-même une application mobile (pas besoin d'aide pour installer une PWA)
- Francophone
- Possède un smartphone Android ou iOS
- A déjà vécu des situations de crise ou de surcharge autistique

### Volume recommandé
**5 à 8 personnes.** Au-delà de 10, les retours se répètent sans apporter de nouvelle information.

### Où recruter
- Communautés autistes francophones (Discord, Reddit r/autism_fr, groupes Facebook)
- Réseau personnel
- Professionnels (thérapeutes, éducateurs spécialisés) qui pourraient orienter des personnes intéressées avec leur accord

---

## 3. Contrôle d'accès pendant l'alpha

### Choix retenu : mot de passe JavaScript en entrée

Une page de mot de passe s'affiche au premier accès à l'URL. Le mot de passe est communiqué uniquement aux testeurs recrutés.

**Limites à connaître :**
- Le mot de passe est visible dans le code source (n'importe qui peut le trouver via les outils développeur du navigateur)
- Ce n'est donc pas une vraie sécurité — c'est une friction suffisante pour une alpha privée
- Personne ne va "cracker" un test d'application, donc c'est acceptable pour cet usage

**À implémenter :** une page `alpha-access.html` ou une surcouche sur `index.html` avec un champ mot de passe + validation JS. Si le mot de passe est correct, un flag est stocké en `localStorage` pour ne pas redemander à chaque visite.

### Indexation — robots.txt

**C'est quoi robots.txt ?**
C'est un petit fichier texte placé à la racine du site qui dit aux moteurs de recherche (Google, Bing…) : "ne référencez pas ce site". Sans ça, Google peut trouver l'URL et l'afficher dans ses résultats si quelqu'un cherche "application autisme crise" — ce qui ferait arriver des gens non-recrutés pendant la phase de test.

**Important :** c'est une convention, pas une protection. N'importe qui ayant le lien peut accéder au site. C'est seulement pour éviter la découverte accidentelle via les moteurs de recherche.

**Statut :** ✅ fichier `robots.txt` créé à la racine du projet (mars 2026).

> ⚠️ **À ne pas oublier avant le déploiement public** : supprimer ou vider `robots.txt` pour permettre l'indexation par Google. Tant que ce fichier est présent avec `Disallow: /`, Nora n'apparaîtra dans aucun résultat de recherche.

### Mention alpha visible dans l'app

Ajouter une mention visible sur la page d'accueil : *"Version alpha — usage test — ne pas rediffuser"*. Cela rappelle le cadre aux testeurs et les responsabilise.

---

## 4. Consentement et éthique

### Pourquoi c'est important

Nora est destinée à des personnes en situation de vulnérabilité (crise autistique). Une version en cours de test pourrait présenter des bugs ou comportements inattendus au pire moment. Il faut que les testeurs en soient informés clairement avant de commencer.

### Page ou écran de consentement (à afficher au premier lancement)

À afficher après le mot de passe, avant le tutoriel. Éléments à inclure :

- **C'est une version alpha** : des bugs peuvent exister, c'est normal et attendu — merci de les signaler
- **Ce n'est pas un outil clinique validé** — Nora ne remplace pas un suivi médical ou thérapeutique
- **Tes données restent sur ton téléphone** — aucun serveur, aucun compte, aucune donnée transmise
- **En cas de dysfonctionnement pendant une crise** — avoir d'autres ressources disponibles (contacts de crise notés ailleurs, numéros d'urgence)
- **Engagement en échange de l'accès** — remplir le questionnaire de retour en fin de période de test
- **Contact optionnel** — accepter éventuellement d'être recontacté·e si la développeuse a des questions de suivi

Bouton de validation : *"Je comprends et je veux tester Nora"*

---

## 5. Document d'accueil testeur

Un message court envoyé à chaque testeur au moment du recrutement (email ou message direct).

### Contenu

1. **Ce qu'est Nora** — contexte personnel, app née d'un besoin réel, créée par une personne autiste
2. **Ce qu'on attend du testeur** — utiliser l'app pendant X semaines en conditions réelles, remplir le questionnaire à la fin
3. **Guide d'installation PWA** — captures d'écran ou GIF pour iOS et Android (c'est la partie la plus délicate : sur iOS, il faut Safari + "Ajouter à l'écran d'accueil")
4. **Le lien et le mot de passe** d'accès
5. **La date limite** pour rendre le questionnaire
6. **Contact pour bugs urgents** — email ou autre moyen de contact direct

---

## 6. Questionnaire de retour — ébauche Google Forms

**Format : Google Forms** (gratuit, accessible depuis mobile, anonyme possible)

> Ce qui suit est l'ébauche du formulaire tel qu'il sera rédigé. Les types de champs sont indiqués entre crochets.

---

### En-tête du formulaire

**Titre :** Retour sur Nora — phase alpha

**Description :**
> Merci d'avoir testé Nora. Tes retours sont essentiels pour améliorer l'app avant de la diffuser plus largement.
>
> Ce formulaire prend environ 10 à 15 minutes. Il n'y a pas de bonne ou mauvaise réponse — ce qui compte, c'est ton expérience réelle.
>
> Tes réponses sont anonymes sauf si tu choisis de laisser tes coordonnées à la fin.

---

### Section 1 — Ton appareil et l'installation

*L'installation d'une PWA (application web progressive) varie selon les appareils — cette section nous aide à identifier les blocages techniques.*

**Q1.** Sur quel appareil as-tu principalement testé Nora ?
`[Choix unique]`
- Android
- iPhone / iPad (iOS)
- Autre (précise)

**Q2.** Quel navigateur as-tu utilisé pour accéder à l'app ?
`[Choix unique]`
- Chrome
- Safari
- Firefox
- Samsung Internet
- Autre (précise)

**Q3.** As-tu réussi à installer Nora sur ton écran d'accueil (comme une vraie app) ?
`[Choix unique]`
- Oui, sans problème
- Oui, mais j'ai eu des difficultés
- Non, je n'ai pas réussi
- Je n'ai pas essayé / je ne savais pas que c'était possible

**Q4.** *(visible si "difficultés" ou "non")* Qu'est-ce qui a bloqué lors de l'installation ?
`[Texte libre]`

---

### Section 2 — La prise en main

*On veut savoir si le démarrage est fluide sans aide extérieure.*

**Q5.** As-tu suivi le tutoriel de démarrage ?
`[Choix unique]`
- Oui, en entier
- Oui, en partie
- Non, je l'ai passé

**Q6.** *(visible si tutoriel suivi)* Le tutoriel t'a-t-il permis de comprendre comment utiliser l'app ?
`[Échelle 1–5 : "Pas du tout" → "Tout à fait"]`

**Q7.** Y a-t-il eu quelque chose d'incompréhensible ou de déroutant au démarrage ?
`[Texte libre — facultatif]`

---

### Section 3 — La configuration

*Nora se configure avant la crise pour être prête quand la crise arrive.*

**Q8.** As-tu configuré ta carte d'urgence (les informations à montrer en cas de crise) ?
`[Choix unique]`
- Oui, complètement
- Oui, partiellement
- Non — je n'ai pas trouvé comment faire
- Non — je n'ai pas eu le temps / l'envie

**Q9.** As-tu créé des cartes de communication (les phrases ou mots à montrer sans parler) ?
`[Choix unique]`
- Oui
- Non — je n'ai pas trouvé comment faire
- Non — je n'en avais pas besoin
- Non — autre raison

**Q10.** As-tu configuré des contextes de vie (maison, travail, etc.) ?
`[Choix unique]`
- Oui
- Non — je n'ai pas compris à quoi ça servait
- Non — je n'ai pas eu le temps
- Non — autre raison

**Q11.** Y a-t-il une partie de la configuration qui t'a semblé trop complexe ou peu claire ?
`[Texte libre — facultatif]`

---

### Section 4 — L'usage en situation réelle

*C'est la partie la plus importante. Si tu n'as pas eu de crise pendant la période de test, c'est tout à fait normal — réponds à ce que tu peux.*

**Q12.** As-tu utilisé Nora pendant ou juste après une crise ou une situation de surcharge ?
`[Choix unique]`
- Oui, pendant une crise
- Oui, juste après une crise
- Oui, dans une situation de surcharge (pas une crise complète)
- Non — je n'ai pas eu de crise pendant la période de test
- Non — j'ai oublié d'ouvrir l'app sur le moment

**Q13.** *(visible si usage en situation)* Quelle fonctionnalité as-tu utilisée en premier ?
`[Choix unique]`
- La carte d'urgence (à montrer à quelqu'un)
- Les cartes de communication
- Les exercices de respiration
- Les sons / ambiances sonores
- Les fidgets numériques (pop-it, slider, cliqueur)
- L'harmonie visuelle
- Le timer
- Autre (précise)

**Q14.** *(visible si usage en situation)* Est-ce que ça t'a aidé ?
`[Échelle 1–5 : "Pas du tout" → "Vraiment beaucoup"]`

**Q15.** *(visible si usage en situation)* Qu'est-ce qui a aidé ou au contraire n'a pas aidé dans ce moment ?
`[Texte libre — facultatif]`

**Q16.** Y a-t-il des fonctionnalités que tu voulais utiliser mais que tu n'as pas trouvées ou pas comprises ?
`[Texte libre — facultatif]`

---

### Section 5 — Ressenti global

**Q17.** En situation de stress, l'interface de Nora est-elle lisible et facile à utiliser ?
`[Échelle 1–5 : "Très difficile à utiliser" → "Très facile à utiliser"]`

**Q18.** La configuration de l'app (hors crise) est-elle accessible ?
`[Échelle 1–5 : "Trop complexe" → "Simple et claire"]`

**Q19.** Quelle fonctionnalité t'a semblé la plus utile ?
`[Texte libre]`

**Q20.** Y a-t-il quelque chose qui t'a semblé inutile, gênant ou mal conçu ?
`[Texte libre — facultatif]`

**Q21.** Si tu ne pouvais changer qu'une seule chose dans Nora, ce serait quoi ?
`[Texte libre — facultatif]`

**Q22.** Y a-t-il une fonctionnalité que tu aurais aimé trouver dans Nora et qui n'existe pas encore ?
`[Texte libre — facultatif]`
*Pas de promesse que ce sera fait — mais c'est exactement ce genre de retour qui oriente les prochaines versions.*

---

### Section 6 — Bilan et suite

**Q23.** Après cette période de test, est-ce que tu utiliserais Nora au quotidien ?
`[Choix unique]`
- Oui, je l'utilise déjà régulièrement
- Oui, probablement
- Peut-être, si certaines choses changeaient (précise en Q21)
- Non

**Q24.** Tu recommanderais Nora à une autre personne autiste ?
`[Choix unique]`
- Oui, sans hésiter
- Oui, avec des réserves
- Pas encore, mais peut-être après amélioration
- Non

**Q25.** As-tu rencontré des bugs ou des comportements inattendus ?
`[Texte libre — facultatif]`
*Décris ce qui s'est passé, sur quel appareil, et si possible à quel moment.*

**Q26.** Remarques libres — tout ce que tu veux ajouter
`[Texte libre — facultatif]`

---

### Section 7 — Contact (facultatif)

*Cette section est entièrement optionnelle. Elle sert uniquement si tu acceptes d'être recontacté·e.*

**Q27.** Acceptes-tu que je te recontacte si j'ai des questions de suivi sur tes retours ?
`[Choix unique]`
- Oui
- Non

**Q28.** *(visible si oui)* Comment te contacter ?
`[Texte libre]`
*Email, pseudo Discord, ou autre — à ta convenance.*

---

## 7. Points à communiquer aux testeurs

### Si je n'ai pas eu de crise pendant le test

À préciser clairement dans le document d'accueil : une période de test sans crise n'est pas un échec. Tester la configuration (carte d'urgence, cartes de communication, contextes), explorer les outils d'apaisement, évaluer la lisibilité et la simplicité de l'interface — tout ça est aussi précieux que l'usage en situation de crise réelle.

### Ce qui se passe après l'alpha

À préciser dans le document d'accueil :
- Les testeurs peuvent garder l'app installée et continuer à l'utiliser après la phase alpha
- Ils seront informés des mises à jour importantes (si un moyen de contact a été laissé)
- Leurs retours seront intégrés dans la version suivante

### Confidentialité des données des testeurs

Les testeurs vont entrer de vraies données personnelles (contacts d'urgence, contextes de vie, crises). À mentionner explicitement :
- Ces données restent sur leur téléphone — aucun accès de la part de la développeuse
- Ils peuvent exporter leurs données à tout moment (Paramètres → Exporter)
- Ils peuvent tout supprimer depuis les Paramètres en fin de test si souhaité

### Bugs et dysfonctionnements

Les retours sur les bugs passent uniquement par le questionnaire de fin de test. Si l'app dysfonctionne pendant une crise, la personne doit avoir d'autres ressources disponibles — ce qui est valable indépendamment du test. Les personnes autistes géraient leurs crises avant Nora et peuvent le faire sans elle si nécessaire.

---

## 8. Durée et calendrier

- **Durée de test recommandée** : 3 à 6 semaines minimum — les crises ne sont pas planifiables, une période trop courte ne permet pas une évaluation réelle
- **Date de début** : à définir
- **Date limite retour questionnaire** : à définir (communiquée dans le doc d'accueil)
- **Relances** : 1 rappel à mi-parcours, 1 rappel 3 jours avant la deadline

---

## 9. Traitement des retours

- **Retours questionnaire** → attendre d'avoir l'ensemble avant d'agir — identifier les patterns récurrents, pas réagir à chaque retour individuel
- **Synthèse** → liste priorisée de corrections et d'améliorations à intégrer avant la bêta

---

## 10. Critères de passage à la phase bêta (diffusion plus large)

- Aucun bug bloquant signalé non résolu
- Installation PWA réussie sans aide par ≥ 80 % des testeurs
- Utilité perçue ≥ 4/5 en moyenne sur le questionnaire
- Retours collectés et synthèse réalisée

---

## À faire pour lancer l'alpha

- [x] Créer le fichier `robots.txt` à la racine ✅ (mars 2026 — à supprimer avant déploiement public)
- [ ] Implémenter le mot de passe JS d'accès (avec mémorisation `localStorage`)
- [ ] Ajouter la mention "Version alpha — ne pas rediffuser" sur la page d'accueil
- [ ] Créer l'écran de consentement (à afficher au premier lancement — voir section 4)
- [ ] Créer le Google Forms (questionnaire de retour — voir section 6)
- [ ] Rédiger le document d'accueil testeur avec guide d'installation iOS + Android (voir section 5)
- [ ] Recruter 5 à 8 testeurs (profil défini en section 2)
- [ ] Définir les dates de début et de fin
