import { expect, it } from "@jest/globals";
import { execSync } from "node:child_process";

function runCommand(commandString: string): number {
  const command = commandString.split(" ");
  try {
    execSync(commandString, {
      cwd: process.cwd(),
      env: process.env,
      stdio: "ignore",
    });
    return 0;
  } catch (e) {
    // @ts-ignore
    return e.status;
  }
}

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
`("Returns $expectedExitCode if program is $notes: '$command'", ({ command, expectedExitCode }) => {
  const execIfExistsExitCode = runCommand(`node ./dist/cli.js ${command}`);

  expect(execIfExistsExitCode).toBe(expectedExitCode);
});
