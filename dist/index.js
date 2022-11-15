// index.ts
import { program } from "commander";

// src/actions.ts
import { writeFile, stat } from "node:fs/promises";
import chalk from "chalk";

// src/constants.ts
import { homedir } from "node:os";
import { join } from "node:path";
var HOME = homedir();
var CONFIG_ROOT = join(HOME, ".config");
var CONFIG_DIR = join(CONFIG_ROOT, "tpng");
var CONFIG_FILE = join(CONFIG_DIR, "config.json");

// src/util.ts
import { mkdir } from "node:fs/promises";
async function safeMkdir(dir) {
  try {
    await mkdir(dir);
  } catch (e) {
    return false;
  }
  return true;
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
    console.log(chalk.red("There was an error saving your key"));
    return false;
  }
}

// index.ts
program.name("tpng").version("0.0.1").description("A CLI for tinypng").argument("<images...>", "Images to upload").action(() => console.log("no command"));
program.command("key").description("Set your API key -- Get from https://tinypng.com/developers").argument("<key>", "Your API key").action((key) => {
  console.log("Attempting to set APi key...");
  setKey(key);
});
program.parse(process.argv);
