import { spawn } from "node:child_process";

export function runNpmExec(args: string[]): Promise<number> {
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
