# Simple Health Tracker

A **Next.js + TypeScript + Tailwind CSS** single-page web application for tracking medications and logging daily vital signs. Designed to be maintainable, scalable, and production-ready.  

---

## Features

### Medication Management
- Add, view, and remove medications.
- Persistent storage per user in **Local Storage**.
- Form captures:
  - Medication Name
  - Dosage
  - Frequency

### Vital Signs Logging
- Log daily vitals: Blood Pressure (Systolic & Diastolic), Heart Rate, Weight.
- View history of vitals sorted in **reverse chronological order**.
- Each entry includes an automatic timestamp.
- Persistent, per-user storage in Local Storage.

### User Authentication
- Simple login using a username.
- Logout clears session and user data from view.
- Auto-logout after 5 minutes of inactivity (keyboard/mouse).

---

## Technologies Used
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with theme support
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Data Persistence:** Local Storage (user-specific keys)
- **UI Components:** Radix UI primitives
- **Testing:** Jest + React Testing Library
- **Date Handling:** `date-fns`  
- **Charts:** Recharts (for future analytics, optional)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/simple-health-tracker.git
cd simple-health-tracker
```

2.  **Install Dependencies**
```bash
npm install
```

3. **Run Development Server**
```bash
npm run dev
```


Open:

http://localhost:5173


📦 Build for Production
npm run build
npm run start
