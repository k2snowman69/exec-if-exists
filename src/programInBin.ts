import fs from "fs";

export function programInBin(binDir: string, programName: string) {
  return new Promise<true>((resolve, reject) => {
    fs.readdir(binDir, (err, files) => {
      if (files.indexOf(programName) !== -1) {
        resolve(true);
        return;
      }

      reject("Program not found");
      return;
    });
  });
}
