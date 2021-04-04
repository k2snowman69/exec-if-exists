import { getBinDirectory } from "./getBinDirectory";
import { programInBin } from "./programInBin";
import { runNpx } from "./runNpx";

export function execIfExists(args: string[]) {
  if (args.length === 0) {
    console.log("Must provide a program to run (e.g. `exec-if-exist eslint`)");
    return;
  }

  const programName = args[0];

  return getBinDirectory()
    .then((binDir) => {
      const result = programInBin(binDir, programName);
      return result;
    })
    .then((isFound) => {
      if (isFound) {
        const result = runNpx(args);
        return result;
      } else {
        console.log(`not found: ${programName}`);
        return 0;
      }
    })
    .catch((e) => {
      console.error(e);
      return 0;
    });
}
