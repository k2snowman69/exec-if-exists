import execa from "execa";
// @ts-ignore
import npmWhich from "npm-which";

export class ExecIfExists {
  public static run(args: string[]) {
    let currentDir = process.cwd();

    let which = npmWhich(currentDir);
    let bin = null;
    try {
      bin = which.sync(args[0]);
    } catch (e) {
      return;
    }
    if (bin == null) {
      return;
    }

    execa.sync(bin, args.slice(1), {
      cwd: currentDir
    });
  }
}
