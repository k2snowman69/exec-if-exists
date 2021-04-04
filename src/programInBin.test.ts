import * as fs from "fs";
import { mocked } from "ts-jest/utils";
import { programInBin } from "./programInBin";

jest.mock("fs");
const mockedFs = mocked(fs);

afterEach(() => {
  mockedFs.readdir.mockReset();
});

it("Resolves false if program is not found (full array)", async () => {
  mockedFs.readdir.mockImplementationOnce((path, callback) => {
    // @ts-expect-error - Something weird going on with typescript override types
    callback(null, ["asdfasdf"]);
  });

  await expect(programInBin("does-not-exist", "sortier")).resolves.toBe(false);
});

it("Rejects if program is not found (empty array)", async () => {
  mockedFs.readdir.mockImplementationOnce((path, callback) => {
    // @ts-expect-error - Something weird going on with typescript override types
    callback(null, []);
  });

  await expect(programInBin("does-not-exist", "sortier")).rejects.toBeDefined();
});

it("Rejects if program is not found (null)", async () => {
  mockedFs.readdir.mockImplementationOnce((path, callback) => {
    // @ts-expect-error - Something weird going on with typescript override types
    callback(null, null);
  });

  await expect(programInBin("does-not-exist", "sortier")).rejects.toBeDefined();
});

it("Resolves if program is found", async () => {
  mockedFs.readdir.mockImplementationOnce((path, callback) => {
    // @ts-expect-error - Something weird going on with typescript override types
    callback(null, ["a", "sortier", "b"]);
  });

  await expect(programInBin("does-not-exist", "sortier")).resolves.toBe(true);
});

it("Rejects if readdir fails with string", async () => {
  mockedFs.readdir.mockImplementationOnce((path, callback) => {
    // @ts-expect-error - Something weird going on with typescript override types
    callback("Failure", []);
  });

  await expect(programInBin("does-not-exist", "sortier")).rejects.toBeDefined();
});

it("Rejects if readdir fails with Error object", async () => {
  mockedFs.readdir.mockImplementationOnce((path, callback) => {
    // @ts-expect-error - Something weird going on with typescript override types
    callback(new Error("asdfasdfasdf"), []);
  });

  await expect(programInBin("does-not-exist", "sortier")).rejects.toBeDefined();
});
