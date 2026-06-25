# Career Companion — Full Stack Job Tracker

> **DecodeLabs Industrial Training Kit | Batch 2026**
> A complete Full Stack project covering Projects 1, 2, 3, and 4.

A production-ready **Full Stack Job Application Tracker** built with Node.js, Express.js, MongoDB Atlas, and vanilla HTML/CSS/JavaScript. Track every job application, update statuses, and view your progress — all from one beautiful dashboard.

---

## 🚀 Live Demo

- **Frontend + Backend:** `http://localhost:5000` (local)
- **Backend API:** `http://localhost:5000/api`

---

## 📁 Project Structure

```
career-companion-backend/
├── public/                        # Frontend (Project 1 + 4)
│   ├── index.html                 # Login & Register page
│   ├── dashboard.html             # Job tracker dashboard
│   ├── style.css                  # Responsive styles (DecodeLabs colors)
│   ├── auth.js                    # Login/Register → API connection
│   └── dashboard.js               # Jobs CRUD → API connection
├── config/
│   └── db.js                      # MongoDB Atlas connection
├── controllers/
│   ├── authController.js          # Register / Login / Get current user
│   ├── profileController.js       # Create / Get / Update profile
│   ├── jobController.js           # Job application CRUD
│   └── dashboardController.js     # Analytics aggregation
├── middleware/
│   ├── authMiddleware.js          # JWT verification
│   ├── errorMiddleware.js         # Error handler
│   ├── validateRequest.js         # Validation processor
│   └── validators/
│       ├── authValidator.js
│       ├── profileValidator.js
│       └── jobValidator.js
├── models/
│   ├── User.js                    # User schema
│   ├── Profile.js                 # Career profile schema
│   └── Job.js                     # Job application schema
├── routes/
│   ├── authRoutes.js
│   ├── profileRoutes.js
│   ├── jobRoutes.js
│   └── dashboardRoutes.js
├── utils/
│   ├── generateToken.js
│   └── asyncHandler.js
├── .env.example
├── .gitignore
├── package.json
├── render.yaml
├── postman_collection.json
└── server.js
```

---

## 🎯 Projects Completed

| Project | Title | Skills |
|---------|-------|--------|
| ✅ P1 | Responsive Frontend Interface | HTML5, CSS3, JavaScript, Mobile-First Design |
| ✅ P2 | Backend API Development | Node.js, Express.js, REST API, JWT Auth |
| ✅ P3 | Database Integration | MongoDB Atlas, Mongoose, CRUD Operations |
| ✅ P4 | Frontend & Backend Integration | fetch() API, async/await, CORS, DOM Manipulation |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Security | Helmet, CORS, Rate Limiting, Mongo Sanitize |
| Validation | express-validator |
| Logging | morgan |

---

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account (free tier)

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/sadiya-siddiqui/career-companion.git
cd career-companion
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file:**
```bash
cp .env.example .env
```

**4. Fill in your `.env`:**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/career-companion?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_key
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

**5. Run the server:**
```bash
npm start
```

**6. Open in browser:**
```
http://localhost:5000
```

---

## 🌐 Full Stack Flow

```
Browser (localhost:5000)
    ↓  HTML/CSS/JS (public folder)
    ↓  fetch() API calls
Express Server (Port 5000)
    ↓  JWT Auth Middleware
    ↓  Controllers + Validators
MongoDB Atlas (Cloud Database)
    ↓  JSON Response
Browser (DOM Updated Dynamically)
```

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB Atlas URI | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `long_random_string` |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `CLIENT_ORIGIN` | Allowed CORS origin | `http://localhost:5000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `900000` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

> ⚠️ Never commit your `.env` file — it's in `.gitignore`

---

## 📡 API Endpoints

All endpoints prefixed with `/api`. Protected routes require `Authorization: Bearer <token>`.

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |

### Jobs
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/jobs` | Private | Add job application |
| GET | `/api/jobs` | Private | Get all jobs |
| GET | `/api/jobs/:id` | Private | Get single job |
| PUT | `/api/jobs/:id` | Private | Update job |
| PATCH | `/api/jobs/:id/status` | Private | Update job status |
| DELETE | `/api/jobs/:id` | Private | Delete job |

### Profile
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/profile` | Private | Create profile |
| GET | `/api/profile` | Private | Get profile |
| PUT | `/api/profile` | Private | Update profile |

### Dashboard & Health
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/dashboard` | Private | Get analytics |
| GET | `/api/health` | Public | Health check |

---

## 🔒 Security Features

- ✅ Password hashing with **bcrypt** (10 salt rounds)
- ✅ **JWT** stateless authentication
- ✅ **Helmet** secure HTTP headers
- ✅ **CORS** origin restriction
- ✅ **Rate limiting** (brute-force protection)
- ✅ **NoSQL injection** sanitization
- ✅ Data isolation per user (`req.user._id`)

---

## 🧪 Testing with Postman

1. Import `postman_collection.json` into Postman
2. Run **Register User** → token auto-saved
3. Test all other endpoints — token auto-attached

---

## 🚀 Deployment on Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check:** `/api/health`
5. Add environment variables in Render dashboard
6. Deploy! 🎉

---

## 👩‍💻 Developer

**Sadiya Siddiqui**
DecodeLabs Intern | Batch 2026

[![GitHub](https://img.shields.io/badge/GitHub-sadiya--siddiqui-black?logo=github)](https://github.com/sadiya-siddiqui)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sadiya%20Siddiqui-blue?logo=linkedin)](https://www.linkedin.com/in/sadiya-siddiqui-631982335/)

---

## 📄 License

MIT
