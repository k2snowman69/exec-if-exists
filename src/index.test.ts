import { execSync } from "./index";

describe("execSync", () => {
  it("execSyncs when program is found", () => {
    expect(() => {
      execSync(["npm", "-v"]);
    }).not.toThrow();
  });

  it("Does not execSync when program is not found", () => {
    expect(() => {
      execSync(["not-prettier", '"./src/index.ts"']);
    }).not.toThrow();
  });
});
