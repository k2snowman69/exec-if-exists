import fs from "fs";

export function programInBin(binDir: string, programName: string) {
  return new Promise<boolean>((resolve, reject) => {
    fs.readdir(binDir, (err, files) => {
      if (err != null) {
        reject(`Error ${err.message ?? err}`);
        return;
      }

      if (files == null || files.length === 0) {
        reject("Error: No node programs found. Did you run npm install?");
        return;
      }

      if (files.indexOf(programName) !== -1) {
        resolve(true);
        return;
      }

      resolve(false);
      return;
    });
  });
}
