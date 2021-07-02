import { exec } from "child_process";

export function getBinDirectory() {
  return new Promise<string>((resolve, reject) => {
    const command = `npm bin`;
    exec(
      command,
      {
        cwd: process.cwd(),
      },
      (error, stdout, stderr) => {
        const code = error?.code;
        if (code != null && code !== 0) {
          return reject(`Error: npm bin returned code ${code}`);
        }

        if (stdout.length === 0) {
          return reject(`Error: npm bin did not return a value`);
        }

        const individualLines = stdout.split("\n");
        const binPath = individualLines[0].trim();
        return resolve(binPath);
      }
    );
  });
}
