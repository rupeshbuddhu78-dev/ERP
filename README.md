# College ERP System

A production-ready, enterprise-grade College ERP (Enterprise Resource Planning) System built with modern web technologies.

## 🎯 Overview

College ERP is a comprehensive management system designed to streamline all aspects of college administration, from student management to payroll, inventory, and more.

## 🏗️ Architecture

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Chart.js** - Data visualization
- **Socket.IO** - Real-time communication

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - File storage
- **Nodemailer** - Email service
- **Redis** - Caching
- **Socket.IO** - Real-time communication

## 📋 Features

### Core Modules
- ✅ Authentication & Authorization
- ✅ Role-Based Access Control (RBAC)
- ✅ User Management (21 unique roles)
- ✅ Student Management
- ✅ Teacher Management
- ✅ Department Management
- ✅ Course Management
- ✅ Attendance Tracking
- ✅ Fee Management
- ✅ Library Management
- ✅ Hostel Management
- ✅ Transport Management
- ✅ Inventory Management
- ✅ HR Management
- ✅ Placement Management
- ✅ Examination Module
- ✅ LMS (Learning Management System)
- ✅ Communication Hub
- ✅ Reports & Analytics

### User Roles (21 Role-Based Dashboards)
1. **Super Admin** - Full system access
2. **College Admin** - Administrative privileges
3. **Principal** - College leadership
4. **Vice Principal** - Academic oversight
5. **Registrar** - Records management
6. **Admission Officer** - Admissions
7. **HOD** - Department head
8. **Teacher** - Academic staff
9. **Assistant Professor** - Teaching staff
10. **Lab Assistant** - Lab support
11. **Student** - Student account
12. **Parent** - Parent/Guardian
13. **Librarian** - Library management
14. **Accountant** - Finance
15. **HR Manager** - Human resources
16. **Hostel Warden** - Hostel management
17. **Transport Manager** - Transport services
18. **Placement Officer** - Placements
19. **Examination Controller** - Exams
20. **Receptionist** - Front desk
21. **Security Guard** - Security

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 5.0
- Redis >= 6.0
- Docker & Docker Compose (optional but recommended)

### Quick Start with Docker

```bash
# Clone repository
git clone https://github.com/rupeshbuddhu78-dev/ERP.git
cd ERP

# Setup environment
cp .env.example .env

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# MongoDB: localhost:27017
# Redis: localhost:6379
```

### Manual Setup

