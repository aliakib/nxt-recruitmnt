# Recruitment SaaS Dashboard

A modern, responsive Recruitment SaaS Dashboard built with **Next.js (App Router)**, designed to manage candidates, jobs, and hiring workflows efficiently. The application focuses on clean UI, scalable architecture, and production-aligned patterns such as server-side pagination and modular components.

---

## 🚀 Features

### 📊 Dashboard

* Overview of recruitment pipeline
* Candidate insights and structured UI

### 👥 Candidates Management

* Candidate listing in table format
* Sorting and pagination support
* Interactive UI components

### 💼 Jobs Management

* Jobs displayed in structured table view
* Server-side pagination via API / data layer
* Clean separation of UI and data logic

### 🔔 Notifications

* Slide-in drawer (right side)
* Expandable notification items
* Read/unread state handling

### 👤 Profile Drawer

* Avatar with initials fallback
* User details (name, role, email)
* Action buttons (Profile, Settings, Logout)
* Consistent drawer-based UX (same as notifications)

---

## 🧱 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** lucide-react
* **State Management:** React hooks (local state)
* **Architecture:** Component-based + server/client separation

---

## 📁 Project Structure

```
src/
  app/                # Next.js App Router pages
  components/         # UI components (Header, Sidebar, Tables, Drawers)
  data/               # Static JSON data (jobs, notifications)
  lib/                # Server-side utilities (data fetching logic)
  utils/              # Helper functions (breadcrumbs, titles, etc.)
  types/              # TypeScript interfaces
  constants/          # Shared constants (pagination, etc.)
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

## 🏗️ Build & Production

### Build the app

```bash
npm run build
```

### Start production server

```bash
npm start
```

---

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Import project into Vercel
3. Deploy (auto-detects Next.js)

Optional environment variable:

```
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

---

## 📌 Key Architectural Decisions

### 1. Server-side Pagination

* Implemented via server functions / API layer
* Avoids loading full dataset on client
* Scales better for real-world use cases

### 2. Drawer-based UX

* Notifications and Profile both use right-side drawers
* Ensures consistent interaction pattern

### 3. Separation of Concerns

* UI components are decoupled from data fetching
* Data logic lives in `lib/` or API routes

### 4. Controlled Components

* Tables receive data via props
* Pagination and state handled at page level

---

## ⚠️ Known Limitations

* Uses static JSON data (no database yet)
* No authentication system integrated
* No persistent state (e.g., notifications reset on refresh)

---

## 🔮 Future Improvements

* Integrate database (PostgreSQL + Prisma)
* Add authentication (NextAuth)
* Implement global user context
* Add reusable DataTable abstraction
* Enhance accessibility (keyboard navigation, ARIA)
* Add animations (Framer Motion)

---

## 👨‍💻 Author

Built as a scalable frontend system for recruitment workflows, focusing on real-world SaaS patterns rather than demo-only implementations.

---

## 📄 License

This project is for learning and demonstration purposes.
