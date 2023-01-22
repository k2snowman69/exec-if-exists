import { jest } from "@snowcoders/renovate-config";

export default {
  ...jest,
  // We're running actual applications in this situation, don't want to run multiple at the same time
  maxWorkers: 1,
};
