import { exec, execSync } from "node:child_process";
import { describe, it, expect } from "@jest/globals";

type CommandResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

async function runCommand(command: string): Promise<CommandResult> {
  return new Promise<CommandResult>((resolve, reject) => {
    try {
      exec(
        command,
        {
          cwd: process.cwd(),
          env: process.env,
          timeout: 5000,
        },
        (error, stdout, stderr) => {
          return resolve({
            exitCode: error?.code ?? 0,
            stderr: stderr.trim(),
            stdout: stdout.trim(),
          });
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}

it.each`
  command
  ${"eslint --kjhygjkhg"}
  ${"prettier -h"}
`("Returns the same exit code for command $command", async ({ command }) => {
  const expected = await runCommand(`npm exec --no -- ${command}`);
  const actualRun = await runCommand(`node ./dist/cli.js ${command}`);
  expect(expected).toEqual(actualRun);
});

it.each`
  command
  ${"does-not-exist"}
`("Returns exit code 0 for command 'does-not-exist'", async ({ command }) => {
  const expected = await runCommand(`npm exec --no -- ${command}`);
  const actualRun = await runCommand(`node ./dist/cli.js ${command}`);
  expect(expected.exitCode).toBe(1);
  expect(actualRun.exitCode).toBe(0);
});
