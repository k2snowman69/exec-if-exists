import * as child_process from "child_process";
import { mocked } from "ts-jest/utils";
import { getBinDirectory } from "./getBinDirectory";
import path from "path";

jest.mock("child_process");
const mockedChildProcess = mocked(child_process);

const expectedCommand = "npm ls --parseable exec-if-exists";
const expectedkNodeModulesPath = path.join(
  "D:",
  "Projects",
  "exec-if-exists",
  "node_modules"
);
const expectedBinPath = path.join(expectedkNodeModulesPath, ".bin");
const mockExecIfExistsPath = path.join(
  expectedkNodeModulesPath,
  "exec-if-exists"
);

it("Resolves when only one package path is found", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(null, mockExecIfExistsPath, "");

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  await expect(getBinDirectory()).resolves.toEqual(expectedBinPath);
});

it("Resolves when multiple package path is found", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(null, `${mockExecIfExistsPath}\n${mockExecIfExistsPath}`, "");

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  await expect(getBinDirectory()).resolves.toEqual(expectedBinPath);
});

it("Resolves when multiple packages found with newline at end", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(null, `${mockExecIfExistsPath}\n${mockExecIfExistsPath}\n`, "");

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  await expect(getBinDirectory()).resolves.toEqual(expectedBinPath);
});

it("Rejects when no paths are found", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(null, "", "");

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  await expect(getBinDirectory()).rejects.toBeDefined();
});

it("Rejects when exec fails", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(
      // @ts-expect-error Don't feel like filling this whole thing out
      {
        code: 123,
      },
      "",
      ""
    );

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  await expect(getBinDirectory()).rejects.toBeDefined();
});
