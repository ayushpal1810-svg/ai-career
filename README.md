# AI Career Intelligence Platform

An AI-powered career assistant that helps students and developers analyze their skills, projects, and career goals to receive personalized career insights and improvement recommendations.

The platform uses Generative AI to identify strengths, weaknesses, missing skills, and generate a personalized roadmap based on the user's target role.

---

## Live Demo

Frontend:
https://your-vercel-link.vercel.app

Backend:
https://your-render-backend-url.onrender.com

---

# Features

## Authentication

- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected dashboard routes
- Persistent user sessions


## Profile Management

Users can create and manage their career profile:

- Education details
- College information
- Graduation year
- Target role
- GitHub profile
- LinkedIn profile
- Technical skills
- Personal projects


## AI Career Analysis

Using Google Gemini API, the platform provides:

- Career profile analysis
- Strength identification
- Weakness detection
- Missing skill suggestions
- Personalized learning roadmap
- Role-based career guidance


## Dashboard

A centralized dashboard where users can:

- Manage career profile
- Add and remove projects
- Update skills
- Generate AI analysis
- View career recommendations


## Responsive Design

- Desktop-friendly interface
- Mobile responsive layout
- Modern SaaS-style UI

---

# System Architecture

```
                 User

                  |

                  |

          React Frontend

                  |

                  |

          Express REST API

                  |

        ------------------

        |                |

        |                |

     MongoDB        Gemini API

        |

        |

   User/Profile Data
```

---

# Tech Stack

## Frontend

- React.js
- React Router
- Vite
- CSS


## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt


## Database

- MongoDB
- Mongoose ODM


## Artificial Intelligence

- Google Gemini API


## Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

# Project Structure

```
AI-Career

│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── css
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend
│   ├── controllers
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── analyzeController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Profile.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   └── analyzeRoutes.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   └── server.js
```

---

# API Endpoints

## Authentication

### Register User

```
POST /api/auth/register
```

Creates a new user account.


### Login User

```
POST /api/auth/login
```

Authenticates user and returns JWT token.


---

## Profile

### Create Profile

```
POST /api/profile
```

Creates a user's career profile.


### Get Profile

```
GET /api/profile
```

Fetches authenticated user's profile.


### Update Profile

```
PUT /api/profile
```

Updates existing profile information.


---

## AI Analysis

### Generate Career Analysis

```
POST /api/analyze
```

Analyzes user profile using Gemini API and returns:

- Strengths
- Weaknesses
- Missing skills
- Career roadmap

---

# Environment Variables

## Backend

Create a `.env` file inside the backend folder:

```
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

PORT=5000
```


## Frontend

Create a `.env` file inside the frontend folder:

```
VITE_API_URL=your_backend_url
```

---

# Installation

## Clone Repository

```
git clone https://github.com/yourusername/ai-career.git
```

---

## Backend Setup

```
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```
cd frontend

npm install

npm run dev
```

---


# Future Improvements

- Save previous AI analysis history
- Google OAuth authentication
- Resume upload and parsing
- GitHub repository analysis
- Career progress tracking
- More personalized AI recommendations

---

# Learning Outcomes

Implemented:

- Full-stack application architecture
- REST API development
- JWT authentication
- Database modeling
- Third-party AI API integration
- Frontend-backend communication
- Application deployment

---

# Author

Ayush

