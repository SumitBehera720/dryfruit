import { query } from '@/lib/db';
import { fallbackSettings } from '@/lib/fallback-data';

interface SettingRow {
  key: string;
  value: string;
}

const memoryCache: { settings: Record<string, string> | null; ts: number } = { settings: null, ts: 0 };
const CACHE_TTL = 30_000; // 30 seconds

export async function getSettings(): Promise<Record<string, string>> {
  const now = Date.now();
  if (memoryCache.settings && (now - memoryCache.ts) < CACHE_TTL) {
    return memoryCache.settings;
  }
  try {
    const rows = await query<SettingRow>('SELECT `key`, `value` FROM SiteSetting');
    const result: Record<string, string> = {};
    for (const r of rows) result[r.key] = r.value;
    memoryCache.settings = result;
    memoryCache.ts = now;
    return result;
  } catch {
    if (memoryCache.settings) return memoryCache.settings;
    memoryCache.settings = { ...fallbackSettings };
    memoryCache.ts = now;
    return memoryCache.settings;
  }
}

export async function saveSettings(data: Record<string, string>): Promise<void> {
  // Update memoryCache immediately so it works even if DB is offline!
  if (memoryCache.settings) {
    memoryCache.settings = { ...memoryCache.settings, ...data };
  } else {
    memoryCache.settings = { ...fallbackSettings, ...data };
  }
  memoryCache.ts = Date.now();

  try {
    for (const [key, value] of Object.entries(data)) {
      await query(
        'INSERT INTO SiteSetting (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)',
        [key, String(value)]
      );
    }
  } catch (e) {
    console.error('saveSettings error:', e);
  }
}

export function getFileSettings(): Record<string, string> {
  return memoryCache.settings ?? { ...fallbackSettings };
}

export function saveFileSettings(data: Record<string, string>): void {
  memoryCache.settings = { ...memoryCache.settings, ...data };
  memoryCache.ts = Date.now();
}
