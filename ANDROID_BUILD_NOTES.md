# Android Build Notes — Scars of the Last Kingdom
## Public Prototype · v1.0 · May 2026

---

## ⚠️ Important: This is an Expo App, Not a Capacitor App

**Capacitor cannot be used with this project.** Capacitor wraps standard web apps
(HTML/CSS/JS built with React, Vue, Angular, etc.) inside a WebView. This project is
a **React Native + Expo** app — it compiles directly to native Android code via the
React Native bridge. Using Capacitor here would mean discarding the native engine and
running everything inside a WebView, losing performance, AsyncStorage compatibility,
safe-area handling, and touch responsiveness.

The correct Android build pipeline for this project is **Expo Application Services (EAS)**
or **expo prebuild + Android Studio**. Both are covered below.

The web version is fully preserved — Expo's web output is a completely separate
code path and is not affected by the Android build at all.

---

## What Is Already Configured

Before you run a single command, this project already has:

| Area | Status | Location |
|------|--------|----------|
| Android package name | ✅ `com.scarsofthelastkingdom.app` | `app.json` |
| Android min SDK | ✅ 24 (Android 7.0+, ~97% of devices) | `app.json` |
| Android target SDK | ✅ 35 (Android 15) | `app.json` |
| Android compile SDK | ✅ 35 | `app.json` |
| App version | ✅ `1.0.0` / version code `1` | `app.json` |
| Adaptive icon | ✅ Foreground + `#04020a` background | `app.json` |
| Splash screen | ✅ All densities (mdpi–xxxhdpi) configured | `app.json` |
| Portrait lock | ✅ | `app.json` |
| Dark status bar | ✅ `UIStatusBarStyleLightContent` | `app.json` |
| Keyboard behaviour | ✅ `pan` (scrolls rather than resizes) | `app.json` |
| Backup disabled | ✅ `allowBackup: false` | `app.json` |
| Dangerous permissions blocked | ✅ Audio, Camera, Contacts | `app.json` |
| Deep link scheme | ✅ `sotlk://` | `app.json` |
| PWA manifest | ✅ `id`, icons (`any` + `maskable`), theme | `public/manifest.json` |
| Service worker | ✅ Offline shell + all 26 bg images pre-cached | `public/sw.js` |
| Mobile viewport | ✅ `viewport-fit=cover`, no zoom | `app/+html.tsx` |
| Safe-area CSS | ✅ `env(safe-area-inset-*)` vars + helper classes | `app/+html.tsx` |
| Touch CSS resets | ✅ No tap flash, no text selection | `app/+html.tsx` |
| EAS build config | ✅ dev / preview / production profiles | `eas.json` |

---

## Path A — EAS Build (Recommended)

EAS (Expo Application Services) builds your app in the cloud. You do not need
Android Studio, the Android SDK, or Java on your machine.

### Prerequisites

