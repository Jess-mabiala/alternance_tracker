# 📘 Cahier des charges — AltTrack

## 1. Présentation du projet

AltTrack est une application web permettant de gérer et suivre les candidatures à des offres d’alternance ou d’emploi.

L’objectif est de centraliser toutes les candidatures et d’optimiser le processus de recherche.

---

## 2. Objectifs

- Centraliser les candidatures
- Suivre leur état d’avancement
- Organiser les relances et entretiens
- Analyser les performances de recherche
- Améliorer les chances de réussite

---

## 3. Fonctionnalités

### 3.1 Authentification
- Inscription
- Connexion
- Déconnexion

---

### 3.2 Gestion des candidatures
Chaque candidature contient :
- Entreprise
- Poste
- Ville
- Type de contrat
- Plateforme (LinkedIn, Indeed, etc.)
- Date d’envoi
- Lien de l’offre
- Statut
- Notes

---

### 3.3 Statuts
- À envoyer
- Envoyée
- Relancée
- Entretien
- Refusée
- Acceptée

---

### 3.4 Dashboard
- Nombre total de candidatures
- Taux de réponse
- Nombre d’entretiens
- Répartition par statut

---

### 3.5 Calendrier
- Entretiens
- Relances
- Deadlines importantes

---

### 3.6 Statistiques
- Taux de réussite
- Plateformes les plus efficaces
- Temps moyen de réponse
- Évolution des candidatures

---

### 3.7 Notifications
- Rappel de relance
- Entretien à venir
- Candidature sans réponse

---

## 4. Fonctionnalités avancées (V2)

- Génération automatique de mails de relance
- Analyse de CV
- Suggestions d’offres
- Optimisation ATS
- Assistant IA pour candidatures

---

## 5. Stack technique

### Frontend
- React / Next.js
- TailwindCSS
- Recharts

### Backend
- FastAPI

### Base de données
- PostgreSQL

### Authentification
- JWT

---

## 6. Modèle de données

### Users
- id
- name
- email
- password
- created_at

### Applications
- id
- user_id
- company
- position
- city
- contract_type
- platform
- status
- application_date
- offer_link
- notes

### Interviews
- id
- application_id
- date
- type
- notes

### Reminders
- id
- user_id
- title
- date
- completed

---

## 7. Objectif final

Créer un outil de gestion de candidatures permettant d’optimiser la recherche d’alternance et de suivre efficacement son avancement.