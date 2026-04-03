# 🏋️ Fitness Microservices

A production-grade full-stack fitness tracking application built with Spring Boot Microservices architecture, featuring AI-powered workout recommendations via Google Gemini.

## 🏗️ Architecture

```
Client → API Gateway → Eureka (Service Discovery)
                    ↓
         ┌──────────────────────────┐
         │                          │
    User Service            Activity Service
    (PostgreSQL + JPA)      (MongoDB + Kafka Producer)
                                    ↓
                              AI Service
                       (Kafka Consumer + Gemini AI)
```

## ⚙️ Services

| Service | Tech Stack | Port |
|---------|-----------|------|
| API Gateway | Spring Cloud Gateway + Keycloak JWT | 8080 |
| User Service | Spring Boot + PostgreSQL + JPA | 8081 |
| Activity Service | Spring Boot + MongoDB + Kafka | 8082 |
| AI Service | Spring Boot + MongoDB + Gemini AI | 8083 |
| Config Server | Spring Cloud Config | 8888 |
| Eureka | Netflix Eureka | 8761 |

## 🎨 Frontend

- React + Redux Toolkit
- Material UI (MUI)
- Keycloak OAuth2 + PKCE Authentication
- Activity tracking dashboard
- AI-powered recommendations UI

## 🔐 Security

- Keycloak OAuth2 authentication
- JWT token validation at Gateway level
- Auto user sync filter (first time login auto-registers user)
- CORS configuration for frontend

## 🤖 AI Feature

Every workout is automatically analyzed by **Gemini AI**:

- ✅ Overall performance analysis
- ✅ Improvement suggestions
- ✅ Next workout recommendations
- ✅ Safety guidelines

All processing happens **async via Apache Kafka** — zero wait time for the user!

## 🛠️ Tech Stack

**Backend:**
- Java + Spring Boot
- Spring Cloud Gateway
- Spring Cloud Config Server
- Netflix Eureka (Service Discovery)
- Apache Kafka (Event-Driven Architecture)
- PostgreSQL + MongoDB (Polyglot Persistence)
- Keycloak (OAuth2 + JWT)
- Google Gemini AI
- Docker

**Frontend:**
- React + Redux Toolkit
- Material UI
- React Router
- Keycloak PKCE Authentication

**Testing:**
- Postman (API Testing)

## 🔄 How It Works

1. User logs in via **Keycloak** (OAuth2 PKCE)
2. Request hits **API Gateway** — JWT validated, user auto-synced
3. User logs a fitness activity (Running, Cycling, Yoga, etc.)
4. **Activity Service** saves activity → publishes event to **Kafka**
5. **AI Service** consumes Kafka event → sends to **Gemini AI**
6. Gemini analyzes workout → recommendations saved to **MongoDB**
7. User views personalized AI recommendations on dashboard

## 🐳 Running Locally

```bash
# 1. Start Keycloak
docker run -p 8181:8080 keycloak/keycloak start-dev

# 2. Start Kafka + Zookeeper
docker-compose up -d

# 3. Start services in this order:
#    Config Server → Eureka → User Service → Activity Service → AI Service → Gateway

# 4. Start Frontend
cd fitness-frontend
npm install
npm run dev
```

## 🧠 What I Learned

- Building loosely coupled services with Kafka
- JWT flow from Keycloak → Gateway → every service
- Debugging distributed systems across 5+ services
- Docker networking and containerization
- Polyglot persistence (PostgreSQL + MongoDB together)
- Integrating external AI APIs in microservices

## 📂 Project Structure

```
fitness-microservices/
├── activityservice/
├── aiservice/
├── configserver/
├── eureka/
├── fitness-frontend/
├── gateway/
└── userservice/
```

## 👨‍💻 Author

**Ritik Raj**
- GitHub: [@Mrritikgupta](https://github.com/Mrritikgupta)
- LinkedIn: [Ritik Raj](https://linkedin.com/in/ritik-raj-8111b5349)
