/**
 * Fullscreen API wrapper for web and mobile browsers.
 * Supports cross-browser vendor prefixes (webkit, moz, ms) and safely guards
 * on environments without Fullscreen API support (such as iPhone Safari and native apps).
 */

export function isFullscreenSupported(): boolean {
  if (typeof document === 'undefined') return false;
  const doc = document as any;
  const docEl = document.documentElement as any;

  return Boolean(
    doc.fullscreenEnabled ||
    doc.webkitFullscreenEnabled ||
    doc.mozFullScreenEnabled ||
    doc.msFullscreenEnabled ||
    docEl?.requestFullscreen ||
    docEl?.webkitRequestFullscreen ||
    docEl?.mozRequestFullScreen ||
    docEl?.msRequestFullscreen
  );
}

export function isFullscreenActive(): boolean {
  if (typeof document === 'undefined') return false;
  const doc = document as any;

  return Boolean(
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement
  );
}

export async function requestFullscreen(): Promise<void> {
  if (typeof document === 'undefined') return;
  const docEl = document.documentElement as any;
  if (!docEl) return;

  const requestMethod =
    docEl.requestFullscreen ||
    docEl.webkitRequestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.msRequestFullscreen;

  if (typeof requestMethod === 'function') {
    try {
      const res = requestMethod.call(docEl);
      if (res instanceof Promise) {
        await res;
      }
    } catch (err) {
      console.warn('requestFullscreen failed:', err);
    }
  }
}

export async function exitFullscreen(): Promise<void> {
  if (typeof document === 'undefined') return;
  const doc = document as any;

  const exitMethod =
    doc.exitFullscreen ||
    doc.webkitExitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.msExitFullscreen;

  if (typeof exitMethod === 'function') {
    try {
      const res = exitMethod.call(doc);
      if (res instanceof Promise) {
        await res;
      }
    } catch (err) {
      console.warn('exitFullscreen failed:', err);
    }
  }
}

export async function toggleFullscreen(): Promise<boolean> {
  if (isFullscreenActive()) {
    await exitFullscreen();
    return false;
  } else {
    await requestFullscreen();
    return isFullscreenActive();
  }
}

export function subscribeFullscreenChange(callback: (active: boolean) => void): () => void {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const handler = () => {
    callback(isFullscreenActive());
  };

  const eventNames = [
    'fullscreenchange',
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'MSFullscreenChange',
  ];

  for (const evt of eventNames) {
    document.addEventListener(evt, handler, false);
  }

  return () => {
    for (const evt of eventNames) {
      document.removeEventListener(evt, handler, false);
    }
  };
}
