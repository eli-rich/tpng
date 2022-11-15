import { mkdir, readFile } from 'node:fs/promises';
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
    const config = await readFile(CONFIG_FILE);
    const { key } = JSON.parse(config.toString());
    return key;
  } catch (e) {
    return null;
  }
}
