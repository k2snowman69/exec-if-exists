import { execSync as nodeExecSync } from "child_process";

export function execSync(args: string[]) {
  try {
    const command = ["npx", "--no-install", ...args].join(" ");
    const result = nodeExecSync(command, {
      cwd: process.cwd(),
    });
    console.log(result.toString());
  } catch (e) {
    // Do nothing since we expect this to fail if the process cannot be found
  }
}