- Node.js 18+ and pnpm
- An Expo account (free at [expo.dev](https://expo.dev))

### Step 1 — Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2 — Log in

```bash
eas login
```

### Step 3 — Link the project to your Expo account

```bash
cd artifacts/mobile
eas init
```

This writes your `projectId` into `app.json`. Commit the change.

### Step 4 — Build a preview APK (for internal testing)

```bash
eas build --platform android --profile preview
```

Produces a `.apk` you can install directly on any Android device.
EAS emails you a download link when the build finishes (usually 5–15 min).

### Step 5 — Install on a real device

Download the APK from the EAS dashboard link, or scan the QR code EAS provides.
On the test device: enable **Settings → Install unknown apps**, then open the APK.

### Step 6 — Build a production AAB (for Google Play)

```bash
eas build --platform android --profile production
```

Produces an `.aab` (Android App Bundle) ready for upload to Google Play Console.

### Step 7 — Submit to Play Store (optional automation)

```bash
eas submit --platform android
```

Requires a Google Play service account JSON key. See
[EAS Submit docs](https://docs.expo.dev/submit/android/) for setup.

### Keystore

EAS generates and stores your keystore automatically. **Download a backup** from
expo.dev → your project → Credentials → Android Keystore.
Losing the keystore means you permanently cannot update your Play Store listing.

---

## Path B — Local Build with expo prebuild

Use this if you want full control over the native Android project, need to edit
Gradle/Manifest files directly, or prefer not to use a cloud build service.

### Prerequisites

| Tool | Version | Download |
|------|---------|---------|
| Java (JDK) | 17 LTS | [adoptium.net](https://adoptium.net) |
| Android Studio | Latest stable | [developer.android.com/studio](https://developer.android.com/studio) |
| Android SDK | API 35 | Install via Android Studio SDK Manager |
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| pnpm | 9+ | `npm install -g pnpm` |

Set these environment variables (add to `~/.bashrc` or `~/.zshrc`):

```bash
export ANDROID_HOME=$HOME/Android/Sdk         # macOS / Linux
# Windows: %LOCALAPPDATA%\Android\Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Step 1 — Install dependencies

From the workspace root:

```bash
pnpm install
```

### Step 2 — Generate the native Android project

```bash
cd artifacts/mobile
npx expo prebuild --platform android --clean
```

This creates a native `android/` folder. Edit native config through `app.json`
plugins rather than directly inside `android/` — `prebuild --clean` regenerates
the folder and will overwrite manual changes.

### Step 3 — Open in Android Studio

```bash
# macOS
open -a "Android Studio" artifacts/mobile/android

# Linux
studio.sh artifacts/mobile/android
```

Or: **File → Open** inside Android Studio, navigate to `artifacts/mobile/android/`.

Wait for Gradle sync to complete (first sync downloads ~2 GB of SDK components).

### Step 4 — Run on emulator

Create an AVD (API 35, x86_64) in Android Studio's AVD Manager, then:

```bash
cd artifacts/mobile
npx expo run:android
```

### Step 5 — Run on a real device

1. On the device: **Settings → Developer options → USB debugging → ON**
2. Connect via USB and accept the RSA key prompt on the device
3. Confirm connection: `adb devices`

```bash
cd artifacts/mobile
npx expo run:android --device
```

---

## Creating a Signed Release Build (Local)

### Step 1 — Generate a keystore

```bash
keytool -genkeypair \
  -v \
  -keystore scars-release.keystore \
  -alias scars-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

> **Critical:** Store this file outside the repo and back it up. Never commit it.
> Losing the keystore means you permanently cannot push updates to Google Play.

### Step 2 — Configure Gradle signing

Edit `artifacts/mobile/android/app/build.gradle`:

```gradle
android {
  signingConfigs {
    release {
      storeFile     file(System.getenv("KEYSTORE_PATH")  ?: "../scars-release.keystore")
      storePassword System.getenv("KEYSTORE_PASS")       ?: "your_store_password"
      keyAlias      System.getenv("KEY_ALIAS")           ?: "scars-key"
      keyPassword   System.getenv("KEY_PASS")            ?: "your_key_password"
    }
  }
  buildTypes {
    release {
      signingConfig signingConfigs.release
      minifyEnabled true
      proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    }
  }
}
```

### Step 3 — Build the release AAB

```bash
cd artifacts/mobile/android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### Step 4 — Build a release APK (for sideloading / QA)

```bash
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## Testing Checklist

Run through this on a physical Android device before submitting to Google Play:

- [ ] App installs from APK without errors
- [ ] Splash screen shows and transitions smoothly to Content Warning
- [ ] Content warning appears on first launch only; does not reappear on relaunch
- [ ] Main menu loads with all buttons visible and correctly styled
- [ ] "Start New Timeline" → character creator → game loop works end-to-end
- [ ] "Continue Journey" loads a saved game correctly
- [ ] All background images load without missing-asset errors
- [ ] Dice roll overlay appears and resolves
- [ ] Settings panel: all toggles persist after app close and reopen
- [ ] "Reset Current Save" confirmation dialog appears before wiping
- [ ] "Reset All Data" wipes save + content warning flag
- [ ] Credits screen accessible from main menu and settings
- [ ] Safe areas respected on notch devices (e.g. Pixel 6/7/8)
- [ ] No text clipped on small screens (5″ / 360 dp width)
- [ ] Portrait lock works — rotating the device does nothing
- [ ] Android back button returns to expected screen (not crash / exit)
- [ ] App resumes correctly after backgrounding for 5+ minutes
- [ ] Offline play works after airplane mode (no network errors)

---

## Google Play Pre-Release Checklist

### Blocking — must be done before first submission

| Item | Notes |
|------|-------|
| **Final app icon** | 1024×1024 px PNG, no transparency, no rounded corners. Replace `assets/images/icon.png`. Play adds rounding automatically. |
| **Adaptive icon layers** | Separate foreground PNG (art centred in 66% safe zone within 108 dp canvas) and background PNG (`#04020a` solid). Update `android.adaptiveIcon` in `app.json`. |
| **Privacy policy** | A hosted URL is required by Google Play. Minimum: list what data the app stores (local saves only, no external transmission). Add the URL to Play Console and `app.json` under `android.privacyPolicyUrl`. |
| **Google Play developer account** | One-time $25 USD registration at [play.google.com/console](https://play.google.com/console). |
| **Content rating questionnaire** | Complete the IARC form in Play Console. Expected rating: **PEGI 16** or **ESRB T/M** due to violence, death, and mental health themes. |
| **Data safety form** | Declare that the app stores data on-device only (AsyncStorage), collects no personal data, and does not share data with third parties. |
| **Target API 35** | ✅ Already set — no action needed. |

### Strongly recommended

| Item | Notes |
|------|-------|
| **Phone screenshots** | 2–8 images at 1080×1920 or 1440×2560. Capture main menu, an in-game choice scene, the endings gallery. |
| **Feature graphic** | 1024×500 JPEG/PNG shown on the Play Store listing banner. |
| **Short description** | 80 chars max. Suggested: *"Dark fantasy RPG. Make choices. Survive the surface. Carry the mark."* |
| **Full description** | Up to 4000 chars. Cover: setting, gameplay loop, endings system, companion system, dice checks, content warning. |
| **App category** | Games → Role Playing |
| **Developer contact email** | Required field on the Play listing. |
| **Keystore backup** | EAS stores it automatically; if building locally, keep the keystore in a password manager with the passwords. |

### After first release

| Item | Notes |
|------|-------|
| **Increment `versionCode`** | Bump `android.versionCode` in `app.json` before every Play Store upload. Current: `1`. |
| **Increment `version`** | Bump the human-readable version string for player-visible changelog entries. |
| **Update SW cache version** | Bump `CACHE_VERSION` in `public/sw.js` (currently `sotlk-v2`) with each release that changes bundled assets. |
| **Crash reporting** | Add `@react-native-firebase/crashlytics` after first public release to monitor production crashes. |
| **ANR / Vitals** | Monitor Android Vitals in Play Console — ANR rate and crash rate must stay below Play's thresholds to avoid listing demotion. |

---

## Web PWA — Current Status

The web version is a fully functional Progressive Web App. No additional PWA
work is needed for the web deploy.

| Feature | Status |
|---------|--------|
| PWA manifest | ✅ Complete — `id`, `display: standalone`, `orientation: portrait` |
| Icon entries | ✅ Separate `any` and `maskable` entries (fixed) |
| Service worker | ✅ Offline shell + all 26 background images pre-cached on first visit |
| Mobile viewport | ✅ `viewport-fit=cover`, `maximum-scale=1`, `user-scalable=no` |
| Theme color | ✅ `#04020a` matches splash and game background |
| Apple PWA meta | ✅ `apple-mobile-web-app-capable`, status bar style, touch icon |
| Safe-area CSS | ✅ `env(safe-area-inset-*)` custom properties + `.safe-top/bottom/left/right/all` helpers |
| Touch CSS | ✅ No tap flash, no text selection, `touch-action: manipulation` |
| Overscroll lock | ✅ `overscroll-behavior: none` on body |
| Focus ring | ✅ Hidden on touch, visible for keyboard navigation |

**To install on Android from Chrome:** address bar overflow → "Add to Home Screen."
Opens full-screen in standalone mode with no browser chrome.

---

## Key Files

```
artifacts/mobile/
├── app.json               ← Expo config: Android package, icons, splash, SDK versions
├── eas.json               ← EAS Build profiles: development / preview / production
├── assets/
│   └── images/
│       └── icon.png       ← App icon placeholder — replace with final art
└── public/
    ├── manifest.json      ← PWA web app manifest
    └── sw.js              ← Service worker: offline + game art caching
```
