# 📚 Smart Internship Management Platform

Une plateforme intelligente de gestion des stages, facilitant la communication entre étudiants, RH, encadrants, et administrateurs.

## 🔗 Table des matières

- [Aperçu du projet](#aperçu-du-projet)
- [Architecture](#architecture)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Sprints réalisés](#sprints-réalisés)
- [Technologies utilisées](#technologies-utilisées)
- [Lancement du projet](#lancement-du-projet)


---

## 🧩 Aperçu du projet

Ce projet a pour objectif de digitaliser le processus de gestion des stages en entreprise. Il permet aux RH de publier des offres, aux étudiants de postuler, aux encadrants de suivre les stagiaires, et à tous les acteurs de planifier efficacement leurs rendez-vous.

## 🏗️ Architecture

Le projet est basé sur une architecture **microservices**, intégrée via :
- **API Gateway** (Spring Cloud Gateway)
- **Eureka Server** pour la découverte de services

Chaque microservice est indépendant, ce qui favorise la scalabilité et la maintenance du système.

### 📐 Modules Développés

- **Gestion des utilisateurs**
- **Gestion des offres de stage**
- **Gestion des candidatures**
- **Gestion des quiz**
- **Évaluations**
- **Tâches**
- **Documents**
- **Rendez-vous / Entretiens**
- **Réclamations**

## 🚀 Fonctionnalités principales

- 🔐 Authentification et autorisation (avec JWT)
- 📄 Publication et gestion des offres
- 📝 Postulation et suivi des candidatures
- 📅 Planification de rendez-vous (RH ↔ Étudiants / Encadrants ↔ Stagiaires)
- 🧠 Quiz interactifs pour les postulants
- 📊 Évaluation des stagiaires
- 📁 Gestion documentaire (CV, conventions, rapports)
- 📞 Notifications et appels vidéo (via ZegoCloud)
- 🗣️ Système de réclamations

## 📅 Sprints réalisés

### ✅ Sprint 1 : Mise en place et fonctionnalités de base

- Initialisation de l’architecture
- Authentification JWT
- Gestion des utilisateurs
- Gestion des offres de stage
- Gestion des documents

### ✅ Sprint 2 : Ajout de modules fonctionnels

- Module de quiz
- Module de rendez-vous RH / étudiants
- Gestion des candidatures
- Évaluation des candidats
- Gestion des tâches des stagiaires

### ✅ Sprint 3 : Intelligence Artificielle (IA)

- ⚙️ **Prédiction** : Utilisation du modèle XGBoost pour prédire si une candidature sera acceptée ou non
- 🧠 **Recommandation** : Système de recommandation d’offres basé sur la similarité (TF-IDF + Cosine Similarity)
- 🔬 **Clustering** : Regroupement des profils candidats via K-Means
- 🌐 **Déploiement** des modèles via Flask (REST API)
- ✅ **Test via Postman** & intégration avec la plateforme (frontend/backend)

> 💡 **Remarque** : L’intégration technique via API Gateway & Eureka a été complétée dans les sprints 1 et 2. Le sprint 3 était exclusivement dédié à l’ajout de modules intelligents basés sur le Machine Learning.

## 🛠️ Technologies utilisées

- **Frontend** : Angular
- **Backend** : Spring Boot, Spring Cloud
- **API Gateway** : Spring Cloud Gateway
- **Service Discovery** : Eureka
- **Base de données** : MySQL
- **Communication** : REST APIs
- **Notifications** : WebSocket / Firebase
- **Appels vidéo** : ZegoCloud API

## ⚙️ Lancement du projet

```bash
# Démarrer Eureka
cd eureka-server
./mvnw spring-boot:run

# Démarrer API Gateway
cd api-gateway
./mvnw spring-boot:run

# Démarrer les microservices (exemple : user-service)
cd user-service
./mvnw spring-boot:run

# Lancer le frontend
cd frontend
npm install
ng serve
