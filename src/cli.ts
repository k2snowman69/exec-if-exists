#!/usr/bin/env node

import { execIfExists } from "./index";

"use strict";

let args = process.argv.slice(2);

async function run() {
  const result = await execIfExists(args);
  process.exit(result);
}
run();
