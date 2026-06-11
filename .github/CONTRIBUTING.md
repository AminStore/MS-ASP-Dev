# Contributing to MS-ASP-Dev Portfolio

Thank you for your interest in contributing to this portfolio project! Whether you're reporting a bug, suggesting an enhancement, or submitting code, your contribution is appreciated.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the [existing issues](../../issues) to avoid duplicates.

**When submitting a bug report, include:**
- A clear, descriptive title
- Step-by-step reproduction instructions
- Expected behavior
- Actual behavior
- Screenshots or GIFs (if applicable)
- Your environment (OS, browser, Node version, etc.)

Use the [Bug Report template](../../issues/new?template=bug_report.md) for consistency.

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:
- Use a clear, descriptive title
- Provide a detailed description of the suggested enhancement
- Explain the motivation or use case
- List any similar features in other projects

Use the [Feature Request template](../../issues/new?template=feature_request.md) to submit enhancements.

### Submitting Code Changes

#### Before You Start
1. Fork the repository
2. Clone your fork locally
3. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b fix/bug-description
   ```
4. Install dependencies:
   ```bash
   bun install
   ```

#### Development Workflow
1. Make your changes in your branch
2. Ensure your code follows the project's style:
   ```bash
   bun run format    # Format code with Prettier
   bun run lint      # Check with ESLint
   bun run type-check  # Verify TypeScript
   ```
3. Test your changes thoroughly
4. Keep commits atomic and descriptive

#### Commit Message Guidelines
- Use present tense: "Add feature" not "Added feature"
- Use imperative mood: "Move cursor to..." not "Moves cursor to..."
- Limit the first line to 72 characters
- Reference issues and pull requests when relevant: "Closes #123"

Example:
```
Add dark mode toggle to header navigation

- Implement theme context provider
- Add toggle button to header
- Update localStorage persistence
- Add smooth transitions

Closes #45
```

#### Submitting Your Pull Request
1. Push your branch to your fork
2. Create a Pull Request to `main` on the original repository
3. Fill out the [PR template](../../pull_request_template.md) completely
4. Link any related issues
5. Ensure CI checks pass

#### PR Requirements
- ✅ Code follows project style guidelines
- ✅ Changes are well-documented
- ✅ No breaking changes (or clearly documented)
- ✅ Relevant sections of documentation updated
- ✅ TypeScript types are correct
- ✅ No console errors or warnings

### Working on Documentation

Documentation improvements are just as valuable as code contributions!

- Documentation files are in `/docs`
- Use clear, accessible language
- Include code examples where relevant
- Keep content up-to-date with code changes

## Development Setup

### Prerequisites
- Node 20+ or Bun 1.0+
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/Mostafa-SAID7/MS-ASP-Dev.git
cd MS-ASP-Dev

# Install dependencies
bun install

# Start development server
bun run dev
```

### Available Commands
```bash
bun run dev              # Development server
bun run build            # Production build
bun run preview          # Preview production build
bun run lint             # ESLint check
bun run format           # Prettier format
bun run type-check       # TypeScript check
```

## Style Guidelines

### Code Style
- Use **2-space indentation**
- Use **single quotes** for strings (enforced by Prettier)
- Use **TypeScript** for all new code
- Use **semantic HTML** where possible

### Component Style
- Functional components only (React hooks)
- Use descriptive names for components and functions
- Extract reusable styles to `src/styles/theme.ts`
- Use Tailwind classes; avoid inline styles
- Add comments for complex logic

### Naming Conventions
- **Components**: PascalCase (e.g., `ContactForm.tsx`)
- **Functions/Utilities**: camelCase (e.g., `formatDate`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT`)
- **Files**: PascalCase for components, lowercase for utilities

### CSS & Styling
- Use centralized theme system in `src/styles/theme.ts`
- Extend Tailwind utilities via theme, not inline classes
- Use CSS custom properties for dynamic values
- Support both light and dark modes

### TypeScript
- Always specify return types for functions
- Use strict mode (tsconfig.json)
- Prefer interfaces over types for object shapes
- Avoid `any` type; use `unknown` if necessary

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Header, Footer
│   ├── sections/       # Page sections
│   └── ui/             # Radix UI primitives
├── routes/             # TanStack Router pages
├── i18n/               # Internationalization
├── styles/             # Theme system
├── hooks/              # Custom React hooks
└── main.tsx
```

For details, see [ARCHITECTURE.md](../docs/ARCHITECTURE.md).

## Testing & Quality

While this project currently doesn't have automated tests, please ensure:
- Visual testing across devices (desktop, tablet, mobile)
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Accessibility testing with keyboard navigation
- Performance testing (Lighthouse, Core Web Vitals)

## Questions or Need Help?

- Open an issue with your question
- Check existing documentation in `/docs`
- Review closed issues for solutions to common problems

## Code of Conduct

Be respectful, inclusive, and constructive. Treat all contributors and users with kindness.

---

Thank you for contributing to MS-ASP-Dev! 🚀
