#!/usr/bin/env node

import { execSync } from "./index";

"use strict";

let args = process.argv.slice(2);

execSync(args);
