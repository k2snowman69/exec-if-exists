#!/usr/bin/env node

import { execIfExists } from "./index.js";

("use strict");

let args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Must provide a program to run (e.g. `exec-if-exist eslint`)");
  process.exit(1);
}

async function run() {
  const result = await execIfExists(args);
  process.exit(result);
}
run();
