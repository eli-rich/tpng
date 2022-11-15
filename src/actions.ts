import { writeFile, stat } from 'node:fs/promises';
import chalk from 'chalk';

import { CONFIG_ROOT, CONFIG_DIR, CONFIG_FILE } from './constants';
import { safeMkdir } from './util';

export async function setKey(key: string): Promise<boolean> {
  try {
    // check if ~/.config exists
    const stats = await stat(CONFIG_ROOT);
  } catch (e) {
    // if it doesn't exist, create it
    await safeMkdir(CONFIG_ROOT);
  }
  // create the tpng directory
  await safeMkdir(CONFIG_DIR);
  // write the key to ~/.config/tpng.json
  try {
    await writeFile(CONFIG_FILE, JSON.stringify({ key }));
    console.log(chalk.green('Key saved successfully'));
    return true;
  } catch (e) {
    console.log(chalk.red('There was an error saving your key'));
    return false;
  }
}
