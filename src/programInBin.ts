import fs from "node:fs";
import * as console from "./log-proxy.js";

export function programInBin(binDir: string, programName: string) {
  return new Promise<boolean>((resolve) => {
    fs.readdir(binDir, (err, files) => {
      if (err != null) {
        console.debug(`Error reading files from ${binDir}: ${err.message ?? err}`);
        return resolve(false);
      }

      if (files == null || files.length === 0) {
        console.debug(`0 files found in ${binDir}`);
        return resolve(false);
      }

      if (files.indexOf(programName) !== -1) {
        return resolve(true);
      }

      return resolve(false);
    });
  });
}
