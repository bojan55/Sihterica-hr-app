# Sihterica — HR Attendance Tracking System

A full-stack web application for HR departments that serves as a digital attendance log ("sihterica") — a system for tracking employee work hours. The app enables employee management by sector, year-long attendance tracking with auto-filled defaults for working days and weekends, hour aggregation across different categories, and generation of printable reports per sector.

---

## Tech Stack

**Backend:**
- Java 26, Spring Boot 4.1.0
- Spring Data JPA + Hibernate
- Spring Security (JWT — in progress)
- MySQL 8
- Lombok
- Swagger / OpenAPI (springdoc-openapi 2.8.9)
- Bean Validation (Jakarta Validation)

**Frontend:**
- React 19 + Vite 8
- Tailwind CSS 3
- Axios
- React Router

---

## Features

- **Employee management** — add, update, and soft-delete employees organized by sector
- **Year-long attendance grid** — automatically generated for each employee on creation, pre-filled with working days (8h) and weekends (SL)
- **Attendance editing** — HR can change any day's code (annual leave, sick leave, overtime, etc.) via dropdown
- **Monthly aggregation** — totals per attendance code displayed inline for each employee
- **Sector-based print templates** — generate and print attendance sheets per sector and month, one page per employee

---

## Project Structure

Sihterica/
├── src/main/java/com/example/sihterica/
│ ├── config/ # Security and CORS configuration
│ ├── controller/ # REST Controllers (Sector, Employee, AttendanceRecord)
│ ├── dto/ # Request and Response DTOs
│ ├── exception/ # Global Exception Handler
│ ├── model/ # JPA Entities and Enums
│ ├── repository/ # Spring Data JPA Repositories
│ ├── security/ # JWT utilities and UserDetailsService
│ └── service/ # Business logic layer
├── frontend/ # React frontend application
│ ├── src/
│ │ ├── pages/ # EmployeesPage, AttendancePage, PrintPage
│ │ └── services/ # Axios API service layer
│ └── ...
└── README.md


---

## Getting Started

### Prerequisites
- Java 26+
- Node.js 18+
- MySQL 8+
- Maven

### Backend Setup

1. Clone the repository:
```bash
   git clone https://github.com/bojan55/Sihterica-hr-app.git
   cd Sihterica-hr-app
```

2. Create the database in MySQL:
```sql
   CREATE DATABASE sihterica_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Copy the properties template and fill in your credentials:
```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
```
Edit `application.properties` and set your MySQL username and password.

4. Run the backend:
```bash
   mvn spring-boot:run
```
The backend will start on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend folder:
```bash
   cd frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm run dev
```
The frontend will start on `http://localhost:5173`.

---

## API Documentation

Swagger UI is available at:

http://localhost:8080/swagger-ui.html


Full OpenAPI spec:

http://localhost:8080/api-docs


---

## Architecture Notes

- **Layered architecture:** Controller → Service → Repository, with strict separation of concerns
- **DTO pattern:** Separate Request and Response DTOs for all entities — entities are never exposed directly through the API
- **Soft delete:** Employees are never hard-deleted; status is set to `INACTIVE` to preserve historical attendance data
- **Snapshot hours:** `hours` value is snapshotted at write time from enum defaults, so historical records are unaffected by future rule changes
- **Automatic year generation:** When an employee is created, 365/366 attendance records are automatically generated for the current year
- **Global exception handling:** Structured JSON error responses for validation errors (400), not found (404), and unexpected errors (500)

---

## Status