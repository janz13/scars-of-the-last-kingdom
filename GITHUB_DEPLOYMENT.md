# 🌐 GitHub Pages Deployment Guide: *Scars of the Last Kingdom*

This guide walks you through deploying **Scars of the Last Kingdom** as a web application hosted on **GitHub Pages** using automated GitHub Actions CI/CD.

---

## 🏗️ Architecture Overview

The game is built with **Expo & Expo Router** (React Native Web). The deployment pipeline:
1. **Compiles static web bundles** using Metro via `npx expo export --platform web`.
2. **Handles repository subpaths** (e.g. `https://<username>.github.io/<repo>/`) dynamically using `EXPO_BASE_URL` in `artifacts/mobile/app.config.js`.
3. **Bypasses Jekyll processing** with `.nojekyll`, preventing GitHub Pages from ignoring Expo's internal `_expo/` directory.
4. **Publishes directly to GitHub Pages** via GitHub's official `actions/deploy-pages@v4`.

---

## 🚀 Step-by-Step Setup Instructions

### Step 1: Create a Repository on GitHub

1. Go to [GitHub New Repository](https://github.com/new).
2. Name your repository (e.g., `scars-of-the-last-kingdom` or `Dark-Realm-Saga`).
3. Set the visibility to **Public** (or **Private** if you have GitHub Pro/Enterprise with Pages enabled).
4. Do **not** initialize with a README, `.gitignore`, or license (your project already has them).
5. Click **Create repository**.

---

### Step 2: Configure Your Local Git Remote & Push

Open your terminal or command prompt in the root of the project:

```bash
# Check if you already have a remote named origin
git remote -v

# If "origin" does not exist yet:
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# If "origin" already exists and points somewhere else:
git remote set-url origin https://github.com/<your-username>/<your-repo-name>.git
```

Verify your branch is named `main`, stage your files, commit, and push:

```bash
# Stage all files including the new GitHub Actions workflow and deployment configs
git add .

# Commit your changes
git commit -m "feat(deploy): configure GitHub Pages automated CI/CD workflow"

# Ensure the branch is named main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

### Step 3: Enable GitHub Pages with GitHub Actions

1. In your browser, navigate to your GitHub repository:
   `https://github.com/<your-username>/<your-repo-name>`
2. Click on the **Settings** tab (gear icon at the top).
3. In the left sidebar under the "Code and automation" section, click **Pages**.
4. Under **Build and deployment**:
   - For **Source**, open the dropdown menu and select:
     👉 **GitHub Actions** *(DO NOT select "Deploy from a branch")*.
5. GitHub will now grant the workflow permissions to deploy your site.

---

### Step 4: Automated Build & Verification

1. Go to the **Actions** tab in your repository:
   `https://github.com/<your-username>/<your-repo-name>/actions`
2. You will see a workflow run named **Deploy to GitHub Pages**.
   - If you just pushed, it runs automatically.
   - You can also manually trigger it anytime by clicking **Deploy to GitHub Pages** in the left sidebar, clicking the **Run workflow** button, and selecting branch `main`.
3. The workflow will:
   - Check out the repository.
   - Set up Node.js 24 and pnpm 10.33.3.
   - Install dependencies.
   - Determine your repository's subpath and set `EXPO_BASE_URL=/<your-repo-name>`.
   - Run `pnpm --filter @workspace/mobile run build:web` to generate static web bundles.
   - Inject `.nojekyll` into the export directory.
   - Upload the artifact and deploy to GitHub Pages.
4. Once completed (green checkmark), a live URL pill appears in the workflow summary:
   `https://<your-username>.github.io/<your-repo-name>/`
5. Click the link to open and play your visual novel RPG live in any browser!

---

## ⚙️ Configuration Reference

### How Subpath Routing Works
When hosted at `https://<username>.github.io/<repo>/`, static asset URLs (such as `_expo/static/js/...` or images) require the `/<repo>` prefix.

- **Dynamic Base URL (`artifacts/mobile/app.config.js`)**:
  Automatically inspects `process.env.EXPO_BASE_URL`.
- **Automatic Detection in GitHub Actions**:
  The workflow inspects `${{ github.event.repository.name }}`:
  - If your repository is `<username>.github.io` (a root user page), it deploys to root (`/`).
  - If your repository is `<repo-name>` (a project page), it automatically configures `EXPO_BASE_URL=/<repo-name>`.

### Using a Custom Domain (Optional)
If you configure a custom domain (such as `https://play.darkrealmsaga.com`):
1. In repository **Settings** -> **Pages**, configure your custom domain.
2. In repository **Settings** -> **Secrets and variables** -> **Actions** -> **Variables**, add a variable named `EXPO_BASE_URL` with value `/` (or leave empty).
3. The workflow will automatically respect your variable and export for root domain serving.

---

## 🔍 Troubleshooting & FAQ

### Q: Why do I see a blank page or 404 for assets?
- **Cause 1 - Jekyll omitting `_expo/`**: GitHub Pages runs Jekyll by default, which ignores folders starting with an underscore (`_`).
  - **Resolution**: The workflow automatically places `.nojekyll` inside `artifacts/mobile/dist/.nojekyll`, and `artifacts/mobile/public/.nojekyll` is tracked in version control. Jekyll will never process or hide your bundle assets.
- **Cause 2 - Subpath mismatch**: If assets point to `https://<username>.github.io/_expo/...` instead of `https://<username>.github.io/<repo>/_expo/...`.
  - **Resolution**: Our `app.config.js` and `.github/workflows/deploy.yml` automatically configure `EXPO_BASE_URL=/<repo-name>`.

### Q: Does the save system work on GitHub Pages?
- **Yes!** The save system uses `@react-native-async-storage/async-storage`, which utilizes browser `localStorage` on the web. Players can refresh or close their browser tab, and their story progress, inventory, character stats, and bookmarks will persist locally.

### Q: Can I run the web build locally to test before pushing?
Yes! In your project root, run:
```bash
# Export static web bundle
pnpm --filter @workspace/mobile run build:web

# Or run the live local development web server
pnpm --filter @workspace/mobile run dev
```
Navigate to `http://localhost:8081` in your browser.
