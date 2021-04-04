import { exec } from "child_process";
import path from "path";

export function getBinDirectory() {
  return new Promise<string>((resolve, reject) => {
    const programToFind = "exec-if-exists";
    const command = `npm ls --parseable ${programToFind}`;
    exec(
      command,
      {
        cwd: process.cwd(),
      },
      function (error, stdout, stderr) {
        const code = error?.code;
        if (code == null || code === 0) {
          if (stdout.length === 0) {
            reject(
              `${programToFind} needs to be installed in the local directory to run`
            );
            return;
          }

          const index = stdout.lastIndexOf(programToFind);
          const lastLineStart = stdout.lastIndexOf("\n") + 1;
          const binPath = path.join(
            stdout.substring(lastLineStart, index),
            ".bin"
          );
          resolve(binPath);
          return;
        } else {
          reject(`Error code: ${code}`);
          return;
        }
      }
    );
  });
}
