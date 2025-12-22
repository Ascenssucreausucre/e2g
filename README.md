# 🧠 Envie2gicler — Roadmap & Organisation

## 🎯 Vision

Jeu de drague narratif absurde, inspiré d’Amour Sucré.

Objectifs :

- dialogues à choix
- affinité par personnage
- progression par chapitres
- MVP simple, extensible

---

## 🧱 PHASE 0 — Foundations (EN COURS)

### Backend

- [x] API Express + TypeScript
- [x] Prisma 7 configuré (adapter-pg)
- [x] PostgreSQL connecté
- [x] Modèle User
- [x] Auth JWT (login + middleware)
- [x] Modèle PlayerState

### Frontend

- [x] React + Vite + TypeScript
- [x] Tailwind CSS
- [x] DialogueBox (typing + skip)
- [x] Système de dialogue JSON inline

---

## 🚀 PHASE 1 — MVP JOUABLE (PRIORITÉ)

### 🎯 Objectif

Un utilisateur peut jouer **un chapitre complet**, avec sauvegarde.

---

### 🧩 Backend — Player & Progression (schema aligned)

#### PlayerState

- [x] GET /me  
- [x] GET /me/state  
- [ ] PATCH /me/state  

PlayerState contient désormais :

- [x] id
- [x] userId
- [x] nodeId (optionnel)
- [x] completedChapters → relation `Chapter[]`
- [x] affinities → relation `Affinity[]`
- [x] createdAt
- [x] updatedAt
- [ ] currency ❌ (non présent dans le schema, à ajouter plus tard)

📌 Notes :
- `completedChapters` n’est plus un `string[]`, mais une relation Prisma
- les affinités sont normalisées via la table `Affinity`

---

### ❤️ Affinités

#### Modèle Affinity

- [x] id
- [x] playerStateId
- [x] characterId
- [x] value
- [x] unique(playerStateId, characterId)

#### API (à prévoir)

- [ ] GET /me/affinities
- [ ] PATCH /me/affinities
- [ ] PATCH /me/affinities/:characterId

Règles :

- une affinité est unique par couple `(playerState, character)`
- `value` est incrémental (positif ou négatif)
- création lazy si inexistante

---

### 📚 Chapitres

#### Modèle Chapter

- [x] id
- [x] title
- [x] startCharacterIds (string, à normaliser plus tard)
- [x] order (string)
- [x] cost
- [x] active
- [x] characters (relation many-to-many)
- [x] dialogue (relation `DialogueData[]`)
- [x] completedBy (relation `PlayerState[]`)

#### API

- [x] GET /chapters
- [x] GET /chapters/:id

Règles :

- un chapitre inactif n’est jamais retourné
- l’ordre d’accès dépend uniquement du `PlayerState`
- aucun lien hardcodé vers le chapitre suivant
- `completedBy` sert de source de vérité pour la progression

---

### 💬 Dialogues

#### DialogueData

- [x] id
- [x] chapterId
- [x] content (JSON)
- [x] relation Chapter

📌 Notes :
- `content` est volontairement libre (JSON)
- conçu comme futur node system (choix, conditions, effets)

---

### 🧍 Characters

#### Modèle Character

- [x] id
- [x] name
- [x] description
- [x] portrait
- [x] chapters (relation many-to-many)

Usage :

- preload des sprites
- support direct des affinités
- découplé des dialogues

---

### 🔐 User

#### Modèle User

- [x] id
- [x] email
- [x] password
- [x] createdAt
- [x] updatedAt
- [x] state (relation 1–1 `PlayerState`)

---

### 🧠 Prochaines évolutions (hors schema actuel)

- [ ] ajouter `currency` à PlayerState
- [ ] normaliser `startCharacterIds`
- [ ] système de conditions de déblocage de chapitres
- [ ] `nodeId` → vrai DialogueNode
- [ ] effets de dialogue (affinity + currency)

### 💬 Front — Dialogue Engine

- [ ] Lecture du DialogueData JSON
- [ ] Injection des scripts de choix (nextScript)
- [ ] Sauvegarde de la progression
- [ ] Gestion du placeholder `{name}`
- [ ] Gestion des speakers dynamiques
- [ ] Slots personnages (2 max, style Fire Emblem)

---

## ❤️ PHASE 2 — Personnages & Affinité

### Characters

- [x] Modèle Character
  - id
  - name
  - avatar
  - active

### Affinity

- [ ] Stockage dans PlayerState.affection (JSON)

Exemple :

```json
{
  "alice": 12,
  "bob": -3
}
```

- [ ] GET /me/affinity
- [ ] PATCH /me/affinity
- [ ] Effets de choix (affection + / -)

---

## 🗺️ PHASE 3 — Navigation & UI

### Pages

- [ ] Login
- [ ] Menu principal
- [ ] Sélection de chapitre
- [ ] Page dialogue
- [ ] Fiche personnage

### UX

- [ ] Sons de feedback (skip, choix)
- [ ] Animations simples (Framer motion)
- [ ] Éran d'entrée swagg

---

## 🧪 PHASE 4 — Qualité & Tooling

- [ ] Validation des données API
- [ ] Gestion d'erreurs propres
- [ ] Prisma seed (chapter + dialogue)
- [ ] Mode debug (reset playerState)
- [ ] Sauvegardes auto

---

## 💰 PHASE 5 — OPTIONNEL / PLUS TARD

- [ ] Système de points journalier
- [ ] Chapitres payants
- [ ] Notifications PWA
- [ ] OST
- [ ] Illustrations custom

---

## 🛑 RÈGLES D’OR

- Pas d’optimisation prématurée
- Pas de sur-modélisation DB
- JSON pour les dialogues
- Prisma = stockage, pas moteur narratif
- Un chapitre jouable > 10 features bancales
