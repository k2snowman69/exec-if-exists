import * as child_process from "child_process";
import { execSync } from "./index";

jest.mock("child_process");

describe("execSync", () => {
  it("Calls execSync with a successful program", () => {
    expect(() => {
      execSync(["npm", "-v"]);
      expect(child_process.execSync).toBeCalledWith(
        "npx --no-install npm -v",
        expect.anything()
      );
    }).not.toThrow();
  });

  it("Calls execSync with a non-existant program", () => {
    expect(() => {
      execSync(["not-prettier", '"./src/index.ts"']);
      expect(child_process.execSync).toBeCalledWith(
        'npx --no-install not-prettier "./src/index.ts"',
        expect.anything()
      );
    }).not.toThrow();
  });
});
