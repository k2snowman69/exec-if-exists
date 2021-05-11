import fs from "fs";
import path from "path";

export function programInBin(binDir: string, programName: string) {
  return new Promise<boolean>((resolve, reject) => {
    const filePath = path.join(binDir, programName);
    fs.stat(filePath, (err, stats) => {
      if (err != null) {
        return reject(`Error ${err.message ?? err}`);
      }

      if (stats.isFile()) {
        return resolve(true);
      }

      return resolve(false);
    });
  });
}
