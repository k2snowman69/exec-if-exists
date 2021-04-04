import { getBinDirectory } from "./getBinDirectory";
import { programInBin } from "./programInBin";
import { runNpx } from "./runNpx";

export function execIfExists(args: string[]) {
  if (args.length === 0) {
    console.log("Must provide a program to run (e.g. `exec-if-exist eslint`)");
    return;
  }

  return getBinDirectory()
    .then((binDir) => {
      const result = programInBin(binDir, args[0]);
      return result;
    })
    .then(() => {
      const result = runNpx(args);
      return result;
    })
    .catch(() => {
      return 0;
    });
}
