# Android Build Notes — Scars of the Last Kingdom
## Public Prototype · v1.0 · May 2026

---

## ⚠️ Why Not Capacitor?

**Capacitor wraps standard web apps (Vite/webpack) inside a WebView.** This project is a
**React Native + Expo** app. Capacitor cannot be used here because:

1. React Native renders to **native views**, not a WebView. Capacitor expects a DOM.
2. Expo provides its own native build pipeline (`expo prebuild`, EAS Build) that generates
   a proper Android Gradle project from `app.json`.
3. Adding Capacitor would require ejecting from Expo, rewriting the app as a plain web app,
   and losing all native module access (AsyncStorage, SafeAreaContext, Haptics, etc.).

**The correct Android path is `expo prebuild` + Android Studio, or EAS Build.**

The web version (`pnpm run build:web`) is fully preserved and not affected by Android publishing.

---

## What Is Already Configured

| Area | Status | Location |
|------|--------|----------|
| Android package name | ✅ `com.scarsofthelastkingdom.app` | `app.json` |
| Android min SDK | ✅ 24 (Android 7.0+) | `app.json` |
| Android target SDK | ✅ 35 (Android 15) | `app.json` |
| Android compile SDK | ✅ 35 | `app.json` |
| App version | ✅ `1.0.0` / version code `1` | `app.json` |
| Adaptive icon | ✅ Foreground + `#04020a` background | `assets/icons/` |
| Splash screen | ✅ All densities configured | `app.json` |
| Portrait lock | ✅ | `app.json` |
| Backup disabled | ✅ `allowBackup: false` | `app.json` |
| Dangerous permissions blocked | ✅ Audio, Camera, Contacts | `app.json` |
| Software keyboard | ✅ `pan` mode | `app.json` |
| PWA manifest | ✅ Properly sized icons, standalone mode | `public/manifest.json` |
| Service worker | ✅ Offline shell + game art cache | `public/sw.js` |
| Mobile viewport | ✅ `viewport-fit=cover`, no zoom | `app/+html.tsx` |
| Safe-area CSS | ✅ Custom properties + helper classes | `app/+html.tsx` |
| Touch CSS resets | ✅ Tap highlight, selection, overscroll | `app/+html.tsx` |
| EAS build config | ✅ dev / preview / production profiles | `eas.json` |
| App icons in `public/` | ✅ 192, 512, 1024, apple-touch, favicon | `public/` |
| Android build scripts | ✅ `build:android`, `android:studio`, etc. | `package.json` |

---

## Step-by-Step: Local Android Build with Expo Prebuild

### Prerequisites

