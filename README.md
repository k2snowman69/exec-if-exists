# exec-if-exists

Runs an npm package only if it exists locally (e.g. in node_modules). This is basically chaining `which` and `npx --no` so that when which is unable to find a package, it allows your script to continue without error.

# Usage

```
exec-if-exists sortier ./src/**/*.ts
```

# Why?

Optional dev tooling

Let's say some projects use jest for unit testing but others optionally have puppeteer/playwright for E2E testing. Using exec-if-exists your lint-stage config basically runs both and if the tool is installed, it gets run.

```
// Example husky config
{
  hooks: {
    "pre-commit": "exec-if-exists jest && exec-if-exists playwright",
  },
};
```

Now any time a commit is pushed, jest and playwright run if they are installed and exit with a non-zero if they fail. This allows you to create a single consistent config that all your projects inherit from. For example, our husky config looks like this:

```
var configs = require("@snowcoders/renovate-config");

module.exports = configs.husky;
```

And then we host our shared husky config in a single location!
