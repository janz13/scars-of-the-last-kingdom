# Android Build Notes — Scars of the Last Kingdom

This document explains how to get from the current Expo project to a
signed Android APK or AAB that can be submitted to the Play Store.

Two approaches are covered:

1. **EAS Build** — the Expo-native path. Recommended. No extra tools needed.
2. **Capacitor** — wraps the web export in a WebView shell. Works if you
   need to decouple from Expo or want a plain HTML/JS APK.

---

## Option A — EAS Build (Recommended)

EAS Build is Expo's managed cloud build service. It handles the Android
SDK, keystore signing, Gradle, and APK/AAB generation in the cloud. You
don't need Android Studio or a local Android SDK installation.

### Prerequisites

- Node.js 18+ and pnpm installed
- An Expo account (free at expo.dev)
- `eas-cli` installed globally: `npm install -g eas-cli`

### Steps

#### 1. Log in to Expo

```bash
eas login
```

#### 2. Configure the project

Inside `artifacts/mobile/`:

```bash
cd artifacts/mobile
eas build:configure
```

This creates `eas.json` with build profiles. The defaults work for most cases.
A minimal `eas.json` looks like:

```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "app-bundle" }
    }
  },
  "submit": {
    "production": {}
  }
}
```

#### 3. Build a preview APK (side-loadable, no Play Store)

```bash
eas build --platform android --profile preview
```

EAS builds in the cloud and emails you a download link when done.
The APK can be installed directly on any Android device.

#### 4. Build a production AAB (for Play Store)

```bash
eas build --platform android --profile production
```

EAS generates a signed AAB. Upload it to Google Play Console.

#### 5. Submit to Play Store directly (optional)

```bash
eas submit --platform android
```

Requires a Google Play service account JSON key configured in your EAS project.

### Keystore

EAS manages your keystore by default — it generates one the first time
and stores it encrypted on Expo's servers. **Download a backup copy** from
expo.dev/projects → your project → Credentials → Android Keystore.
Losing the keystore means you can't update the Play Store listing.

### app.json fields that matter for Android

All the relevant fields are already filled in `app.json`:

| Field | Value | Why |
|---|---|---|
| `android.package` | `com.scarsofthelastkingdom.app` | Play Store unique ID |
| `android.versionCode` | `1` | Increment by 1 with every Play Store upload |
| `android.adaptiveIcon` | `icon.png` + `#04020a` | Home screen icon on Android 8+ |
| `android.minSdkVersion` | `24` | Android 7.0+ (covers ~95% of active devices) |
| `android.targetSdkVersion` | `35` | Required by Play Store as of 2024 |
| `android.permissions` | `[]` | No permissions declared → none requested |
| `splash.backgroundColor` | `#04020a` | Dark splash matches the game |

### Before first Play Store submission

Replace the placeholder icon with a proper one:

- `assets/images/icon.png` — 1024×1024 px, no rounded corners, no alpha channel
  (Play Store adds the rounding and shape mask itself)
- `assets/images/adaptive-icon.png` — 1024×1024 px, transparent background,
  foreground art centred in the inner 66% safe zone (Android clips the edges)

The current `icon.png` is used as a placeholder for both. Replace both files
and run a new EAS build.

---

## Option B — Capacitor (WebView Wrapper)

Use this if you want to export the game as a static web bundle and wrap it
in a native Android WebView shell, without Expo's native modules.

Capacitor ships a thin native shell (an Android Studio project) that loads
your web build in a WebView. The web app runs as if it were in a browser,
but it's packaged as an APK and has access to native plugins via a bridge.

### Prerequisites

- Android Studio (latest stable) installed locally
- Android SDK with API level 35
- Java 17 (bundled with modern Android Studio)
- Node.js 18+ and pnpm

### Steps

#### 1. Export the web build from Expo

Inside `artifacts/mobile/`:

```bash
pnpm exec expo export --platform web
```

This produces a `dist/` folder containing `index.html`, `_expo/`, and your
static assets. Everything the game needs to run is in this folder.

#### 2. Install Capacitor

In `artifacts/mobile/` (or a new directory if you prefer to keep them separate):

```bash
pnpm add @capacitor/core
pnpm add -D @capacitor/cli @capacitor/android
```

#### 3. Initialise Capacitor

```bash
pnpm exec cap init "Scars of the Last Kingdom" "com.scarsofthelastkingdom.app" \
  --web-dir dist
```

This creates `capacitor.config.json` (or `capacitor.config.ts`).

Minimal config:

```json
{
  "appId": "com.scarsofthelastkingdom.app",
  "appName": "Scars of the Last Kingdom",
  "webDir": "dist",
  "server": {
    "androidScheme": "https"
  },
  "android": {
    "backgroundColor": "#04020a"
  }
}
```

#### 4. Add the Android platform

```bash
pnpm exec cap add android
```

This generates an `android/` directory — a standard Android Studio Gradle project.

#### 5. Copy the web build into the Android project

Every time you rebuild the web export, run:

```bash
pnpm exec expo export --platform web
pnpm exec cap copy android
```

#### 6. Open in Android Studio and build the APK

```bash
pnpm exec cap open android
```

Inside Android Studio:
- Wait for Gradle sync to finish
- Build → Generate Signed Bundle / APK → APK
- Follow the keystore wizard to create or select a signing key
- Choose `release` variant
- The APK appears in `android/app/build/outputs/apk/release/`

#### 7. Install on a device for testing

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

Or enable "Install unknown apps" on the device and copy the APK directly.

### Capacitor plugins available

If you later need device features add these as needed:

```bash
pnpm add @capacitor/storage    # replaces AsyncStorage for native key/value
pnpm add @capacitor/haptics    # vibration / haptic feedback
pnpm add @capacitor/status-bar # control Android status bar colour
pnpm exec cap sync android     # syncs plugins into the Android project
```

---

## Comparison

| | EAS Build | Capacitor |
|---|---|---|
| Requires Android Studio | No | Yes |
| Builds run locally | No (cloud) | Yes |
| Uses Expo native modules | Yes | No |
| Full React Native performance | Yes | No (WebView) |
| Setup complexity | Low | Medium |
| Best for | Production release | Quick web-to-APK wrap |

**For this project, EAS Build is the better path** because the game already
uses React Native with native animations, `expo-linear-gradient`, Reanimated,
and safe-area context — all of which won't work inside a Capacitor WebView.
The Capacitor route would require removing all React Native dependencies and
rewriting components in plain React + CSS.

---

## Offline Support (both approaches)

The game is already offline-capable:

- All story data (`storyNodes.ts`, `endings.ts`) is bundled into the JS at
  build time — no API calls needed during gameplay.
- `AsyncStorage` persists save data locally on the device.
- The service worker (`public/sw.js`) caches the web shell for the PWA version.
- Background images are bundled assets, not remote URLs.

No additional offline work is needed before shipping.

---

## Checklist Before First Release

- [ ] Replace `assets/images/icon.png` with final 1024×1024 icon art
- [ ] Create `assets/images/adaptive-icon.png` (foreground, transparent bg)
- [ ] Increment `android.versionCode` in `app.json` for each build uploaded to Play Store
- [ ] Increment `version` string for player-visible version number
- [ ] Download and back up the EAS keystore from expo.dev
- [ ] Test on a physical Android device (not just the Expo preview)
- [ ] Set `android.allowBackup: false` if save data should not be backed up to Google (already set)
- [ ] Review Google Play content rating questionnaire (violence/dark themes)
- [ ] Write a Play Store description and take screenshots on a Pixel device