1. **Node.js 18+** and **pnpm** installed
2. **Android Studio** installed (https://developer.android.com/studio)
3. **Android SDK** via Android Studio:
   - Open Android Studio → Settings → Languages & Frameworks → Android SDK
   - Install SDK Platform 35 (Android 15)
   - Install Android SDK Build-Tools 35
   - Install Android SDK Command-line Tools
4. **Environment variables** set:
   ```
   ANDROID_HOME=C:\Users\<you>\AppData\Local\Android\Sdk
   PATH+=...%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator
   ```
5. **Java 17** (required by Android Gradle Plugin 8.x)

### Step 1: Install dependencies

```powershell
cd c:\Users\test\Downloads\Compressed\Dark-Realm-Saga_2\Dark-Realm-Saga
pnpm install
```

### Step 2: Generate the Android project

```powershell
cd artifacts\mobile
pnpm run build:android
# Equivalent to: npx expo prebuild --platform android --clean
```

This creates `artifacts/mobile/android/` — a full Gradle-based Android project.

**What it does:**
- Reads `app.json` for Android config (package name, SDK versions, icons, splash)
- Generates `android/app/src/main/AndroidManifest.xml`
- Copies adaptive icons into `android/app/src/main/res/`
- Sets up `build.gradle` with the correct SDK versions
- Creates native entry point (MainApplication + MainActivity)

### Step 3: Open in Android Studio

```powershell
# Open the generated project
studio64.exe artifacts\mobile\android
# Or from Android Studio: File → Open → select the android/ folder
```

Wait for Gradle sync to complete (first time may take 5–10 minutes).

### Step 4: Create an Android Emulator

In Android Studio:
1. Tools → Device Manager → Create Device
2. Pick a phone (e.g., Pixel 7)
3. Select system image: **API 35** (Android 15)
4. Finish and start the emulator

### Step 5: Build and run on emulator

**Option A: From Android Studio**
- Click ▶ Run (or Shift+F10)
- Select the running emulator as target

**Option B: From command line**
```powershell
cd artifacts\mobile
pnpm run android:emulator
# Equivalent to: npx expo run:android
```

This starts Metro bundler, builds the APK, installs it on the emulator, and launches the app.

### Step 6: Test on a real Android device

1. **Enable Developer Options** on the device:
   - Settings → About Phone → tap Build Number 7 times
2. **Enable USB Debugging**:
   - Settings → Developer Options → USB Debugging → On
3. **Connect via USB** (or Wi-Fi debugging on Android 11+)
4. Verify device is detected:
   ```powershell
   adb devices
   ```
5. Run on device:
   ```powershell
   cd artifacts\mobile
   pnpm run android:device
   # Equivalent to: npx expo run:android --device
   ```

### Step 7: Sync assets after changes

If you change `app.json` (icons, splash, package name, etc.):

```powershell
cd artifacts\mobile
pnpm run build:android
# This regenerates the android/ folder with --clean
```

If you only change JS/TS code (no native config changes), just reload in the app:
- Press `R` twice in the Metro terminal, or shake device → Reload

---

## Step-by-Step: EAS Build (Cloud, Recommended for Release)

### Step 1: Install EAS CLI

```powershell
npm install -g eas-cli
```

### Step 2: Log in to Expo

```powershell
eas login
```

### Step 3: Link the project

```powershell
cd artifacts\mobile
eas init
```

### Step 4: Preview APK for device testing

```powershell
eas build --platform android --profile preview
```

This produces an APK you can download and install directly on any device.

### Step 5: Production AAB for Play Store

```powershell
eas build --platform android --profile production
```

This produces a signed `.aab` ready for Google Play upload.

### Step 6: Submit to Play Store (optional automation)

```powershell
eas submit --platform android
```

Requires `google-service-account.json` in the mobile directory (see `eas.json`).

---

## Creating a Release Build Later

### Option A: EAS Build (easiest)

```powershell
cd artifacts\mobile
# Bump version in app.json first
eas build --platform android --profile production
# Download the .aab from the Expo dashboard
```

### Option B: Local release build

```powershell
cd artifacts\mobile\android
.\gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

For an AAB (required by Play Store):
```powershell
.\gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

**Signing:** The first EAS production build auto-generates a keystore. Back it up:
```powershell
eas credentials
# Follow prompts to download the keystore file
```

**⚠️ If you lose the keystore, you can never update the app on Google Play.** Store it somewhere safe (encrypted backup, not just on one machine).

---

## Web Build (Unchanged)

The web build is completely separate and unaffected:

```powershell
cd artifacts\mobile
pnpm run build:web
# Output: dist/ folder with static HTML/JS/CSS
```

This remains the same. The Android build does not touch the web output.

---

## Google Play Publishing Checklist

### Before first submission

- [ ] **Final app icon** — Replace placeholder with polished art (1024×1024 source)
- [ ] **Adaptive icon** — Foreground with transparent background, safe zone
- [ ] **Store screenshots** — Minimum 2, recommended 4–8 (phone, 16:9 aspect)
- [ ] **Feature graphic** — 1024×500 banner for Play Store top of listing
- [ ] **Privacy policy URL** — Must be publicly accessible (use the included `privacy-policy.html` hosted somewhere)
- [ ] **Short description** — Under 80 characters
- [ ] **Full description** — Dark fantasy survival RPG description
- [ ] **Content rating** — Complete IARC questionnaire (violence, horror themes = likely PEGI 16 / ESRB T)
- [ ] **Data safety** — Declare: no data collection, no data sharing, local-only saves
- [ ] **Google Play account** — One-time $25 registration fee

### Release flow

1. Upload AAB to **Internal Testing** track
2. Install on 2–3 real devices, verify:
   - Splash screen appears and transitions correctly
   - Story loads, choices work, dice rolls animate
   - Save/load works across app restarts
   - No crashes on screen rotation (portrait-locked)
   - Back button behavior is correct
3. Promote to **Closed Testing** → **Open Testing** → **Production**

### Version bumps

Every Play upload requires a higher `versionCode`:
```json
// app.json
"versionCode": 2  // was 1
```

Also update `version` if it's a user-facing change:
```json
"version": "1.1.0"  // was 1.0.0
```

---

## What Still Needs to Be Done Before Google Play Release

### High Priority
1. Replace placeholder app icon with final polished artwork
2. Create proper adaptive icon foreground (safe zone compliant)
3. Host the privacy policy at a public URL
4. Prepare store screenshots (show menu, choices, stats, endings, dice roll)
5. Create feature graphic (1024×500)
6. Complete IARC content rating form
7. Complete Google Play data safety form
8. Test release build on at least 2 real Android devices
9. Back up the signing keystore

### Medium Priority
10. Add real gameplay screenshots to PWA manifest (currently uses icon placeholder)
11. Test keyboard handling in CharacterCreator on small devices
12. Verify service worker offline behavior on Android WebView
13. Test notification icons (currently placeholder 24×24 and 36×36)
14. Consider adding `expo-updates` for OTA JS updates without Play Store review

### Low Priority
15. Add Android-specific splash screen animation (currently uses static icon)
16. Consider Android App Bundle size optimization (remove unused densities)
17. Add ProGuard/R8 minification rules for smaller APK
18. Set up CI/CD for automated builds

---

## Quick Reference: Key Files

| File | Purpose |
|------|---------|
| `app.json` | Expo config: Android package, SDK versions, icons, splash |
| `eas.json` | EAS Build profiles: development, preview, production |
| `public/manifest.json` | PWA manifest for web/Chrome |
| `public/sw.js` | Service worker for offline web |
| `app/+html.tsx` | Web HTML shell: viewport, safe-area, touch CSS |
| `assets/icons/` | Android adaptive icons, launcher icons, notification icons |
| `assets/images/` | Game background art + app icon source |
| `public/` | Web-accessible static files (icons, favicon, manifest, SW) |
| `constants/version.ts` | Version string displayed in-game |

---

## Notes

- `versionCode` must increase for every Play upload (even for hotfixes).
- The web build (`pnpm run build:web`) is completely separate from the Android build.
- The game is offline-friendly: all story data is bundled in JS, no server needed mid-game.
- `allowBackup: false` prevents Android from restoring old save data across installs.
- `softwareKeyboardLayoutMode: "pan"` ensures the keyboard doesn't overlap story text.
