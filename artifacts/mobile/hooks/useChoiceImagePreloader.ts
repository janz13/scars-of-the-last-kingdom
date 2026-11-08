/**
 * Choice Scene Image Preloader Hook — Scars of the Last Kingdom
 * Preloads background images and chapters for available choices in the current story scene
 * using browser DOM Image instantiation and ExpoImage.prefetch().
 */

import { useEffect } from 'react';
import { Image, Platform } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import type { Choice, GameState } from '../data/types';
import { getBackgroundImage } from '../constants/images';
import {
  extractDestinationImageKeys,
  extractDestinationNodeIds,
} from '../logic/imagePreloader';
import {
  getChapterForNode,
  isChapterLoaded,
  loadChapter,
} from '../data/story/chapterLoader';

// Session-level deduplication set: once a URI is preloaded, don't re-fetch
const sessionPreloadedUris = new Set<string>();

/**
 * Resolves a React Native require() asset or ImageSource to a string URI.
 */
export function resolveImageUri(source: any): string | null {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (typeof source === 'object' && typeof source.uri === 'string') return source.uri;

  // 1. Standard React Native / Expo Image.resolveAssetSource
  try {
    if (typeof (Image as any).resolveAssetSource === 'function') {
      const resolved = (Image as any).resolveAssetSource(source);
      if (resolved?.uri) return resolved.uri;
    }
  } catch {
    // Non-fatal fallback
  }

  // 2. React Native Web asset registry fallback if source is an asset ID number
  if (typeof source === 'number') {
    try {
      const { getAssetByID } = require('@react-native/assets-registry/registry');
      const asset = getAssetByID(source);
      if (asset) {
        const scale = asset.scales?.[0] ?? 1;
        const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
        return `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}`;
      }
    } catch {
      // Non-fatal
    }
  }

  return null;
}

/**
 * Preloads an image asset using multi-tiered prefetching:
 * 1. Web DOM Image (browser HTTP/memory cache)
 * 2. ExpoImage.prefetch (expo-image memory & disk cache)
 * 3. React Native Web ImageLoader.prefetch
 */
export function preloadImageSource(source: any): void {
  const uri = resolveImageUri(source);
  if (!uri || sessionPreloadedUris.has(uri)) return;

  sessionPreloadedUris.add(uri);

  // 1. Web DOM image prefetch
  if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.Image === 'function') {
    try {
      const img = new window.Image();
      img.src = uri;
    } catch {
      // Non-fatal
    }
  }

  // 2. expo-image memory/disk prefetch (cross-platform)
  if (typeof ExpoImage?.prefetch === 'function') {
    ExpoImage.prefetch(uri).catch(() => {
      // Non-fatal: network drop or invalid URI must never crash app
    });
  }

  // 3. React Native Web prefetch
  if (typeof (Image as any).prefetch === 'function') {
    (Image as any).prefetch(uri)?.catch?.(() => {});
  }
}

/**
 * React hook mounted in StoryPanel to preload all reachable background scene images
 * and proactively trigger chapter preloading for choice destinations.
 */
export function useChoiceImagePreloader(
  availableChoices: Array<{ choice: Choice } | Choice> | undefined | null,
  state?: GameState,
  currentImageKey?: string
) {
  useEffect(() => {
    if (!availableChoices || availableChoices.length === 0) return;

    try {
      // 1. Preload reachable chapter code chunks
      const destNodeIds = extractDestinationNodeIds(availableChoices, state);
      for (const destId of destNodeIds) {
        const chapter = getChapterForNode(destId);
        if (chapter && !isChapterLoaded(chapter)) {
          void loadChapter(chapter);
        }
      }

      // 2. Preload reachable scene background images
      const imageKeys = extractDestinationImageKeys(availableChoices, undefined, currentImageKey, state);

      for (const key of imageKeys) {
        const source = getBackgroundImage(key);
        if (source) {
          preloadImageSource(source);
        }
      }
    } catch (err) {
      // Safety boundary: preloading is a progressive enhancement and must never throw
      if (__DEV__) {
        console.warn('Image preloading encountered an error:', err);
      }
    }
  }, [availableChoices, state?.currentNodeId, currentImageKey]);
}
