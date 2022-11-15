import { mkdir } from 'node:fs/promises';
import { CONFIG_FILE } from './constants';

export async function safeMkdir(dir: string): Promise<boolean> {
  try {
    await mkdir(dir);
  } catch (e) {
    return false;
  }
  return true;
}

export async function getKey(): Promise<string | null> {
  try {
    const config = await import(CONFIG_FILE);
    return config.key;
  } catch (e) {
    return null;
  }
}
