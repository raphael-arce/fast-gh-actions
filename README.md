# Fast GitHub Actions - Todo App Example

A demonstration repository showcasing e2e test optimization techniques for GitHub Actions workflows. This example accompanies [this blog post](https://raphael.arce.de/blog/faster-gh-actions/) on reducing CI/CD workflow times from 10 minutes to under 1 minute through strategic improvements in test fixtures, parallelization, and caching.

Disclaimer: The code was mainly generated with AI and probably has some issues.

## Key Optimizations Demonstrated

- Fast Test Fixtures: Mock authentication via Supabase JS instead of UI interactions (~0.3s vs ~3.5s)
- Parallel Execution: Matrix strategy for browser-specific test runs
- Background Installations: Non-blocking setup of Playwright browsers and Supabase
- Self-hosted Runner Support: Optional configuration for even faster execution (~41s total)

## Stack

- React + Vite + TypeScript
- Supabase (Auth & Database)
- Playwright (E2E Testing)
- GitHub Actions (CI/CD)

# Local Development

Install then start supabase locally:

```bash
supabase start
```

Then you can run the app:

```bash
npm run dev
```

Read the full blog post for detailed explanations and performance comparisons: https://raphael.arce.de/blog/faster-gh-actions/
