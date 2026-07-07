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
- ✅ User Management
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

### User Roles
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

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rupeshbuddhu78-dev/ERP.git
cd ERP
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start with Docker (Recommended)**
```bash
docker-compose up -d
```

Or **Start development servers**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

## 📁 Project Structure

```
ERP/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── redux/           # Redux store & slices
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Static assets
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── models/          # MongoDB models
│   │   ├── services/        # Business logic
│   │   ├── validators/      # Input validation
│   │   ├── repositories/    # Data access layer
│   │   ├── utils/           # Utility functions
│   │   ├── jobs/            # Scheduled jobs
│   │   ├── sockets/         # Socket.IO events
│   │   └── logs/            # Logging
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml        # Docker Compose configuration
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🔐 Security Features

- JWT-based authentication with refresh tokens
- Bcrypt password hashing
- Role-based access control (RBAC)
- CORS protection
- Helmet for security headers
- Rate limiting
- Input validation with Zod
- SQL/NoSQL injection prevention
- HTTPS support
- Audit logging

## 📊 Database Schema

### Collections
- `users` - User accounts with roles
- `students` - Student information
- `teachers` - Teacher information
- `parents` - Parent/Guardian information
- `employees` - Employee information
- `departments` - Department details
- `courses` - Course information
- `subjects` - Subject details
- `classes` - Class information
- `semesters` - Semester details
- `attendance` - Attendance records
- `fees` - Fee information
- `payments` - Payment records
- `library_books` - Book inventory
- `issued_books` - Book issue records
- `hostel_rooms` - Room information
- `hostels` - Hostel details
- `transport` - Transport information
- `routes` - Transport routes
- `drivers` - Driver information
- `vehicles` - Vehicle information
- `inventory` - Inventory items
- `vendors` - Vendor information
- `purchases` - Purchase orders
- `payrolls` - Payroll records
- `placements` - Placement records
- `companies` - Company information
- `internships` - Internship programs
- `assignments` - Assignments
- `study_materials` - Study materials
- `results` - Exam results
- `exams` - Exam information
- `marks` - Mark records
- `events` - Events and activities
- `notices` - Notices and announcements
- `complaints` - Student complaints
- `certificates` - Certificates
- `notifications` - User notifications
- `audit_logs` - Audit trail
- `settings` - System settings

## 🔧 API Documentation

API documentation is available at `/api-docs` when the server is running.

### Authentication Endpoints
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - User login
POST   /api/auth/refresh       - Refresh token
POST   /api/auth/logout        - User logout
```

### User Endpoints
```
GET    /api/users              - List users
GET    /api/users/:id          - Get user details
POST   /api/users              - Create user
PUT    /api/users/:id          - Update user
DELETE /api/users/:id          - Delete user
```

### Student Endpoints
```
GET    /api/students           - List students
GET    /api/students/:id       - Get student details
POST   /api/students           - Create student
PUT    /api/students/:id       - Update student
DELETE /api/students/:id       - Delete student
```

## 🐳 Docker Deployment

### Build Images
```bash
docker-compose build
```

### Start Services
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

## 📦 Production Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ folder to CDN or static hosting
```

### Backend
```bash
cd backend
npm run build
# Deploy dist/ folder to server
```

### Environment Setup
1. Configure environment variables for production
2. Setup MongoDB Atlas or self-hosted MongoDB
3. Configure Redis
4. Setup Cloudinary account
5. Configure SMTP for email
6. Setup SSL certificates
7. Configure domain and DNS

## 🧪 Testing

```bash
# Backend tests
cd backend && npm run test

# Frontend tests
cd frontend && npm run test

# Coverage reports
cd backend && npm run test:coverage
```

## 📝 Code Quality

```bash
# Linting
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Support

For support, email support@collegeerp.com or open an issue in the repository.

## 🌟 Acknowledgments

- Built with modern web technologies
- Inspired by platforms like Linear, Vercel, and Stripe
- Designed for scalability and performance
