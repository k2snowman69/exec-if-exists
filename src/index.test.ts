import { describe, expect, it } from "@jest/globals";
import { execIfExists } from "./index.js";

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
    ).rejects.toContain("String array");
  });
});

it.each<{ command: string; expectedExitCode: number; notes: string }>`
  command                                      | expectedExitCode | notes
  ${"npm"}                                     | ${0}             | ${"installed globally but not locally"}
  ${"does-not-exist"}                          | ${0}             | ${"not installed and is not a real package"}
  ${"esbuild"}                                 | ${0}             | ${"not installed however is an actual package"}
  ${"eslint --kjhygjkhg"}                      | ${2}             | ${"installed locally with invalid arguments"}
  ${"prettier"}                                | ${2}             | ${"installed locally with no arguments (as of 2.8.3)"}
  ${"prettier -- this-file-does-not-exist.js"} | ${2}             | ${"installed locally with invalid file to run (as of 2.8.3)"}
  ${"prettier --flag-does-not-exist"}          | ${2}             | ${"installed locally with invalid arguments (as of 2.8.3)"}
  ${"prettier -v"}                             | ${0}             | ${"installed locally with valid arguments (as of 2.8.3)"}
`("Returns $expectedExitCode if program is $notes: '$command'", async ({ command, expectedExitCode }) => {
  await expect(execIfExists(command.split(" "))).resolves.toBe(expectedExitCode);
});
