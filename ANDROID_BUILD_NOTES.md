# Android Build Notes — Scars of the Last Kingdom
## Public Prototype · v1.0 · May 2026

---

## ⚠️ Important: This is an Expo App, Not a Capacitor App

**Capacitor cannot be used with this project.** Capacitor wraps standard web apps
inside a WebView. This project is a **React Native + Expo** app, so the correct
Android path is **EAS Build** or **expo prebuild + Android Studio**.

The web version is fully preserved and not affected by Android publishing.

---

## What Is Already Configured

| Area | Status | Location |
|------|--------|----------|
| Android package name | ✅ `com.scarsofthelastkingdom.app` | `app.json` |
| Android min SDK | ✅ 24 | `app.json` |
| Android target SDK | ✅ 35 | `app.json` |
| Android compile SDK | ✅ 35 | `app.json` |
| App version | ✅ `1.0.0` / version code `1` | `app.json` |
| Adaptive icon | ✅ Foreground + `#04020a` background | `app.json` |
| Splash screen | ✅ All densities configured | `app.json` |
| Portrait lock | ✅ | `app.json` |
| Backup disabled | ✅ `allowBackup: false` | `app.json` |
| Dangerous permissions blocked | ✅ Audio, Camera, Contacts | `app.json` |
| PWA manifest | ✅ `id`, icons, theme | `public/manifest.json` |
| Service worker | ✅ Offline shell + game art cache | `public/sw.js` |
| Mobile viewport | ✅ `viewport-fit=cover` | `app/+html.tsx` |
| Safe-area CSS | ✅ Safe-area variables and helpers | `app/+html.tsx` |
| Touch CSS resets | ✅ Tap, selection, overscroll handling | `app/+html.tsx` |
| EAS build config | ✅ dev / preview / production profiles | `eas.json` |

---

## Fastest Path to Google Play

### 1) Create a Google Play Developer account

- Sign up at https://play.google.com/console
- Pay the one-time registration fee
- Verify your identity and payment profile

### 2) Prepare release assets

You need these before the first submission:
- Final 1024×1024 app icon
- Adaptive icon foreground/background
- Store screenshots
- Feature graphic
- Privacy policy URL
- Short description
- Full description
- Content rating answers
- Data safety answers

### 3) Build the Android App Bundle

Recommended:

```bash
cd artifacts/mobile
eas login
npx eas-cli build --platform android --profile production
```

This creates a signed `.aab` for Google Play.

### 4) Upload to Play Console

In Play Console:
- Create app
- Enter package name: `com.scarsofthelastkingdom.app`
- Add store listing details
- Complete content rating
- Complete data safety
- Upload the `.aab`
- Submit first to Internal Testing
- Then Closed/Open Testing
- Then Production

---

## EAS Build (Recommended)

### Install EAS CLI

```bash
npm install -g eas-cli
```

### Log in

```bash
eas login
```

### Link the project

```bash
cd artifacts/mobile
eas init
```

### Preview APK for device testing

```bash
eas build --platform android --profile preview
```

### Production AAB for Play Store

```bash
eas build --platform android --profile production
```

### Optional submission automation

```bash
eas submit --platform android
```

---

## Local Build with expo prebuild

### Generate Android project

```bash
cd artifacts/mobile
npx expo prebuild --platform android --clean
```

### Open in Android Studio

```bash
open -a "Android Studio" artifacts/mobile/android
```

### Run on emulator

```bash
cd artifacts/mobile
npx expo run:android
```

### Run on a real device

```bash
cd artifacts/mobile
npx expo run:android --device
```

---

## Play Console Publishing Checklist

### Store listing
- App title: **Scars of the Last Kingdom**
- Short description: concise, accurate, under 80 characters
- Full description: dark fantasy survival RPG with branching choices
- Screenshots: show menu, choices, stats, endings, settings
- Icon: use final polished app icon

### Content
- Add a clear content warning
- Complete IARC rating
- Confirm age suitability

### Data safety
- Declare local-only save data
- Declare no personal data collection
- Declare no data sharing

### Privacy
- Publish a privacy policy URL
- Explain save storage and any future analytics changes

### Release
- Upload AAB
- Start with Internal Testing
- Test install on real device
- Promote to Production only after verification

---

## What Still Needs to Be Done Before First Public Release

- Replace the placeholder app icon with final art
- Create final adaptive icon foreground/background
- Add a hosted privacy policy URL
- Prepare store screenshots and feature graphic
- Fill Play Console content rating and data safety forms
- Create the Google Play account if not already done
- Test the release build on a real Android device
- Back up the signing keystore

---

## Notes

- `versionCode` must be increased for every Play upload.
- Keep the web build separate from the Android release flow.
- The current build is offline-friendly and uses local saves only.
