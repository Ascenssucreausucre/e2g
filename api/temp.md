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

### 🧩 Backend — Player & Progression

#### PlayerState

- [ ] GET /me
- [ ] GET /me/state
- [ ] PATCH /me/state

PlayerState doit contenir :

- [ ] currentChapterId
- [ ] currentNodeId (ou index)
- [ ] currency
- [ ] flags (JSON)
- [ ] unlockedChapters (string[])

---

### 📚 Chapitres

#### Modèle Chapter

- [ ] id
- [ ] title
- [ ] order (Int)
- [ ] cost
- [ ] active

#### DialogueData

- [ ] id
- [ ] chapterId
- [ ] content (JSON)

#### API

- [ ] GET /chapters
- [ ] GET /chapters/:id

Règles :

- le chapitre suivant est déterminé par `order`
- aucun lien hardcodé vers le chapitre suivant
- un chapitre inactif n’est jamais retourné

---

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

- [ ] Modèle Character
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
