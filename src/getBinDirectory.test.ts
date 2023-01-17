import { expect, it } from "@jest/globals";
import { getBinDirectories } from "./getBinDirectory.js";

it("finds the bin directory for this project", () => {
  const result = getBinDirectories();

  expect(result[0]).toContain("node_modules");
  expect(result[0]).toContain(".bin");
});
