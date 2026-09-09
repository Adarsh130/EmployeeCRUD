# 📋 Employee CRUD Project — Full Explanation for Teacher

> **Student:** Adarsh Kumar
> **Project:** Employee Management System (Full-Stack Web Application)

---

## 🧐 What Does This Project Do?

This is a **Full-Stack Employee Management System**. It allows a user to:

- **Add** a new employee
- **View** all employees
- **Edit** an existing employee's details
- **Delete** one or all employees
- **Login** with a username & password before accessing any data

Think of it like a simple HR software where you manage a list of employees stored in a database.

---

## 🏗️ How Is the Project Structured?

The project has **two separate parts** that work together:

```
EmployeeCRUD/
│
├── src/                  ← BACKEND (Java / Spring Boot)
│   └── main/
│       ├── java/com/EmployeeCRUD/
│       │   ├── EmployeeCrudApplication.java   ← Entry point (main class)
│       │   ├── entity/Employee.java           ← Employee data model
│       │   ├── repository/EmployeeRepository  ← Database access
│       │   ├── service/EmployeeService.java   ← Business logic (interface)
│       │   ├── service/EmployeeServiceImpl.java ← Business logic (actual code)
│       │   ├── controller/EmployeeController  ← Handles HTTP API requests
│       │   └── config/CorsConfig.java         ← Allows frontend to talk to backend
│       └── resources/
│           └── application.properties        ← Database configuration
│
└── frontend/             ← FRONTEND (React + Vite)
    └── src/
        ├── App.jsx                ← Main app + routing
        ├── pages/
        │   ├── Login.jsx          ← Login page
        │   ├── Dashboard.jsx      ← Stats / summary page
        │   └── EmployeeList.jsx   ← View/Add/Edit/Delete employees
        ├── components/
        │   ├── Navbar.jsx         ← Top navigation bar
        │   ├── EmployeeForm.jsx   ← Form to add/edit an employee
        │   └── ProtectedRoute.jsx ← Blocks access if not logged in
        ├── api/
        │   └── employeeApi.js     ← All HTTP calls to the backend
        └── context/
            ├── AuthContext.jsx    ← Login/logout state management
            └── ThemeContext.jsx   ← Dark/Light mode management
```

---

## 🧰 Technology Stack

### Backend (Server Side)

| Technology | What It Does |
|---|---|
| **Java 21** | Programming language used for the backend |
| **Spring Boot 4.1.0** | Framework that makes it easy to build Java web apps |
| **Spring Data JPA** | Automatically handles database queries (no SQL needed) |
| **Spring Web MVC** | Handles incoming HTTP requests (GET, POST, PUT, DELETE) |
| **Hibernate** | Maps Java classes to database tables automatically |
| **MySQL** | Relational database where employee data is stored |
| **Lombok** | Library that reduces boilerplate code (auto-generates getters/setters) |
| **Maven** | Build tool — manages dependencies and builds the project |

### Frontend (Client Side / Browser)

| Technology | What It Does |
|---|---|
| **React (JSX)** | JavaScript library for building the user interface |
| **Vite** | Development server and build tool (very fast) |
| **TypeScript** | Type-safe JavaScript (used alongside JSX) |
| **Axios** | Makes HTTP requests from the browser to the backend |
| **React Router DOM** | Handles navigation between pages (Login, Dashboard, Employee List) |
| **React Hot Toast** | Shows pop-up notifications (success/error messages) |
| **Lucide React** | Icon library used throughout the UI |
| **Vanilla CSS** | Custom styling — no CSS framework like Bootstrap used |

---

## 🗄️ Database Design

**Database Name:** `Employee`
**Table Name:** `employee` (auto-created by Hibernate)

| Column | Data Type | Description |
|---|---|---|
| `emp_id` | INT (Auto Increment) | Unique ID for each employee (Primary Key) |
| `emp_name` | VARCHAR | Employee's full name |
| `emp_salary` | FLOAT | Employee's salary |
| `emp_age` | INT | Employee's age |
| `emp_city` | VARCHAR | City where the employee lives |

> **How is the table created?**
> We set `spring.jpa.hibernate.ddl-auto=update` in `application.properties`.
> This means Spring Boot **automatically creates/updates** the table when the app starts — we do not have to write SQL manually!

