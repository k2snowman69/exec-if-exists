import { execSync as nodeExecSync } from "child_process";

export function execSync(args: string[]) {
  try {
    const result = nodeExecSync(
      ["npx", "--no-install", ...args.slice(1)].join(" "),
      {
        cwd: process.cwd(),
      }
    );
    console.log(result.toString());
  } catch (e) {
    // Do nothing since we expect this to fail if the process cannot be found
  }
}
