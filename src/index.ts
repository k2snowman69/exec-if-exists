import { spawn } from "node:child_process";
import process from "node:process";
import { getBinDirectories } from "./getBinDirectory.js";
import * as console from "./log-proxy.js";
import { programInBin } from "./programInBin.js";

export async function execIfExists(args: string[]): Promise<number> {
  if (!Array.isArray(args) || args.length === 0 || args.some((value) => typeof value !== "string")) {
    return Promise.reject('String array expected as arguments. E.g. ["eslint", "--fix"]');
  }

  const possibleBinDirectories = getBinDirectories();
  if (possibleBinDirectories == null || possibleBinDirectories.length === 0) {
    console.debug("Unable to find nearest node_modules/.bin directory");
    return Promise.resolve(1);
  }

  const allProgramInBinSearches = possibleBinDirectories.map((directory) => programInBin(directory, args[0]));
  const results = await Promise.all(allProgramInBinSearches);
  const programExists = results.some((value) => value);

  if (!programExists) {
    console.debug(`Package '${args[0]}' not installed, continuing without error`);
    return Promise.resolve(0);
  }

  return runNpm(args);
}

function runNpm(args: string[]): Promise<number> {
  return new Promise<number>((resolve) => {
    const command = ["npm", "exec", "--no", "--offline", "--", ...args];
    console.debug({ command });
    const [program, ...npmArgs] = command;
    const childProcess = spawn(program, npmArgs, {
      cwd: process.cwd(),
      env: process.env,
      shell: true,
      stdio: "inherit",
      windowsHide: true,
    });

    childProcess.on("error", (error) => {
      console.debug(`child process errored with ${error}`);
      resolve(1);
    });
    childProcess.on("close", (code) => {
      console.debug(`child process closed with code ${code}`);
    });
    childProcess.on("exit", (code) => {
      console.debug(`child process exited with code ${code}`);
      resolve(code ?? 1);
    });
  });
}
