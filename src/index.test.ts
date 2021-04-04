import * as getBinDirectory from "./getBinDirectory";
import * as programInBin from "./programInBin";
import * as runNpx from "./runNpx";
import { execIfExists } from "./index";
import { mocked } from "ts-jest/utils";

jest.mock("./getBinDirectory");
const mockedGetBinDirectory = mocked(getBinDirectory);
jest.mock("./programInBin");
const mockedProgramInBin = mocked(programInBin);
jest.mock("./runNpx");
const mockedRunNpx = mocked(runNpx);

beforeEach(() => {
  mockedGetBinDirectory.getBinDirectory.mockImplementationOnce(() => {
    return Promise.resolve("node_modules/.bin");
  });
  mockedProgramInBin.programInBin.mockImplementationOnce(() => {
    return Promise.resolve(true);
  });
  mockedRunNpx.runNpx.mockImplementationOnce(() => {
    return Promise.resolve(0);
  });
});

afterEach(() => {
  mockedGetBinDirectory.getBinDirectory.mockReset();
  mockedProgramInBin.programInBin.mockReset();
  mockedRunNpx.runNpx.mockReset();
});

it("Does not call mockedGetBinDirectory if arguments are passed", async () => {
  await execIfExists([]);

  await expect(mockedGetBinDirectory.getBinDirectory).not.toHaveBeenCalled();
});

it("Returns 0 if runNpx returns 0", async () => {
  await expect(execIfExists(["sortier"])).resolves.toEqual(0);
});

it("Returns 0 if getBinDirectory fails", async () => {
  mockedGetBinDirectory.getBinDirectory
    .mockReset()
    .mockImplementationOnce(() => Promise.reject("bleh"));
  await expect(execIfExists(["sortier"])).resolves.toEqual(0);
});

it("Returns 0 if programInBin fails", async () => {
  mockedProgramInBin.programInBin
    .mockReset()
    .mockImplementationOnce(() => Promise.reject("bleh"));
  await expect(execIfExists(["sortier"])).resolves.toEqual(0);
});

it("Returns 50 if runNpx returns 50", async () => {
  mockedRunNpx.runNpx
    .mockReset()
    .mockImplementationOnce(() => Promise.resolve(50));
  await expect(execIfExists(["sortier"])).resolves.toEqual(50);
});
