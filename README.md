<div align="center">

<h1>🧑‍💼 EmpManager — Employee Management System</h1>

<p>A full-stack <strong>B.Tech Mini Project</strong> built with Spring Boot, React, and MySQL.<br/>
Complete CRUD operations, JWT-style session authentication, dark/light mode, and a premium glassmorphism UI.</p>

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://www.java.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Database Setup](#1-database-setup-mysql)
  - [2. Backend Setup](#2-backend-setup-spring-boot)
  - [3. Frontend Setup](#3-frontend-setup-react--vite)
- [Login Credentials](#-login-credentials)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Layered Architecture](#-layered-architecture)
- [Author](#-author)

---

## 🔍 Overview

**EmpManager** is a full-stack Employee Management System developed as a **2nd Year B.Tech Mini Project**. It demonstrates end-to-end web development using a Spring Boot REST API backend connected to a MySQL database, and a modern React frontend with a premium dark/light mode UI.

Users can log in, then create, read, update, and delete employee records through a polished dashboard interface.

---

## ✨ Features

### 🔐 Authentication
- Login page with credential validation
- Session persisted in `localStorage` (survives page refresh)
- Protected routes — unauthenticated users are redirected to `/login`
- Auto-redirect logged-in users away from login page
- Per-user role display (Administrator / HR Manager)
- Logout button with instant session clear

### 📊 Dashboard
- Time-based greeting (Good morning / afternoon / evening)
- Live stat cards: Total Employees, Average Salary, Average Age, Cities Covered
- Salary mini-bar visualization for each employee
- Clickable "View all" link to employee list
- Skeleton loading states

### 👥 Employees Page
- Full employee table with avatar initials (gradient-colored per name)
- Inline Edit and Delete per row
- Real-time search by name, city, or ID
- Animated row entrance effects

### ✏️ Add / Edit Modal
- Shared form for both create and update operations
- Client-side validation with inline error toasts
- Spinner loading state on submit

### 🌗 Dark / Light Mode
- Animated sliding toggle in navbar
- Auto-detects system theme on first visit
- Choice persisted in `localStorage`
- Smooth 350ms transition across all elements

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, React Router DOM, Axios |
| **Styling** | Vanilla CSS with CSS Custom Properties (no framework) |
| **UI Library** | Lucide React (icons), React Hot Toast (notifications) |
| **Backend** | Spring Boot 4.1 (Spring Web MVC, Spring Data JPA) |
| **Database** | MySQL 8.0 via Hibernate ORM |
| **Build Tool** | Maven (Spring Boot Maven Plugin) |
| **Language** | Java 21, JavaScript (ES2024) |

---

## 📁 Project Structure

```
EmployeeCRUD/
│
├── EmployeeCRUD/                  ← Spring Boot Backend
│   ├── src/main/java/com/EmployeeCRUD/
│   │   ├── config/
│   │   │   └── CorsConfig.java           # CORS — allows frontend on port 5173
│   │   ├── controller/
│   │   │   └── EmployeeController.java   # REST endpoints (/api/employees)
│   │   ├── entity/
│   │   │   └── Employee.java             # JPA entity (emp_id, name, salary, age, city)
│   │   ├── repository/
│   │   │   └── EmployeeRepository.java   # Spring Data JPA repository
│   │   ├── service/
│   │   │   ├── EmployeeService.java      # Service interface
│   │   │   └── EmployeeServiceImpl.java  # Business logic implementation
│   │   └── EmployeeCrudApplication.java  # Main entry point
│   └── src/main/resources/
│       └── application.properties        # DB config, Hibernate DDL
│
└── frontend/                      ← React + Vite Frontend
    └── src/
        ├── api/
        │   └── employeeApi.js            # Axios API calls (CRUD)
        ├── components/
        │   ├── EmployeeForm.jsx          # Add/Edit modal form
        │   ├── Navbar.jsx                # Sticky navbar with theme toggle + user
        │   └── ProtectedRoute.jsx        # Route guard for auth
        ├── context/
        │   ├── AuthContext.jsx           # Auth state (login, logout, session)
        │   └── ThemeContext.jsx          # Dark/light mode state
        ├── pages/
        │   ├── Dashboard.jsx             # Stats + recent employees
        │   ├── EmployeeList.jsx          # Full CRUD table
        │   └── Login.jsx                 # Split-panel login page
        ├── styles/
        │   ├── global.css                # Design system (CSS vars, dark+light themes)
        │   ├── Navbar.css
        │   ├── Dashboard.css
        │   ├── EmployeeList.css
        │   ├── EmployeeForm.css
        │   └── Login.css
        └── App.jsx                       # Router + provider tree
```

---

## ✅ Prerequisites

Make sure you have all of these installed before proceeding:

| Tool | Version | Download |
|---|---|---|
| **Java JDK** | 21+ | https://adoptium.net/ |
| **Maven** | 3.9+ (or use the bundled `mvnw`) | https://maven.apache.org/ |
| **MySQL** | 8.0+ | https://dev.mysql.com/downloads/ |
| **Node.js** | 18+ | https://nodejs.org/ |
| **npm** | 9+ (comes with Node) | — |

---

## 🚀 Getting Started

### 1. Database Setup (MySQL)

Open MySQL Workbench or any MySQL client and run:

```sql
CREATE DATABASE Employee;
```

> ⚠️ The database name must be exactly `Employee` (capital E) to match `application.properties`.

---

### 2. Backend Setup (Spring Boot)

#### 2a. Configure database credentials

Open `EmployeeCRUD/src/main/resources/application.properties` and update if needed:

```properties
spring.application.name=EmployeeCRUD

spring.datasource.url=jdbc:mysql://localhost:3306/Employee
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

#### 2b. Run the backend

```bash
# Navigate to the backend folder
cd EmployeeCRUD/EmployeeCRUD

# Run using the Maven wrapper (no separate Maven install needed)
./mvnw spring-boot:run          # Linux / macOS
.\mvnw.cmd spring-boot:run      # Windows PowerShell
```

✅ Backend starts at → **`http://localhost:8080`**

Look for this line in the console:
```
Started EmployeeCrudApplication in X.XXX seconds
```

> 💡 Hibernate will automatically create the `employee` table in your `Employee` database on first run (`ddl-auto=update`).

---

### 3. Frontend Setup (React + Vite)

```bash
# Navigate to the frontend folder
cd EmployeeCRUD/frontend

# Install dependencies (only needed once)
npm install

# Start the development server
npm run dev
```

✅ Frontend starts at → **`http://localhost:5173`**

> ⚠️ Make sure the backend is running **before** opening the frontend, otherwise API calls will fail.

---

## 🔑 Login Credentials

| Role | Username | Password |
|---|---|---|
| **Administrator** | `admin` | `admin123` |
| **HR Manager** | `adarsh` | `adarsh@1306` |

> These are frontend-only credentials stored in `AuthContext.jsx`. In a production system, authentication would be handled by Spring Security with JWT tokens on the backend.

---

## 📡 API Reference

**Base URL:** `http://localhost:8080/api`

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET` | `/employees` | Get all employees | — |
| `GET` | `/employees/{id}` | Get employee by ID | — |
| `POST` | `/employees` | Create new employee | JSON body |
| `PUT` | `/employees/{id}` | Update employee by ID | JSON body |
| `DELETE` | `/employees/{id}` | Delete employee by ID | — |
| `DELETE` | `/employees` | Delete all employees | — |

### Request / Response Example

**POST `/api/employees`**

```json
// Request Body
{
  "emp_name": "Adarsh Kumar",
  "emp_salary": 50000.0,
  "age": 22,
  "emp_city": "Mumbai"
}

// Response (201 Created)
{
  "emp_id": 1,
  "emp_name": "Adarsh Kumar",
  "emp_salary": 50000.0,
  "age": 22,
  "emp_city": "Mumbai"
}
```

**PUT `/api/employees/1`** — Same body, returns updated object with `200 OK`

**DELETE `/api/employees/1`** — Returns `"Employee deleted successfully with id: 1"` with `200 OK`

---

## 🖼 Screenshots

| Page | Light Mode | Dark Mode |
|---|---|---|
| **Login** | Split-panel with gradient branding | Adapts with dark form panel |
| **Dashboard** | Stats cards + recent table | Deep navy with purple accents |
| **Employees** | Clean white table | Glassmorphism dark table |
| **Add Modal** | White card with form | Dark modal with gradient header |

---

## 🏗 Layered Architecture

```
┌──────────────────────────────────────┐
│          React Frontend              │
│  (Vite · React Router · Axios)       │
│       http://localhost:5173          │
└──────────────┬───────────────────────┘
               │ HTTP (REST/JSON)
               │ CORS allowed on /api/**
┌──────────────▼───────────────────────┐
│        Spring Boot Backend           │
│                                      │
│  ┌──────────┐   ┌────────────────┐   │
│  │Controller│──▶│  Service Layer │   │
│  │ /api/**  │   │EmployeeService │   │
│  └──────────┘   └───────┬────────┘   │
│                         │            │
│                 ┌───────▼────────┐   │
│                 │  Repository    │   │
│                 │  JpaRepository │   │
│                 └───────┬────────┘   │
│                         │ Hibernate  │
└─────────────────────────┼────────────┘
                          │
              ┌───────────▼──────────┐
              │      MySQL 8.0       │
              │   Database: Employee │
              │   Table:   employee  │
              └──────────────────────┘
```

---

## 👤 Author

**Adarsh** — B.Tech 2nd Year Mini Project

- Backend: **Java 21 + Spring Boot 4.1 + MySQL 8**
- Frontend: **React 19 + Vite 8 + Vanilla CSS**

---

<div align="center">
  <sub>Built with ❤️ as a B.Tech Mini Project · 2026</sub>
</div>
