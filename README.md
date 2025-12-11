# Portfolio CMS (React + Vite)

![CMS Logo](./public/cms-logo.png)

This is the **admin CMS dashboard** for managing content shown on the public portfolio frontend.

You can extend it to manage sections such as projects, blogs, skills, timeline entries, and more, which are then consumed by the public site.

---

## Features

- Admin UI built in React + Vite
- Ready to integrate with the backend API in `/backend` (Express + Supabase)
- Modern, animated dashboard using **Framer Motion**
- Form handling with **react-hook-form**
- Toast notifications with **sonner**
- Global state via **Zustand**

---

## Tech Stack

- **Framework:** React + Vite
- **UI / Icons:** lucide-react
- **Animations:** Framer Motion
- **Forms:** react-hook-form
- **State management:** Zustand
- **HTTP client:** Axios
- **Data fetching:** SWR
- **Date utilities:** dayjs

---

## Getting Started

You can either **clone** the repository with Git or **download** the project as a ZIP.

### 1. Clone with Git (recommended)

```bash
git clone <YOUR_REPO_URL>.git
cd chiragkb/cms
```

> Replace `<YOUR_REPO_URL>` with the actual Git URL of this monorepo.

### 2. Download as ZIP (no Git)

1. Download the repository as a ZIP from your Git hosting (GitHub / GitLab).
2. Extract the ZIP file on your machine.
3. Open a terminal in the extracted folder and navigate to:

```bash
cd chiragkb/cms
```

---

## Installation

From the `cms` folder:

```bash
npm install
```

---

## Running the Development Server

From the `cms` folder:

```bash
npm run dev
```

Then open the printed URL (by default `http://localhost:5173`) in your browser.

---

## Building for Production

```bash
npm run build
```

Preview the build locally with:

```bash
npm run preview
```

---

## Environment Variables

Configure the CMS to talk to your backend API and any external services via a `.env` file in `/cms`. For example:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

If you are using Supabase or other services via the backend, keep secrets on the **backend**, not in this frontend.

---

## Scripts

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

---

## Relation to Other Projects

This CMS is intended to work with:

- **Backend API:** `/backend` (Express + Supabase) – handles authentication, data storage, and file uploads.
- **Public Frontend:** `/frontend` – displays the portfolio using the data managed here.

---

## License

This project is part of the personal portfolio of **Chirag Bhandarkar**.

