/**
 * Browser notifications + sound for the paralegal Live Chat tab.
 *
 * Two channels:
 *   1. Web Notifications API — shows an OS-level toast even when
 *      the tab is backgrounded. Requires explicit permission grant.
 *   2. Web Audio API — a short beep so the paralegal hears new
 *      messages without looking. Volume controllable via localStorage.
 *
 * Both are opt-out: the LiveChatTab exposes a toggle, which we
 * persist in localStorage so it survives reloads.
 */

const SETTINGS_KEY = 'la.chat.notifications.v1';
const COOLDOWN_MS = 5000;

interface Settings {
  enabled: boolean;
  sound: boolean;
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { enabled: true, sound: true, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { enabled: true, sound: true };
}

export function getNotificationSettings(): Settings {
  if (typeof window === 'undefined') return { enabled: false, sound: false };
  return loadSettings();
}

export function saveNotificationSettings(s: Settings) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
}

/**
 * Ask the browser for permission. Idempotent — safe to call on
 * every Live Chat tab mount. Returns the actual permission state.
 */
export async function ensureNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return Notification.permission;
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

let lastNotifAt = 0;

/**
 * Show a browser notification and play the beep, subject to the
 * paralegal's settings + a 5-second cooldown so a flood of
 * messages doesn't spam them.
 */
export function notifyNewMessage(opts: {
  title: string;
  body: string;
  conversationId?: string;
}) {
  if (typeof window === 'undefined') return;
  const settings = loadSettings();
  if (!settings.enabled) return;
  const now = Date.now();
  if (now - lastNotifAt < COOLDOWN_MS) return;
  lastNotifAt = now;

  if (settings.sound) beep();

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification(opts.title, {
        body: opts.body.slice(0, 200),
        tag: opts.conversationId || 'la-chat',
        renotify: false,
        // icon: '/favicon.ico', // optional — uncomment if you want the firm logo
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    } catch {
      /* OS rejected — fall through, beep already happened */
    }
  }
}

/**
 * Short two-tone beep using Web Audio. No external asset needed
 * so this works even on completely fresh installs.
 */
function beep() {
  try {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    // Two pitches: 880 Hz → 660 Hz, 80 ms each.
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(660, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
    // Auto-close to avoid Chrome's tab-leak warning.
    setTimeout(() => ctx.close().catch(() => undefined), 400);
  } catch {
    /* ignore — sound is optional polish */
  }
}
