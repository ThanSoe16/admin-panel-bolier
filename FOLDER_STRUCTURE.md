# Project Folder Structure

> **Reusable template for Next.js + TypeScript projects**

## Root Structure

```
project-root/
├── public/                 # Static assets (images, icons, fonts)
├── src/                    # Source code
│   ├── app/                # Next.js App Router (pages & API routes)
│   ├── components/         # React components
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page-specific components
│   │   ├── shared/         # Reusable components
│   │   └── ui/             # Base UI components
│   ├── features/           # Feature modules
│   │   └── [feature-name]/
│   │       ├── services/   # API calls & business logic
│   │       ├── types/      # TypeScript types
│   │       └── hooks/      # Feature-specific hooks
│   ├── hooks/              # Global custom hooks
│   ├── lib/                # Third-party library configs
│   ├── store/              # State management
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   └── data/               # Static data/constants
├── .env.development        # Environment variables
├── .gitignore
├── next.config.ts          # Next.js configuration
├── package.json
├── tailwind.config.js      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## Key Principles

### 1. Feature-Based Architecture

Each feature is self-contained with its own:

- **services**: API calls and business logic
- **types**: TypeScript definitions
- **hooks**: Feature-specific React hooks

### 2. Component Organization

- **pages**: Feature-specific page components
- **shared**: Reusable components across features
- **ui**: Base/primitive UI components
- **layouts**: App layout wrappers

### 3. Naming Conventions

- Directories: `kebab-case`
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Private folders: `_folder-name`

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: PNPM/NPM

---

_Template for scalable Next.js applications_