---

## 🔗 Backend Architecture (Layer by Layer)

The backend follows the **3-Layer Architecture** pattern:

```
Browser / Frontend
       ↓  HTTP Request
  [ Controller Layer ]   ← Receives requests, sends responses
       ↓
  [ Service Layer ]      ← Contains business logic
       ↓
  [ Repository Layer ]   ← Talks to the database
       ↓
  [ MySQL Database ]
```

### 1️⃣ Entity Layer — Employee.java

This Java class represents **one row** in the employee database table.

```java
@Entity                    // Tells Spring "this is a database table"
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer emp_id;   // Auto-increment primary key

    private String emp_name;
    private Float emp_salary;
    private int age;
    private String emp_city;
    // + getters and setters
}
```

### 2️⃣ Repository Layer — EmployeeRepository

This **interface** extends `JpaRepository`. We do not write any SQL — Spring Data JPA provides all basic database methods automatically:

- `save()` — Insert or update a record
- `findAll()` — Get all records
- `findById()` — Get one record by ID
- `deleteById()` — Delete one record by ID
- `deleteAll()` — Delete all records

### 3️⃣ Service Layer — EmployeeService.java + EmployeeServiceImpl.java

- **`EmployeeService.java`** is an **Interface** — it just declares what methods exist.
- **`EmployeeServiceImpl.java`** is the **actual implementation** — it contains the code.

This separation is a good design practice (Dependency Inversion Principle).

### 4️⃣ Controller Layer — EmployeeController.java

This is the **entry point for all API requests**. It listens on `/api` and calls the service layer.

---

## 🌐 REST API Endpoints

The backend exposes these **6 API endpoints**. All are under the base path `/api`.

| Method | URL | What It Does | Response |
|---|---|---|---|
| `POST` | `/api/employees` | Add a new employee | `201 Created` + employee object |
| `GET` | `/api/employees` | Get all employees | `200 OK` + list of employees |
| `GET` | `/api/employees/{id}` | Get one employee by ID | `200 OK` or `404 Not Found` |
| `PUT` | `/api/employees/{id}` | Update employee by ID | `200 OK` or `404 Not Found` |
| `DELETE` | `/api/employees/{id}` | Delete one employee by ID | `200 OK` or `404 Not Found` |
| `DELETE` | `/api/employees` | Delete ALL employees | `200 OK` |

### Example — Creating an Employee

**Request** (POST /api/employees):
```json
{
  "emp_name": "Adarsh Kumar",
  "emp_salary": 50000.0,
  "age": 21,
  "emp_city": "Delhi"
}
```

**Response** (201 Created):
```json
{
  "emp_id": 1,
  "emp_name": "Adarsh Kumar",
  "emp_salary": 50000.0,
  "age": 21,
  "emp_city": "Delhi"
}
```

---

## 🔒 CORS Configuration — CorsConfig.java

**CORS** stands for Cross-Origin Resource Sharing.

**Problem:** The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:8080`. By default, browsers **block** requests between different ports for security reasons.

**Solution:** We configure CORS in the backend to allow the frontend to communicate:

```java
registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:5173")   // Allow frontend address
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
```

---

## 🎨 Frontend Architecture

### Pages

| Page | What It Shows |
|---|---|
| `Login.jsx` | Login form with username and password |
| `Dashboard.jsx` | Summary stats (total employees, avg salary, etc.) |
| `EmployeeList.jsx` | Table of all employees with Add / Edit / Delete buttons |

### Components

| Component | Purpose |
|---|---|
| `Navbar.jsx` | Top bar with navigation links and logout button |
| `EmployeeForm.jsx` | Reusable form used for both Add and Edit operations |
| `ProtectedRoute.jsx` | Redirects to /login if the user is not authenticated |

### Context (Global State)

| Context | Purpose |
|---|---|
| `AuthContext.jsx` | Stores login/logout state; checks credentials |
| `ThemeContext.jsx` | Manages Dark / Light mode across the whole app |

### API Calls — employeeApi.js

The frontend uses **Axios** to communicate with the backend. All API calls are centralized in one file:

```javascript
const BASE_URL = 'http://localhost:8080/api';

