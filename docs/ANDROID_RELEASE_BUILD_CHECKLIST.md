# Android Release Build Checklist — Scars of the Last Kingdom

## ⚠️ Capacitor Is Not Used

This is a **React Native + Expo** app. Capacitor wraps web apps in a WebView and cannot be used here.
The Android build uses **`expo prebuild`** (local) or **EAS Build** (cloud).

---

## Pre-Build Verification

### 1. Verify package name

```powershell
# Check app.json android.package
findstr "package" artifacts\mobile\app.json
```

- [ ] **Expected:** `com.scarsofthelastkingdom.app`
- [ ] **File:** `artifacts/mobile/app.json` line ~30

### 2. Verify app name

```powershell
findstr '"name"' artifacts\mobile\app.json
```

- [ ] **Expected:** `Scars of the Last Kingdom` (expo.name)
- [ ] **Slug:** `scars-of-the-last-kingdom`

### 3. Verify version number

```powershell
findstr "version" artifacts\mobile\app.json
```

- [ ] **version:** `1.0.0`
- [ ] **versionCode:** `1`
- [ ] **buildNumber:** `1`
- [ ] Every Play upload requires incrementing `versionCode`

### 4. Verify app icons

```powershell
dir artifacts\mobile\assets\icons\
```

Required files:
- [ ] `adaptive-foreground.png` — adaptive icon foreground (safe zone compliant)
- [ ] `adaptive-background.png` — adaptive icon background
- [ ] `icon-1024.png` — 1024×1024 source icon
- [ ] `icon-192.png` — 192×192 launcher icon
- [ ] `icon-512.png` — 512×512 store icon
- [ ] `apple-touch-icon.png` — iOS home screen (not needed for Android but keep)
- [ ] `launcher-mdpi.png` through `launcher-xxxhdpi.png` — all densities

Also verify public/ has web-accessible copies:
- [ ] `public/icon-192.png`
- [ ] `public/icon-512.png`
- [ ] `public/icon-1024.png`
- [ ] `public/favicon.ico`
- [ ] `public/apple-touch-icon.png`

### 5. Verify splash screen

```powershell
findstr "splash" artifacts\mobile\app.json
```

- [ ] Splash image: `./assets/images/icon.png`
- [ ] `resizeMode: "contain"`
- [ ] `backgroundColor: "#04020a"` (matches game bg)
- [ ] All density variants configured (mdpi through xxxhdpi)

### 6. Verify no debug-only UI visible by default

- [ ] `DeveloperPanel.tsx` is **never imported** in any routed component
- [ ] `'developer'` screen type exists but is **never routed** in `app/(tabs)/index.tsx`
- [ ] No `console.log` statements in components (only `console.warn` in saveSystem)
- [ ] StoryPanel, MainMenu, EndingScreen, SettingsPanel have zero dev/debug references
- [ ] Build with `--no-dev --minify` to strip any remaining dev artifacts

### 7. Verify offline assets work

- [ ] Service worker (`public/sw.js`) pre-caches app shell + game art
- [ ] Cache version is current (`sotlk-v3`)
- [ ] All background images in `assets/images/` are bundled by Metro via `require()`
- [ ] No runtime `fetch()` calls to external URLs during gameplay
- [ ] Story data is compiled into JS bundles — no network needed mid-game
- [ ] Test: enable airplane mode after first load → game should continue working

### 8. Verify localStorage/AsyncStorage save data works in Android

- [ ] Save system uses `@react-native-async-storage/async-storage` (not localStorage)
- [ ] AsyncStorage works natively on Android (not WebView-dependent)
- [ ] `SAVE_KEY = '@scars_save_v1'` — single save slot
- [ ] `ENDINGS_KEY = '@scars_endings_v1'` — separate endings persistence
- [ ] `CONTENT_WARNING_KEY = '@scars_content_warning_v1'`
- [ ] `migrateSave()` handles old saves with missing fields (fontSize, etc.)
- [ ] `allowBackup: false` prevents Android from restoring stale saves
- [ ] Test: save → kill app → reopen → continue game → verify state intact
- [ ] Test: save → force stop → reopen → continue game → verify state intact

---

## Build Commands

### Option A: EAS Build (Recommended for Release)

```powershell
# Step 1: Install EAS CLI (one-time)
npm install -g eas-cli

# Step 2: Log in to Expo
eas login

# Step 3: Initialize (one-time, links project to Expo)
cd artifacts\mobile
eas init

# Step 4: Preview APK for device testing
eas build --platform android --profile preview
# → Downloads an APK you can sideload on any device

# Step 5: Production AAB for Play Store
eas build --platform android --profile production
# → Downloads a signed .aab ready for Play Console upload
```

