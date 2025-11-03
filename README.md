# Todo List App

Task management application built with Next.js, TypeScript, and Tailwind CSS. Implements authentication, categorized todos, filtering, prioritization, and client-side data operations using React Query and a mock API.

## Live Demo

https://to-do-list-three-ashen-51.vercel.app/

## Screenshots

<div align="center">
  <img src="screenshots/homepage-light-theme.jpeg" alt="Homepage - Light Theme" width="800" />
  <p><em>Homepage with Light Theme - Clean Notion-style interface</em></p>

  <img src="screenshots/homepage-dark-theme.jpeg" alt="Homepage - Dark Theme" width="800" />
  <p><em>Homepage with Dark Theme - Elegant dark mode design</em></p>
</div>

## Features

- CRUD operations on todos
- Authentication (login, registration, logout) via mock API
- Categories, priorities, due dates, and search
- Filtering and sorting (status, priority, category, title/date)
- Drag-and-drop reordering
- Light/dark theme switching
- Theme tokens via CSS variables (background, foreground, card, border, muted-foreground)
- Toast notifications
- Error boundary handling

## Technologies

- Next.js 14 (App Router)
- React 18 with hooks and context
- TypeScript 5
- Tailwind CSS 3
- TanStack React Query v5
- Zod and React Hook Form
- Jest and Testing Library

## Installation

Prerequisites: `Node.js >= 18`, `npm >= 8`.

```bash
git clone https://github.com/HRG-OFFICIAL/To-Do-List.git
cd To-Do-List
npm install
npm run dev
```

Open `http://localhost:3000`.

Demo credentials: `demo@example.com` / `password`.

## Project Structure

```
src/
├── app/                    # Next.js app directory 
│   ├── globals.css         # Global styles 
│   ├── layout.tsx          # Root layout 
│   ├── page.tsx            # Home page 
│   ├── login/              # Authentication pages 
│   └── register/           # Registration pages
├── components/             # React components 
│   ├── ui/                 # Reusable UI components 
│   ├── TodoTable.tsx       # Main todo table component 
│   ├── TodoFilters.tsx     # Filtering and search 
│   ├── TodoHeader.tsx      # App header 
│   ├── TodoFooter.tsx      # App footer 
│   ├── CreateTodoModal.tsx 
│   ├── ThemeSwitcher.tsx 
│   └── LoadingSpinner.tsx 
├── contexts/               # React contexts 
│   └── AuthContext.tsx 
├── hooks/                  # Custom React hooks 
│   ├── useAuth.ts 
│   ├── useTodos.ts 
│   ├── useCategories.ts 
│   ├── useFilters.ts 
│   └── useTodoOperations.ts 
├── lib/                    # Utility functions 
│   ├── api.ts              # API client 
│   ├── mockApi.ts          # Mock API for frontend-only demo 
│   └── utils.ts            # Helper functions 
└── types/                  # TypeScript type definitions
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Run production server
- `npm run lint` – ESLint
- `npm run type-check` – TypeScript check
- `npm test` – Run unit tests

## Usage

- Configure environment variables in `.env.local` as needed.
- The API client uses `src/lib/mockApi.ts` for local demo data and localStorage for auth tokens.
- Replace mock API with a real backend by updating `src/lib/api.ts` and request handlers.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.