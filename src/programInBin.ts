import fs from "node:fs";

export function programInBin(binDir: string, programName: string) {
  return new Promise<boolean>((resolve, reject) => {
    fs.readdir(binDir, (err, files) => {
      if (err != null) {
        return reject(`Error ${err.message ?? err}`);
      }

      if (files == null || files.length === 0) {
        return reject("Error: No node programs found. Did you run npm install?");
      }

      if (files.indexOf(programName) !== -1) {
        return resolve(true);
      }

      return resolve(false);
    });
  });
}
