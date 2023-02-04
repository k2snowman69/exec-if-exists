import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.unstable_mockModule("./runNpm.js", () => {
  return {
    runNpmExec: jest.fn(),
  };
});
const { runNpmExec } = jest.mocked(
  // @ts-ignore
  await import("./runNpm.js")
);
const { execIfExists } =
  // @ts-ignore
  await import("./index.js");

beforeEach(() => {
  runNpmExec.mockReset();
});

describe("Error scenarios", () => {
  it.each<{
    style: string;
    value: unknown;
  }>`
    style                | value
    ${"null"}            | ${null}
    ${"undefined"}       | ${undefined}
    ${"number"}          | ${1}
    ${"empty array"}     | ${[]}
    ${"array of number"} | ${[1]}
  `("Throws error if no arguments passed - $style", async ({ value }) => {
    await expect(
      execIfExists(
        // @ts-expect-error - Testing invalid inputs, expecting errors here
        value
      )
    ).resolves.toBe(1);
  });
});

it.each<{ command: string; expectNpmToRun: boolean; expectedExitCode: number; notes: string }>`
  command                                      | expectNpmToRun | expectedExitCode | notes
  ${"npm"}                                     | ${false}       | ${0}             | ${"installed globally but not locally"}
  ${"does-not-exist"}                          | ${false}       | ${0}             | ${"not installed and is not a real package"}
  ${"esbuild"}                                 | ${false}       | ${0}             | ${"not installed however is an actual package"}
  ${"eslint --kjhygjkhg"}                      | ${true}        | ${2}             | ${"installed locally with invalid arguments"}
  ${"prettier"}                                | ${true}        | ${2}             | ${"installed locally with no arguments (as of 2.8.3)"}
  ${"prettier -- this-file-does-not-exist.js"} | ${true}        | ${2}             | ${"installed locally with invalid file to run (as of 2.8.3)"}
  ${"prettier --flag-does-not-exist"}          | ${true}        | ${2}             | ${"installed locally with invalid arguments (as of 2.8.3)"}
  ${"prettier -v"}                             | ${true}        | ${0}             | ${"installed locally with valid arguments (as of 2.8.3)"}
`(
  "Returns $expectedExitCode if program is $notes: '$command'",
  async ({ command, expectNpmToRun, expectedExitCode }) => {
    // Arrange
    runNpmExec.mockResolvedValueOnce(expectedExitCode);

    // Act
    const execIfExistsResult = await execIfExists(command.split(" "));

    // Assert
    expect(runNpmExec).toHaveBeenCalledTimes(expectNpmToRun ? 1 : 0);
    expect(execIfExistsResult).toBe(expectedExitCode);
  }
);
