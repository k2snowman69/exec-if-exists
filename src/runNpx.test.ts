import * as child_process from "child_process";
import { mocked } from "ts-jest/utils";
import { runNpx } from "./runNpx";

jest.mock("child_process");
const mockedChildProcess = mocked(child_process);

const args = ["npm", "-v"];
const expectedCommand = "npx --no-install npm -v";

it.each([
  [0, undefined, "success-undefined"],
  [0, 0, "success"],
  [0, 127, "not found"],
  [1, 1, "failure"],
])(
  "Returns %i when underlying status code is %i representing a %s program",
  async (expectedCode, realCode, helpfulMessage) => {
    mockedChildProcess.exec.mockImplementationOnce((command, b, callback) => {
      expect(command).toBe(expectedCommand);
      if (callback == null) {
        throw new Error("Unexpected");
      }
      callback(
        {
          code: realCode,
          message: "message",
          name: "name",
        },
        "",
        ""
      );

      return {} as any;
    });

    const result = await runNpx(args);
    expect(result).toEqual(expectedCode);
  }
);

it("Returns 0 when underlying error is null", async () => {
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

  const result = await runNpx(args);
  expect(result).toEqual(0);
});
