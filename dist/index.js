// index.ts
import { program } from "commander";

// src/actions.ts
import { writeFile, stat } from "node:fs/promises";
import chalk from "chalk";
import fg from "fast-glob";
import tinify from "tinify";

// src/constants.ts
import { homedir } from "node:os";
import { join } from "node:path";
var HOME = homedir();
var CONFIG_ROOT = join(HOME, ".config");
var CONFIG_DIR = join(CONFIG_ROOT, "tpng");
var CONFIG_FILE = join(CONFIG_DIR, "config.json");

// src/util.ts
import { mkdir, readFile } from "node:fs/promises";
async function safeMkdir(dir) {
  try {
    await mkdir(dir);
  } catch (e) {
    return false;
  }
  return true;
}
async function getKey() {
  try {
    const config = await readFile(CONFIG_FILE);
    const { key } = JSON.parse(config.toString());
    return key;
  } catch (e) {
    return null;
  }
}

// src/actions.ts
async function setKey(key) {
  try {
    const stats = await stat(CONFIG_ROOT);
  } catch (e) {
    await safeMkdir(CONFIG_ROOT);
  }
  await safeMkdir(CONFIG_DIR);
  try {
    await writeFile(CONFIG_FILE, JSON.stringify({ key }));
    console.log(chalk.green("Key saved successfully"));
    return true;
  } catch (e) {
    console.error(e);
    console.log(chalk.red("There was an error saving your key"));
    return false;
  }
}
async function upload(glob) {
  const paths = await fg(glob);
  if (paths.length == 0)
    return false;
  const key = await getKey();
  if (!key)
    return false;
  tinify.key = key;
  console.log(`key: ${key}`);
  console.log(`paths: ${paths}`);
  const promise = [];
  for (const path of paths) {
    console.log(chalk.yellow(`Uploading ${path}`));
    const source = tinify.fromFile(path);
    promise.push(source.toFile(path));
  }
  try {
    await Promise.all(promise);
    console.log(chalk.green("Upload successful"));
    return true;
  } catch (e) {
    console.error(e);
    console.log(chalk.red("There was an error uploading your images"));
    return false;
  }
}

// index.ts
program.name("tpng").version("0.0.1").description("A CLI for tinypng").argument("<images...>", "Images to upload").action((images) => {
  upload(images).then((success) => {
    if (!success)
      process.exit(1);
    else
      process.exit(0);
  });
});
program.command("key").description("Set your API key -- Get from https://tinypng.com/developers").argument("<key>", "Your API key").action((key) => {
  console.log("Attempting to set APi key...");
  setKey(key);
});
program.parse(process.argv);