```bash
# Install dependencies
npm install

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
ERP/
├── frontend/                    # React 19 + Vite + TypeScript
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── layouts/             # Layout wrappers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API service layer
│   │   ├── redux/               # Redux store & slices
│   │   │   ├── slices/          # Redux state slices
│   │   │   └── store.ts         # Redux store configuration
│   │   ├── utils/               # Helper functions
│   │   ├── assets/              # Images, icons, fonts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── index.html
│
├── backend/                     # Express.js + TypeScript + MongoDB
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   └── database.ts      # MongoDB connection
│   │   ├── controllers/         # Request handlers
│   │   ├── middleware/          # Express middleware
│   │   │   ├── errorHandler.ts
│   │   │   ├── requestLogger.ts
│   │   │   └── auth.ts
│   │   ├── routes/              # API endpoints
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── student.routes.ts
│   │   │   └── teacher.routes.ts
│   │   ├── models/              # Mongoose schemas
│   │   ├── services/            # Business logic
│   │   ├── validators/          # Input validation (Zod)
│   │   ├── repositories/        # Data access layer
│   │   ├── utils/               # Utility functions
│   │   │   └── logger.ts        # Pino logger
│   │   ├── jobs/                # Scheduled tasks
│   │   ├── sockets/             # Socket.IO events
│   │   ├── logs/                # Log files
│   │   ├── index.ts             # Server entry point
│   │   └── types/               # TypeScript type definitions
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.json
│   ├── .prettierrc.json
│   ├── Dockerfile
│   └── dist/                    # Compiled output
│
├── docker-compose.yml           # Multi-container setup
├── .env.example                 # Environment variables template
├── .gitignore
├── README.md                    # This file
└── package.json                 # Root workspace configuration
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Refresh Tokens** - Long-lived refresh tokens for seamless UX
- **Password Hashing** - Bcrypt password encryption
- **Role-Based Access Control** - Fine-grained permissions
- **CORS Protection** - Cross-Origin Resource Sharing controls
- **Helmet Security Headers** - HTTP security headers
- **Rate Limiting** - Request throttling
- **Input Validation** - Zod schema validation
- **SQL/NoSQL Injection Prevention** - Parameterized queries
- **HTTPS Support** - SSL/TLS encryption
- **Audit Logging** - Complete activity tracking
- **Request Sanitization** - XSS protection

## 📊 Database Collections

```
users                 - User accounts and profiles
roles                 - Role definitions
permissions           - Permission mappings
students              - Student information
teachers              - Teacher/Faculty information
parents               - Parent/Guardian information
employees             - HR employee records
departments           - Department details
courses               - Course offerings
subjects              - Subject information
classes               - Class/Section details
semesters             - Semester information
attendance            - Attendance records
fees                  - Fee structures
payments              - Payment records
library_books         - Book inventory
issued_books          - Book issue/return logs
hostel_rooms          - Room allocations
hostels               - Hostel information
transport             - Transport routes & schedules
routes                - Route details
drivers               - Driver information
vehicles              - Vehicle inventory
inventory             - Asset inventory
vendors               - Vendor information
purchases             - Purchase orders
payrolls              - Payroll records
placements            - Placement information
companies             - Company details
internships           - Internship programs
assignments           - Assignment submissions
study_materials       - Study resource library
results               - Exam results
exams                 - Exam information
marks                 - Grade records
events                - College events
notices               - Official announcements
complaints            - Student complaints
certificates          - Certificate issuance
notifications         - User notifications
audit_logs            - System audit trail
settings              - System configuration
```

## 🔧 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints
```
POST   /auth/register          Register new user
POST   /auth/login             User login
POST   /auth/refresh           Refresh token
POST   /auth/logout            User logout
POST   /auth/forgot-password   Request password reset
POST   /auth/reset-password    Reset password
```

### User Management
```
GET    /users                  List all users
GET    /users/:id              Get user details
POST   /users                  Create new user
PUT    /users/:id              Update user
DELETE /users/:id              Delete user
PATCH  /users/:id/role         Change user role
GET    /users/profile/me       Get logged-in user profile
PUT    /users/profile/me       Update own profile
```

### Student Module
```
GET    /students               List students
GET    /students/:id           Get student details
POST   /students               Create student
PUT    /students/:id           Update student
DELETE /students/:id           Delete student
GET    /students/:id/attendance   Get attendance
GET    /students/:id/fees      Get fee details
GET    /students/:id/results   Get exam results
POST   /students/:id/certificates   Issue certificate
```

### Teacher Module
```
GET    /teachers               List teachers
GET    /teachers/:id           Get teacher details
POST   /teachers               Create teacher
PUT    /teachers/:id           Update teacher
DELETE /teachers/:id           Delete teacher
GET    /teachers/:id/classes   Get assigned classes
POST   /teachers/:id/marks     Submit marks
GET    /teachers/:id/attendance   View attendance
```

### Dashboard & Analytics
```
GET    /dashboard              Get dashboard data
GET    /analytics/students     Student analytics
GET    /analytics/attendance   Attendance analytics
GET    /analytics/fees         Fee analytics
GET    /analytics/results      Result analytics
GET    /reports/generate       Generate reports
```

## 🎨 UI/UX Design

The frontend follows modern design principles inspired by:
- **Linear** - Clean, minimalist interface
- **Vercel** - Smooth animations and transitions
- **Stripe** - Professional color scheme and typography

### Design Features
- Responsive grid layout
- Dark mode support
- Smooth animations
- Accessible components (WCAG 2.1)
- Mobile-first approach
- Consistent spacing and typography

## 🧪 Testing

```bash
# Backend tests
cd backend && npm run test

# Frontend tests
cd frontend && npm run test

# Coverage reports
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📝 Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check

# Type checking
npm run type-check
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up -d
docker-compose logs -f
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📦 Build & Deploy

### Frontend Build
```bash
cd frontend
npm run build
# Output: dist/ folder
```

### Backend Build
```bash
cd backend
npm run build
# Output: dist/ folder
```

### Production Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- Email: support@collegeerp.com
- Issues: [GitHub Issues](https://github.com/rupeshbuddhu78-dev/ERP/issues)
- Discussions: [GitHub Discussions](https://github.com/rupeshbuddhu78-dev/ERP/discussions)

## 🌟 Roadmap

### Phase 1 (Current)
- ✅ Core architecture setup
- ✅ Authentication system
- ✅ Basic CRUD operations
- ✅ Docker support

### Phase 2
- Mobile app (React Native)
- Advanced reporting
- AI-powered analytics
- Multi-language support

### Phase 3
- Biometric integration
- QR code attendance
- RFID support
- Multi-campus management

## 👨‍💻 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| Cache | Redis |
| File Storage | Cloudinary |
| Email | Nodemailer |
| Real-time | Socket.IO |
| Auth | JWT, Bcrypt |
| Validation | Zod |
| Logging | Pino |
| Testing | Vitest |
| CI/CD | GitHub Actions |
| Containerization | Docker |

## 🎓 Acknowledgments

- Built with cutting-edge web technologies
- Inspired by leading SaaS platforms
- Designed for enterprise scalability
- Optimized for performance and security

---

**Made with ❤️ by the College ERP Team**