### Option B: Local Build with expo prebuild

```powershell
# Step 1: Install dependencies
cd c:\Users\test\Downloads\Compressed\Dark-Realm-Saga_2\Dark-Realm-Saga
pnpm install

# Step 2: Generate Android project
cd artifacts\mobile
pnpm run build:android
# Equivalent to: npx expo prebuild --platform android --clean

# Step 3: Open in Android Studio
studio64.exe artifacts\mobile\android
# Wait for Gradle sync

# Step 4: Build debug APK (for testing)
cd artifacts\mobile\android
.\gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk

# Step 5: Build release AAB (for Play Store)
.\gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab

# Step 6: Build release APK (for direct distribution)
.\gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

### Verify production build command

```powershell
# EAS (cloud)
eas build --platform android --profile production

# Local
cd artifacts\mobile\android && .\gradlew bundleRelease
```

- [ ] EAS production profile outputs `.aab` (not `.apk`)
- [ ] Local `bundleRelease` outputs `.aab`
- [ ] Both methods produce a build with `--no-dev --minify`

### Verify Android sync command

After changing `app.json` (icons, splash, package name, permissions):

```powershell
cd artifacts\mobile
npx expo prebuild --platform android --clean
```

This regenerates the `android/` folder. **Always use `--clean`** to avoid stale configs.

- [ ] After prebuild, verify `android/app/src/main/AndroidManifest.xml` has correct package
- [ ] Verify `android/app/build.gradle` has correct `compileSdkVersion`, `targetSdkVersion`, `minSdkVersion`
- [ ] Verify adaptive icons are in `android/app/src/main/res/`

---

## Release Build Notes

### Signing

- [ ] **EAS Build:** Auto-generates keystore on first production build. Back it up:
  ```powershell
  eas credentials
  ```
- [ ] **Local build:** Create a keystore:
  ```powershell
  keytool -genkey -v -keystore scars-release.keystore -alias scars -keyalg RSA -keysize 2048 -validity 10000
  ```
  Then configure `android/gradle.properties` with:
  ```
  MYAPP_UPLOAD_STORE_FILE=scars-release.keystore
  MYAPP_UPLOAD_STORE_PASSWORD=***
  MYAPP_UPLOAD_KEY_ALIAS=scars
  MYAPP_UPLOAD_KEY_PASSWORD=***
  ```

⚠️ **If you lose the keystore, you can NEVER update the app on Google Play.**
Store it in at least two separate encrypted locations.

### Version bumps

Every Play upload requires:
```json
// app.json
"versionCode": 2,    // increment for every upload
"version": "1.1.0"   // increment for user-visible changes
```

### Build size

- [ ] Current AAB size estimate: 30–50 MB (pixel-art images + JS bundles)
- [ ] Consider ProGuard/R8 minification for smaller APK
- [ ] Remove unused density assets if size is a concern

### Android-specific checks

- [ ] `compileSdkVersion: 35` (Android 15)
- [ ] `targetSdkVersion: 35` (required for new Play Store submissions)
- [ ] `minSdkVersion: 24` (Android 7.0+, covers 99%+ of devices)
- [ ] `allowBackup: false` (prevents stale save restoration)
- [ ] `softwareKeyboardLayoutMode: "pan"` (keyboard doesn't overlap story text)
- [ ] Portrait lock enforced in `app.json` orientation
- [ ] Blocked permissions: RECORD_AUDIO, CAMERA, READ_CONTACTS
- [ ] No dangerous permissions requested

---

## Post-Build Verification

- [ ] Install APK on a real Android device (API 24+ and API 35)
- [ ] Splash screen appears and transitions to main menu
- [ ] New game → character creation → first story node loads
- [ ] Choices work, dice rolls animate, stats update
- [ ] Save → kill app → continue game → state is correct
- [ ] Enable airplane mode → game continues working offline
- [ ] Back button behavior: returns to previous screen (not exit)
- [ ] No crashes on screen rotation (portrait-locked)
- [ ] No console errors in `adb logcat`
- [ ] App icon appears correctly in launcher and task switcher
- [ ] Notification icon is visible (placeholder 24×24 / 36×36)

---

## Quick Reference

| Item | Value |
|------|-------|
| Package name | `com.scarsofthelastkingdom.app` |
| App name | Scars of the Last Kingdom |
| Version | 1.0.0 |
| Version code | 1 |
| Min SDK | 24 (Android 7.0) |
| Target SDK | 35 (Android 15) |
| Compile SDK | 35 |
| Orientation | Portrait |
| Backup | Disabled |
| Keyboard | Pan mode |
| Build system | Expo / EAS Build |
| Output format | AAB (production) / APK (preview) |
