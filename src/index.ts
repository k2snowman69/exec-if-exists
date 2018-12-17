import execa from "execa";
import npmWhich from "npm-which";

export class ExecIfExists {
  public static run(args: string[]) {
    console.log(`Args: ${args.join("_")}`);

    let currentDir = process.cwd();
    console.log(`currentDir: ${currentDir}`);

    let which = npmWhich(currentDir);
    let bin = null;
    try {
      bin = which.sync(args[0]);
    } catch (e) {
      return;
    }
    console.log(`bin: ${bin}`);

    execa.sync(bin, args.slice(1), {
      cwd: currentDir
    });
    return;
  }
}
