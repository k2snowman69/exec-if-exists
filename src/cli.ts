#!/usr/bin/env node

import { ExecIfExists } from "./index";

"use strict";

let args = process.argv.slice(2);

ExecIfExists.run(args);
