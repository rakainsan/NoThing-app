# NoThing - Note Everything

NoThing (Note Everything) adalah aplikasi web pencatat catatan yang lengkap, yang memungkinkan pengguna untuk membuat, mengelola, memperbarui, dan menghapus catatan pribadi melalui sistem otentikasi yang aman.

## Features

- User registrasi and login
- Otentikasi berbasis token
- Create catatan
- View dan Search catatan list
- Update catatan
- Delete catatan
- Responsive UI
- RESTful API architecture

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend

- Laravel
- Laravel Sanctum
- REST API

### Database

- MySQL

### Deployment

- Nginx
- PHP-FPM
- Ubuntu VPS

---

## Project Structure

```text
nothing-app/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   ├── Models/
│   │   └── Providers/
│   │
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── routes/
│   │   └── api.php
│   │
│   ├── storage/
│   └── public/
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/register | Register new user |
| POST | /api/login | User login |
| POST | /api/logout | User logout |
| GET | /api/me | Get authenticated user |

### Notes

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/notes | Get all notes |
| POST | /api/notes | Create note |
| GET | /api/notes/{id} | Get note detail |
| PUT | /api/notes/{id} | Update note |
| DELETE | /api/notes/{id} | Delete note |

---


## Application Workflow

```text
Client (React)
        │
        ▼
Axios HTTP Request
        │
        ▼
Laravel REST API
        │
        ▼
Authentication Middleware
        │
        ▼
Controller
        │
        ▼
MySQL Database
        │
        ▼
JSON Response
        │
        ▼
React UI Update
```

---

## Local Installation

### Clone Repository

```bash
git clone https://github.com/rakainsan/NoThing-app.git
```

### Backend Setup

```bash
cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan serve
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Production Deployment

Aplikasi dideploy di Ubuntu VPS dengan:

- Nginx
- PHP-FPM
- MySQL
- React Production Build

Frontend dan backend dideploy terpisah dengan integrasi REST API endpoints.

---

## Author

Muhammad Raka Insan Mahendra
