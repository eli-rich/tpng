import { writeFile, stat } from 'node:fs/promises';
import chalk from 'chalk';
import fg from 'fast-glob';
import tinify from 'tinify';

import { CONFIG_ROOT, CONFIG_DIR, CONFIG_FILE } from './constants';
import { getKey, safeMkdir } from './util';

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
    console.error(e);
    console.log(chalk.red('There was an error saving your key'));
    return false;
  }
}

// upload image and write response
export async function upload(glob: string): Promise<boolean> {
  // validate files exist and key is valid.
  const paths = await fg(glob);
  if (paths.length == 0) return false;
  const key = await getKey();
  if (!key) return false;
  // set the API key to the stored value
  tinify.key = key;
  // loop through the files and upload them
  const promise = [];
  for (const path of paths) {
    console.log(chalk.yellow(`Uploading ${path}`));
    const source = tinify.fromFile(path);
    promise.push(source.toFile(path));
  }
  try {
    await Promise.all(promise);
    console.log(chalk.green('Upload successful'));
    return true;
  } catch (e) {
    console.error(e);
    console.log(chalk.red('There was an error uploading your images'));
    return false;
  }
}
