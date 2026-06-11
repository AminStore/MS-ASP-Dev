# Mostafa Samir Said — .NET Full-Stack Engineer

A modern, high-performance portfolio website showcasing professional work, experience, and expertise in ASP.NET Core, C#, and full-stack development.

## ✨ Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Bilingual Support** - Seamless Arabic/English language switching with RTL support
- **Dark Mode** - Automatic system preference detection
- **High Performance** - Built with Vite for fast builds and runtime
- **Modern Stack** - React 19, TypeScript, TailwindCSS v4, Framer Motion
- **SEO Optimized** - Proper meta tags, structured data, and sitemap
- **Accessible** - WCAG compliance focus, keyboard navigation
- **3D Graphics** - Three.js particle animations for visual appeal

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

Visit `http://localhost:5173` to view the portfolio.

## 📚 Documentation

Comprehensive documentation available in `/docs`:

- **[SETUP.md](./docs/SETUP.md)** - Installation, development, and troubleshooting
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Project structure and component hierarchy
- **[STYLING.md](./docs/STYLING.md)** - Design system, typography, and theming
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Build and deployment instructions
- **[INTERNATIONALIZATION.md](./docs/INTERNATIONALIZATION.md)** - i18n setup and translation management
- **[CSS_LINTER_INFO.md](./docs/CSS_LINTER_INFO.md)** - Tailwind v4 linter configuration

**Community & Governance** (in `.github` and root):

- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes
- **[SECURITY.md](./SECURITY.md)** - Security policy and vulnerability reporting
- **[CONTRIBUTING.md](./.github/CONTRIBUTING.md)** - Contribution guidelines and standards
- **[CODE_OF_CONDUCT.md](./.github/CODE_OF_CONDUCT.md)** - Community standards
- **[Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.md)** - PR submission guide
- **[Issue Templates](./.github/ISSUE_TEMPLATE/)** - Bug and feature request templates

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **TanStack Router** - File-based routing
- **Vite** - Build tool and dev server

### Styling & Design
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Headless component library

### Development
- **Bun** - Fast JavaScript runtime and package manager
- **Node 20+** - JavaScript runtime

### Deployment
- **Netlify** - Automatic deployment on push
- **GitHub** - Source control and CI/CD trigger

## 📦 Key Dependencies

```json
{
  "react": "19.2.0",
  "@tanstack/react-router": "1.168.25",
  "@tanstack/react-query": "5.80.0",
  "framer-motion": "11.15.0",
  "three": "r168",
  "tailwindcss": "4.2.1",
  "typescript": "5.7.3",
  "vite": "7.3.1",
  "zustand": "5.0.14"
}
```

## 🎨 Design System

The portfolio uses a centralized, component-based design system:

- **Typography**: Jim Nightshade (headings) + Italianno (body)
- **Colors**: Custom OkLch color palette with light/dark modes
- **Layout**: Tailwind-based responsive grid system
- **Components**: Pre-built styled components for consistency

See [STYLING.md](./docs/STYLING.md) for detailed design system documentation.

## 🌍 Internationalization

- **Languages**: English (default) and Arabic
- **RTL Support**: Automatic layout adaptation for Arabic
- **Custom i18n**: Lightweight, no external dependencies
- **Type Safe**: TypeScript validation for translations

See [INTERNATIONALIZATION.md](./docs/INTERNATIONALIZATION.md) for setup details.

## 🚢 Deployment

### Automatic Deployment
```
Push to main branch
  ↓
Netlify webhook triggered
  ↓
bun install && bun run build
  ↓
Deploy to CDN
```

**Live Site**: [ms-asp-dev.netlify.app](https://ms-asp-dev.netlify.app)

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment guide.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Header, Footer, Navigation
│   ├── sections/       # Page sections (Hero, About, Skills, etc.)
│   └── ui/             # Radix UI components
├── routes/             # TanStack Router pages
├── i18n/               # Internationalization
├── styles/             # Theme system (centralized)
├── hooks/              # Custom React hooks
└── main.tsx            # Entry point

docs/                    # Documentation
├── SETUP.md
├── ARCHITECTURE.md
├── STYLING.md
├── DEPLOYMENT.md
├── INTERNATIONALIZATION.md
└── CSS_LINTER_INFO.md

public/                  # Static assets
├── favicon.svg
└── resume.pdf
```

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for complete structure.

## 🎯 Content Sections

### Home Page
- **Hero** - Eye-catching introduction with decorative elements
- **About** - Professional background and experience
- **Skills** - Technical toolkit organized by category
- **Projects** - Featured work with case studies
- **Experience** - Professional history and roles
- **Education** - Qualifications and certifications
- **Contact** - Get in touch form and social links

## 🔧 Available Commands

```bash
# Development
bun run dev              # Start dev server
bun run preview         # Preview production build

# Build
bun run build           # Build for production
bun run build:analyze   # Analyze bundle size

# Code Quality
bun run lint            # Run ESLint
bun run format          # Format with Prettier
bun run type-check      # TypeScript type checking

# Utilities
bun run clean           # Clean build artifacts
```

## 🌟 Performance

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimization Techniques
- Lazy loading for Three.js components
- CSS minification via Tailwind v4
- JavaScript tree-shaking with Vite
- Image optimization
- Reduced motion support for animations

## 🔐 Environment

No environment variables required for basic deployment. All configuration is code-based for simplicity.

## 📝 License

Open source. Feel free to use as inspiration or template.

## 🤝 Contributing

This is a personal portfolio. For improvements or bug reports, please create an issue or pull request.

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for detailed contribution guidelines, development setup, and coding standards.

### Community & Governance

- **[Code of Conduct](.github/CODE_OF_CONDUCT.md)** - Community standards and expectations
- **[Contributing Guide](.github/CONTRIBUTING.md)** - How to contribute code and documentation
- **[Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)** - What to include in your PR
- **[Security Policy](SECURITY.md)** - How to report vulnerabilities responsibly

### Issue Templates

Use these templates when opening issues:
- **[Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)** - Report bugs with details
- **[Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)** - Suggest new features

## ✅ Checklist

- [x] Responsive design
- [x] Bilingual support (EN/AR)
- [x] Dark mode
- [x] SEO optimized
- [x] Performance optimized
- [x] Accessibility features
- [x] Type safe (TypeScript)
- [x] No styling duplication
- [x] Comprehensive documentation
- [x] Automated deployment

## 📞 Contact

- **Email**: m.ssaid356@gmail.com
- **Phone**: +201067358073
- **GitHub**: [Mostafa-SAID7](https://github.com/Mostafa-SAID7)
- **LinkedIn**: [mostafasamirsaid](https://www.linkedin.com/in/mostafasamirsaid)

---

Made with ❤️ using React, Vite, and TailwindCSS
