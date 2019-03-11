import { ExecIfExists } from "./index";

import execa from "execa";

jest.mock("execa");

describe("ExecIfExists", () => {
  let execaSpy: jest.SpyInstance<any, unknown[]>;

  beforeEach(() => {
    execaSpy = jest.spyOn(execa, "sync");
  });

  afterEach(() => {
    execaSpy.mockReset();
    execaSpy.mockRestore();
  });

  it("Runs when program is found", () => {
    ExecIfExists.run(["prettier", '"./src/index.ts"']);
    expect(execaSpy).toHaveBeenCalled();
  });

  it("Does not run when program is not found", () => {
    ExecIfExists.run(["not_prettier", '"./src/index.ts"']);
    expect(execaSpy).not.toHaveBeenCalled();
  });
});
