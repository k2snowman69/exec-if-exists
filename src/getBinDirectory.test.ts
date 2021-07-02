import * as child_process from "child_process";
import { mocked } from "ts-jest/utils";
import { getBinDirectory } from "./getBinDirectory";
import path from "path";

jest.mock("child_process");
const mockedChildProcess = mocked(child_process);

const expectedCommand = "npm bin";
const expectedkNodeModulesPath = path.join(
  "D:",
  "Projects",
  "exec-if-exists",
  "node_modules"
);
const expectedBinPath = path.join(expectedkNodeModulesPath, ".bin");

it("Resolves when only one package path is found", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(null, expectedBinPath, "");

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  const binDir = await getBinDirectory();
  expect(binDir).toEqual(expectedBinPath);
});

it("Resolves when multiple package path is found", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(null, `${expectedBinPath}\n${expectedBinPath}`, "");

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  const binDir = await getBinDirectory();
  expect(binDir).toEqual(expectedBinPath);
});

it("Resolves when multiple packages found with newline at end", async () => {
  mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
    expect(command).toBe(expectedCommand);
    if (callback == null) {
      throw new Error("Unexpected");
    }
    callback(null, `${expectedBinPath}\n${expectedBinPath}\n`, "");

    const io = {
      pipe: () => {},
    };
    return {
      stdout: io,
      stderr: io,
      stdin: io,
    } as any;
  });

  const binDir = await getBinDirectory();
  expect(binDir).toEqual(expectedBinPath);
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
