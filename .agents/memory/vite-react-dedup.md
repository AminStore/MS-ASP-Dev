---
name: Vite react-three/fiber dedup fix
description: Fixing "two copies of React / Invalid hook call" caused by @react-three/fiber bundling its own React in Vite dev
---

## Rule
Always add `resolve.dedupe: ["react", "react-dom", "react-dom/client"]` to vite.config.ts when the project uses `@react-three/fiber`.

## Why
`@react-three/fiber` bundles its own React copy. Without `dedupe`, Vite may serve two React instances → "Invalid hook call" / `Cannot read properties of null (reading 'useEffect')` at runtime.

## How to apply
In `vite.config.ts`:
```ts
resolve: {
  alias: { "@": "/src" },
  dedupe: ["react", "react-dom", "react-dom/client"],
},
```
Do NOT also add react/react-dom to `optimizeDeps.include` — that triggers hash churn and 504 Outdated Optimize Dep errors on every dev restart/cache clear.

## Companion fix
Wrap any `lazy(() => import("@react-three/fiber canvas component"))` in a class-based ErrorBoundary that returns null on error. This prevents transient 504s during Vite startup from crashing the whole app.
