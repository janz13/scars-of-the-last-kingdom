import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * Custom HTML shell for the Expo web export.
 *
 * This file only runs during the web build — it has no effect on the
 * native Android / iOS builds. It controls the <html>, <head>, and
 * outer <body> wrapper of the generated web page.
 *
 * Handles:
 *  - Mobile viewport (no zoom, viewport-fit=cover for notch/island)
 *  - Theme color (dark, matches the game background)
 *  - Apple PWA meta (standalone, status bar, touch icon)
 *  - PWA manifest link
 *  - Service worker registration for offline support
 *  - Touch and selection CSS resets for a native app feel
 *  - Safe-area CSS custom properties
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        {/* ── Encoding & compatibility ──────────────────────────────── */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ── Mobile viewport ───────────────────────────────────────── */}
        {/*
          width=device-width  — match the physical screen width
          initial-scale=1     — no default zoom
          maximum-scale=1     — prevent pinch-zoom (game UI, not a document)
          user-scalable=no    — same; intentional for this app type
          viewport-fit=cover  — extend into notch / island / rounded corners
        */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />

        {/* ── Theme color (browser chrome, Android task switcher) ───── */}
        <meta name="theme-color" content="#04020a" />
        <meta name="msapplication-TileColor" content="#04020a" />
        <meta name="msapplication-navbutton-color" content="#04020a" />

        {/* ── Apple PWA meta ────────────────────────────────────────── */}
        {/* "standalone" hides Safari UI — feels like a native app */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Scars" />

        {/* ── Apple touch icon (home screen icon on iOS) ────────────── */}
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* ── PWA manifest ─────────────────────────────────────────── */}
        <link rel="manifest" href="/manifest.json" />

        {/* ── Favicon ──────────────────────────────────────────────── */}
        <link rel="icon" type="image/png" href="/favicon.ico" />

        {/* ── Page metadata ─────────────────────────────────────────── */}
        <title>Scars of the Last Kingdom</title>
        <meta
          name="description"
          content="A dark fantasy survival visual novel RPG. Make choices. Survive the surface. Carry the mark."
        />

        {/* ── Expo scroll-view reset (prevents double scroll on web) ── */}
        <ScrollViewStyleReset />

        {/* ── Global CSS: touch, safe area, selection resets ───────── */}
        <style>{`
          /*
           * Safe-area custom properties.
           * Components can use var(--safe-area-top) etc. for inset-aware layout.
           * The env() values are populated by the browser from viewport-fit=cover.
           */
          :root {
            --safe-area-top:    env(safe-area-inset-top,    0px);
            --safe-area-right:  env(safe-area-inset-right,  0px);
            --safe-area-bottom: env(safe-area-inset-bottom, 0px);
            --safe-area-left:   env(safe-area-inset-left,   0px);
          }

          /* Hard reset — every element sits behind the safe-area guard */
          *, *::before, *::after {
            box-sizing: border-box;
          }

          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;             /* game is full-viewport, no scroll */
            background-color: #04020a;    /* matches splash & game bg */
            color: #ede0c4;               /* default text colour */
          }

          #root {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
          }

          /*
           * Touch optimisation.
           * -webkit-tap-highlight-color: transparent  — removes the grey flash
           *   on tap that browsers add by default.
           * touch-action: manipulation  — enables tap and double-tap but
           *   disables pan/zoom gestures (the game manages its own scrolling).
           * -webkit-user-select: none   — prevents accidental text selection
           *   on long-press, which would break tap-hold interactions.
           */
          * {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
            touch-action: manipulation;
          }

          /*
           * Re-enable text selection for any element that explicitly needs it.
           * Use class="selectable" on inputs or copy-able text.
           */
          .selectable {
            -webkit-user-select: text;
            user-select: text;
          }

          /* Prevent overscroll / rubber-band on iOS (body level) */
          body {
            overscroll-behavior: none;
            -webkit-overflow-scrolling: touch;
          }

          /* Scrollable containers inside the game (choice lists, etc.)
             should use this class to get momentum scrolling on iOS */
          .scroll-container {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: contain;
          }

          /*
           * Safe-area padding helpers.
           * Use these classes on the outermost layout containers so content
           * never hides behind a notch, camera punch-out, or home indicator.
           */
          .safe-top    { padding-top:    env(safe-area-inset-top,    0px); }
          .safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
          .safe-left   { padding-left:   env(safe-area-inset-left,   0px); }
          .safe-right  { padding-right:  env(safe-area-inset-right,  0px); }
          .safe-all {
            padding-top:    env(safe-area-inset-top,    0px);
            padding-right:  env(safe-area-inset-right,  0px);
            padding-bottom: env(safe-area-inset-bottom, 0px);
            padding-left:   env(safe-area-inset-left,   0px);
          }

          /* Remove default focus ring on touch (re-enable for keyboard nav) */
          *:focus {
            outline: none;
          }
          *:focus-visible {
            outline: 2px solid #9b59b6;
            outline-offset: 2px;
          }

          /* Smooth image rendering for the background art */
          img {
            -webkit-user-drag: none;
            user-drag: none;
            image-rendering: auto;
          }
        `}</style>

        {/* ── Service worker registration ───────────────────────────── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) {
                      console.log('[SW] Registered:', reg.scope);
                    })
                    .catch(function(err) {
                      console.log('[SW] Registration failed:', err);
                    });
                });
              }
            `,
          }}
        />
      </head>

      <body style={{ height: '100%', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
