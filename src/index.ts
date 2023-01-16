import { exec } from "node:child_process";

export function execIfExists(args: string[]): Promise<number> {
  if (!Array.isArray(args) || args.length === 0 || args.some((value) => typeof value !== "string")) {
    return Promise.reject('String array expected as arguments. E.g. ["eslint", "--fix"]');
  }

  return runNpx(args);
}

function runNpx(args: string[]): Promise<number> {
  const command = ["npm", "exec", "--no", "--", ...args].join(" ");
  return new Promise<number>((resolve) => {
    exec(
      command,
      {
        cwd: process.cwd(),
      },
      (error) => {
        if (error == null) {
          resolve(0);
        }
        if (error != null && typeof error === "object") {
          if ("message" in error && typeof error.message === "string") {
            const { message } = error;
            const errorString = message.toString();
            if (errorString.includes("npm ERR! code E404")) {
              resolve(0);
            }
          }
          if ("code" in error && typeof error.code === "number") {
            resolve(error.code);
          }
        }
        resolve(1);
      }
    );
  });
}
