# 📚 Smart Internship Management Platform

An intelligent internship management platform, facilitating communication between students, HR, supervisors, and administrators.

## 🔗 Table of Contents

- [Project Overview](#aperçu-du-projet)
- [Architecture](#architecture)
- [Main Features](#fonctionnalités-principales)
- [Completed Sprints](#sprints-réalisés)
- [Technologies Used](#technologies-utilisées)
- [Project Launch](#lancement-du-projet)


---

## 🧩 Project Overview

This project aims to digitize the internship management process in companies. It allows HR to publish offers, students to apply, supervisors to monitor interns, and all stakeholders to efficiently plan their meetings.

## 🏗️ Architecture

The project is based on a microservices architecture, integrated via:
- **API Gateway** (Spring Cloud Gateway)
- **Eureka Server** for service discovery

Each microservice is independent, which promotes system scalability and maintainability.

### 📐  Developed Modules

- **User Management**
- **Internship Offer Management**
- **Application Management**
- **Gestion des quiz**
- **Quiz Management**
- **Evaluations**
- **Projects & Tasks**
- **Documents**
- **Appointments / Interviews**
- **Complaints**

## 🚀 Main Features

- 🔐 Authentication and authorization (with JWT)
- 📄 Offer publishing and management
- 📝 Application submission and tracking
- 📅 Appointment scheduling (HR ↔ Students / Supervisors ↔ Interns)
- 🧠 Interactive quizzes for candidates
- 📊 Intern evaluation
- 📁 Document management (CVs, agreements, reports)
- 📞 Notifications and video calls (via ZegoCloud)
- 🗣️ Complaint system

## 📅 Completed Sprints

### ✅ Sprint 1: Initialization and Basic Features

- Architecture setup
- JWT Authentication
- User Management
- Internship Offer Management
- Document Management

### ✅ Sprint 2 : Addition of Functional Modules

- Quiz Module
- HR / Student Appointment Module
- Application Management
- Candidate Evaluation
- Intern Project and Task Management

### ✅ Sprint 3 : Artificial Intelligence (AI)

- ⚙️ **Prediction** : Use of XGBoost model to predict if an application will be accepted or not
- 🧠 **Recommandation** : Offer recommendation system based on similarity (TF-IDF + Cosine Similarity)
- 🔬 **Clustering** : Grouping candidate profiles using K-Means
- 🌐 **Model Deployment** Model Deployment via Flask (REST API)
- ✅ **Test via Postman** & integration with the platform (frontend/backend)

> 💡 **Note** : Technical integration via API Gateway & Eureka was completed in sprints 1 and 2. Sprint 3 was exclusively dedicated to the addition of intelligent modules based on Machine Learning.

## 🛠️ Technologies Used

- **Frontend** : Angular
- **Backend** : Spring Boot, Spring Cloud
- **API Gateway** : Spring Cloud Gateway
- **Service Discovery** : Eureka
- **Database** : MySQL
- **Communication** : REST APIs
- **Notifications** : WebSocket / Firebase
- **Appels vidéo** : ZegoCloud API

## ⚙️ Project Launch

```bash
# run Eureka
cd eureka-server
./mvnw spring-boot:run

# run API Gateway
cd api-gateway
./mvnw spring-boot:run

# run Microservices (example : user-service)
cd user-service
./mvnw spring-boot:run

# run Frontend
cd frontend
npm install
ng serve
