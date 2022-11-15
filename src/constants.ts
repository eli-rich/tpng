import { homedir } from 'node:os';
import { join } from 'node:path';

export const HOME = homedir();
export const CONFIG_ROOT = join(HOME, '.config');
export const CONFIG_DIR = join(CONFIG_ROOT, 'tpng');
export const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

const constants = {
  HOME,
  CONFIG_ROOT,
  CONFIG_DIR,
  CONFIG_FILE,
};

export default constants;
