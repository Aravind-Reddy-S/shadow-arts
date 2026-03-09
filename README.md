# 🎨 Shadow Arts Platform

A **full-stack web platform for managing art workshops and cultural programs**, built using **React + Django REST Framework**.

The platform allows users to explore traditional art, book workshops, watch testimonials, and interact with the organization while administrators manage all content through a powerful admin panel.

---

# 🌟 Highlights

✨ Modern React UI
✨ Django REST API backend
✨ Admin CMS for managing workshops
✨ Dynamic workshop booking system
✨ Image & video testimonial support
✨ Responsive design for mobile & desktop

---

# 🚀 Live Demo

*(Add your deployed URL here)*

```
https://yourdomain.com
```


# 🧩 Features

## 👤 User Features

* User Registration
* User Login
* Browse upcoming workshops
* Workshop booking system
* Explore traditional Indian art
* Contact form
* Video & image testimonials
* Art gallery
* Product showcase

---

## 🛠 Admin Features

Admin dashboard allows managing:

* Workshops
* Bookings
* Testimonials
* Products
* Orders
* Contact messages
* User profiles

Admin panel:

```
/admin
```

---

# 🧠 System Architecture

```
Browser
   │
   ▼
React Frontend (Vite + TypeScript)
   │
   ▼
Django Backend (REST API)
   │
   ▼
SQLite Database
   │
   ▼
Django Admin CMS
```

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Framer Motion

## Backend

* Django
* Django REST Framework
* SQLite (development)

## Tools

* Node.js
* npm
* Git

---

# 📁 Project Structure

```
smooth-user-flow
│
├── backend
│   └── shadowarts
│       ├── api
│       │   ├── models.py
│       │   ├── views.py
│       │   ├── serializers.py
│       │   ├── urls.py
│       │   └── admin.py
│       │
│       ├── shadowarts
│       │   ├── settings.py
│       │   └── urls.py
│       │
│       └── frontend
│
├── src
│   ├── components
│   ├── pages
│   ├── hooks
│   └── assets
│
├── dist
├── public
└── package.json
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/shadow-arts.git
cd shadow-arts
```

---

## 2️⃣ Install Frontend Dependencies

```
npm install
```

---

## 3️⃣ Build Frontend

```
npm run build
```

---

## 4️⃣ Copy React Build to Django

```
Copy-Item dist\* backend\shadowarts\frontend -Recurse -Force
```

---

## 5️⃣ Run Django Server

```
cd backend/shadowarts
py -3.13 manage.py runserver
```

---

## 6️⃣ Open Website

```
http://127.0.0.1:8000
```

Admin panel:

```
http://127.0.0.1:8000/admin
```

---

# 🔌 API Endpoints

| Endpoint           | Method | Description          |
| ------------------ | ------ | -------------------- |
| /api/register      | POST   | Register new user    |
| /api/login         | POST   | Login user           |
| /api/workshops     | GET    | List workshops       |
| /api/book-workshop | POST   | Book workshop        |
| /api/products      | GET    | List products        |
| /api/contact       | POST   | Send contact message |
| /api/testimonials  | GET    | Get testimonials     |

---

# 🎥 Media Support

The system supports:

* Image testimonials
* Video testimonials
* Workshop images
* Product images

Media files are stored in Django's **media directory**.

---

# 🔐 Environment Variables

Create `.env` file:

```
OPENAI_API_KEY=your_openai_key
```

---

# 🚀 Deployment

Recommended hosting:

### Backend

* Render
* Railway
* DigitalOcean

### Frontend

React is built and served directly by Django.

---

# 📈 Future Improvements

* Razorpay payment integration
* Email notifications
* Workshop certificates
* Product checkout system
* User dashboard improvements
* Booking confirmation system

---

# 🤝 Contributing

Contributions are welcome!

Steps:

1. Fork repository
2. Create new branch
3. Commit changes
4. Submit pull request

---

# 👨‍💻 Author

Arru
Full Stack Developer

---

# 📄 License

This project is created for **educational and portfolio purposes**.
