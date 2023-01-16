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

describe("Success scenarios", () => {
  it("Returns 0 if program is not found", async () => {
    await expect(execIfExists(["does-not-exist"])).resolves.toBe(0);
  });

  it("Returns 0 on successful execution", async () => {
    await expect(execIfExists(["npm", "-v"])).resolves.toBe(0);
  });

  it("Returns not 0 on non-successful execution", async () => {
    await expect(execIfExists(["npm", "--flag-does-not-exist"])).resolves.not.toBe(0);
  });
});
