import { getBinDirectories } from "./getBinDirectory.js";
import * as console from "./log-proxy.js";
import { programInBin } from "./programInBin.js";
import { runNpmExec } from "./runNpm.js";

export async function execIfExists(args: string[]): Promise<number> {
  if (!Array.isArray(args) || args.length === 0 || args.some((value) => typeof value !== "string")) {
    console.error('String array expected as arguments. E.g. ["eslint", "--fix"]');
    return Promise.resolve(1);
  }

  const possibleBinDirectories = getBinDirectories();
  if (possibleBinDirectories == null || possibleBinDirectories.length === 0) {
    console.error("Unable to find nearest node_modules/.bin directory");
    return Promise.resolve(1);
  }

  const allProgramInBinSearches = possibleBinDirectories.map((directory) => programInBin(directory, args[0]));
  const results = await Promise.all(allProgramInBinSearches);
  const programExists = results.some((value) => value);

  if (!programExists) {
    console.log(`Package '${args[0]}' not installed, continuing without error`);
    return Promise.resolve(0);
  }

  return runNpmExec(args);
}
