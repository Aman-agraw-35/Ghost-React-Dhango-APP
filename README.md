# 👻 Ghost React Django App

A full-stack web application built with **React + Vite** for the frontend and **Django** (with Django REST Framework) for the backend. The app supports **JWT-based authentication**, responsive UI, and API-driven interactions.

---

## 🚀 Live Demo

- 🔗 Frontend: [Ghost App Frontend](https://ghost-react-dhango-app-1.onrender.com/)
- 🔗 Backend API: [Ghost API Docs](https://ghost-react-dhango-app.onrender.com/api)

---
## 🧠 Concepts & Features Used

### 🔐 Authentication
- **JWT (JSON Web Token)**: Used for secure user authentication and route protection.
- **Access/Refresh Tokens**: Refresh mechanism to maintain long-lived sessions securely.
- **Axios Interceptors**: Automatically attach access tokens and refresh when expired.

### 🕵️ Debouncing
- Implemented in input fields (e.g., search or login forms) to reduce API calls by waiting until user stops typing.
- Helps improve performance and reduce unnecessary requests.

### 🌐 API Integration
- Built using **Axios** to handle all frontend API requests with base URL from `VITE_API_BASE_URL`.
- Error handling and success notifications managed via `react-toastify`.

### 🧭 Routing & Navigation
- **React Router DOM** for client-side routing.
- Route protection using a custom `PrivateRoute` component that checks JWT tokens.

### 🧰 Code Structure & Reusability
- **Custom Hooks**: `useAuth`, `useDebounce` for managing authentication and input behavior.
- **Component-Based Structure**: Clean and scalable layout with modular reusable components like `Input`, `Button`, `Navbar`, etc.

### 📦 State Management
- Utilized **React Context API** for managing user auth state across the app.

### ⚙️ CI/CD & Deployment
- CI/CD via **Render** for both frontend (static site) and backend (web service).
- **Environment variables** used to manage API base URLs and secrets securely.

## 🧩 Tech Stack

### Frontend

- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- JWT Client Authentication

### Backend

- [Python 3](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
- PostgreSQL (Render)

---

## 🛠️ Setup Instructions

### 📦 Backend Setup

1. Clone the repo and go into the `backend/` directory.

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
#💻 Frontend Setup
Go into the frontend/ folder and install dependencies:

bash
```
cd frontend
npm install
npm run dev
```
