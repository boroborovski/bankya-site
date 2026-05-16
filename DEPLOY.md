# Vercel Deployment

## How it works

Deployments are handled by a GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Triggers

| Event | Result |
|-------|--------|
| Push to `main` | Production deploy |
| Pull request to `main` | Preview deploy (gets a unique URL) |
| Manual (`workflow_dispatch`) | Production deploy (triggered from GitHub Actions tab) |

### Steps the workflow runs

1. **Checkout** — pulls the repo
2. **Node 22 setup** — with `npm` cache enabled
3. **`npm ci`** — installs dependencies from lockfile
4. **`vercel pull`** — fetches environment variables from Vercel
5. **`vercel build --prod`** — builds the Astro static site via Vercel CLI
6. **`vercel deploy --prebuilt`** — uploads the built output; uses `--prod` flag only on `main`

### Requirements

- `VERCEL_TOKEN` must be set as a secret in GitHub: `Settings → Secrets and variables → Actions`
- The Vercel project must already be linked (`.vercel/project.json` in repo root)

### Checking deploy logs

Go to the **Actions** tab on GitHub and open the latest workflow run.

---

## Workflow script

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy
        run: |
          if [ "${{ github.ref }}" = "refs/heads/main" ]; then
            vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
          fi
```
