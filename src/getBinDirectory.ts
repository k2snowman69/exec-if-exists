import { findUpMultipleSync, pathExistsSync } from "find-up";
import path from "node:path";

export function getBinDirectories(cwd?: string): string[] {
  const result = findUpMultipleSync(
    (directory) => {
      const pathExists = pathExistsSync(path.join(directory, "node_modules", ".bin"));
      if (pathExists) {
        return directory;
      }
      return undefined;
    },
    { cwd, type: "directory" }
  );

  return result.map((directory) => path.join(directory, "node_modules", ".bin"));
}
