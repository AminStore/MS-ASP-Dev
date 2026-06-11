# MS — Editorial Portfolio

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 10px; color: white; margin: 20px 0;">

## 🚀 About This Project

A modern, bilingual portfolio website built with React, TanStack Router, and Vite. Showcasing professional work, experience, and contact information with a clean, editorial design.

### ✨ Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Bilingual Support** - Seamless Arabic/English language switching
- **Dark Mode** - Auto-detects system preferences
- **Fast Performance** - Built with Vite for lightning-fast builds
- **SEO Optimized** - Proper meta tags and structured data
- **Modern Stack** - React 19, TypeScript, TailwindCSS, Radix UI

### 📦 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Routing**: TanStack Router 1.168.25
- **State Management**: Zustand 5.0.14
- **Styling**: TailwindCSS 4.2.1, Radix UI Components
- **Build Tool**: Vite 7.3.1
- **Package Manager**: Bun
- **Deployment**: Netlify

### 🛠️ Installation

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 📝 Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint

# Format code
bun run format
```

### 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── layout/         # Header, Footer, Navigation
│   └── sections/       # Page sections (Hero, About, Skills, etc.)
├── routes/             # TanStack Router page routes
├── lib/                # Utility functions and helpers
├── store/              # Zustand state management
├── i18n/               # Internationalization (Arabic/English)
├── hooks/              # Custom React hooks
├── styles.css          # Global styles
└── main.tsx            # Entry point
```

### 🌐 Routes

- `/` - Home/Portfolio page
- `/projects/:slug` - Individual project details

### 🚀 Deployment

This app is configured for **Netlify** deployment:

1. Push code to GitHub
2. Connect repository to Netlify
3. Netlify automatically builds and deploys on `main` branch

**Live Site**: [https://ms-asp-dev.netlify.app](https://ms-asp-dev.netlify.app)

### 📋 Build Configuration

- **Build Command**: `bun install && bun run build`
- **Publish Directory**: `dist`
- **Node Version**: 20

### 🎨 Customization

Update these files to customize:
- `src/routes/index.tsx` - Main portfolio content
- `src/routes/__root.tsx` - Global layout and meta tags
- `tailwind.config.ts` - Color scheme and design tokens
- `public/favicon.svg` - Favicon

### 📦 Key Dependencies

- `@tanstack/react-router` - Routing
- `@tanstack/react-query` - Data fetching
- `zustand` - State management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `framer-motion` - Animations
- `recharts` - Data visualization

### 🔧 Environment Setup

No environment variables required for basic setup. All configuration is in code.

### 📄 License

This project is open source.

---

<div style="text-align: center; margin-top: 30px; color: #666;">

**Made with ❤️ | Built with React & Vite**

</div>

</div>
