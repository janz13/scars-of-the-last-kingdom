import { Platform } from 'react-native';
import { EndingType } from '../data/types';
import { getSceneManifestEntry } from '../constants/sceneManifest';

export interface ClipExportOptions {
  endingId: string;
  endingTitle: string;
  endingSubtitle: string;
  endingType: EndingType;
  accentColor: string;
  choicesCount: number;
  durationMs?: number;
}

export interface ClipExportResult {
  success: boolean;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  sharedViaWebShare: boolean;
  error?: string;
}

export function isClipExportSupported(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  return typeof (window as any).MediaRecorder !== 'undefined';
}

/**
 * Renders a 6-second 1080p (1920x1080) pixel-art ending card video clip with
 * animated particles, scanlines, burned-in ending title, and URL watermark,
 * then triggers download or Web Share API.
 */
export async function exportEndingClip(options: ClipExportOptions): Promise<ClipExportResult> {
  const durationMs = options.durationMs ?? 6000;
  const filename = `scars-ending-${options.endingId.replace(/[^a-z0-9_-]/gi, '_')}.webm`;

  if (!isClipExportSupported()) {
    return {
      success: false,
      filename,
      mimeType: 'video/webm',
      sizeBytes: 0,
      sharedViaWebShare: false,
      error: 'MediaRecorder is not supported in this environment.',
    };
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not initialize 2D canvas context for clip export.');
    }

    const manifest = getSceneManifestEntry(
      options.endingType === 'savior'
        ? 'city_after'
        : options.endingType === 'corruption'
          ? 'signal_choir_cavern'
          : options.endingType === 'secret'
            ? 'answer_chamber'
            : 'ruined_metro_station'
    );
    const palette = manifest.palette.length >= 4 ? manifest.palette : ['#09080f', '#1c1930', '#9b59b6', '#ede0c4'];

    const stream = (canvas as any).captureStream(30);
    const mimeCandidates = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
      'video/mp4',
    ];
    let selectedMime = 'video/webm';
    for (const m of mimeCandidates) {
      if ((window as any).MediaRecorder.isTypeSupported?.(m)) {
        selectedMime = m;
        break;
      }
    }

    const chunks: BlobPart[] = [];
    const recorder = new (window as any).MediaRecorder(stream, {
      mimeType: selectedMime,
      videoBitsPerSecond: 4_500_000,
    });

    recorder.ondataavailable = (e: any) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    const stopPromise = new Promise<Blob>((resolve) => {
      recorder.onstop = () => {
        resolve(new Blob(chunks, { type: selectedMime }));
      };
    });

    recorder.start(200);

    // Deterministic particles for the 6-second clip
    const particles = Array.from({ length: 80 }, (_, i) => ({
      x: (i * 137) % 1920,
      y: (i * 293) % 1080,
      vx: ((i % 5) - 2) * 0.8,
      vy: -1.2 - (i % 4) * 0.5,
      size: i % 3 === 0 ? 6 : 3,
      color: i % 2 === 0 ? options.accentColor : palette[Math.min(3, palette.length - 1)]!,
    }));

    const startTime = performance.now();
    await new Promise<void>((resolve) => {
      const renderFrame = () => {
        const elapsed = performance.now() - startTime;
        const t = Math.min(1, elapsed / durationMs);

        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 1080);
        grad.addColorStop(0, palette[0] ?? '#06040e');
        grad.addColorStop(0.55, palette[1] ?? '#120d24');
        grad.addColorStop(1, '#040308');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1920, 1080);

        // Pixel grid architectural silhouette bars
        ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
        for (let x = 0; x < 1920; x += 120) {
          ctx.fillRect(x, 180, 12, 720);
        }

        // Animated particles
        for (const p of particles) {
          p.x = (p.x + p.vx + 1920) % 1920;
          p.y = (p.y + p.vy + 1080) % 1080;
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.round(p.x / 3) * 3, Math.round(p.y / 3) * 3, p.size, p.size);
        }

        // Border frame
        ctx.strokeStyle = options.accentColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(64, 64, 1920 - 128, 1080 - 128);

        // Header eyebrow
        ctx.fillStyle = options.accentColor;
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(options.endingSubtitle.toUpperCase(), 960, 360);

        // Ending Title
        ctx.fillStyle = '#ede0c4';
        ctx.font = 'bold 72px serif';
        ctx.fillText(options.endingTitle, 960, 465);

        // Run stats pill
        ctx.fillStyle = '#a89a84';
        ctx.font = '26px monospace';
        ctx.fillText(
          `ENDING: ${options.endingType.toUpperCase()}   ·   CHOICES MADE: ${options.choicesCount}`,
          960,
          560
        );

        // Burned-in game title & URL footer
        ctx.fillStyle = '#c9a84c';
        ctx.font = 'bold 28px monospace';
        ctx.fillText('SCARS OF THE LAST KINGDOM', 960, 880);
        ctx.fillStyle = '#7a6e60';
        ctx.font = '22px monospace';
        ctx.fillText('janz13.github.io/scars-of-the-last-kingdom', 960, 922);

        // Subtle scanlines
        ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
        for (let y = 0; y < 1080; y += 6) {
          ctx.fillRect(0, y, 1920, 2);
        }

        if (elapsed < durationMs) {
          requestAnimationFrame(renderFrame);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(renderFrame);
    });

    recorder.stop();
    const blob = await stopPromise;

    let sharedViaWebShare = false;
    const file = new File([blob], filename, { type: selectedMime });
    const nav = navigator as any;
    if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
      try {
        await nav.share({
          title: `Scars of the Last Kingdom — ${options.endingTitle}`,
          text: `I reached the "${options.endingTitle}" (${options.endingType}) ending in Scars of the Last Kingdom!`,
          files: [file],
        });
        sharedViaWebShare = true;
      } catch {
        // Fallback to direct download if user cancels or share fails
      }
    }

    if (!sharedViaWebShare) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    return {
      success: true,
      filename,
      mimeType: selectedMime,
      sizeBytes: blob.size,
      sharedViaWebShare,
    };
  } catch (err: any) {
    return {
      success: false,
      filename,
      mimeType: 'video/webm',
      sizeBytes: 0,
      sharedViaWebShare: false,
      error: err?.message ?? String(err),
    };
  }
}
