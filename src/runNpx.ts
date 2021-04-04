import { exec } from "child_process";

export function runNpx(args: string[]) {
  return new Promise<number>((resolve) => {
    const command = ["npx", "--no-install", ...args].join(" ");
    const childProcess = exec(
      command,
      {
        cwd: process.cwd(),
      },
      (error) => {
        const code = error?.code;
        // Success code or not found code
        // https://www.ibm.com/support/pages/exit-code-127-means-jobs-command-can-not-be-found-or-executed#:~:text=%C2%B7%20The%20job%20exits%20with%20exit%20code%20127.,in%20%22Platform%20LSF%20Configuration%20Reference%E2%80%9D%20for%20more%20details.
        if (code == null || code === 0 || code === 127) {
          resolve(0);
        } else {
          resolve(code);
        }
      }
    );
    childProcess.stdout?.pipe(process.stdout);
    childProcess.stderr?.pipe(process.stderr);
    if (childProcess.stdin) {
      process.stdin.pipe(childProcess.stdin);
    }
  });
}
