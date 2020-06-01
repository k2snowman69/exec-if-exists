var configs = require("@snowcoders/renovate-config");

module.exports = {
  ...configs.jest,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
