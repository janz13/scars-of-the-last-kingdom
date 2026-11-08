# Google Play Publish Checklist — Scars of the Last Kingdom
## Follow this in order. Check each box as you go.

---

## Phase 1 — Account Setup (one time)

- [ ] Go to https://play.google.com/console and sign in with a Google account
- [ ] Pay the $25 USD one-time developer registration fee
- [ ] Complete identity verification (may take 24–48 hours)
- [ ] Go to https://expo.dev and create a free Expo account
- [ ] Install EAS CLI on your local machine:
  ```
  npm install -g eas-cli
  ```

---

## Phase 2 — Asset Preparation

### App icon
- [ ] Run the icon generation script to produce all required sizes:
  ```
  cd /home/runner/workspace
  pnpm --filter @workspace/scripts run generate-icons
  ```
  This creates `artifacts/mobile/assets/icons/` with all required sizes.
  
- [ ] Review the output and replace `assets/images/icon.png` with the final art
      when ready (keep it 1024×1024, no transparency, no rounded corners)

### Privacy policy
- [ ] Deploy the web version of the app (this makes `/privacy-policy.html` live)
- [ ] Note the public URL, e.g.:
      `https://your-app.replit.app/privacy-policy.html`
- [ ] Update the contact email in `public/privacy-policy.html`
- [ ] Verify the page loads at the live URL

### Screenshots
- [ ] Run the app on an Android device or emulator at 1080×1920 resolution
- [ ] Capture at minimum these 4 screens:
  1. Main menu (full dark atmosphere)
  2. An in-game story choice scene with choices visible
  3. The endings gallery showing progress
  4. The credits or settings screen
- [ ] Save as PNG files, minimum 1080×1920

### Feature graphic
- [ ] Create a 1024×500 PNG/JPEG showing the game title against dark background
      (used as the Play Store banner image)

---

## Phase 3 — Build the Release AAB

```bash
cd artifacts/mobile
eas login
eas init          # only needed once — links project to your Expo account
```

Then build:

```bash
eas build --platform android --profile production
```

- [ ] Wait for EAS build to complete (usually 10–20 minutes)
- [ ] Download the `.aab` file from the link EAS emails you
- [ ] Back up the EAS keystore:
      expo.dev → your project → Credentials → Android Keystore → Download

---

## Phase 4 — Test the Build

Before uploading to Play Console, install on a real device:

```bash
eas build --platform android --profile preview
```

- [ ] Download the preview `.apk` and install on a real Android device
- [ ] Work through the full testing checklist in `ANDROID_BUILD_NOTES.md`
- [ ] Confirm the content warning shows on first launch
- [ ] Confirm saves work and persist after closing the app
- [ ] Confirm the Android back button works throughout
- [ ] Confirm no crashes on startup

---

## Phase 5 — Create the App in Play Console

1. Go to https://play.google.com/console
2. Click **Create app**
3. Fill in:
   - **App name:** Scars of the Last Kingdom
   - **Default language:** English (United States)
   - **App or game:** Game
   - **Free or paid:** Free (or Paid if applicable)
4. Accept the declarations and click **Create app**

- [ ] App created in Play Console

---

## Phase 6 — Store Listing

In Play Console → Store presence → Main store listing:

### App details
- [ ] **App name:** Scars of the Last Kingdom
- [ ] **Short description (80 chars max):**
      `Dark fantasy RPG. Make choices. Survive the surface. Carry the mark.`
- [ ] **Full description:** paste from `STORE_LISTING_DRAFT.md` → Full Description section

### Graphics
- [ ] Upload app **icon** (512×512 PNG)
- [ ] Upload **feature graphic** (1024×500 PNG/JPEG)
- [ ] Upload at least 2 **phone screenshots** (1080×1920 PNG)

### Categorization
- [ ] **Category:** Games → Role Playing
- [ ] **Tags:** Role-playing, Adventure, Visual Novel

### Contact details
- [ ] **Email:** your developer contact email
- [ ] **Privacy policy URL:** your live privacy policy URL (from Phase 2)

- [ ] Click **Save** on the store listing

---

## Phase 7 — Content Rating

In Play Console → Policy → App content → Content ratings:

- [ ] Click **Start questionnaire**
- [ ] Select category: **Games**
- [ ] Answer all questions (expected answers for this game):
  - Violence: **Yes** (combat and player death described in text)
  - Fear / horror: **Yes** (dark themes, disturbing imagery in text)
  - Sexual content: **No**
  - Language: Mild (mature themes but no profanity focus)
  - Controlled substances: **No**
  - User interaction: **No** (no online multiplayer)
- [ ] Review the calculated rating (expected: **PEGI 16** / **ESRB T or M**)
- [ ] Submit and apply the rating

---

## Phase 8 — Data Safety

In Play Console → Policy → App content → Data safety:

- [ ] **Does your app collect or share any of the required user data types?** → **No**
- [ ] **Is all data transmitted encrypted?** → **Yes** (no data transmitted at all)
- [ ] **Does your app provide a way for users to request data deletion?** → **Yes**
      (Reset All Data in Settings)
- [ ] Enter the privacy policy URL
- [ ] Click **Save**

---

## Phase 9 — Target Audience and Content

In Play Console → Policy → App content → Target audience:

- [ ] **Target age groups:** 16 and over
- [ ] **Does your app appeal to children?** → **No**
- [ ] Click **Save**

---

## Phase 10 — Upload the Release

In Play Console → Testing → Internal testing:

1. Click **Create new release**
2. Under **App bundles**, click **Upload**
3. Upload the `.aab` file downloaded in Phase 3
4. Fill in release notes (e.g. "v1.0.0 — Public Prototype")
5. Click **Save** → **Review release** → **Start rollout to Internal testing**

- [ ] AAB uploaded and release started
- [ ] Add tester email addresses to the Internal testing track
- [ ] Send them the opt-in link from Play Console
- [ ] Confirm at least one tester can download and install the app

---

## Phase 11 — Promote to Production

After internal testing passes:

1. Go to Play Console → Production
2. Click **Create new release**
3. Promote the existing release from Internal testing
4. Set rollout percentage (start at 20% is a safe default)
5. Click **Start rollout to Production**

- [ ] Review period: Google typically reviews new apps within 1–7 days
- [ ] Monitor for policy violations or rejection emails
- [ ] Once approved, the app appears on Google Play

---

## After Publishing

- [ ] Monitor Play Console → Android Vitals for crash rate and ANR rate
- [ ] Respond to early user reviews
- [ ] Before the next update: bump `android.versionCode` in `app.json`
- [ ] Bump `CACHE_VERSION` in `public/sw.js` if bundled assets changed
- [ ] Re-run `eas build --platform android --profile production` for the new build

---

## Quick Reference

| URL | Purpose |
|-----|---------|
| https://play.google.com/console | Google Play Console |
| https://expo.dev | EAS Build dashboard |
| https://docs.expo.dev/build/introduction/ | EAS Build docs |
| https://docs.expo.dev/submit/android/ | EAS Submit docs |

| File | Purpose |
|------|---------|
| `artifacts/mobile/app.json` | Version code, package name, icons |
| `artifacts/mobile/eas.json` | Build profiles |
| `artifacts/mobile/public/privacy-policy.html` | Hosted privacy policy |
| `STORE_LISTING_DRAFT.md` | Copy for the Play Store listing |
| `ANDROID_BUILD_NOTES.md` | Full technical build reference |
