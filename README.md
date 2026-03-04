# 🔐 Node.js JWT Authentication API

A clean, production-ready **REST API for user authentication** built with **Node.js, Express, and MySQL**.  
Implements JWT access + refresh token flow with password hashing, input validation, and rate limiting.

---

## ✨ Features

- ✅ User Registration & Login
- ✅ JWT Access Token + Refresh Token flow
- ✅ Password hashing with bcrypt (cost factor 12)
- ✅ Input validation with express-validator
- ✅ Rate limiting to prevent brute-force attacks
- ✅ Protected routes via auth middleware
- ✅ Secure logout (token revocation in DB)
- ✅ Clean MVC folder structure

---

## 🛠 Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Runtime    | Node.js                 |
| Framework  | Express.js              |
| Database   | MySQL (via mysql2)      |
| Auth       | JSON Web Tokens (JWT)   |
| Security   | bcryptjs, rate-limiting |
| Validation | express-validator       |

---

## 📁 Project Structure

```
src/
├── app.js                  # Entry point
├── config/
│   └── db.js               # MySQL connection pool
├── controllers/
│   └── auth.controller.js  # Business logic
├── middleware/
│   └── auth.middleware.js  # JWT verification
├── models/
│   └── user.model.js       # DB queries
├── routes/
│   └── auth.routes.js      # Route definitions
└── utils/
    └── jwt.utils.js        # Token helpers
sql/
└── schema.sql              # Database schema
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/naveen-099/node-jwt-auth-api.git
cd node-jwt-auth-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your DB credentials and JWT secrets
```

### 4. Set up the database
```bash
mysql -u root -p < sql/schema.sql
```

### 5. Start the server
```bash
npm run dev     # development (with nodemon)
npm start       # production
```

---

## 📡 API Endpoints

| Method | Endpoint            | Auth Required | Description              |
|--------|---------------------|:-------------:|--------------------------|
| POST   | `/api/auth/register`| ❌            | Register a new user      |
| POST   | `/api/auth/login`   | ❌            | Login & get tokens       |
| POST   | `/api/auth/refresh` | ❌            | Refresh access token     |
| POST   | `/api/auth/logout`  | ❌            | Revoke refresh token     |
| GET    | `/api/auth/me`      | ✅            | Get current user profile |
| GET    | `/health`           | ❌            | Server health check      |

---

## 📨 Request / Response Examples

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Naveen M",
  "email": "naveen@example.com",
  "password": "securePass123"
}
```
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci...",
    "user": { "id": 1, "name": "Naveen M", "email": "naveen@example.com" }
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "naveen@example.com",
  "password": "securePass123"
}
```

### Access Protected Route
```http
GET /api/auth/me
Authorization: Bearer <accessToken>
```

---

## 🔒 Security Highlights

- Passwords are hashed using **bcrypt** with cost factor 12
- Access tokens expire in **7 days**, refresh tokens in **30 days**
- Refresh tokens are stored in DB and invalidated on logout
- Rate limiting: **20 requests / 15 min** per IP on auth routes
- Input sanitization on all endpoints

---

## 📄 License

MIT © [Naveen M](https://naveil.com)