export const getAllEmployees     = ()         => api.get('/employees');
export const getEmployeeById    = (id)       => api.get(`/employees/${id}`);
export const createEmployee     = (data)     => api.post('/employees', data);
export const updateEmployee     = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee     = (id)       => api.delete(`/employees/${id}`);
export const deleteAllEmployees = ()         => api.delete('/employees');
```

---

## 🔐 Login System

The project has a **frontend-only login** using hardcoded credentials (suitable for a demo / mini project):

| Username | Password | Role |
|---|---|---|
| `admin` | `admin123` | Administrator |
| `adarsh` | `adarsh@1306` | HR Manager |

- On login, the user data is saved to **localStorage** (browser storage) so the session persists even after refreshing the page.
- `ProtectedRoute.jsx` ensures that pages like Dashboard and Employee List are **not accessible** without logging in.

> **Note for Teacher:** In a real production application, login credentials would be verified against the backend database, and a JWT token would be used for session management.

---

## 🔄 How the Full Flow Works (Step by Step)

```
1. User opens browser → http://localhost:5173
2. They are redirected to /login (ProtectedRoute checks auth)
3. User enters username & password → AuthContext validates credentials
4. On success → redirected to Dashboard
5. User clicks "Employees" → EmployeeList page loads
6. React calls getAllEmployees() → Axios sends GET http://localhost:8080/api/employees
7. Spring Boot receives the request → Controller → Service → Repository → MySQL
8. MySQL returns data → Repository → Service → Controller → JSON response sent back
9. React receives JSON → displays employee list in a table
10. User clicks "Add" → EmployeeForm appears
11. User fills form and submits → createEmployee() → POST to backend
12. Backend saves to MySQL → returns the new employee
13. Frontend shows success toast and refreshes the list
```

---

## ⚙️ How to Run the Project

### Step 1 — Start the Backend

1. Open the `EmployeeCRUD` folder in IntelliJ IDEA or Eclipse
2. Make sure MySQL is running and the `Employee` database exists
3. Update `application.properties` with your MySQL password
4. Run `EmployeeCrudApplication.java`
5. Backend starts at: `http://localhost:8080`

### Step 2 — Start the Frontend

Open a terminal in the `frontend/` folder and run:

```bash
npm install       # Install dependencies (first time only)
npm run dev       # Start the development server
```

Frontend starts at: `http://localhost:5173`

---

## 📁 Key Files Summary

| File | Layer | Purpose |
|---|---|---|
| `pom.xml` | Config | Lists all Java dependencies |
| `application.properties` | Config | Database connection settings |
| `Employee.java` | Backend | Database table model |
| `EmployeeRepository.java` | Backend | Database access (CRUD operations) |
| `EmployeeService.java` | Backend | Business logic interface |
| `EmployeeServiceImpl.java` | Backend | Actual business logic code |
| `EmployeeController.java` | Backend | REST API endpoints |
| `CorsConfig.java` | Backend | Allows frontend-backend communication |
| `employeeApi.js` | Frontend | All Axios HTTP calls |
| `AuthContext.jsx` | Frontend | Login/logout state |
| `ThemeContext.jsx` | Frontend | Dark/light mode state |
| `App.jsx` | Frontend | Routing configuration |
| `Login.jsx` | Frontend | Login page |
| `Dashboard.jsx` | Frontend | Summary statistics page |
| `EmployeeList.jsx` | Frontend | Main employee management page |

---

## 🎯 Concepts / Topics Covered in This Project

- ✅ **REST API** design (GET, POST, PUT, DELETE)
- ✅ **Spring Boot** backend with **3-layer architecture**
- ✅ **JPA & Hibernate** for ORM (Object-Relational Mapping)
- ✅ **MySQL** relational database
- ✅ **React** functional components with Hooks (useState, useEffect, useContext)
- ✅ **React Router** for client-side navigation
- ✅ **Context API** for global state management
- ✅ **Axios** for HTTP communication
- ✅ **CORS** configuration
- ✅ **Protected Routes** / Authentication
- ✅ **Responsive UI** with Dark/Light theme support

---

*This document was written to explain the project in simple language for academic evaluation.*
